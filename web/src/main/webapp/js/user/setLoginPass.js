$(function(){
	//对form表单的文本框进行初始设置
	pageInit();
});
function pageInit(){
	//初始化校验
	$.formValidator.initConfig({
		formID:"fBindForm",
		theme:"ArrowSolidBox",
		submitOnce:true,
	    cssMode:"2"
	});
	
	//校验登录密码
	$("#loginPass").formValidator({onFocus:"登录密码最小为6位",onCorrect:"登录密码合法"})
	.inputValidator({min:6,max:22,onError:"登录密码长度不合法,请确认"}).functionValidator({fun:checkPwdFun});
	//校验确认密码
	$("#configPass").formValidator({onFocus:"请再次输入密码",onCorrect:"登录确认密码合法"})
	.inputValidator({min:6,max:22,onError:"两次输入的密码不一致，请检查后重新输入"})
	.compareValidator({desID:"loginPass",operateor:"=",onError:"两次输入的密码不一致，请检查后重新输入"});
}
/**
 * 提交form表单
 */
function formSubmit(){
	var form = $("#fBindForm");
	//使用md5将密码进行加密
	var loginPass = $("#loginPass").val();
	loginPass = hex_md5(loginPass);
	$("#realePass").val(loginPass);
	form.attr("action",contextPath+"/userAction/updateLoginPass");
	form.submit();
}
