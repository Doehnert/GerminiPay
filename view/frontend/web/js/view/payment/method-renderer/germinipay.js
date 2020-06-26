define([
        'jquery',
        'Magento_Payment/js/view/payment/cc-form',
        'Magento_Payment/js/model/credit-card-validation/validator',
        'ko',
        'Magento_Checkout/js/model/quote',
        'mage/storage',
        'mage/url',
        'Magento_Catalog/js/price-utils'
    ],
    function ($, Component, Validatorm, ko, quote, storage, url, priceUtils) {
        'use strict';

        return Component.extend({
            defaults: {
                template: 'Vexpro_GerminiPay/payment/germinipay',
                num_parcelas: 5,
                token: 'abc666'
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
                var grand_total;
                var parcelas = [];
                var num_parcelas;

                var serviceUrl = url.build('configuracao/custom/storeconfig');

                jQuery.ajax({
                    url: serviceUrl,
                    type: "GET",
                    async: false,
                    success: function(response){
                        num_parcelas = response.value;
                    }
                });

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
                this.num_parcelas = 989;
                //this.token = 'socorro';
                console.log(this.num_parcelas);
                return 'Vexpro_GerminiPay';
            },

            isActive: function() {
                return true;
            },

            validate: function() {
                console.log('validate');
                var $form = $('#' + this.getCode() + '-form');

                console.log('pega token cartao');
                var serviceUrl = url.build('configuracao/custom/mocktoken');
                var meutoken;

                if ($form.validation() && $form.validation('isValid')){
                    jQuery.ajax({
                        url: serviceUrl,
                        type: "GET",
                        async: false,
                        success: function(response){
                            meutoken = response.token;
                        }
                    });
                    this.token = meutoken;
                    return true;
                } else {
                    return false;
                }
            }

        });
    }
);