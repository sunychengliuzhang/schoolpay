$(function(){
	//不同支付类型提交的时候银行对应的gatewayId不同
	var curMethodId = 0; //默认支付方式id


	var items = $('.pay-method-select').filter(".other");
	if(items.length > 0){
	   var item = $(items[0]);
	   if(items.length > 3){
		  var lastObj = $(items[items.length - 1]);
		  lastObj.attr("style","margin-top:20px;margin-left:30px")
	   }
	  item.addClass("select");
	  var itemid = item.attr("data-id");
	  if(itemid!=undefined && itemid!=""){
		  curMethodId = itemid;
		  $("#payWay").val(curMethodId);//当前支付方式

	   }
	   var objs = $(".card-password-pay").filter(".bank-con-list");
	
	  $.each(objs, function(i,val){
		 var obj = $(objs[i]);
		 var objid = obj.attr("data-id");
		 if(objid == itemid){
			 obj.show();
		 }
		
	  }); 
	}
	var payMethod = $('#main_con_bottom');
	var wrap = $('#main_con_bottom');
	var thirdCon = $('#first_con');
	var pay;




	var showCon = function(num){
		if("10" == num){
			$("#wxDes").show();
			$("#otherDes").hide();
		}else{
			$("#wxDes").hide();
			$("#otherDes").show();
		}
	};
	//快捷支付的银行、以及5、6、7支付方式切换事件
	$('.pay-method-select',payMethod).each(function(){
		var curItem = $(this);
		var id = curItem.attr('data-id');
		curItem.on('click',function(){
			if(!curItem.hasClass('select')){
				$('.pay-method-select').removeClass('select');
				curItem.addClass('select');
			}
			curMethodId = id;

			$("#payWay").val(curMethodId);//当前支付方式
			//$('.next-step-con',wrap).remove();
			//$('#next_step',wrap).show();

			showCon(id);
		});
	});


	//下一步
	$('#next_step',wrap).on('click',function(){
		
		if(curMethodId == 0){
			   alert("请选择支付方式");
		}else{
			//发送请求支付
			generalOrderInfo();

	   }
	 	
	});
});
