define([
  'ko',
  'uiComponent',
  'underscore',
  'Magento_Checkout/js/model/step-navigator',
  'Magento_Customer/js/model/customer',
  'Magento_Checkout/js/model/totals',
  'Magento_Checkout/js/model/quote',
], function (ko, Component, _, stepNavigator, customer, totals, quote) {
  'use strict'
  /**
   * check-login - is the name of the component's .html template
   */
  return Component.extend({
    defaults: {
      template: 'Vexpro_GerminiPay/germini-step',
    },

    // Returns total for customer order
    getGrandTotal: function () {
      var totals = quote.totals()
      return (totals ? totals : quote)['base_subtotal']
    },

    //add here your logic to display step,
    isVisible: ko.observable(true),
    isLogedIn: customer.isLoggedIn(),
    //step code will be used as step content id in the component template
    stepCode: 'isLogedCheck',
    //step title value
    stepTitle: 'Pontos e Saldo',

    /**
     *
     * @returns {*}
     */
    initialize: function () {
      this._super()
      console.log(customer)
      // register your step
      stepNavigator.registerStep(
        this.stepCode,
        //step alias
        null,
        this.stepTitle,
        //observable property with logic when display step or hide step
        this.isVisible,

        _.bind(this.navigate, this),

        /**
         * sort order value
         * 'sort order value' < 10: step displays before shipping step;
         * 10 < 'sort order value' < 20 : step displays between shipping and payment step
         * 'sort order value' > 20 : step displays after payment step
         */
        15,
      )

      this.customerPoints = ko.observable(
        customer.customerData.custom_attributes.pontos_cliente.value,
      )

      this.customerDigitalWallet = ko.observable(
        customer.customerData.custom_attributes.saldo_cliente.value,
      )

      this.grandTotal = ko.computed(function () {
        var totals = quote.totals()
        return (totals ? totals : quote)['base_subtotal']
      })

      this.productList = ko.computed(function () {
        var productList = []

        for (let i = 0; i < quote.getItems().length; i++) {
          let quantity = quote.getItems()[i].qty
          let nome = quote.getItems()[i].name
          let pontos = quote.getItems()[i].pontos

          pontos = pontos / quantity
          if (pontos == 0) continue
          let img = quote.getItems()[i].thumbnail
          let desabilitado = false
          let preco = quote.getItems()[i].price
          let id = quote.getItems()[i].item_id

          for (let count = 0; count < quantity; count++) {
            if (this.customerPoints() < pontos) {
              desabilitado = true
            }
            if (pontos == 0) {
              desabilitado = true
            }

            productList.push({
              nome: nome,
              pontos: pontos,
              usaPontos: ko.observable(false),
              img: img,
              desabilitado: ko.observable(desabilitado),
              preco: preco,
              id: id,
            })
          }
        }
        return productList
      }, this)

      return this
    },

    /**
     * The navigate() method is responsible for navigation between checkout step
     * during checkout. You can add custom logic, for example some conditions
     * for switching to your custom step
     */
    navigate: function () {},

    /**
     * @returns void
     */
    navigateToNextStep: function () {
      stepNavigator.next()
    },
  })
})
