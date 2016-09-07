$(function(){
	//对form表单的文本框进行初始设置
	pageInit();
});
function pageInit(){
	//初始化校验
	$.formValidator.initConfig({formID:"fBindForm",theme:"ArrowSolidBox",submitOnce:true,
		onError:function(msg,obj,errorlist){
			$("#errorlist").empty();
			$.map(errorlist,function(msg){
				$("#errorlist").append("<li>" + msg + "</li>");
			});
		},
	    cssMode:"2"
	});
	
	var onShowTipMsg = "手机号码/账号";
	$("#userName").formValidator({onShowText:onShowTipMsg,onShow:onShowTipMsg,onFocus:onShowTipMsg,onCorrect:""})
	.regexValidator({regExp:"mobile",dataType:"enum",onError:"你输入的手机号码格式不正确"})
	.functionValidator({fun:checkPhone});
	onShowTipMsg = "请输入验证码";
	$("#virifiNum").formValidator({onShowText:onShowTipMsg,onShow:onShowTipMsg,onFocus:onShowTipMsg,onCorrect:""})
	.inputValidator({min:1,onError:onShowTipMsg}).functionValidator({fun:checkVirifyNo});
}
/*
 * 获取验证码
 */
var g_getphonecode = "begin";
function getPhoneVirifiNum(obj){
	var phoneNumCorrect = $.formValidator.isOneValid("userName");
	if(phoneNumCorrect == false){
		$("#userName").focus();
		return;
	}
	
	$(obj).attr("disabled",true);
	g_getphonecode = "load";
	v_time_len = 60;
	countdown();
	$.ajax({
		url: contextPath+"/userAction/loginPassPhoneVirifiCode",
		type:'POST',
        data:{userName:$("#userName").val()},
        success: function (data){
        	g_getphonecode = "end";
        	if(data.success != "success"){
        		err_show(data.msg_info);
        		v_time_len = 0;
        	}
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
        	g_getphonecode = "end";
        	v_time_len = 0;
        	$("body").alert({msg:"发生网络异常，请稍后再试",icon:"ok"});
        }
	});
}
/*
 * 验证短信密码
 */
function checkVirifyNo(virifiCode){
	var retFlag = false;
	var retInfo = "";
	
	if(g_getphonecode == "begin" || g_getphonecode == "load"){
		return "你输入的验证码不正确";
	}
	
	//调用后台校验服务
	$.ajax({
		url: contextPath+"/userAction/checkVirifi",
		type:'POST',
		async:false,
        data:{virifiCode:virifiCode},
        success: function (data){
        	if(data.success == "success"){
        		retFlag = true;
        	}else if(data.success == "session_err"){
        		retInfo = data.msg_info;
        	}else{
        		retFlag = false;
        	}
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
        	$("body").alert({msg:"发生错误："+textStatus + "," + errorThrown,icon:"ok"});
        }
	});
	
	if("" != retInfo){
		return retInfo;
	}
	
	return retFlag;
}
var v_time_len = 60; //1分钟
function countdown(){
	$("#btn_virifi").html(v_time_len+"秒后重新获取");
	if(v_time_len == 0){
		$("#btn_virifi").html("获取短信验证码");
		$("#btn_virifi").attr("disabled",false);
	}else{
		v_time_len--;
		setTimeout(countdown,1000);
	}
}
/**
 * 检查找回密码账号对应的手机号码是否正确
 */
function checkPhone(phone){
	var retFlag = false;
	var retInfo = "";
	//调用后台校验服务
	$.ajax({
		url: contextPath+"/userAction/checkPhoneIsRight",
		type:'POST',
		async:false,
        data:{
        	phone:phone,
        	userName:$("#userName").val()},
        success: function (data){
        	if(data.success == "success"){
        		retFlag = true;
        	}else{
        		retInfo = data.msg_info;
        	}
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
        	$("body").alert({msg:"发生错误："+textStatus + "," + errorThrown,icon:"ok"});
        }
	});
	
	if("" != retInfo){
		return retInfo;
	}
	return retFlag;
}
/**
 * 提交form表单
 */
function formSubmit(){
	var form = $("#fBindForm");
	form.attr("action",contextPath+"/userAction/toSelectMoth");
	form.submit();
}
