!(function ($) {
    var a;
    $('form[name="frmpassword"]').ajaxForm({
      beforeSend: function () {
        var b = $('form[name="frmpassword"]');
        if (!b.parsley().isValid()) return !1;
        btnBusy((a = b.find("button[type='submit']")));
      },
      url: "Submit",
      data: { request: "AdminSecurity" },
      success: function (b, c, d, e) {
        try {
          (obj = $.parseJSON(b)), toastr[obj.status](obj.response);
        } catch (f) {
          systemError();
        }
        btnFree(a);
      },
    }),
      $('form[name="frmbank"]').ajaxForm({
        beforeSend: function () {
          var b = $('form[name="frmbank"]');
          if (!b.parsley().isValid()) return !1;
          btnBusy((a = b.find("button[type='submit']")));
        },
        url: "Submit",
        data: { request: "AdminBankNew" },
        success: function (b, d, e, c) {
          try {
            (obj = $.parseJSON(b)),
              toastr[obj.status](obj.response),
              "success" == obj.status &&
                ($("#ckreload").is(":checked")
                  ? (c[0].reset(), $("#ckreload").attr("checked", "checked"))
                  : window.location.reload());
          } catch (f) {
            systemError();
          }
          btnFree(a);
        },
      }),
      $("#mdlbank").on("shown.bs.modal", function () {
        $('form[name="frmbank"]')[0].reset();
      }),
      $(document).on("click", "#bank_remove", function () {
        $.post(
          "Submit",
          { request: "DeleteAdminBank", data_url: $("#bankid").val() },
          function (a) {
            try {
              (obj = $.parseJSON(a)),
                toastr[obj.status](obj.response),
                "success" == obj.status &&
                  ($("#tblList a.selected").closest("tr").remove(),
                  $("#mdlbanksdel").modal("hide"));
            } catch (b) {
              systemError();
            }
          }
        );
      }),
      $("#chk2way").change(function () {
        var a = 0,
          b = $(this);
        !0 == b.is(":checked") && (a = 1),
          $.post("Submit", { request: "TwayAuth", data: a }, function (a) {
            try {
              (obj = $.parseJSON(a)),
                toastr[obj.status](obj.response),
                "success" == obj.status || $(b).attr("checked", !1);
            } catch (c) {
              systemError();
            }
          });
      });
  })(jQuery);
  function remove(a) {
    var b = $(a).data("url");
    $("#bankid").val(b),
      $("#mdlbanksdel").modal("show"),
      $("#tblList a.selected").removeClass("selected"),
      $(a).addClass("selected");
  }