define(["jquery", "jquery.mask", "keyboard"], function ($) {
  "use sctrict";

  $(document).ready(function () {
    var options = {
      onKeyPress: function (cpf, ev, el, op) {
        var masks = ["000.000.000-000", "00.000.000/0000-00"];
        $("#cpf").mask(cpf.length > 14 ? masks[1] : masks[0], op);
      },
    };

    $("#cpf").length > 11
      ? $("#cpf").mask("00.000.000/0000-00", options)
      : $("#cpf").mask("000.000.000-00#", options);

    $(".cryxpad-container").cryxpad({
      inputFormId: "senha",
      removeButtonId: "limpar",
      // validateButtonId: 'cryxpad-validate-btn',
      carreaux: 3, // número de peças em uma linha do teclado
      linhas: 4,
      width: 50, // comprimento do botão
      height: 50, // altura do botão
      /*'buttonClass':"btn btn-primary",*/
    });

    $(".cryxpad-container").hide();

    $("#icon").click(function () {
      $(".cryxpad-container").toggle();
    });
  });
});
