define([
        'jquery',
        'Magento_Payment/js/view/payment/cc-form',
        'Magento_Payment/js/model/credit-card-validation/validator',
        'ko',
        'Magento_Checkout/js/model/quote',
        'mage/storage',
        'mage/url'
    ],
    function ($, Component, Validatorm, ko, quote, storage, url) {
        'use strict';

        return Component.extend({
            defaults: {
                template: 'ClassyLlama_LlamaCoin/payment/llamacoin',
                num_parcelas: 5
            },

            initialize: function() {
                // this.getInstructions();
                this._super();
                
                this.populateUi();
            },

            // getInstructions: function() {
            //     var serviceUrl = url.build('configuracao/custom/storeconfig');

            //     jQuery.ajax({
            //         url: serviceUrl,
            //         type: "GET",
            //         async: false,
            //         success: function(response){
            //             console.log(response.value);
            //             this.num_parcelas = response.value;
            //         }
            //     });
            // },

            populateUi: function () {
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
                
                grand_total = totals.grand_total;
                for (var i=0;i<num_parcelas;i++){
                    parcelas.push("Pagar em "+(i+1)+" vezes de "+(grand_total/(i+1)));
                }

                this.userActions = ko.observableArray(
                                                parcelas
                                        );
                this.selectedAction = ko.observable(this.initialMove);
            },

            getData: function () {
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
                        'parcelas': $('#parcelas').val()
                    }
                };

                return data;
            },

            context: function() {
                return this;
            },

            getCode: function() {
                return 'classyllama_llamacoin';
            },

            isActive: function() {
                return true;
            },

            validate: function() {
                var $form = $('#' + this.getCode() + '-form');
                return $form.validation() && $form.validation('isValid');
            }

        });
    }
);