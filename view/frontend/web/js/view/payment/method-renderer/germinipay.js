define([
	'jquery',
	'Magento_Payment/js/view/payment/cc-form',
	'Magento_Payment/js/model/credit-card-validation/validator',
	'ko',
	'Magento_Checkout/js/model/quote',
	'mage/storage',
	'mage/url',
	'Magento_Catalog/js/price-utils',
	'moment',
	'Magento_Checkout/js/model/totals',
	'Magento_Customer/js/customer-data',
], function (
	$,
	Component,
	Validatorm,
	ko,
	quote,
	storage,
	url,
	priceUtils,
	moment,
	totals,
	customerData,
) {
	'use strict';
	//quote.totals._latestValue.grand_total
	var self;
	return Component.extend({
		myGrandTotal: 0,
		defaults: {
			template: 'Vexpro_GerminiPay/payment/germinipay',
			num_parcelas: 5,
			token: '',
			merchant_id: '',
			merchant_key: '',
			esitef_url: '',
			order_id: 0,
			customer_id: 0,
		},

		initialize: function () {
			self = this;
			this._super();
			this.populateUi();
		},

		getGrandTotal: function () {
			if (totals.totals()) {
				var grandTotal = parseFloat(totals.totals()['grand_total']);
				return grandTotal;
			}
		},

		populateUi: function () {
			var grand_total;
			var parcelas = [];
			var num_parcelas;
			var merchant_id;
			var merchant_key;
			var esitef_url;

			var serviceUrl = url.build('configuracao/custom/storeconfig');

			jQuery.ajax({
				url: serviceUrl,
				type: 'GET',
				async: false,
				success: function (response) {
					num_parcelas = response.value;
					merchant_id = response.merchant_id;
					merchant_key = response.merchant_key;
					esitef_url = response.esitef_url;
				},
			});
			this.num_parcelas = num_parcelas;
			this.merchant_id = merchant_id;
			this.merchant_key = merchant_key;
			this.esitef_url = esitef_url;

			var priceFormat = {
				decimalSymbol: '.',
				groupLength: 3,
				groupSymbol: ',',
				integerRequired: false,
				pattern: '$%s',
				precision: 2,
				requiredPrecision: 2,
			};

			var Parcela = function (name, text) {
				this.name = name;
				this.text = text;
			};

			grand_total = this.myTotal();

			// this.parcelas = ko.observableArray(parcelas);
			this.parcelas = ko.computed(function () {
				parcelas = [];
				for (var i = 0; i < num_parcelas; i++) {
					parcelas.push(
						new Parcela(
							i + 1,
							'Pagar em ' +
								(i + 1) +
								' vezes de ' +
								priceUtils.formatPrice(self.myTotal() / (i + 1), priceFormat),
						),
					);
				}

				return parcelas;
			});
		},

		myTotal: ko.computed(function () {
			return totals.getSegment('grand_total').value;
		}),

		getData: function () {
			var data = {
				method: this.getCode(),
				additional_data: {
					cc_cid: this.creditCardVerificationNumber(),
					cc_type: this.creditCardType(),
					cc_exp_year: this.creditCardExpYear(),
					cc_exp_month: this.creditCardExpMonth(),
					cc_number: this.creditCardNumber(),
					cpf: $('#cpf').val(),
					nome: $('#nome').val(),
					parcelas: $('#parcelas').val(),
				},
			};

			return data;
		},

		context: function () {
			return this;
		},

		getCode: function () {
			//this.num_parcelas = 989;
			//this.token = 'socorro';
			//console.log(this.num_parcelas);
			return 'Vexpro_GerminiPay';
		},

		isActive: function () {
			return true;
		},

		getAuthorizerCode: function (authorizer) {
			var code = new Object();
			code['AE'] = 3;
			code['VI'] = 1;
			code['MC'] = 2;
			code['DI'] = 44;
			code['JCB'] = 43;
			code['DN'] = 33;

			if (authorizer in code) {
				return code[authorizer];
			} else {
				return false;
			}
		},

		getToken: function () {
			// Envia informações do cartão de crédito e recebe
			// o token correspondente
			var ed = new Date(
				this.creditCardExpYear(),
				this.creditCardExpMonth() - 1,
				'01',
			);
			var expdate = moment(ed).format('MMYY');
			//var serviceUrl = url.build('configuracao/custom/mocktoken');
			var serviceUrl =
				'https://cors-anywhere.herokuapp.com/' + this.esitef_url + '/cards';
			var meutoken;
			var authorizer_code;

			authorizer_code = this.getAuthorizerCode(this.creditCardType());

			// console.log("Enviando: expiry_date=" + expdate + " number=" + this.creditCardNumber() + " authorizer_id=" + authorizer_code);

			$.ajax({
				url: serviceUrl,
				headers: {
					merchant_id: this.merchant_id,
					merchant_key: this.merchant_key,
					'Content-Type': 'application/json',
				},
				type: 'POST',
				dataType: 'json',
				crossDomain: true,
				beforeSend: function (request) {
					request.setRequestHeader('Content-Type', 'application/json');
					request.setRequestHeader('merchant_id', this.merchant_id);
					request.setRequestHeader('merchant_key', this.merchant_key);
				},
				async: false,
				data: {
					card: {
						expiry_date: expdate,
						number: this.creditCardNumber(),
					},
					authorizer_id: this.creditCardType(),
					merchant_usn: '16013439434',
					customer_id: '11122211122',
				},
				contentType: 'application/json',
				success: function (response) {
					meutoken = response.token;
				},
				error: function (xhr, status) {
					alert('error');
				},
			});
			this.token = meutoken;
		},

		validate: function () {
			var $form = $('#' + this.getCode() + '-form');
			if ($form.validation() && $form.validation('isValid')) {
				//this.getToken();
				return true;
			} else {
				return false;
			}
		},
	});
});
