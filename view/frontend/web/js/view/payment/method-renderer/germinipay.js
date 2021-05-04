define([
  "jquery",
  "Magento_Payment/js/view/payment/cc-form",
  "Magento_Payment/js/model/credit-card-validation/validator",
  "ko",
  "Magento_Checkout/js/model/quote",
  "mage/storage",
  "mage/url",
  "Magento_Catalog/js/price-utils",
  "moment",
  "Magento_Checkout/js/model/totals",
  "Magento_Customer/js/customer-data",
  "Magento_Ui/js/modal/modal",
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
  ("use strict");

  var self;

  return Component.extend({
    teste: ko.computed(function () {
      var teste = ko.observable(window.checkoutConfig["usados"]);
      teste.valueHasMutated();
      console.log(teste());
    }),

    myGrandTotal: 0,

    defaults: {
      template: "Vexpro_GerminiPay/payment/germinipay",
      num_parcelas: 5,
      token: "",
      merchant_id: "",
      merchant_key: "",
      esitef_url: "",
      order_id: 0,
      customer_id: 0,
      senha: "",
    },

    initialize: function () {
      self = this;

      this._super();
      this.populateUi();
      this.PersonViewModel();
    },

    // myPoints: ko.observable(pontos_cliente),

    getGrandTotal: function () {
      if (totals.totals()) {
        var grandTotal = parseFloat(totals.totals()["grand_total"]);
        return grandTotal;
      }
    },

    PersonViewModel: function () {
      personName = ko.observable(window.checkoutConfig["usados"]);
      personName.extend({ notify: "always" });
      personName.extend({ rateLimit: 500 });
    },

    populateUi: function () {
      var grand_total;
      var parcelas = [];
      var num_parcelas;
      var merchant_id;
      var merchant_key;
      var esitef_url;
      var pontoUsado = 0;
      var pontos_cliente;

      var serviceUrl = url.build("configuracao/custom/storeconfig");

      jQuery.ajax({
        url: serviceUrl,
        type: "GET",
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

      this.pontos_cliente = customerData["pontos"];

      var priceFormat = {
        decimalSymbol: ".",
        groupLength: 3,
        groupSymbol: ",",
        integerRequired: false,
        pattern: "$%s",
        precision: 2,
        requiredPrecision: 2,
      };

      var Parcela = function (name, text) {
        this.name = name;
        this.text = text;
      };

      this.desconto = ko.observable(0).extend({ notify: "always" });

      this.ponto2 = ko.observable(0).extend({ notify: "always" });

      this.dinheiro = ko.observable(0).extend({ notify: "always" });

      this.pontosUsados = ko.computed(function () {
        console.log(self.desconto());
        if (self.ponto2() != null && self.ponto2() != 0) {
          return true;
        } else {
          return false;
        }
      });

      this.habilitaTeclado = ko.computed(function () {
        if (self.pontosUsados()) {
          return "auto";
        } else {
          return "none";
        }
      });

      this.dinheiroUsado = ko.computed(function () {
        console.log(self.dinheiro());
        if (self.dinheiro() === 0) {
          return false;
        } else {
          this.template = "teste";
          return true;
        }
      });

      this.parcelas = ko.computed(function () {
        console.log(quote.getTotals()()["total_segments"]);

        var dinheiro = quote.getTotals()()["total_segments"][4]["value"];
        var desconto = quote.getTotals()()["total_segments"][2]["value"];

        console.log(desconto);
        self.desconto(desconto);
        self.ponto2(window.checkoutConfig["usados"]);
        self.dinheiro(dinheiro);

        parcelas = [];
        for (var i = 0; i < num_parcelas; i++) {
          parcelas.push(
            new Parcela(
              i + 1,
              "Pagar em " +
                (i + 1) +
                " vezes de " +
                priceUtils.formatPrice(self.myTotal() / (i + 1), priceFormat),
            ),
          );
        }

        return parcelas;
      });
    },

    usaPontos: ko.computed(function () {
      // if (localStorage['visited'] > 0) {
      // 	return true;
      // } else {
      // 	return false;
      // }
      return true;
    }),

    dinheiroUsado: ko.computed(function () {
      // if (this.grand_total > 0) return true;
      return false;
    }),

    myTotal: ko.computed(function () {
      // this.myPoints(0);
      // console.log(myPoints);
      return totals.getSegment("grand_total").value;
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
          cpf: $("#cpf").val(),
          nome: $("#nome").val(),
          parcelas: $("#parcelas").val(),
          senha: $("#senha").val(),
        },
      };

      return data;
    },

    context: function () {
      return this;
    },

    getCode: function () {
      return "Vexpro_GerminiPay";
    },

    isActive: function () {
      return true;
    },

    getAuthorizerCode: function (authorizer) {
      var code = new Object();
      code["AE"] = 3;
      code["VI"] = 1;
      code["MC"] = 2;
      code["DI"] = 44;
      code["JCB"] = 43;
      code["DN"] = 33;

      if (authorizer in code) {
        return code[authorizer];
      } else {
        return false;
      }
    },
    validate: function () {
      // Se o preço total for 0 não realiza validação
      // Se utilizar pontuação, mostra um modal para usuário colocar a senha
      var $form = $("#" + this.getCode() + "-form");

      if ($form.validation() && $form.validation("isValid")) {
        return true;
      } else {
        return false;
      }
      return true;
    },
  });
});
