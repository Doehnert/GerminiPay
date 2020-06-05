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
                template: 'Vexpro_GerminiPay/payment/germinipay',
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

            formatMoney: function(amount, decimalCount = 2, decimal = ".", thousands = ","){
                try {
                    decimalCount = Math.abs(decimalCount);
                    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
                
                    const negativeSign = amount < 0 ? "-" : "";
                
                    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
                    let j = (i.length > 3) ? i.length % 3 : 0;
                
                    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
                  } catch (e) {
                    console.log(e)
                  }
            },

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
                    parcelas.push("Pagar em "+(i+1)+" vezes de R$ "+this.formatMoney((grand_total/(i+1))));
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
                return 'Vexpro_GerminiPay';
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