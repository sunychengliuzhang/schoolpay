$(function(){
	var hoverId =$('#deal_1');
	var item = $('.trade-main-con .record-item');

	item.delegate('.trade-ctr','mouseenter',function(){
		var that = $(this);

		that.find('.detail-and-del').show();
	}).delegate('.detail-and-del','mouseleave',function(){
		var that = $(this);

		that.hide();
	}).delegate('.del-record','click',function(){
		var that = $(this);
		var parentDom = that.parents('.record-item');
		parentDom.remove();
	});


	function changeItem(dom){
		$(dom).delegate('.item','click',function(){
			var that = $(this);
			that.siblings().removeClass('cur');
			that.addClass('cur');
		})
	}
	changeItem('#trade_time_wrap');
	changeItem('#trade_txt_item');
	changeItem('#trade_detail_item');

	initToday();
	loadPageRecoreds();
});


/*
 * 设置查询状态
 */
function setStatus(s,obj){
	$("#inp_status").val(s);
	resetParam();
	loadPageRecoreds();
}
/*
 * 生成交易记录行内容
 * data:交易记录对象
 * rowType:该行的显示样式，奇偶行
 */
function makeTradeRecordRow(data,rowType){
	var rowHtml = "";
	
	//交易状态样式类
	var recordStatusClass="";
	if(data.status == "3"){
		recordStatusClass = "success";
	}else if(data.status == "4"){
		recordStatusClass = "fail";
	}
	
	//交易状态
	var tradeStatus="";
	switch(data.status){
		case "11":
			tradeStatus = "待支付";
			break;
		case "22":
			tradeStatus = "支付成功";
			break;
		case "34":
			tradeStatus = "支付成功";
			break;
		case "99":
			tradeStatus = "支付失败";
			break;
	}
	//交易状态
	var payWay="";
	switch(data.payWay){
		case "10":
			payWay = "微信";
			break;
		case "11":
			payWay = "手机WEB";
			break;
		case "12":
			payWay = "个人网银";
			break;
		case "13":
			payWay = "企业网银";
			break;
		case "14":
			payWay = "无卡";
			break;
	}
	
	rowHtml += "<p class=\"record-item  "+ recordStatusClass +" "+ rowType + " \">";
		rowHtml += "<a class=\"trade-order-number\" title=\""+data.orderCode+"\">"+data.orderCode+"</a>";			//订单号
		rowHtml += "<a class=\"trade-time\" title=\""+data.reservedField1+"\">"+data.reservedField1+"</a>";			//交易时间
		rowHtml += "<a class=\"trade-type\" title=\""+data.payWay+"\">"+payWay+"</a>";								//交易类型
		rowHtml += "<a class=\"trade-amounts\" title=\""+data.reservedField3+"\">"+data.reservedField3+"</a>";		//交易金额
		rowHtml += "<a class=\"trade-order-number\" title=\""+data.stuNo+"\">"+data.stuNo+"</a>";					//学号
		rowHtml += "<a class=\"trade-order-number\" title=\""+data.reservedField2+"\">"+data.reservedField2+"</a>";	//学生姓名
		rowHtml += "<a class=\"trade-status\" title=\""+tradeStatus+"\">"+tradeStatus+"</a>";						//交易状态
	rowHtml +="</p>";
	
	return rowHtml;
}
/*
 * 渲染交易记录表格
 */
function renderRecordTable(rows){
	var recordsContainer = $("#recordsTable");
	clearRecords();
	
	for(var i=0;i<rows.length;i++){
		var type = i%2==0?"even":"odd";
		var tr = makeTradeRecordRow(rows[i],type);
		recordsContainer.append(tr);
	}
}
/*
 * 清空节点
 */
function clearRecords(){
	var recordsContainer = $("#recordsTable");
	recordsContainer.empty();
}
/*
 * 修改分页器状态
 * pageNumber:当前页码
 * pageCount:总页数
 */
function showPager(pageNumber,pageCount){
	if(pageCount==0){
		$('#pagination2').hide();
		return;
	}else{
		$('#pagination2').show();
	}
	$.jqPaginator('#pagination2', {
	        totalPages: parseInt(pageCount),
	        visiblePages: 10,
	        currentPage: parseInt(pageNumber),
	        prev: '<li class="prev"><a href="javascript:void(0);">上一页</a></li>',
	        next: '<li class="next"><a href="javascript:void(0);">下一页</a></li>',
	        page: '<li class="page"><a href="javascript:void(0);">{{page}}</a></li>',
	        onPageChange: function (num, type) {
	           if(type=="change"){
	        	   $("#hidPageNumber").val(num);
	        	   loadPageRecoreds();
	           }
	        }
	});
}
/*
 * 查询交易记录
 * startDate:开始时间
 * endDate:结束时间
 * tradeStatus:交易状态
 * pageNumber:显示页码数
 * pageSize:每页显示条数
 */
function queryDetailDatas(startDate,endDate,tradeStatus,pageNumber,pageSize){

	$.ajax({
		url: contextPath+"/orderQueryAction/queryOrderList",
		type:'POST',
        data:{
        	pageNum:pageNumber,
        	pageSize:pageSize,
        	startDate:startDate,
        	endDate:endDate,
        	status:tradeStatus
        },
        success: function (data){
        	if(data.status == "false"){
        		$("#recordList").hide();
        		$("#noRecord").show();
        		showPager(0,0);
        	}else{
        		$("#recordList").show();
        		$("#noRecord").hide();
        		var pageCount = data.pageCount;
        		renderRecordTable(data.datas);
        		showPager(pageNumber,pageCount);
        	}
        },
        error:function(XMLHttpRequest, textStatus, errorThrown){
        	alert("服务器异常");
        }
	});
}
/*
 * 加载数据
 */
function loadPageRecoreds(){
	var pageSize = 2;
	var pageNumber =  $("#hidPageNumber").val();
	var startDate = $("#inp_beginTime").val();
	var endDate = $("#inp_endTime").val();
	var status = $("#inp_status").val();
	
	queryDetailDatas(startDate,endDate,status,pageNumber,pageSize);
}
/*
 * 重置查询参数
 */
function resetParam(){
	$("#hidPageNumber").val(1);
}
/*
 * 初始化日期选择控件
 */
function initToday(){
	var date = new Date();
	var startDate = $("#inp_beginTime");
	var endDate = $("#inp_endTime");
	
	startDate.val(date.Format("yyyy-MM-dd"));
	endDate.val(date.Format("yyyy-MM-dd"));
}
/*
 * 设置时间选择
 */
function setDatePicker(obj){
	if(obj.id=="inp_beginTime"){
		WdatePicker({
			maxDate:'#F{$dp.$D(\'inp_endTime\')}',
			onpicked: function(){
				resetParam();
				loadPageRecoreds();
			}
		});
	}else if(obj.id=="inp_endTime"){
		WdatePicker({
			minDate:'#F{$dp.$D(\'inp_beginTime\')}',
			onpicked: function(){
				resetParam();
				loadPageRecoreds();
			}
		});
	}else{
		WdatePicker();
	}
}
/*
 * 计算时间段并加载数据
 */
function calDateAndLoadData(type){
	var date = new Date();
	var startDate = $("#inp_beginTime");
	var endDate = $("#inp_endTime");
	
	endDate.val(date.Format("yyyy-MM-dd"));
	switch(type){
		case "today":
			startDate.val(date.Format("yyyy-MM-dd"));
			break;
		case "1m":
			date.setMonth(date.getMonth()-1);
			startDate.val(date.Format("yyyy-MM-dd"));
			break;
		case "3m":
			date.setMonth(date.getMonth()-3);
			startDate.val(date.Format("yyyy-MM-dd"));
			break;
		case "1y":
			date.setFullYear(date.getFullYear()-1);
			startDate.val(date.Format("yyyy-MM-dd"));
			break;
	}
	
	resetParam();
	loadPageRecoreds();
}
/*
 * 格式化日期对象
 * 用法:Date.Format("yyyy-MM-dd")
 */
Date.prototype.Format = function(fmt){   
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}  