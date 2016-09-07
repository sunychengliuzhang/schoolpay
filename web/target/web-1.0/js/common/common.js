function err_show(msgInfo){
	//进入页面查看是否存在错误信息提示
	$("#id_float_div_out").show();
	$("#id_float_div").show();
	$("#pMsgInfo").html(msgInfo);
}

function closeMsgDiv(){
	$("#id_float_div_out").hide();
	$("#id_float_div").hide();
}

function alert_show(msgInfo){
	//进入页面查看是否存在错误信息提示
	$("#id_deal_div_out").show();
	$("#id_deal_div").show();
	$("#dealMsgInfo").html(msgInfo);
}