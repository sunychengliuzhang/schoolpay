$(function(){

	var f = "show_pass_classyear",
        showWrap = $("#" + f),
        searhBtn = $('#other_search-classyear'),
        rightCon = $('#main_con_right');

      //自定义滚动条
    var m = function() {
        
            var B = $('.show-pass-classyear')
              , H = $(B.children()[0]) //scrollcontent
              , t = $(B.children()[2]) //sliderwrap
              , sliderbar = $(t.children()[0]) //sliderbar
              , E = Math.ceil(H.children().length) * 33;
            if (E < 132) {
                t.css("display", "none");
                return
            }
            var I = 0
              , P = 36
              , v = 97;
            var s = function(Q) {
                I = Q;
                if (Q < 0) {
                    I = 0
                } else {
                    if (Q > v) {
                        I = v
                    }
                }
            }
            ;
            var C = function() {
                r();
                N()
            }
            ;
            var N = function() {
                var Q = -1 * (I / v * (E - 132));
                H.css("top", Q + "px")
            }
            ;
            var r = function() {
                sliderbar.css("top", (I - 1) + "px")
            };
            var z = /opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i.test(navigator.userAgent) ? +(RegExp["\x246"] || RegExp["\x242"]) : undefined;
            var D = function(R) {
                var Q = R.originalEvent;
                if (Q.wheelDelta) {
                    return ( z && z < 9.5 ? -Q.wheelDelta : Q.wheelDelta) 
                } else {
                    if (Q.detail) {
                        return -Q.detail * 40
                    } else {
                        if ($.isIE) {
                            return -Q.deltaY
                        } else {
                            return -Q.deltaY * 40
                        }
                    }
                }
            }
            ;
            var K = 0;
            var L = function(Q) {
                _userIsUsing = true;
                Q.stopPropagation();
                Q.preventDefault();
                var R = D(Q) * 2;
                
                s(I + 50 * (-1 * R) / E);
                C()
            }
            ;
            var w = 0;
            var O;
            var A = function(Q) {
                _userIsUsing = true;
                w = Q.clientY;
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
                s(I + (Q - w));
                w = Q;
                C()
            }
            ;
            var u = function(Q) {
                O = false;
                t.removeClass("lrc-scroll-ctrl-hover s-scroll-hover");
                showWrap.unbind("mousemove")
            }
            ;
            t.on("click", function(Q) {
            	Q.stopPropagation();
                var R = Q.offsetY || Q.layerY || Q.originalEvent.layerY;
                s(R - P / 2);
                C()
            }
            );
            t.on("mouseenter", function(Q) {
                t.addClass("soccer-scroll-ctrl-hover s-scroll-hover")
            }
            );
            t.on("mouseleave", function(Q) {
                if (O) {
                    return
                }
                t.removeClass("soccer-scroll-ctrl-hover s-scroll-hover")
            }
            );
            sliderbar.on("click", function(Q) {
                t.addClass("soccer-scroll-ctrl-hover s-scroll-hover");
                Q.stopPropagation()
            }
            );
            sliderbar.on("mousedown", function(Q) {
                Q.preventDefault();
                A(Q)
            }
            );
            showWrap.on("mouseleave", function(Q) {
                _userIsUsing = false
            }
            );
            showWrap.on("mouseup", function(Q) {
                u(Q)
            }
            );
            showWrap.on("mouseleave", function(Q) {
                u(Q)
            }
            );
            B.on("DOMMouseScroll", L);
            B.on("mousewheel", L)
    };
    // 选择项的效果
    $('.select-item',showWrap).each(function(){
    	
    	var that = $(this);
    	that.on('mouseenter',function(){
    		that.addClass('mousein');
    	}).on('mouseleave',function(){
    		that.removeClass('mousein');
    	}).on('click',function(e){
    		e.stopPropagation();
    		if(that.hasClass('choice')){
    			that.parent().children().removeClass('choice');
    			that.removeClass('choice');
    		}else{
    			that.parent().children().removeClass('choice');
    			that.addClass('choice');
    		}
    	});
    });
    //点击确认按钮
    $('.select-ok',showWrap).on('click',function(e){
    	e.stopPropagation();
    	var conText = $('.select-con-wrap',showWrap).find('.choice').text() || '';
    	var value  = $('.select-con-wrap',showWrap).find('.choice').attr("data-value");
    	
    	if(conText){
    		$('.visiblity-con',searhBtn).text(conText);
    	}else{
    		$('.visiblity-con',searhBtn).text('您没有选择任一学期');
    	}
    	if(value!=""){
    		queryOtherTuition(value);
    	}
    	showWrap.hide();

    });
    //点击取消按钮
    $('.select-cancel',showWrap).on('click',function(e){
    	e.stopPropagation();
    	showWrap.hide();
    	$('.visiblity-con',searhBtn).text('选择其他学期');
    });

    $('.con-right-item',rightCon).each(function(){
    	var cur = $(this);
    	cur.on('mouseenter',function(){
    		cur.addClass('setbackgroud');
    	}).on('mouseleave',function(){
    		cur.removeClass('setbackgroud');
    	})
    });
    showWrap.on('click',function(e){
    	e.stopPropagation();
    })
    searhBtn.on('click',function(e){
    	e.stopPropagation();
    	var that = $(this);
    	var parentDom = $('#show_pass_classyear .select-item:first');
   
    	that.parent().find('.select-item').removeClass('choice');
    	parentDom.addClass('choice');
    	showWrap.show();
    	
    })
    $('body').on('click',function(){
    	showWrap.hide();
    })
    m();
});

/**
 *立即支付按钮触发的点击事件
 * amount			交易金额
 * 	tranSerial		交易流水号
 * refNo			系统参考号
 * reservedField1	学费信息描述
 * id 学费信息主键
 */
function payMethod(feeAmount,tranSerial,stuTerm,refNo,reservedField1,feeid){
	
	$("#feeAmount").val(feeAmount);
	$("#tranSerial").val(tranSerial);
	$("#stuTerm").val(stuTerm);
	$("#refNo").val(refNo);
	$("#reservedField1").val(reservedField1);
	 $("#feeId").val(feeid);
	$("#payForm").submit();
   
}
/**
 * 查询其他学期触发的事件
 * stuTerm	缴费学期
 */
function queryOtherTuition(stuTerm){
	//学号
	var stuNo= $("#stuNo").val();
	//省份编码
	var schProvCode = $("#schProvCode").val();
	//缴费单编码
	var schCode = $("#schCode").val();
	//省市的编码
	var schCityCode = $("#schCityCode").val();
	$.ajax({
		url: contextPath+"/tuitionQueryAction/queryOtherTuitionFee.do",
		type:'POST',
        data:{
        	stuNo:stuNo,
        	schProvCode:schProvCode,
        	schCode:schCode,
        	schCityCode:schCityCode,
        	stuTerm:stuTerm
        },success: function (data){
        	var content ="";
        	$("#main_con_right").html("");
        	//success表示查询成功
        	if(data.success == "success"){
    			content = "<div class=\"con-right-item\">";
    			if(data.count=="0"){
    				content = "<div class=\"con-right-item no-need-pay\">";
    			}
				content += "<div class=\"item-top\">";
				content += "<p class=\"class-year\">"+data.tJFTTuitionVoRsp.chargeKey1+"</p>";
				content += "<p class=\"class-year-pay\">";
				content += "<span class=\"pay-sum\">合计：</span>";
				content += "<span class=\"pay-num\">"+data.tJFTTuitionVoRsp.chargeKey2+"元</span>";
				content += "</p>";
				content += "</div>";
				content += "<div class=\"item-detail-show\">";
				content += "<span class=\"item-detail\">"+data.tJFTTuitionVoRsp.feeDesc+"</span>";
				content += "</div>";
    			//1表示查询到了数据，有需要缴费的，所有立即支付按钮可以点击
        		if(data.count=="1"){
        			content += "<a class=\"pay-btn\" onclick=\"payMethod('"+data.tJFTTuitionVoRsp.chargeKey2+
        					"','"+data.tJFTTuitionVoRsp.tranSerial+"','"+data.tJFTTuitionVoRsp.stuTerm+"','"+
        					data.tJFTTuitionVoRsp.refNo+"','"+data.tJFTTuitionVoRsp.feeDesc+"','"+data.tJFTTuitionVoRsp.id+"')\">立即支付</a>";
        		}else{
        			content +="<a class=\"pay-btn\">立即支付</a>";
        		}
        		content +="</div>";
        	}else{
        		content +="<div class=\"con-right-item no-search-result\">";
        		content +="<div class=\"item-top\"><p class=\"class-year\">无查询结果</p></div>";
        		content +="<div class=\"item-detail-show\"></div>";
        		content +="</div>";
        	}
        	$("#main_con_right").append(content);
        }
	});
}
