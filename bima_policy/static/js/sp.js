(function($){
	var submit;
	$('#tblList2').DataTable({
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
			{targets: [0,2],className: "text-center nowrap w-10pc"},
			{targets: [3],className: "text-center w-10pc nowrap",orderable: false},
		],
	});
	$('form[name="frmspcode"]').ajaxForm({
		beforeSend: function() {
			var form=$('form[name="frmspcode"]');
			if(!(form).parsley().isValid()){return false;}
			submit=form.find("button[type='submit']");
			btnBusy(submit);
		},
		url:"Submit",
		data: {request: 'NewSPCode'},
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
	$('form[name="frmspcodeedit"]').ajaxForm({
		url:"Submit",
		data: {request: 'EditSPCode'},
		success: function(html, statusText, xhr, $form) {		
			try{
				obj = $.parseJSON(html);
				toastr[obj.status](obj.response);				
				if((obj.status)=='success'){	
					setTimeout(function(){$('#mdlspcodeedit').modal('hide');window.location.reload();}, 2000);
				}
			}
			catch (e){
				systemError();
			}
		}
	});
	$("#code_remove").click(function() {
		$.post("Submit", {request:'RemoveSPCode',id:$("#spcodeid").val()}, function(data) {
			try{
				obj = $.parseJSON(data);
				toastr[obj.status](obj.response);
				if((obj.status)=='success'){	
					$("a.selected").closest('tr').remove();
					$('#mdlspcodedel').modal('hide');
				}
			}
			catch (e){
				systemError();
			}
		});
	});
	$('form[name="frmsp"]').ajaxForm({
		beforeSend: function() {
			var form=$('form[name="frmsp"]');
			if(!(form).parsley().isValid()){return false;}
			submit=form.find("button[type='submit']");
			btnBusy(submit);
		},
		url:"Submit",
		data: {request: 'ServiceProvider'},
		success: function(html, statusText, xhr, $form) {		
			window.scrollTo(0,0);
			try{
				obj = $.parseJSON(html);	
				toastr[obj.status](obj.response);
				if((obj.status)=='success'){	
					setTimeout(function () {
						window.location.reload(true);
					}, 1000);
				}
			}
			catch (e){
				systemError();
			}
			btnFree(submit);
		}
	});	
	$("#sp_remove").click(function() {
		$.post("Submit", {request:'RemoveSP',id:$("#spid").val()}, function(data) {
			try{
				obj = $.parseJSON(data);
				toastr[obj.status](obj.response);
				if((obj.status)=='success'){	
					$("button.selected").closest('tr').remove();
					$('#mdlspdel').modal('hide');
				}
			}
			catch (e){
				systemError();
			}
		});
	});
	$('#tblList').DataTable({
		"dom": "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>\n  <'table-responsive'tr>\n        <'row align-items-center'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 d-flex justify-content-end'p>>",
		"language": {
		  paginate: {
			previous: '<i class="fa fa-lg fa-angle-left"></i>',
			next: '<i class="fa fa-lg fa-angle-right"></i>'
		  }
		},
		"bLengthChange": true,
		"processing": false,
		"bServerSide": true,
		"statesave": true,
		"autoWidth" : false,
		"sAjaxSource": "getSP.php",
		"order": [[ 0, "desc" ]],
		"initComplete": function() {
			$(document).on("click", "button[data-action='remove']", function () {
				var id=$(this).data('id');
				$("#spid").val(id);
				$('#mdlspdel').modal('show');
				$('#tblList button.selected').removeClass('selected');
				$(this).addClass('selected');
			});
		},
		"columnDefs": [
			{targets: [0,4],className: "text-center width-10p"},
			{targets: [5],className: "text-center nowrap",orderable: false},
		],
	});
})(jQuery);
function update(src){
	var id=$(src).data('id');
	var c=$(src).parent().parent('tr').find("td:eq(1)").text();
	var s=$(src).parent().parent('tr').find("td:eq(2)").text();
	$("#code").val(c);$("#spcid").val(id);
	$("#status_update").val(s);
	$('#mdlspcodeedit').modal('show');
}
function remove(src){
	var id=$(src).data('id');
	$("#spcodeid").val(id);
	$('#mdlspcodedel').modal('show');
	$('#tblList2 a.selected').removeClass('selected');
	$(src).addClass('selected');
}	
