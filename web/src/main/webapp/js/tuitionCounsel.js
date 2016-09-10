/**
 * 咨询功能
 */
$(function(){
	var thisBox = $('.schoolpay');
	var defaultTop = thisBox.offset().top;
	var slide_min = $('.schoolpay .slide_min');
	var slide_tip = $('.schoolpay .slide_tip');
	var isClick = false;
	slide_tip.click(function(event) {
		if(isClick){
		   slide_tip.html("我要咨询");
           slide_min.animate({
				width: '0px',
				opacity: '0'},"slow",function(){
					isClick = false;
				});
			slide_tip.animate({right: '0px'}, "slow");
			$(".counsel").animate({opacity: '0'},"slow");
		}else{
		    slide_tip.html("主人，有什么我可以效劳?");
			slide_min.animate({
				width: '60px',
				opacity: '0.8'},"slow",function(){
					isClick = true;
				});
			slide_tip.animate({right: '60px'}, "slow");
			$(".counsel").animate({opacity: '1'},"slow");
		}
	});

	// // 页面滚动的同时，悬浮框也跟着滚动
	$(window).on('scroll',function(){scro();});
	$(window).onload = scro();
	function scro(){
		var offsetTop = defaultTop + $(window).scrollTop()+'px';
		thisBox.animate({top:offsetTop},
		{	duration: 600,	//滑动速度
	     	queue: false    //此动画将不进入动画队列
	     });
	}
});

 function sendCounsel(){
 	var counsel = $("#counsel_input").val();
     alert(counsel);
 }