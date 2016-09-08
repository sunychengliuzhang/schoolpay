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
				<div class="tile">
					<h3 class="tile-title tuition_title">订单信息</h3>
					<p>100% convertable to HTML/CSS layout.</p>
					<a class="btn btn-primary btn-large btn-block" href="http://designmodo.com/flat">微信支付</a>
				</div>
			</div>
		</div>
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
</script>


</body>
</html>