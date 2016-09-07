$(function(){
	//省份的唯一标识
	var provincesId = "450000";
	//市的唯一标识
	var cityId="";
	//缴费单位唯一标识
	var card_type="";
	
	var maindom = $('#main_con_select');
	
	//省份点击事件
	$('#id_seciton-province',maindom).delegate('.select-elem-detail','click',function(e){
		e.stopPropagation();
		var that = $(this);
		var parentdom = that.parent();
		if(!that.hasClass('select')){
			that.parent().children('.select-elem-detail').removeClass('select');
			that.addClass('select');
			$("#province_id").val(that.attr("data-value"));
			$("#province_name").val(that.text());
			provincesId = $("#province_id").val();
			//点击省份的时候把地市、缴费单位设为空
			$("#city_id").val("");
			$("#card_type").val("");
			//切换地市
			loadCitysData(provincesId,schCityCode);
		}
	});
	
	//地市的点击事件
	$('#id_seciton-city',maindom).delegate('.select-elem-detail','click',function(e){
		e.stopPropagation();
		var that = $(this);
		var parentdom = that.parent();
		if(!that.hasClass('select')){
			that.parent().children('.select-elem-detail').removeClass('select');
			that.addClass('select');
			$("#city_id").val(that.attr("data-value"));
			$("#city_name").val(that.text());
			cityId = $("#city_id").val();
			//把缴费单位设空
			$("#card_type").val("");

			provincesId = $("#province_id").val();
			//切换地市
			loadChargeCorps(provincesId,cityId,schCode);
		}
	});
	
	//缴费单位点击事件
	$('.float-right',maindom).delegate('.select-elem-detail','click',function(e){
		e.stopPropagation();
		var that = $(this);
		var parentdom = that.parent();
		if(!that.hasClass('select')){
			that.parent().children('.select-elem-detail').removeClass('select');
			that.addClass('select');
			//缴费单位的点击事件，设置缴费单位的信息
			$("#card_type").val(that.attr("data-value"));
			$("#card_name").val(that.text());
		}
	});
	
	if(schProvCode!=""){
		//加载省份的值
		loadProvincesData(schProvCode);
	}else{
		loadProvincesData("");
	}
	
	
	pageInit(2);
});

//form表单校验
function pageInit(cssMode){
	//初始化校验
	$.formValidator.initConfig({formID:"fBindForm",theme:"ArrowSolidBox",submitOnce:true,
		onError:function(msg,obj,errorlist){
			$("#errorlist").empty();
			$.map(errorlist,function(msg){
				$("#errorlist").append("<li>" + msg + "</li>");
			});
		},
		onSuccess: function() {
			onSubmit();
			return false;
		},
	    cssMode:cssMode
	});
	
	var onShowTipMsg = "请输入缴费学号";
	$("#studentCode").formValidator({onShowText:onShowTipMsg,onShow:onShowTipMsg,onFocus:onShowTipMsg,onCorrect:""}).inputValidator({min:1,onError:onShowTipMsg});
	onShowTipMsg = "请输入验证码";
	$("#virifiNum").formValidator({onShowText:onShowTipMsg,onShow:onShowTipMsg,onFocus:onShowTipMsg,onCorrect:""}).inputValidator({min:1,onError:onShowTipMsg}).functionValidator({fun:validataCode});
}

//加载省
function loadProvincesData(schProvCode){
	$.ajax({
		url: contextPath+"/tuitionQueryAction/queryHlifeChargeProvinces.do",
		type:'POST',
		data:{
			schProvCode:schProvCode
		},
        success: function (data){
        	provincesId = $("#province_id").val();
        	$("#id_seciton-province").html("");
        	if(data.success == "success"){
        		$(data.msg_info).each(function(i,row){
        			if(provincesId!=""){
        				if(provincesId == row.real_value){
        					$("#id_seciton-province").append("<span class=\"select-elem-detail select\" data-value=\""
                    				+row.dicitCode+"\">"+row.dicitName+"</span>");
            				//设置省份的名称
            				$("#province_name").val(row.desc_value);
        				}else{
        					$("#id_seciton-province").append("<span class=\"select-elem-detail \" data-value=\""
                    				+row.dicitCode+"\">"+row.dicitName+"</span>");
        				}
        			}else{
        				if(i==0){
            				$("#id_seciton-province").append("<span class=\"select-elem-detail select\" data-value=\""
                    				+row.dicitCode+"\">"+row.dicitName+"</span>");
            				//设置省的信息
            				$("#province_id").val(row.dicitCode);
            				$("#province_name").val(row.dicitName);
            				
            			}else{
            				$("#id_seciton-province").append("<span class=\"select-elem-detail \" data-value=\""
                    				+row.dicitCode+"\">"+row.dicitName+"</span>");
            				
            			}
        			}
        		});
        		provincesId = $("#province_id").val();
        		//加载省下面的市
        		loadCitysData(provincesId,schCityCode);
        	}else{
        		$("#id_seciton-province").html(data.msg_info);
        	}
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
        	$("body").alert("发生错误："+textStatus + "," + errorThrown);
        }
	});
}

//加载市的值
function loadCitysData(provinceId,schCityCode){
	var city = "";
	$.ajax({
		url: contextPath+"/tuitionQueryAction/queryHlifeChargeCitys.do",
		type:'POST',
        data:{
        	provinceId:provinceId,
        	schCityCode:schCityCode
        },
        success: function (data){
        	$("#id_seciton-city").html("");
        	var cityId = $("#city_id").val();
        	if(data.success == "success"){
        		$(data.msg_info).each(function(i,row){
        			if(cityId!=""){
        				if(cityId == row.real_value){
        					$("#id_seciton-city").append("<span class=\"select-elem-detail select\" data-value=\""
        	        				+row.dicitCode+"\">"+row.dicitName+"</span>");
        	        				//设置市的名称
        	        				$("#city_name").val(row.dicitName);
        				}else{
        					$("#id_seciton-city").append("<span class=\"select-elem-detail\" data-value=\""
                    				+row.dicitCode+"\">"+row.dicitName+"</span>");
        				}
        			}else{
        				if(i==0){
            				$("#id_seciton-city").append("<span class=\"select-elem-detail select\" data-value=\""
            				+row.dicitCode+"\">"+row.dicitName+"</span>");
            				//设置市的信息
            				$("#city_id").val(row.dicitCode);
            				$("#city_name").val(row.dicitName);
            			}else{
            				$("#id_seciton-city").append("<span class=\"select-elem-detail\" data-value=\""
                    				+row.dicitCode+"\">"+row.dicitName+"</span>");
            			}
        			}
            	});
        		cityId = $("#city_id").val();
            	//加载缴费单位
            	loadChargeCorps(provinceId,cityId,schCode);
        	}else{
        		$("#id_seciton-city").html(data.msg_info);
        		$("#card_type-option-list").html("");
        	}
        	
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
        	$("body").alert("发生错误："+textStatus + "," + errorThrown);
        }
	});
}
//加载缴费单位
function loadChargeCorps(provinceId,cityId,schCode){
	$.ajax({
		url: contextPath+"/tuitionQueryAction/queryHlifeChargeCorpRel.do",
		type:'POST',
        data:{
        	provinceId:provinceId,
        	cityId:cityId,
        	schCode:schCode
        },
        success: function (data){
        	$("#card_type-option-list").html("");
        	var card_type = $("#card_type").val();
        	if(data.success == "success"){
        		$(data.msg_info).each(function(i,row){
        			if(card_type !=""){
        				if(card_type == row.real_value){
        					$("#card_type-option-list").append("<span class=\"select-elem-detail select\" data-value=\""
        	        				+row.schCode+"\">"+row.schName+"</span>");
        	        				//给缴费单位设置默认选中的值
        	        				$("#card_name").val(row.schName);
        				}else{
        					$("#card_type-option-list").append("<span class=\"select-elem-detail\" data-value=\""
                    				+row.schCode+"\">"+row.schName+"</span>");
        				}
        			}else{
        				if(i==0){
            				$("#card_type-option-list").append("<span class=\"select-elem-detail select\" data-value=\""
            				+row.real_value+"\">"+row.schName+"</span>");
            				//给缴费单位设置默认选中的值
            				$("#card_type").val(row.schCode);
            				$("#card_name").val(row.schName);
            			}else{
            				$("#card_type-option-list").append("<span class=\"select-elem-detail\" data-value=\""
                    				+row.schCode+"\">"+row.schName+"</span>");
            			}
        			}
            	});
        	}else{
        		$("#card_type-option-list").html(data.msg_info);
        	}
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
        	$("body").alert("发生错误："+textStatus + "," + errorThrown);
        }
	});
}
/**
 * 查询学费信息
 */
function onQuery(){
	$("#fBindForm").submit();
}

function onSubmit(){
	//省份的信息
	var schProvCode = $("#province_id").val();
	var schProvName = $("#province_name").val();
	//市的信息
	var schCityCode = $("#city_id").val();
	var schCityName = $("#city_name").val();
	//缴费单位的信息
	var schCode = $("#card_type").val();
	var schName = $("#card_name").val();
	//缴费学号
	var studentCode = $("#studentCode").val();
	var data = {};
	data["schProvCode"] = schProvCode;
	data["schProvName"] = schProvName;
	
	data["schCityCode"] = schCityCode;
	data["schCityName"] = schCityName;
	
	data["schCode"] = schCode;
	data["schName"] = schName;
	
	data["stuNo"] = studentCode;
	
	$.ajax({
		url: contextPath+"/tuitionQueryAction/queryTuitionFee.do",
		type:'POST',
        data:data,
        success: function (data){
        	if(data.success == "true"){
        		location.replace(contextPath + "/tuitionQueryAction/tuitionFeeList.do");
        	}else{
        		changevalidataCode($("#idVilidCode"));
        		$("body").alert(data.msg_info);
        		return false;
        	}
        	
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
        	alert("发生错误："+textStatus + "," + errorThrown);
        }
	});
	
}
//改变验证码
function changevalidataCode(obj){
	obj.src= contextPath+"/userAction/showUserImg";
}
/**
 * 校验验证码是否正确
 */
function validataCode(virifiNum){
	var resInfo = "";
	$.ajax({
		url : contextPath + "/userAction/validLoginCode",
		type : 'POST',
		async:false,
		data : {
			virifiNum : virifiNum
		},
		success : function(data) {
			if (data == "true") {
				resInfo = "";
			} else {
				resInfo = "验证码错误";
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			resInfo = "校验发生异常";
		}
	});
	
	if(resInfo == ""){
		return true;
	}else{
		return resInfo;
	}
}