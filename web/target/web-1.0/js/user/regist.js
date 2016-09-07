$(function(){
	var domId = $('#main_con_regist');
	var agreementBtn = $('#main_con_regist .agree-tip-img');

     //点击协议
	$('.agreement',domId).on('click',function(){
		//浮层已经存在则显示否则从新渲染
		if(!$('body').find('.mask-layer-wrap').length){
			var dom ='<div class="mask-layer-wrap" id="mask_regist_wrap">'
					+'<div class="mask-layer"></div>'
					+'<div class="mask-layer-con">'
						+'<div class="layer-title">鸿支付服务协议<a class="close-btn"></a></div>'
						+'<div class="layer-con">'
							+'<div class="layer-detail-txt">'
								+'<iframe src="'+ contextPath +'/userAction/services" width="800" height="500" name="fileFrame" id="fileFrame" style="border: 0px;border: none;"></iframe>'+
							+'</div>'
							+'<div class="scroll-wrap">'
								+'<div class="scroll-bar"></div>'
							+'</div>'
						+'</div>'
						
					+'</div>'
					+'<div class="layer-btn-wrap">'
					+'<a class="regist-agreement-btn">已阅读并同意此协议</a>'
				+'</div>'
				+'</div>';
			$('body').append(dom);
		}else{
			$('#mask_regist_wrap').show();
		}
		
		var maskId = $('#mask_regist_wrap');
/*
		//滚动设置
		var selfScroll = function() {
	        var showWrap =$('.mask-layer-con');
	        var scrollWrap = $('.layer-con')
	          , scrollCon = $(scrollWrap.children()[0]) //滚动内容
	          , sliderWrap = $(scrollWrap.children()[1]) //滚动条区域
	          , sliderbar = $(sliderWrap.children()[0]) //滚动棒
	          , conHeight =scrollCon.height();//滚动网页的实际高度
	        if (conHeight < 279) {
	            sliderWrap.css("display", "none");
	            return
	        }
	        var initTop = 0
	          , P = 36 //滚动棒高度
	          , v = 243; //内容高度减去滚动棒高度
	        var limitHeight = function(h) {  //限制滚动棒在滚动区域内
	            initTop = h;
	            if (h < 0) {
	                initTop = 0
	            } else {
	                if (h > v) {
	                    initTop = v
	                }
	            }
	        }
	        ;
	        var exectScroll = function() { //滚动执行
	            exectScrollBar();
	            exectScrollCon()
	        }
	        ;
	        var exectScrollCon = function() { //滚动内容
	            var Q = -1 * (initTop / v * (conHeight - 279));
	            scrollCon.css("top", Q + "px")
	        }
	        ;
	        var exectScrollBar = function() { //滚动棒
	            sliderbar.css("top", (initTop - 1) + "px")
	        };
	        // 判断浏览器
	        var z = /opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i.test(navigator.userAgent) ? +(RegExp["\x246"] || RegExp["\x242"]) : undefined;
	       
	       //兼容浏览器的wheelDelta上正值 下负值且均为120
	        var Detal = function(e) {
	            var curEvent = e.originalEvent;
	            if (curEvent.wheelDelta) {
	                return ( z && z < 9.5 ? -curEvent.wheelDelta : curEvent.wheelDelta) 
	            } else {
	                if (curEvent.detail) {
	                    return -curEvent.detail * 40
	                } else {
	                    if ($.isIE) {
	                        return -curEvent.deltaY
	                    } else {
	                        return -curEvent.deltaY * 40
	                    }
	                }
	            }
	        }
	        ;
	        var K = 0;
	        var init = function(e) {
	            _userIsUsing = true;
	            e.stopPropagation();
	            e.preventDefault();

	            var doubleDetal = Detal(e) * 2;
	            
	            limitHeight(initTop + 50 * (-1 * doubleDetal) / conHeight);
	            exectScroll()
	        }
	        ;
	        var w = 0;
	        var O;
	        var A = function(e) {
	            _userIsUsing = true;
	            w = e.clientY;
	            O = true;
	            showWrap.on("mousemove", function(R) {
	                R.preventDefault();
	                y(R)
	            }
	            )
	        }
	        ;
	        var y = function(R) {
	            if (!O) {
	                return
	            }
	            _userIsUsing = true;
	            var Q = R.clientY;
	            limitHeight(initTop + (Q - w));
	            w = Q;
	            exectScroll()
	        }
	        ;
	        var u = function(Q) {
	            O = false;
	            sliderWrap.removeClass("lrc-scroll-ctrl-hover s-scroll-hover");
	            showWrap.unbind("mousemove")
	        }
	        ;
	         maskId.delegate(sliderWrap,"click", function(Q) {
	        	Q.stopPropagation();
	            var R = Q.offsetY || Q.layerY || Q.originalEvent.layerY;
	            limitHeight(R - P / 2);
	            exectScroll()
	        }
	        );
	        maskId.delegate(sliderWrap,"mouseenter", function(Q) {
	            sliderWrap.addClass("soccer-scroll-ctrl-hover s-scroll-hover")
	        }
	        );
	         maskId.delegate(sliderWrap,"mouseleave", function(Q) {
	            if (O) {
	                return
	            }
	            sliderWrap.removeClass("soccer-scroll-ctrl-hover s-scroll-hover")
	        }
	        );
	        maskId.delegate(sliderbar,"click", function(Q) {
	            sliderWrap.addClass("soccer-scroll-ctrl-hover s-scroll-hover");
	            Q.stopPropagation()
	        }
	        );
	         maskId.delegate(sliderbar,"mousedown", function(Q) {
	            Q.preventDefault();
	            A(Q)
	        }
	        );
	        maskId.delegate(showWrap,"mouseleave", function(Q) {
	            _userIsUsing = false
	        }
	        );
	         maskId.delegate(showWrap,"mouseup", function(Q) {
	            u(Q)
	        }
	        );
	        maskId.delegate(showWrap,"mouseleave", function(Q) {
	            u(Q)
	        }
	        );
	        maskId.delegate(scrollWrap,"DOMMouseScroll", init);
	        maskId.delegate(scrollWrap,"mousewheel", init);
	    };

   	 	selfScroll();
   	 	*/
   	 	//点击同意协议按钮	
   	 	maskId.delegate('.close-btn','click',function(){
   	 		maskId.hide();
   	 	}).delegate('.regist-agreement-btn','click',function(){
   	 		maskId.hide();
   	 		if(agreementBtn.hasClass('no-agree')){
   	 			agreementBtn.removeClass('no-agree');
   	 			agreementBtn.parent().parent().children('.regist-btn').removeClass('set-grey')
   	 		}
   	 	})
	});
	
	//点击同意按钮
	agreementBtn.on('click',function(){
		var that = $(this);

		if(!that.hasClass('no-agree')){
			that.addClass('no-agree');
			that.parent().parent().children('.regist-btn').addClass('set-grey');
			enableNextStep(false);
		}else{
			that.removeClass('no-agree');
			that.parent().parent().children('.regist-btn').removeClass('set-grey');
			enableNextStep(true);
		}
	});
	
});
$.browser = {};
$.browser.mozilla = /firefox/.test(navigator.userAgent.toLowerCase());
$.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
$.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
$.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
$(document).ready(function(){
	$.formValidator.initConfig({
		formID:"fRegist1",
		theme:"ArrowSolidBox",
		validatorgroup:"1",
		cssMode:"2"
	});
	var phoneMsg = "-请输入手机号，作为登录账号 -";
	$("#userName").formValidator({onShowText:phoneMsg,onFocus:phoneMsg,onCorrect:""})
					.inputValidator({min:11,max:11,onError:"请输入正确的手机号"})
					.regexValidator({regExp:"mobile",dataType:"enum",onError:"请输入正确的手机号"})
					.functionValidator({fun:checkUserExist});
	var vertifyMsg = "请输入验证码";
	$("#virifi_num").formValidator({onShowText:vertifyMsg,onFocus:vertifyMsg,onCorrect:"验证码正确"})
					.inputValidator({min:6,max:6,onError:"请输入正确的验证码"})
					.functionValidator({fun:checkVirifyNo,onError:"该号码已注册，请直接登录"});

	$("#nextStep").on('click',function(){
		gotoSecond();
	});
	
	//第二步
	$.formValidator.initConfig({
		formID:"fRegist2",
		theme:"ArrowSolidBox",
		validatorgroup:"1",
		cssMode:"2"
	});
	$("#first_login_pwd").formValidator({onFocus:"请输入登录密码",onCorrect:"登录密码合法"}).inputValidator({min:6,max:22,onError:"登录密码长度不合法,请确认"}).functionValidator({fun:checkPwdFun});
	var confirmPwdMsg = "请再次输入密码";
	var confirmErrMsg = "两次密码不一致，请重新输入！";
	$("#confirmLogin_pwd").formValidator({onFocus:confirmPwdMsg,onCorrect:"登录确认密码合法"}).inputValidator({min:6,max:22,onError:confirmErrMsg}).compareValidator({desID:"first_login_pwd",operateor:"=",onError:confirmErrMsg});

	$("#completeReg").on('click',function(){
		completeReg();
	});
	
	//第三步
	$("#regOK").on('click',function(){
		gotoHome();
	});
	
	//失败
	$("#regFailure").on('click',function(){
		gotoReg();
	});
	
});
/*
 * 获取验证码
 */
var g_getphonecode = "begin";
function getPhoneVirifiNum(obj){
	$("#virifi_numTip").hide();
	
	var phoneNumCorrect = $.formValidator.isOneValid("userName");
	if(phoneNumCorrect == false){
		var v_userName = $("#userName").val();
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
        	if(data.success == "success"){
        		
        	}else{
        		err_show(data.msg_info);
        		v_time_len = 0;
        	}
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
        	err_show("发生网络异常，请稍后再试");
        	g_getphonecode = "end";
        	v_time_len = 0;
        }
	});
}
/*
 * 验证用户是否存在
 */
function checkUserExist(userName){
	var retFlag = false;
	var retInfo = "";
	
	//调用后台校验服务
	$.ajax({
		url: contextPath+"/userAction/checkUserExist",
		type:'POST',
		async:false,
        data:{userName:userName},
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
        	alert("发生错误："+textStatus + "," + errorThrown);
        }
	});
	
	if("" != retInfo){
		return retInfo;
	}
	
	return retFlag;
}
var v_time_len = 60; //1分钟
function countdown(){
	$("#btn_virifi").attr("value",v_time_len+"秒后重新获取");
	if(v_time_len == 0){
		$("#btn_virifi").attr("value","获取短信验证码");
		$("#btn_virifi").attr("disabled",false);
	}else{
		v_time_len--;
		setTimeout(countdown,1000);
	}
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
        	alert("发生错误："+textStatus + "," + errorThrown);
        }
	});
	
	if("" != retInfo){
		return retInfo;
	}
	
	return retFlag;
}
/*
 * 设置下一步操作的是否可点击
 * enable:true/false
 */
function enableNextStep(enable){
	$("#nextStep").attr("disabled",enable);
}
/*
 * 进入注册页面第二步
 */
function gotoSecond(){
	if($("#nextStep").hasClass("set-grey")){
		return;
	};
	var phoneNumCorrect = $.formValidator.isOneValid("userName");
	if(phoneNumCorrect == false){
		$("#userName").focus();
		return;
	}
	
	var vertifyNo = $.formValidator.isOneValid("virifi_num");
	if(vertifyNo == false){
		$("#virifi_num").focus();
		return;
	}
	
	var form = $("#fRegist1");
	form.attr("action",contextPath+"/userAction/toRegSecond");
	form.submit();
}
/*
 * 完成注册
 */
function completeReg(){
	var form = $("#fRegist2");
	//使用md5将密码进行加密
	var v_login_pwd = $("#first_login_pwd").val();
	v_login_pwd = hex_md5(v_login_pwd);
	$("#Login_pwd").val(v_login_pwd);
	form.attr("action",contextPath+"/userAction/completeReg");
	form.submit();
}
/*
 * 获取应用地址，包括主机和端口号
 */
function getLocationHost(){
	var protocol = location.protocol;
	var host = location.host;
	return protocol +"//"+host;
}
/*
 * 返回首页
 */
function gotoHome(){
	var host = getLocationHost();
	var path = contextPath + "/userAction/userLogin";
	location.href = host + path;
}
/*
 * 返回注册界面
 */
function gotoReg(){
	var host = getLocationHost();
	var path = contextPath + "/usrAction/toGenerRegist";
	location.href = host + path;
}