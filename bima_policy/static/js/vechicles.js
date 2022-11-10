
function update(src){
	$('#mdlvehiclecategoryedit').modal('show');
}
function remove(src){
	$('#mdlvehiclecategorydel').modal('show');

}	
function updateVM(src){
	$('#mdlvehiclemodeledit').modal('show');
}
function removeVM(src){
	$(src).addClass('selected');
}
function updateMB(src){
	$('#mdlvehiclemakebyedit').modal('show');
}
function removeMB(src){
	var id=$(src).data('id');
	$("#mbrid").val(id);
	$('#mdlvehiclemakebydel').modal('show');
	$('a.selected').removeClass('selected');
	$(src).addClass('selected');
}	