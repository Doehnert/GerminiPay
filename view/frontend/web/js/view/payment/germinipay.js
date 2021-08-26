define([
  'uiComponent',
  'Magento_Checkout/js/model/payment/renderer-list',
], function (Component, rendererList) {
  'use strict'

  rendererList.push(
    {
      type: 'Vexpro_GerminiPay',
      component: 'Vexpro_GerminiPay/js/view/payment/method-renderer/germinipay',
    },
    {
      type: 'Vexpro_GerminiPay2',
      component:
        'Vexpro_GerminiPay/js/view/payment/method-renderer/germinipay2',
    },
  )

  /** Add view logic here if needed */
  return Component.extend({})
})
