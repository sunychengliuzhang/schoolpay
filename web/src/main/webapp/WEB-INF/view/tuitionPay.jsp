<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%@ include file="header.jsp"%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>缴学费</title>
<!-- Bootstrap CSS -->
<link href="<%=contextPath%>/css/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet"></head>
<!-- Loading Flat UI -->
<link href="<%=contextPath%>/css/flat-ui.css" rel="stylesheet">
<style type="text/css" media="screen">
  .panel-info{
  border-color:#1abc9c;
  }
</style>
</head>
<body>
	<div class="container">
		<div class="page-header">
			<h5>
				缴学费
				<small style="font-size: 12px;color:#BDC3C7">便捷支付</small>
			</h5>
		</div>
		<div class="row">
			<div class="col-sm-10 col-sm-offset-1">
		<div class="row">
			<div class="col-sm-10 col-sm-offset-1">
				<div class="panel panel-info">
			       <div class="panel-heading" style="background-color:#1abc9c;color:#ffffff">订单信息</div>
			       <div class="panel-body">
				        <ul class="list-inline">
					        <li class="text-primary">学校：</li>
					        <li>${schoolName }</li>
					    </ul>
					    <ul class="list-inline">
					        <li class="text-primary">学号：</li>
					        <li>${stuNo }</li>
					    </ul>
					    <ul class="list-inline">
					        <li class="text-primary">学费详情：</li>
					        <li>${feeRemark }</li>
					    </ul>
                   </div>
                    <div class="panel-footer">
                	    <div class="row">
                	         <div class="col-sm-offset-10 col-sm-2">
                	   	         <p>合计:${feeAmount }元</p>
                	         </div>
                	    </div>
                    </div>
				</div>
			</div>
			<div class="col-sm-10 col-sm-offset-1">
				<button type="button" class="btn btn-primary btn-lg btn-block" onclick="wxpay()">微信支付</button>
			</div>
		</div>
			</div>
		</div>
		
		<%--<form id = "generaPacket">--%>
		   <%--<input type="hidden" name="payPacket"  id="payPacket" value="">--%>
		   <%--<input type="hidden" name="feeRemark"  id="feeRemark" value="${feeRemark }">--%>
		<%--</form>--%>
		<form id = "wxPayForm">
		   <input type="hidden" name="payPacket"  id="payPacket" value="">
		   <input type="hidden" name="feeRemark"  id="feeRemark" value="${feeRemark }">
		</form>
		<form id="wxPayLaunch">
		</form>
</div>

<!-- jQuery -->
<script src="<%=contextPath%>/js/jquery-1.11.3.js"></script>
<!-- Bootstrap JavaScript -->
<script src="<%=contextPath%>/js/flat-ui.min.js"></script>
<script src="<%=contextPath%>/assets/js/application.js"></script>

<script>
  $(document).ready(function(){
      $('select[name="inverse-dropdown"], select[name="inverse-dropdown-optgroup"], select[name="inverse-dropdown-disabled"]').select2({dropdownCssClass: 'select-inverse-dropdown'});
      $('select[name="searchfield"]').select2({dropdownCssClass: 'show-select-search'});
      $('select[name="inverse-dropdown-searchfield"]').select2({dropdownCssClass: 'select-inverse-dropdown show-select-search'});
   });
  
  function wxpay(){
	  
	  $.ajax({
		  url:contextPath+"/generateJftPayPacket",
		  type:'POST',
		  async:false,
		  data:{},
		  success:function(data){
			  if(data.success=="success"){
//				  $("#payPacket").val(data.signMsg);
//				  launchPay1();
//				  var msg = data.jsonStr;

				  var urlAction = data.actionUrl;
				  $("#wxPayLaunch").attr("action", urlAction);
				  $("#wxPayLaunch").submit();
			  }else{
				  alert(data.errorMsg);
			  }
		  },
		  error:function(error){
			  alert(error);
		  }
	  })
	  
  }
  
     //通过jsonP进行跨域请求
	function launchPay1(){
		var feeRemark = $("#feeRemark").val();
		var signStr = $("#payPacket").val();
		$.ajax({
			url : contextPath+"/launchPay",
			type : 'GET',
			async : false,
			contentType: "application/json",
		    data : {
				billMsg : feeRemark,
				requestPacket : signStr
			},
			success : function(data) {
              //这里的调用还存在一些问题
				console.log(data);
				if (data.success == "success") {
					console.log(data.actionUrl);

					$("#wxPayForm").attr("action", data.actionUrl);
					$("#wxPayForm").submit();
				} else {
					$("#wxBtn").attr("disabled", false);
					$("#fullChanelBtn").attr("disabled", false);
					var errorMsg = data.errorMsg;
					$.mask(returnMess(errorMsg));
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {

			}
		});
	}
     
//    //jsonp的回调函数
//	function callback(data){
//		console.log("callback:"+data);
//	    if (data.success == "success") {
//			alert(data.actionUrl);
//		    $("#wxPayForm").attr("action", data.actionUrl);
//		    $("#wxPayForm").submit();
//		} else {
//			$("#wxBtn").attr("disabled", false);
//			$("#fullChanelBtn").attr("disabled", false);
//			var errorMsg = data.errorMsg;
//			$.mask(returnMess(errorMsg));
//		}
//	}
  
</script>


</body>
</html>