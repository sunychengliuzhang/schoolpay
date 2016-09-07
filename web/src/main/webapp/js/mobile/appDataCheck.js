var appDataCheck = 
{
	checkIsNumber:function(e){
		if((e.which>=48&&e.which<=57&&e.ctrlKey==false&&e.shiftKey==false)||e.which==0||e.which==8){
			return true;
		}else{
		    if(e.ctrlKey==true&&(e.which==99||e.which==118)){
			    return true;
			}else{
			   return false;
			}
		}
	},
	//校验密码必须是以字母开头，包括字母、数字、特殊符号
	checkPassword:function(pwd){
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
			return "密码必须包括数字,字母,特殊字符(例:~,!,@,#,$,%,&)中任意2种";
		}
		
		return true;
	},
	//校验用户名。匹配由数字、26个英文字母或者下划线组成的字符串
    checkLoginName:function(loginName){
    	
    	if(loginName.length<6){
    		return "登陆名长度不能小于6个字符";
    	}
    	if(loginName.length>20){
    		return "登陆名长度不能大于20个字符";
    	}
    	
    	var usernameReg = new RegExp("^\\w+$", "i");
    	if(usernameReg.test(loginName) == false){
    		return "登陆名格式不正确，只能由数字、26个英文字母或者下划线组成";
    	}
    	
    	return true;
    },
    //校验手机号
    checkPhoneNo:function(phoneNo){
    	var mobileReg = new RegExp("^(13[0-9]{9}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|170[0-9]{8}$)", "i");
    	if(phoneNo.length != 11 || mobileReg.test(phoneNo) == false){
    		return "手机号码格式错误";
    	}
    	return true;
    },
    //校验姓名
    checkAllName:function(name){
    	if(name.length<2){
    		return "长度不能小于2个字符";
    	}
    	if(name.length>32){
    		return "长度不能大于32个字符";
    	}
    	//不能包含特殊字符
    	var v_reg = /[(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/;
    	if(v_reg.test(name)){
    		return "不能包含特殊字符(如:~,!,@,#,$,%,&)";
    	}
    	
    	return true;
    },
    //校验身份证
    checkIdCard:function(idcard){ 

    	/*
		var Errors = new Array("身份证号码合法", 
				               "身份证号码位数不对!",
				               "身份证号码出生日期超出范围或含有非法字符!", 
				               "身份证号码校验错误!",
				               "身份证地区非法!");*/
		var Errors = new Array("身份证号码合法", 
				               "身份证号码不合法!",
				               "身份证号码不合法!", 
				               "身份证号码不合法!",
				               "身份证号码不合法!");
		
		var area = {
			11 : "北京",
			12 : "天津",
			13 : "河北",
			14 : "山西",
			15 : "内蒙古",
			21 : "辽宁",
			22 : "吉林",
			23 : "黑龙江",
			31 : "上海",
			32 : "江苏",
			33 : "浙江",
			34 : "安徽",
			35 : "福建",
			36 : "江西",
			37 : "山东",
			41 : "河南",
			42 : "湖北",
			43 : "湖南",
			44 : "广东",
			45 : "广西",
			46 : "海南",
			50 : "重庆",
			51 : "四川",
			52 : "贵州",
			53 : "云南",
			54 : "西藏",
			61 : "陕西",
			62 : "甘肃",
			63 : "青海",
			64 : "宁夏",
			65 : "新疆",
			71 : "台湾",
			81 : "香港",
			82 : "澳门",
			91 : "国外"
		};

		var S;
		var idcard_array = new Array();
		idcard_array = idcard.split("");
		// 地区检验
		if (area[parseInt(idcard.substr(0, 2))] == null)
			return Errors[4];
		// 身份号码位数及格式检验
		switch (idcard.length) {
		case 18:
			// 18位身份号码检测
			// 出生日期的合法性检查
			// 闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
			// 平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
			if (parseInt(idcard.substr(6, 4)) % 4 == 0
					|| (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard
							.substr(6, 4)) % 4 == 0)) {
				Ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;// 闰年出生日期的合法性正则表达式
			} else {
				Ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;// 平年出生日期的合法性正则表达式
			}
			if (Ereg.test(idcard)) {// 测试出生日期的合法性
				// 计算校验位
				S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10]))
						* 7
						+ (parseInt(idcard_array[1]) + parseInt(idcard_array[11]))
						* 9
						+ (parseInt(idcard_array[2]) + parseInt(idcard_array[12]))
						* 10
						+ (parseInt(idcard_array[3]) + parseInt(idcard_array[13]))
						* 5
						+ (parseInt(idcard_array[4]) + parseInt(idcard_array[14]))
						* 8
						+ (parseInt(idcard_array[5]) + parseInt(idcard_array[15]))
						* 4
						+ (parseInt(idcard_array[6]) + parseInt(idcard_array[16]))
						* 2 + parseInt(idcard_array[7]) * 1
						+ parseInt(idcard_array[8]) * 6
						+ parseInt(idcard_array[9]) * 3;

				y = S % 11;
				M = "F";
				JYM = "10X98765432";
			} else
				return Errors[2];
			break;
		default:
			return Errors[1];
			break;
		}
		return true;
  }
};