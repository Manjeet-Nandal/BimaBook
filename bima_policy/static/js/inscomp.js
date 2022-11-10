(function($){
	var submit;
	$('#tblList').DataTable({
		"dom": "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>\n  <'table-responsive'tr>\n        <'row align-items-center'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 d-flex justify-content-end'p>>",
		"language": {
		  paginate: {
			previous: '<i class="fa fa-lg fa-angle-left"></i>',
			next: '<i class="fa fa-lg fa-angle-right"></i>'
		  }
		},
		"bLengthChange": true,
		"autoWidth" : true,
		"statesave": true,
		"columnDefs": [
			{targets: [0,2,3],className: "text-center nowrap w-10pc"},
			{targets: [3],orderable: false},
		],
	});
	$('form[name="frminscompany"]').ajaxForm({
		beforeSend: function() {
			var form=$('form[name="frminscompany"]');
			if(!(form).parsley().isValid()){return false;}
			submit=form.find("button[type='submit']");
			btnBusy(submit);
		},
		url:"Submit",
		data: {request: 'NewInsComp'},
		success: function(html, statusText, xhr, $form) {		
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
	$('form[name="frminsurancecompedit"]').ajaxForm({
		url:"Submit",
		data: {request: 'EditInsComp'},
		success: function(html, statusText, xhr, $form) {		
			try{
				obj = $.parseJSON(html);
				toastr[obj.status](obj.response);				
				if((obj.status)=='success'){	
					setTimeout(function(){$('#mdlinscompedit').modal('hide');window.location.reload();}, 2000);
				}
			}
			catch (e){
				systemError();
			}
		}
	});
	$("#company_remove").click(function() {
		$.post("Submit", {request:'RemoveInsComp',id:$("#compid").val()}, function(data) {
			try{
				obj = $.parseJSON(data);
				toastr[obj.status](obj.response);
				if((obj.status)=='success'){	
					$("a.selected").closest('tr').remove();
					$('#mdlinscompdel').modal('hide');
				}
			}
			catch (e){
				systemError();
			}
		});
	});
})(jQuery);
function update(src){
	var id=$(src).data('id');
	var c=$(src).parent().parent('tr').find("td:eq(1)").text();
	var s=$(src).parent().parent('tr').find("td:eq(2)").text();
	$("#compname").val(c);$("#inscomp_id").val(id);
	$("#status_update").val(s);
	$('#mdlinscompedit').modal('show');
}
function remove(src){
	var id=$(src).data('id');
	$("#compid").val(id);
	$('#mdlinscompdel').modal('show');
	$('a.selected').removeClass('selected');
	$(src).addClass('selected');
}	
