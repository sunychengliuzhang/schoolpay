<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<%@ include file="header.jsp"%>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>缴学费结果</title>
 <!-- Bootstrap CSS -->
	<link href="<%=contextPath%>/css/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet"></head>
	<!-- Loading Flat UI -->
	<link href="<%=contextPath%>/css/flat-ui.css" rel="stylesheet">
	<link href="<%=contextPath%>/css/tuitionCounsel.css" rel="stylesheet">
</head>
<body>
<div class="container">
		<div class="page-header">
			<h3>
				缴学费
				<small>便捷支付</small>
			</h3>
		</div>
		<div class="row">
			<div class="col-sm-10 col-sm-offset-1">
				<div class="panel panel-primary">
			       <div class="panel-heading">支付结果: <span style="float: right">支付成功</span></div>
			       <div class="panel-body">
				        <ul class="list-inline">
					        <li class="text-info">学校：</li>
					        <li>亚信大学</li>
					    </ul>
					    <ul class="list-inline">
					        <li class="text-info">学号：</li>
					        <li>123456</li>
					    </ul>
					    <ul class="list-inline">
					        <li class="text-info">学费详情：</li>
					        <li>Maecenas sed diam eget risus varius blandit sit</li>
					    </ul>
                   </div>
                    <div class="panel-footer">
                	    <div class="row">
                	         <div class="col-sm-offset-10 col-sm-2">
                	   	         <p>合计:3.14元</p>
                	         </div>
                	    </div>
                    </div>
				</div>
			</div>
			<div class="col-sm-10 col-sm-offset-1">
				<button type="button" class="btn btn-info btn-lg btn-block">完成</button>
			</div>
		</div>
</div>
<!-- jQuery -->
<script src="../js/jquery-1.11.3.js"></script>
<!-- Bootstrap JavaScript -->
<script src="../js/flat-ui.min.js"></script>
<script src="../assets/js/application.js"></script>

  <script>
      $(document).ready(function(){
        $('select[name="inverse-dropdown"], select[name="inverse-dropdown-optgroup"], select[name="inverse-dropdown-disabled"]').select2({dropdownCssClass: 'select-inverse-dropdown'});

        $('select[name="searchfield"]').select2({dropdownCssClass: 'show-select-search'});
        $('select[name="inverse-dropdown-searchfield"]').select2({dropdownCssClass: 'select-inverse-dropdown show-select-search'});
      });
    </script>


</body>
</html>