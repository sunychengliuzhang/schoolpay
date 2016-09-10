<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%@ include file="header.jsp"%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1,user-scalable=no">
<title>缴学费</title>
    <!-- Bootstrap CSS -->
	<link href="<%=contextPath%>/css/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet"></head>
	<!-- Loading Flat UI -->
	<link href="<%=contextPath%>/css/flat-ui.css" rel="stylesheet">
	<link href="<%=contextPath%>/css/tuitionCounsel.css" rel="stylesheet">
	<style type="text/css" media="screen">
	.chooseSch{
		padding-left: 5%;
	}
	.chooseSch .school{
		width: 90%;
		text-align: left;
	}
	.chooseSch .stuNo{
		margin-top: 10px;
		width: 90%;
	}
	.schoolSumit{
		width: 90%;
	}
   </style>
	
</head>
<body>
<%@ include file="tuitionCounsel.jsp"%>
	<div class="container">
		<div class="page-header" style="margin-top:30px">
			<h5>
				缴学费
				<small style="font-size: 14px;color:#BDC3C7">便捷支付</small>
			</h5>
		</div>
		<div class="tuitionPay">
			<div class="chooseSch">
				<select data-toggle="select" class="form-control select select-primary select-lg mrs mbm school" id="schoolInfo">
				   	<option value="0">请选择学校</option>
				    <c:forEach var="school" items="${schools }"	varStatus="status">
				    	<option value="${school }">${school }</option>
			        </c:forEach>
				</select>
				<div class="form-group stuNo">
                   <input class="form-control typeahead-only input-primary" type="text" placeholder="请输入学号" id="stuNoInfo" />
                </div> 
                 <button type="button" class="btn btn-primary btn-block schoolSumit" onclick="tuitionPay()">提交</button>  
			</div>
		</div>
		
		<form id = "generaOrderInfo">
		   <input type="hidden" name="amount"  id="amount" value="">
		   <input type="hidden" name="feeRemark"  id="feeRemark"  value="">
		   <input type="hidden" name="stuNo"  id="stuNo" value="">
		   <input type="hidden" name="schoolName"  id="schoolName" value="">
		</form>
		
	</div>
<!-- jQuery -->
<script src="<%=contextPath%>/js/jquery-1.11.3.js"></script>
<!-- Bootstrap JavaScript -->
<script src="<%=contextPath%>/js/flat-ui.min.js"></script>
<script src="<%=contextPath%>/assets/js/application.js"></script>
<script src="<%=contextPath%>/js/tuitionCounsel.js"></script>
<script>
      $(document).ready(function(){
        $('select[name="inverse-dropdown"], select[name="inverse-dropdown-optgroup"], select[name="inverse-dropdown-disabled"]').select2({dropdownCssClass: 'select-inverse-dropdown'});
        $('select[name="searchfield"]').select2({dropdownCssClass: 'show-select-search'});
        $('select[name="inverse-dropdown-searchfield"]').select2({dropdownCssClass: 'select-inverse-dropdown show-select-search'});

      });
      
      function tuitionPay(){
    	  var schoolName = $("#schoolInfo").val();
    	  var stuNo = $("#stuNoInfo").val();
    	  var url = contextPath+"/getStuFee";
    	  
    	  if(schoolName=="0"){
    		  alert("请选择学校");
    		  return;
    	  }
    	  if(stuNo==null||stuNo==""){
    		  alert("请输入学号");
    		  return;
    	  }
    	  
    	   $.ajax({
    		   url:url,
    		   type:"post",
    		   data:{
    			   "schoolName":schoolName,
    			   "stuNo":stuNo
    		   },
    		   success:function(data){
    			   var feeAmount = data.amount;
    			   var feeRemark = data.feeRemark;
    			   var stuNo = data.stuNo;
    			   var schoolName=data.schoolName;
    			   
    			   $("#amount").val(feeAmount);
    			   $("#feeRemark").val(feeRemark);
    			   $("#stuNo").val(stuNo);
    			   $("#schoolName").val(schoolName);
				   $("#generaOrderInfo").attr("action",contextPath+"/tuitionInfo");
				   $("#generaOrderInfo").attr("method","post" );
    			   $("#generaOrderInfo").submit();  
    		   },
    		   error:function(XMLHttpRequest, textStatus, errorThrown){
    			   alert(errorThrown);
    		   }
    	   })
     }
</script>
</body>
</html>