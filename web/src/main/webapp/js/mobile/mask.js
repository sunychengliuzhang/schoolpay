(function($){
	$.mask = function(options){
		var data = {

			maskCon : '<div class="mask" id="mask">'+
							'<div class="mask-bg" id="mask_bg"></div>'+
							'<div class="mask-con" id="mask_con">'+
								'<div class="con-bg"></div>'+
							'</div>'+
						'</div>',
			tipWord : '这是弹层',
			time : 5000

		};

		var _data = $.extend(data,options);
		var t = _data.time;

		$('body').append(_data.maskCon);
		
		var detailCon = '<div class="mask-detail">' + _data.tipWord + '</div>';
		var maskId = $('#mask');
		var maskDetail = $('#mask_con');

		maskDetail.append(detailCon);

		var h = $('.mask-detail',maskId).height();


		$('.mask-con',maskId).css('height',h+'px');
		$('.mask-con',maskId).css('margin-top',-(h/2+10)+'px');

		setTimeout(function(){maskId.hide();}, t);

		$('#mask_bg').on('click',function(e){
			e.stopPropagation();
			maskId.hide();
		});
	}
	
})(jQuery);
//返回需要显示的内容message
function returnMess(message){
	if($('#mask').length>0){
		$('#mask').remove();
	}
	var option ={
			maskCon : '<div class="mask" id="mask">'+
								'<div class="mask-bg" id="mask_bg"></div>'+
								'<div class="mask-con" id="mask_con">'+
									'<div class="con-bg"></div>'+
								'</div>'+
							'</div>',
			tipWord : message,
			time : 5000

		}
	return option;
}
