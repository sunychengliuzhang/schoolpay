/*
 * 显示提示信息
 */
function showMsg(msg){
	$("#msgDiv").show();
	$("#loginUpMsg").html(msg);
}
/*
 * 清除提示信息
 */
function clearMsg(){
	$("#msgDiv").hide();
	$("#loginUpMsg").html("");
}
/*
 * 显示浮层提示信息
 */
function showMsgMask(msg){
	$("#msgDivMask").show();
	$("#loginUpMsgMask").html(msg);
}
/*
 * 清除浮层提示信息
 */
function clearMsgMask(){
	$("#msgDivMask").hide();
	$("#loginUpMsgMask").html("");
}
/*
 * 登陆
 */
function doUserLogin(){
	
	clearMsg();
	var userName = $("#userName").val();
	if($.trim(userName) == ""){
		showMsg("请输入账户");
		$("#userName").focus();
		return;
	}
	var userPassword = $("#userPassword").val();
	
	if($.trim(userPassword) == ""){
		showMsg("请输入登录密码");
		$("#userPassword").focus();
		return;
	}
	
	var virifiNum = $("#virifiNum").val();
	if($.trim(virifiNum) == ""){
		showMsg("请输入验证码");
		$("#virifiNum").focus();
		return;
	}
	
	doLogin(userName,userPassword,virifiNum,function(data){
		if(data.passRandom){
			$("#passRandom").val(data.passRandom)
		}
		try{
			if(data.inputId == ""){
			    $("#userName").focus();
			}else{
				$("#"+data.inputId).focus();
			}
		}catch(e){
			//发生异常，直接忽略
		}
		
		showMsg(data.errorMsg);
	});
	
}
/*
 * 浮层登陆
 */
function doUserLoginMask(){
	clearMsgMask();
	var userName = $("#userNameMask").val();
	if($.trim(userName) == ""){
		showMsgMask("请输入账户");
		$("#userNameMask").focus();
		return;
	}
	var userPassword = $("#userPasswordMask").val();
	
	if($.trim(userPassword) == ""){
		showMsgMask("请输入登录密码");
		$("#userPasswordMask").focus();
		return;
	}
	
	var virifiNum = $("#virifiNumMask").val();
	if($.trim(virifiNum) == ""){
		showMsgMask("请输入验证码");
		$("#virifiNumMask").focus();
		return;
	}
		
	doLogin(userName,userPassword,virifiNum,function(data){
    		if(data.passRandom){
    			$("#passRandom").val(data.passRandom)
    		}
    		try{
				if(data.inputId == ""){
				    $("#userNameMask").focus();
				}else{
					$("#"+data.inputId +"Mask").focus();
				}
			}catch(e){
				//发生异常，直接忽略
			}
    		showMsgMask(data.errorMsg);
	});
}
/*
 * 执行登陆程序
 */
function doLogin(userName,userPassword,virifiNum,callBack){
	$.ajax({
		url: contextPath+"/userAction/validLoginCode",
		type:'POST',
        data:{
        	virifiNum:virifiNum
        },
        success: function (data){
        	if(data == "true"){
        		var passRandom = $("#passRandom").val();
			    var pass = hex_md5(hex_md5(userPassword)+passRandom);
        		$.ajax({
        			url: contextPath+"/userAction/userLoginOnAjax",
        			type:'POST',
        	        data:{
        	        	virifiNum:virifiNum,
        	        	userPassword:userPassword,
        	        	userName:userName,
        	        	passRandom:passRandom
        	        },
        	        success: function (data){
        	        	//成功
        	        	if(data.status==1){
        	        		var host = getLocationHost();
        	        		var path = data.url;
        	        		location.href = host + path;
        	        	}else if(data.status==2){
        	        		//修改密码
        	        		var host = getLocationHost();
        	        		var path = data.url;
        	        		
        	        		location.href = host + path +"?isLogin"+data.isLogin+"&dealType="+data.dealType;
        	        	}else{
        	        		//失败
        	        		callBack(data);
        	        	}
        	        	
        	        },
        	        error:function(XMLHttpRequest, textStatus, errorThrown){
        	        	 var mask = $('body').find('#mask_login_wrap');
    					 if(mask.length==0 || mask.is(":hidden")){
    						 showMsg("账号或密码错误");
        	        	}else{
        	        		showMsgMask("账号或密码错误");
        	        	}
        	        }});
        		
        	}else{
        		//session失效后，触发验证码刷新  zhanglf   2015-06-16
        		 var mask = $('body').find('#mask_login_wrap');
				 if(mask.length==0 || mask.is(":hidden")){
	            	changeValidCode($("#idVilidCode").get(0));
	            	showMsg("验证码不正确");
	    			$("#virifiNum").focus();
            	}else{
            		changeValidCode($("#idVilidCodeInMask").get(0));
            		showMsgMask("验证码不正确");
    				$("#virifiNumMask").focus();
            	}
        		
        	}
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
        	var mask = $('body').find('#mask_login_wrap');
			if(mask.length==0 || mask.is(":hidden")){
				showMsg("账号或密码错误");
        	}else{
        		showMsgMask("账号或密码错误");
        	}
        }
	});
}
function changeValidCode(obj){
	obj.src= contextPath+"/userAction/showUserImg?r="+ Math.random();
}

function regist(){
	$("#fLoginVo").attr("action",contextPath+"/userAction/toGenerRegist");
	$("#fLoginVo").submit();
}
/*
 * 忘记密码
 */
function forgetPwd(type){
	var v_userName="";
	if(type=="mask"){
		v_userName = $.trim($("#userNameMask").val());
		if("" == v_userName){
			showMsgMask("请输入账号");
			return;
		}
	}else{
		v_userName = $.trim($("#userName").val());
		if("" == v_userName){
			showMsg("请输入账号");
			return;
		}
	}
	
	
	$.ajax({
		url: contextPath+"/userAction/checkUserStatus",
		type:'POST',
        data:{
        	userName:v_userName,
        	isLogin:1
        },
        success: function (data){
        	//查询发生异常
        	if(data.isError){
        		if(type=="mask"){
        			showMsgMask("网络异常，请稍后再试");
        		}else{
        			showMsg("网络异常，请稍后再试");
        		}
        		
        		return false;
        	}
        	//账户不存在
        	if(!data.userExist){
        		if(type=="mask"){
        			showMsgMask("账户不正确");
    				$("#userNameMask").focus();
        		}else{
        			showMsg("账户不正确");
    				$("#userName").focus();
        		}
        		
				return false;
        	}
        	//账户锁定状态，不允许重置密码
//        	if(data.loced){
//        		if(type=="mask"){
//        			showMsgMask("账户已锁定，不能找回密码，请明天再试");
//        		}else{
//        			showMsg("账户已锁定，不能找回密码，请明天再试");
//        		}
//        		
//        	}else{
        		$("#fLoginVo").attr("action",contextPath+"/userAction/backLoginPass?isLogin=1&dealType=45&userName="+v_userName);
/*        		$("#fLoginVo").attr("action",contextPath+"/toLoginPwdProcess.do?isLogin=1&dealType=45&loginName="+v_userName);
*/			    $("#fLoginVo").submit();
//        	}
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
        	showMsg("网络异常，请稍后再试");
        }
	});
}
/*
 * 获取应用地址，包括主机和端口号
 */
function getLocationHost(){
	var protocol = location.protocol;
	var host = location.host;
	return protocol +"//"+host;
}