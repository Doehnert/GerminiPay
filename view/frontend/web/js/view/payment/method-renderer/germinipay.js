define([
        'jquery',
        'Magento_Payment/js/view/payment/cc-form',
        'Magento_Payment/js/model/credit-card-validation/validator',
        'ko',
        'Magento_Checkout/js/model/quote',
        'mage/storage',
        'mage/url',
        'Magento_Catalog/js/price-utils',
        'moment'
    ],
    function ($, Component, Validatorm, ko, quote, storage, url, priceUtils, moment) {
        'use strict';

        return Component.extend({
            defaults: {
                template: 'Vexpro_GerminiPay/payment/germinipay',
                num_parcelas: 5,
                token: 'abc666',
                merchant_id: '123',
                merchant_key: '567',
                esitef_url: '',
                order_id: 0,
                customer_id: 0
            },

            initialize: function() {
                this._super();
                this.populateUi();
            },

            // placeOrder: function() {
            // },

            populateUi: function () {
                console.log('populateUi');
                var totals = quote.getTotals()();
                console.log(quote);
                var grand_total;
                var parcelas = [];
                var num_parcelas;
                var merchant_id;
                var merchant_key;
                var esitef_url;

                var serviceUrl = url.build('configuracao/custom/storeconfig');

                jQuery.ajax({
                    url: serviceUrl,
                    type: "GET",
                    async: false,
                    success: function(response){
                        num_parcelas = response.value;
                        merchant_id = response.merchant_id;
                        merchant_key = response.merchant_key;
                        esitef_url = response.esitef_url;
                    }
                });
                this.num_parcelas = num_parcelas;
                this.merchant_id = merchant_id;
                this.merchant_key = merchant_key;
                this.esitef_url = esitef_url;

                var priceFormat = {
                    decimalSymbol: '.',
                    groupLength: 3,
                    groupSymbol: ",",
                    integerRequired: false,
                    pattern: "$%s",
                    precision: 2,
                    requiredPrecision: 2
                };
                
                grand_total = totals.grand_total;
                for (var i=0;i<num_parcelas;i++){
                    parcelas.push("Pagar em "+(i+1)+" vezes de "+priceUtils.formatPrice((grand_total/(i+1)), priceFormat));
                }

                this.userActions = ko.observableArray(
                                                parcelas
                                        );
                this.selectedAction = ko.observable(this.initialMove);
            },

            getData: function () {
                console.log('getData');
                console.log(this.token)
                var data = {
                    'method': this.getCode(),
                    'additional_data': {
                        'cc_cid': this.creditCardVerificationNumber(),
                        'cc_type': this.creditCardType(),
                        'cc_exp_year': this.creditCardExpYear(),
                        'cc_exp_month': this.creditCardExpMonth(),
                        'cc_number': this.creditCardNumber(),
                        'cpf': $('#cpf').val(),
                        'nome': $('#nome').val(),
                        'parcelas': $('#parcelas').val(),
                        'token': this.token
                    }
                };

                return data;
            },

            context: function() {
                return this;
            },

            getCode: function() {
                //this.num_parcelas = 989;
                //this.token = 'socorro';
                //console.log(this.num_parcelas);
                return 'Vexpro_GerminiPay';
            },

            isActive: function() {
                return true;
            },

            getAuthorizerCode: function(authorizer){
                var code = new Object();
                code['AE'] = 3;
                code['VI'] = 1;
                code['MC'] = 2;
                code['DI'] = 44;
                code['JCB'] = 43;
                code['DN'] = 33;

                if(authorizer in code){
                    return code[authorizer]
                } else {
                    return false;
                }
            },

            getToken: function(){
                // Envia informações do cartão de crédito e recebe
                // o token correspondente
                var ed = new Date(this.creditCardExpYear(), this.creditCardExpMonth()-1, '01');
                var expdate = moment(ed).format('MMYY');
                //var serviceUrl = url.build('configuracao/custom/mocktoken');
                var serviceUrl = 'https://cors-anywhere.herokuapp.com/' + this.esitef_url + '/cards';
                var meutoken;
                var authorizer_code;

                console.log(expdate);
                authorizer_code = this.getAuthorizerCode(this.creditCardType());
                console.log("URL - " + serviceUrl + " merchant_id = " + this.merchant_id + " merchant_key = " + this.merchant_key);

                // console.log("Enviando: expiry_date=" + expdate + " number=" + this.creditCardNumber() + " authorizer_id=" + authorizer_code);

                $.ajax({
                    url: serviceUrl,
                    headers: {
                        'merchant_id':this.merchant_id,
                        'merchant_key':this.merchant_key,
                        'Content-Type':'application/json'
                    },
                    type: "POST",
                    dataType:"json",
                    crossDomain: true,
                    beforeSend: function(request) {
                        request.setRequestHeader("Content-Type", "application/json");
                        request.setRequestHeader("merchant_id", this.merchant_id);
                        request.setRequestHeader("merchant_key", this.merchant_key);
                    },
                    async: false,
                    data:{
                        "card":{
                            "expiry_date":expdate,
                            "number":this.creditCardNumber(),
                            },
                            "authorizer_id":this.creditCardType(),
                            "merchant_usn":"16013439434",
                            "customer_id":"11122211122"
                    },
                    contentType: "application/json",
                    success: function(response){
                        console.log("Resposta = " + response);
                        meutoken = response.token;
                    },
                    error: function (xhr, status) {
                        alert("error");
                    }
                });
                this.token = meutoken;
                console.log('Token recebido = ' + this.token);
            },

            validate: function() {
                console.log('pega token cartao !');
                var $form = $('#' + this.getCode() + '-form');
                if ($form.validation() && $form.validation('isValid')){
                    this.getToken();
                    return true;
                } else {
                    return false;
                }
            }

        });
    }
);