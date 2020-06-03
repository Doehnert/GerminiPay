define([
        'jquery',
        'Magento_Payment/js/view/payment/cc-form',
        'Magento_Payment/js/model/credit-card-validation/validator',
        'ko',
        'Magento_Checkout/js/model/quote'
    ],
    function ($, Component, Validatorm, ko, quote) {
        'use strict';

        return Component.extend({
            defaults: {
                template: 'ClassyLlama_LlamaCoin/payment/llamacoin'
            },

            initialize: function() {
                this._super();
                this.populateUi();
            },

            populateUi: function () {
                var totals = quote.getTotals()();
                var grand_total;
                grand_total = totals.grand_total;
                var parcelas = [];
                for (var i=0;i<12;i++){
                    parcelas.push("Pagar em "+(i+1)+" vezes de "+(grand_total/(i+1)));
                }
                var total1 = "Pagar em 1x de " + grand_total;
                var total2 = "Pagar em 2x de " + grand_total / 2;
                var total3 = "Pagar em 3x de " + grand_total / 3;

                this.userActions = ko.observableArray(
                                                parcelas
                                        );
                this.selectedAction = ko.observable(this.initialMove);
            },

            getData: function () {
                console.log(this.getCode());
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