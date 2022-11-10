!(function ($) {
  $("#auth-form").ajaxForm({
    beforeSend: function () {
      var a = $("#auth-form");
      if (!a.parsley().isValid()) return !1;
      (submit = a.find("button[type='submit']")).html("Sign In...");
    },
    url: "authentication",
    data: { page: "login" },
    success: function (a, b, c, d) {
      $("#response").html("");
      try {
        (obj = $.parseJSON(a)),
          !0 == obj.status
            ? ($("#response").html(obj.response), window.location.reload())
            : "2way" == obj.status
            ? ($("#auth-form").remove(),
              $("#2way-auth").html(obj.response),
              $(document).on("click", "#btn2way", function () {
                if (!$("#2way-auth-form").parsley().isValid()) return !1;
                $.post(
                  "authentication",
                  { page: "2wayauth", code: $("#code").val() },
                  function (a, b) {
                    try {
                      (obj = $.parseJSON(a)),
                        !0 == obj.status
                          ? ($("#response").html(obj.response),
                            window.location.reload())
                          : $("#response").html(obj.response);
                    } catch (c) {
                      alert("System Getting Error");
                    }
                  }
                );
              }))
            : $("#response").html(obj.response);
      } catch (e) {
        alert("System Getting Error");
      }
      submit.html("Sign In");
    },
  }),
    $(document).on("click", "#resend", function () {
      var a = $(this);
      $("#code").val(""),
        $.ajax({
          type: "post",
          url: "authentication",
          data: { page: "resendAuth" },
          beforeSend: function () {
            a.html("wait..").addClass("disabled");
          },
          success: function (a, b, c) {
            $("#response").html("");
            try {
              (obj = $.parseJSON(a)), $("#response").html(obj.response);
            } catch (d) {}
          },
          error: function (a, b, c) {},
          complete: function () {
            a.html("resend").removeClass("disabled");
          },
        });
    }),
    $("#btnshowpass").click(function () {
      $(this).find("i").hasClass("icofont-eye-alt")
        ? $(this)
            .find("i")
            .removeClass("icofont-eye-alt")
            .addClass("icofont-eye-blocked")
        : $(this)
            .find("i")
            .removeClass("icofont-eye-blocked")
            .addClass("icofont-eye-alt");
      var a = document.getElementById("inputPassword");
      "password" === a.type ? (a.type = "text") : (a.type = "password");
    });
})(jQuery);
