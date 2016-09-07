var regexEnum = 
{
	intege:"^-?[1-9]\\d*$",					//整数
	intege1:"^[1-9]\\d*$",					//正整数
	intege2:"^-[1-9]\\d*$",					//负整数
	num:"^([+-]?)\\d*\\.?\\d+$",			//数字
	num1:"^[1-9]\\d*|0$",					//正数（正整数 + 0）
	num2:"^-[1-9]\\d*|0$",					//负数（负整数 + 0）
	num3:"^[0-9]{6}$",					    //正数（正整数 + 0）
	decmal:"^([+-]?)\\d*\\.\\d+$",			//浮点数
	decmal1:"^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*$",	//正浮点数
	decmal2:"^-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*)$", //负浮点数
	decmal3:"^-?([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0)$", //浮点数
	decmal4:"^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0$", //非负浮点数（正浮点数 + 0）
	decmal5:"^(-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*))|0?.0+|0$",//非正浮点数（负浮点数 + 0）
	email:"^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$", //邮件
	color:"^[a-fA-F0-9]{6}$",				//颜色
	url:"^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&=]*)?$",	//url
	chinese:"^[\\u4E00-\\u9FA5\\uF900-\\uFA2D]+$",					//仅中文
	ascii:"^[\\x00-\\xFF]+$",				//仅ACSII字符
	zipcode:"^\\d{6}$",						//邮编
	mobile:"^(13[0-9]{9}|15[0-9]{9}|18[0-9]{9}|14[0-9]{9}|17[0-9]{9}$)",				//手机
	ip4:"^(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)$",	//ip地址
	notempty:"^\\S+$",						//非空
	picture:"(.*)\\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$",	//图片
	rar:"(.*)\\.(rar|zip|7zip|tgz)$",								//压缩文件
	date:"^\\d{4}(\\-|\\/|\.)\\d{1,2}\\1\\d{1,2}$",					//日期
	qq:"^[1-9]*[1-9][0-9]*$",				//QQ号码
	tel:"^(([0\\+]\\d{2,3}-)?(0\\d{2,3})-)?(\\d{7,8})(-(\\d{3,}))?$",	//电话号码的函数(包括验证国内区号,国际区号,分机号)
	username:"^\\w+$",						//用来用户注册。匹配由数字、26个英文字母或者下划线组成的字符串
	letter:"^[A-Za-z]+$",					//字母
	letter_u:"^[A-Z]+$",					//大写字母
	letter_l:"^[a-z]+$",					//小写字母
	idcard:"^[1-9]([0-9]{14}|[0-9]{16})(x|X)$"	//身份证
};

var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}; 

function isCardID(idcard){ 
	  var Errors=new Array(
		"身份证号码合法",
		"身份证号码位数不对!",
		"身份证号码出生日期超出范围或含有非法字符!",
		"身份证号码校验错误!",
		"身份证地区非法!"
	  );
	  var area={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"} 

	  var Y,JYM;
	  var S,M;
	  var idcard_array = new Array();
	  idcard_array = idcard.split("");
	  //地区检验
	  if(area[parseInt(idcard.substr(0,2))]==null) return Errors[4];
	  //身份号码位数及格式检验
	  switch(idcard.length){
	    case 18:
		//18位身份号码检测
		//出生日期的合法性检查 
		//闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
		//平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
		     if ( parseInt(idcard.substr(6,4)) % 4 == 0 || (parseInt(idcard.substr(6,4)) % 100 == 0 && parseInt(idcard.substr(6,4))%4 == 0 )){
			    Ereg=/^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;//闰年出生日期的合法性正则表达式
		     } 
		     else {
			    Ereg=/^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;//平年出生日期的合法性正则表达式
		     }
		    if(Ereg.test(idcard)){//测试出生日期的合法性
		            //计算校验位
		    S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7
			+ (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9
			+ (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10
			+ (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5
			+ (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8
			+ (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4
			+ (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2
			+ parseInt(idcard_array[7]) * 1 
			+ parseInt(idcard_array[8]) * 6
			+ parseInt(idcard_array[9]) * 3 ;
		
		    y = S % 11;
		    M = "F";
		    JYM = "10X98765432";
	        }
	        else return Errors[2];
	        break;
	  default:
	       return Errors[1];
	       break;
	  }
	  return true;
} 

//短时间，形如 (13:04:06)
function isTime(str)
{
	var a = str.match(/^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/);
	if (a == null) {return false;}
	if (a[1]>24 || a[3]>60 || a[4]>60)
	{
		return false;
	}
	return true;
}

//短日期，形如 (2003-12-05)
function isDate(str)
{
	var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/); 
	if(r==null)return false; 
	var d= new Date(r[1], r[3]-1, r[4]); 
	return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]);
}

//长时间，形如 (2003-12-05 13:04:06)
function isDateTime(str)
{
	var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/; 
	var r = str.match(reg); 
	if(r==null) return false; 
	var d= new Date(r[1], r[3]-1,r[4],r[5],r[6],r[7]); 
	return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]&&d.getHours()==r[5]&&d.getMinutes()==r[6]&&d.getSeconds()==r[7]);
}

function checkVirifi(virifiCode){
	var retFlag = false;
	var retInfo = "";
	
	if(g_getphonecode == "begin" || g_getphonecode == "load"){
		return "你输入的验证码不正确";
	}
	
	//调用后台校验服务
	$.ajax({
		url: contextPath+"/checkVirifi.do",
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

//银行卡号校验
//Description:  银行卡号Luhm校验
//Luhm校验规则：16位银行卡号（19位通用）:
// 1.将未带校验位的 15（或18）位卡号从右依次编号 1 到 15（18），位于奇数位号上的数字乘以 2。
// 2.将奇位乘积的个十位全部相加，再加上所有偶数位上的数字。
// 3.将加法和加上校验位能被 10 整除。
function luhmCheck(bankno){
	if (bankno.length < 16 || bankno.length > 19) {
		//$("#banknoInfo").html("银行卡号长度必须在16到19之间");
		return false;
	}
	var num = /^\d*$/;  //全数字
	if (!num.exec(bankno)) {
		//$("#banknoInfo").html("银行卡号必须全为数字");
		return false;
	}
	//开头6位
	var strBin="10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";    
	if (strBin.indexOf(bankno.substring(0, 2))== -1) {
		//$("#banknoInfo").html("银行卡号开头6位不符合规范");
		return false;
	}
    var lastNum=bankno.substr(bankno.length-1,1);//取出最后一位（与luhm进行比较）

    var first15Num=bankno.substr(0,bankno.length-1);//前15或18位
    var newArr=new Array();
    for(var i=first15Num.length-1;i>-1;i--){    //前15或18位倒序存进数组
        newArr.push(first15Num.substr(i,1));
    }
    var arrJiShu=new Array();  //奇数位*2的积 <9
    var arrJiShu2=new Array(); //奇数位*2的积 >9
    
    var arrOuShu=new Array();  //偶数位数组
    for(var j=0;j<newArr.length;j++){
        if((j+1)%2==1){//奇数位
            if(parseInt(newArr[j])*2<9){
            	arrJiShu.push(parseInt(newArr[j])*2);
            }else{
            	arrJiShu2.push(parseInt(newArr[j])*2);
            }
        }else{//偶数位
        	arrOuShu.push(newArr[j]);
        }
    }
    
    var jishu_child1=new Array();//奇数位*2 >9 的分割之后的数组个位数
    var jishu_child2=new Array();//奇数位*2 >9 的分割之后的数组十位数
    for(var h=0;h<arrJiShu2.length;h++){
        jishu_child1.push(parseInt(arrJiShu2[h])%10);
        jishu_child2.push(parseInt(arrJiShu2[h])/10);
    }        
    
    var sumJiShu=0; //奇数位*2 < 9 的数组之和
    var sumOuShu=0; //偶数位数组之和
    var sumJiShuChild1=0; //奇数位*2 >9 的分割之后的数组个位数之和
    var sumJiShuChild2=0; //奇数位*2 >9 的分割之后的数组十位数之和
    var sumTotal=0;
    for(var m=0;m<arrJiShu.length;m++){
        sumJiShu=sumJiShu+parseInt(arrJiShu[m]);
    }
    
    for(var n=0;n<arrOuShu.length;n++){
        sumOuShu=sumOuShu+parseInt(arrOuShu[n]);
    }
    
    for(var p=0;p<jishu_child1.length;p++){
        sumJiShuChild1=sumJiShuChild1+parseInt(jishu_child1[p]);
        sumJiShuChild2=sumJiShuChild2+parseInt(jishu_child2[p]);
    }      
    //计算总和
    sumTotal=parseInt(sumJiShu)+parseInt(sumOuShu)+parseInt(sumJiShuChild1)+parseInt(sumJiShuChild2);
    
    //计算Luhm值
    var k= parseInt(sumTotal)%10==0?10:parseInt(sumTotal)%10;        
    var luhm= 10-k;
    
    if(lastNum==luhm){
    //$("#banknoInfo").html("Luhm验证通过");
    	return true;
    }
    else{
    //$("#banknoInfo").html("银行卡号必须符合Luhm校验");
    	return false;
    }
}

//校验密码必须是以字母开头，包括字母、数字、特殊符号
function checkPwdFun(pwd){
	var retFlag = 0;
	
	//校验首字符必须为字母
	var v_char_reg = /[a-zA-Z]+/;
	if(v_char_reg.test(pwd)){
		retFlag += 1;
	}
	
	//校验必须包含数字
	var v_num_reg = /\d+/;
	if(v_num_reg.test(pwd)){
		retFlag += 1;
	}
	
	//校验必须包含特殊符号
	var v_reg = /[(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/;
	if(v_reg.test(pwd)){
		retFlag += 1;
	}
	
	if(retFlag < 2){
		return "登录密码格式不符合！";
	}
	
	return true;
}

function changeVirifiDesc(phoneNum){
	$("#btn_virifi").attr("value","获取验证码");
}

function checkBankName(bankName){
	//不能包含特殊字符
	var v_reg = /[(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/;
	if(v_reg.test(bankName)){
		return false;
	}
	
	return true;
}

function checkPayPwdWhenBind(payPwd){
	var retInfo = "输入的支付密码不正确";
	//生成一个随机数
	var pwdRandom = Math.round(Math.random() * 100000);
	//取填写的支付密码
	var pay_pwd = $("#pay_pwd").val();
	//md5加密
	pay_pwd = hex_md5(hex_md5(pay_pwd)+pwdRandom);
	//获取账户ID
	var acct_id = $("#acct_id").val();
	//调用后台校验服务
	$.ajax({
		url: contextPath+"/checkPayPwdWhenBind.do",
		type:'POST',
		async:false,
        data:{pay_pwd:pay_pwd,pwdRandom:pwdRandom,acct_id:acct_id},
        success: function (data){
        	if(data.success == "success"){
        		retInfo = "";
        	}else{
        		if(data.msg_info == "session_err"){
        			retInfo = "页面失效，请重新登录";
        		}else{
        			retInfo = data.msg_info;
        		}
        	}
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
        	retInfo = "发送网络异常，请稍后再试";
        }
	});
	
	if("" == retInfo){
		return true;
	}
	
	return retInfo;
}

function checkOldLoginPwd(oldLoginPwd){
	var retInfo = "输入的登录密码不正确";
	//生成一个随机数
	var pwdRandom = Math.round(Math.random() * 100000);
	//取旧登录密码
	var old_login_pwd = oldLoginPwd;
	//md5加密
	old_login_pwd = hex_md5(hex_md5(old_login_pwd)+pwdRandom);
	//调用后台校验服务
	$.ajax({
		url: contextPath+"/checkOldLoginPwd.do",
		type:'POST',
		async:false,
        data:{login_pwd:old_login_pwd,pwdRandom:pwdRandom},
        success: function (data){
        	if(data.success == "success"){
        		retInfo = "";
        	}else{
        		retInfo = "登录密码不正确";
        	}
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
        	retInfo = "发送网络异常，请稍后再试";
        }
	});
	
	if("" == retInfo){
		return true;
	}
	
	return retInfo;
}

function checkRandLoginPwd(loginPwd){
	var retInfo = "输入的登录密码不正确";
	//生成一个随机数
	var pwdRandom = Math.round(Math.random() * 100000);
	//取旧登录密码
	var old_login_pwd = loginPwd;
	//md5加密
	old_login_pwd = hex_md5(hex_md5(old_login_pwd)+pwdRandom);
	//调用后台校验服务
	$.ajax({
		url: contextPath+"/checkRandLoginPwd.do",
		type:'POST',
		async:false,
        data:{login_pwd:old_login_pwd,pwdRandom:pwdRandom,acct_id:acct_id},
        success: function (data){
        	if(data.success == "success"){
        		retInfo = "";
        	}else{
        		retInfo = "登录密码不正确";
        	}
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
        	retInfo = "发送网络异常，请稍后再试";
        }
	});
	
	if("" == retInfo){
		return true;
	}
	
	return retInfo;
}

function checkOldPayPwd(oldPayPwd){
	var retInfo = "输入的支付密码不正确";
	//生成一个随机数
	var pwdRandom = Math.round(Math.random() * 100000);
	//取旧登录密码
	var old_pay_pwd = oldPayPwd;
	//md5加密
	old_pay_pwd = hex_md5(hex_md5(old_pay_pwd)+pwdRandom);
	//调用后台校验服务
	$.ajax({
		url: contextPath+"/virifiPayPwd.do?isLogin="+isLogin,
		type:'POST',
		async:false,
        data:{payPwd:old_pay_pwd,passRandom:pwdRandom},
        success: function (data){
        	if(data.success == "success"){
        		retInfo = "";
        	}else{
        		if(data.msg_info == "session_err"){
        			retInfo = "页面已经失效，请重新登录";
        		}else{
        			retInfo = data.msg_info;
        		}
        	}
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
        	retInfo = "发送网络异常，请稍后再试";
        }
	});
	
	if("" == retInfo){
		return true;
	}
	
	return retInfo;
}

function checkPicVirifi(picVirifi){
	var retInfo = "输入的验证码不正确";
	if("" == picVirifi){
		return retInfo;
	}
	//调用后台校验服务
	$.ajax({
		url: contextPath+"/virifiImgRandomCode.do?isLogin="+isLogin,
		type:'POST',
		async:false,
        data:{virifiCode:picVirifi},
        success: function (data){
        	if(data.success == "success"){
        		retInfo = "";
        	}else{
        		retInfo = "输入的验证码不正确";
        	}
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
        	retInfo = "发送网络异常，请稍后再试";
        }
	});
	
	if("" == retInfo){
		return true;
	}
	
	return retInfo;
}

function checkEmailVirifi(emailVirifi){
	var retInfo = "输入的验证码不正确";
	if("" == emailVirifi){
		return retInfo;
	}
	//调用后台校验服务
	$.ajax({
		url: contextPath+"/virifiEmailRandomCode.do?isLogin="+isLogin,
		type:'POST',
		async:false,
        data:{virifiCode:emailVirifi},
        success: function (data){
        	if(data.success == "success"){
        		retInfo = "";
        	}else{
        		retInfo = "输入的验证码不正确";
        	}
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
        	retInfo = "发送网络异常，请稍后再试";
        }
	});
	
	if("" == retInfo){
		return true;
	}
	
	return retInfo;
}

function checkSecuriOne(SecuriInfo){
	var retInfo = "请选择一个安全问题";
	if("" == SecuriInfo){
		return retInfo;
	}else if("-1" == SecuriInfo){
		return retInfo;
	}else{
//		var two = $("#securi_two").find('option:selected').val();
//		if(SecuriInfo == two){
//			retInfo = "不能选择相同的问题";
//		}
//		var three = $("#securi_three").find('option:selected').val();
//		if(SecuriInfo == three){
//			retInfo = "不能选择相同的问题";
//		}
		return true;
	}
}
function checkSecuriTwo(SecuriInfo){
	var retInfo = "请选择一个安全问题";
	if("" == SecuriInfo){
		return retInfo;
	}else if("-1" == SecuriInfo){
		return retInfo;
	}else{
//		var one = $("#securi_one").find('option:selected').val();
//		if(SecuriInfo == one){
//			retInfo = "不能选择相同的问题";
//			return retInfo;
//		}
//		var three = $("#securi_three").find('option:selected').val();
//		if(SecuriInfo == three){
//			retInfo = "不能选择相同的问题";
//			return retInfo;
//		}
		return true;
	}
	
}
function checkSecuriThree(SecuriInfo){
	var retInfo = "请选择一个安全问题";
	if("" == SecuriInfo){
		return retInfo;
	}else if("-1" == SecuriInfo){
		return retInfo;
	}else{
//		var one = $("#securi_one").find('option:selected').val();
//		if(SecuriInfo == one){
//			retInfo = "不能选择相同的问题";
//			return retInfo;
//		}
//		var two = $("#securi_two").find('option:selected').val();
//		if(SecuriInfo == two){
//			retInfo = "不能选择相同的问题";
//			return retInfo;
//		}
		return true;
	}
}

function checkAnswerOne(answerOne){
	var retInfo = "答案不正确";
	if("" == answerOne){
		return retInfo;
	}
	var v_securi_one = $.trim($("#securi_one_id").val());
	//调用后台校验服务
	$.ajax({
		url: contextPath+"/checkSecuriInfo.do?isLogin="+isLogin,
		type:'POST',
		async:false,
		data:{securi_one:v_securi_one,answer_one:answerOne},
        success: function (data){
        	if(data.success == "success"){
        		retInfo = "";
        	}else{
        		retInfo = "答案不正确";
        	}
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
        	retInfo = "发送网络异常，请稍后再试";
        }
	});
	
	if("" == retInfo){
		return true;
	}
	
	return retInfo;
}

function checkAnswerTwo(answerTwo){
	var retInfo = "答案不正确";
	if("" == answerTwo){
		return retInfo;
	}
	var v_securi_two = $.trim($("#securi_two_id").val());
	//调用后台校验服务
	$.ajax({
		url: contextPath+"/checkSecuriInfo.do?isLogin="+isLogin,
		type:'POST',
		async:false,
		data:{securi_one:v_securi_two,answer_one:answerTwo},
        success: function (data){
        	if(data.success == "success"){
        		retInfo = "";
        	}else{
        		retInfo = "答案不正确";
        	}
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
        	retInfo = "发送网络异常，请稍后再试";
        }
	});
	
	if("" == retInfo){
		return true;
	}
	
	return retInfo;
}

function checkAnswerThree(answerThree){
	var retInfo = "答案不正确";
	if("" == answerThree){
		return retInfo;
	}
	var v_securi_three = $.trim($("#securi_three_id").val());
	//调用后台校验服务
	$.ajax({
		url: contextPath+"/checkSecuriInfo.do?isLogin="+isLogin,
		type:'POST',
		async:false,
		data:{securi_one:v_securi_three,answer_one:answerThree},
        success: function (data){
        	if(data.success == "success"){
        		retInfo = "";
        	}else{
        		retInfo = "答案不正确";
        	}
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
        	retInfo = "发送网络异常，请稍后再试";
        }
	});
	
	if("" == retInfo){
		return true;
	}
	
	return retInfo;
}

function phoneIsSame(phoneNum){
	var retInfo = "新老号码不能一样";
	if("" == phoneNum){
		retInfo = "电话号码不能为空";
		return retInfo;
	}
	//调用后台校验服务
	$.ajax({
		url: contextPath+"/phoneIsSame.do?isLogin="+isLogin,
		type:'POST',
		async:false,
		data:{phoneNum:phoneNum},
        success: function (data){
        	if(data.success == "success"){
        		retInfo = "";
        	}else{
        		retInfo = data.msg_info;
        	}
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
        	retInfo = "发送网络异常，请稍后再试";
        }
	});
	
	if("" == retInfo){
		return true;
	}
	
	return retInfo;
}

function emailIsSame(emailNum){
	var retInfo = "新老邮箱不能一样";
	if("" == emailNum){
		retInfo = "邮箱不能为空";
		return retInfo;
	}
	//调用后台校验服务
	$.ajax({
		url: contextPath+"/emailIsSame.do?isLogin="+isLogin,
		type:'POST',
		async:false,
		data:{emailNum:emailNum},
        success: function (data){
        	if(data.success == "success"){
        		retInfo = "";
        	}else{
        		retInfo = data.msg_info;
        	}
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
        	retInfo = "发送网络异常，请稍后再试";
        }
	});
	
	if("" == retInfo){
		return true;
	}
	
	return retInfo;
}

function payPwdIsSame(payPwd){
	var retInfo = "新旧支付密码不能一样";
	if("" == payPwd){
		retInfo = "支付密码不能为空";
		return retInfo;
	}
	//生成一个随机数
	var pwdRandom = Math.round(Math.random() * 100000);
	//取旧登录密码
	var old_pay_pwd = payPwd;
	//md5加密
	old_pay_pwd = hex_md5(hex_md5(old_pay_pwd)+pwdRandom);
	//调用后台校验服务
	$.ajax({
		url: contextPath+"/virifiPayPwd.do?isLogin="+isLogin,
		type:'POST',
		async:false,
        data:{payPwd:old_pay_pwd,passRandom:pwdRandom},
        success: function (data){
        	if(data.success == "success"){
        		retInfo = "新旧支付密码不能一样";
        	}else{
        		retInfo = "";
        	}
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
        	retInfo = "发送网络异常，请稍后再试";
        }
	});
	
	if("" == retInfo){
		return true;
	}
	
	return retInfo;
}

function isSamePayPwd(logPwd){
	var retInfo = "登录密码不能与支付密码一样";
	if("" == logPwd){
		retInfo = "登录密码不能为空";
		return retInfo;
	}
	//生成一个随机数
	var pwdRandom = Math.round(Math.random() * 100000);
	//取旧登录密码
	var old_pay_pwd = logPwd;
	//md5加密
	old_pay_pwd = hex_md5(hex_md5(old_pay_pwd)+pwdRandom);
	//调用后台校验服务
	$.ajax({
		url: contextPath+"/virifiPayPwd.do?isLogin="+isLogin,
		type:'POST',
		async:false,
        data:{payPwd:old_pay_pwd,passRandom:pwdRandom},
        success: function (data){
        	if(data.success == "success"){
        		retInfo = "登录密码不能与支付密码一样";
        	}else{
        		retInfo = "";
        	}
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
        	retInfo = "发送网络异常，请稍后再试";
        }
	});
	
	if("" == retInfo){
		return true;
	}
	
	return retInfo;
}

function isNullPro(inparam){
	if("" == inparam){
		return "请选择开户卡所属省";
	}
	
	return true;
}

function isNullCity(inparam){
	if("" == inparam){
		return "请选择开户卡所属地市";
	}
	
	return true;
}

