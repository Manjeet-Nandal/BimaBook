(function($){
	var submit;
	$('form[name="frmstaff"]').ajaxForm({
		beforeSend: function() {
			var form=$('form[name="frmstaff"]');
			if(!(form).parsley().isValid()){return false;}
			submit=form.find("button[type='submit']");
			btnBusy(submit);
		},
		url:"Submit",
		data: {request: 'StaffNew'},
		success: function(html, statusText, xhr, $form) {		
			window.scrollTo(0,0);
			try{
				obj = $.parseJSON(html);	
				toastr[obj.status](obj.response);
				if((obj.status)=='success'){	
					if($("#ckreload").is(":checked")){
						$form[0].reset();$("#ckreload").attr('checked','checked');
					}else{
						window.location.reload();
					}
				}
			}
			catch (e){
				systemError();
			}
			btnFree(submit);
		}
	});	
	$('form[name="frmprofile"]').ajaxForm({
		beforeSend: function() {
			var form=$('form[name="frmprofile"]');
			if(!(form).parsley().isValid()){return false;}
			submit=form.find("button[type='submit']");
			btnBusy(submit);
		},
		url:"Submit",
		data: {request: 'StaffProfile'},
		success: function(html, statusText, xhr, $form) {		
			try{
				obj = $.parseJSON(html);	
				toastr[obj.status](obj.response);
			}
			catch (e){
				systemError();
			}
			btnFree(submit);
		}
	});
	$('form[name="frmpassword"]').ajaxForm({
		beforeSend: function() {
			var form=$('form[name="frmpassword"]');
			if(!(form).parsley().isValid()){return false;}
			submit=form.find("button[type='submit']");
			btnBusy(submit);
		},
		url:"Submit",
		data: {request: 'StaffSecurity'},
		success: function(html, statusText, xhr, $form) {		
			try{
				obj = $.parseJSON(html);	
				toastr[obj.status](obj.response);
			}
			catch (e){
				systemError();
			}
			btnFree(submit);
		}
	});
})(jQuery);

	
