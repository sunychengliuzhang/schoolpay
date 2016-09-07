/**
 * 使用 $("").mask({msg:"正在发送..."})
 * @param $
 */
(function($){
    $.fn.mask = function(options){ 
    	
    	if (typeof options == 'string'){
            return $.fn.mask.methods[options](this);
        }
    	
    	var wrap = $(this);
    	
		if($("div.messagebox-loading-modal",wrap).length){
			wrap.mask("hide");
		}
		
        wrap.attr("position",wrap.css("position"));
		wrap.attr("overflow",wrap.css("overflow"));
        wrap.css("position", "relative");
		wrap.css("overflow", "hidden");
        
        var maskMsgCss = {
            position:"absolute"
        };
		
        $('<div class="messagebox-loading-modal" style="background-color:#000000;position:fixed;top: 0px;left: 0px;width: 100%;height: 100%;opacity:0.3;filter:alpha(opacity=30);"></div>').css({zIndex:10000,}).appendTo(wrap);
		
        var loadMsg = '<div class="messagebox-loading-img" style="width:350px; height:160px; background:#fff; position:fixed; left:38%;top:30%; border:8px solid #fc8404;-moz-border-radius: 10px;border-radius:10px;">'+
                      	  '<h3 style="height:60px; line-height:60px; margin:0px 20px; font-size:20px; border-bottom:1px solid #e1b688; color:#383838; padding-left:15px;"><img style="border:none; border:0px;" src="'+contextPath+'/images/load.gif">&nbsp;&nbsp;'+options.msg+'...</h3>'+
	                      '<div style="padding:20px 30px 10px; line-height:28px;">'+
	                      '请稍等<br />'+
	                      '</div>'+
                      '</div>';
        
        var maski = $(loadMsg).css(maskMsgCss).appendTo(wrap);
        var scrollTop = $(document).scrollTop();
        var windowHeight = $(window).height(); 
        var left = (wrap.width() - $('div.messagebox-loading-img', wrap).outerWidth())/ 2;
		var top = (windowHeight - $('div.messagebox-loading-img', wrap).outerHeight())/ 2 + scrollTop;
		
        maski.css({
            display : 'block',
            zIndex:10001,
            left : left,
            top :  top
        });
        
        return wrap;
    };
	
    $.fn.mask.methods = {
        hide : function(jq) {
            return jq.each(function() {
                var wrap = $(this);
                $("div.messagebox-loading-modal",wrap).fadeOut(function(){
                    $(this).remove();
                });
                $("div.messagebox-loading-img",wrap).fadeOut(function(){
                    $(this).remove();
                    wrap.css("position",  wrap.attr("position"));
					wrap.css("overflow", wrap.attr("overflow"));
					wrap.css("overflow", "auto");
                });
            });
        }
    };
    
    $.fn.alert = function(options){ 
    	
    	var warning = "error_1.jpg";
    	var ok = "win_1.png";
    	var error = "icon-colse.png";
    	
    	var msg = "";
    	var title = "提示";
    	var icon = warning;
    	
    	if (typeof options == 'string'){
    		msg = options;
    	}else{
    		msg = options.msg;
    		title = options.title;
    		if(options.icon == "ok"){
    			icon = ok;
    		}
    	}
    	
    	
    	if(title == undefined){
    		title = "提示";
    	}
    	
    	
    	
    	if(icon == undefined || icon=="warning"){
    		
    	}
    	
    	if(icon == "ok"){
    		icon = ok;
    	}
    	
    	if(icon == "error"){
    		icon = error;
    	}
    	
    	var wrap = $(this);
		
        wrap.attr("position",wrap.css("position"));
		wrap.attr("overflow",wrap.css("overflow"));
        wrap.css("position", "relative");
		wrap.css("overflow", "hidden");
        
        var maskMsgCss = {
            position:"absolute"
        };
		
        $('<div class="messagebox-loading-modal" style="background-color:#000000;position:fixed;top: 0px;left: 0px;width: 100%;height: 100%;opacity:0.3;filter:alpha(opacity=30);"></div>').css({zIndex:10000,}).appendTo(wrap);
		
        var loadMsg = '<div class="messagebox-loading-img" style="width:350px; height:auto; background:#fff; position:fixed; left:38%;top:30%; border:8px solid #fc8404;-moz-border-radius: 10px;border-radius:10px;">'+
                      	  '<h3 style="height:60px; line-height:60px; margin:0px 20px; font-size:20px; border-bottom:1px solid #e1b688; color:#383838; padding-left:15px;"><img style="border:none; border:0px;" src="'+contextPath+'/images/'+icon+'">&nbsp;&nbsp;'+title+'</h3>'+
	                      '<div style="padding:20px 30px 10px; line-height:28px;">'+
	                      msg+"<br><div style='text-align:center;padding-top:5px;'><input class='qqqqqccccc' type='button' value=' 确 定  ' style='border: solid 1px;background-color: #fc8404;color: #ffffff;font-size:16px;'></div>"+
	                      '</div>'+
                      '</div>';
        
        var maski = $(loadMsg).css(maskMsgCss).appendTo(wrap);
        var scrollTop = $(document).scrollTop();
        var windowHeight = $(window).height(); 
        var left = (wrap.width() - $('div.messagebox-loading-img', wrap).outerWidth())/ 2;
		var top = (windowHeight - $('div.messagebox-loading-img', wrap).outerHeight())/ 2 + scrollTop;
		
        maski.css({
            display : 'block',
            zIndex:10001,
            left : left,
            top :  top
        }).find("input.qqqqqccccc").unbind(".qqqqqccccc").bind("click.qqqqqccccc",function(e){
        	$("div.messagebox-loading-modal",wrap).fadeOut(function(){
        		if(options.okClick != undefined){
        		    options.okClick();
        		}
                $(this).remove();
            });
            $("div.messagebox-loading-img",wrap).fadeOut(function(){
                $(this).remove();
                wrap.css("position",  wrap.attr("position"));
				wrap.css("overflow", wrap.attr("overflow"));
				wrap.css("overflow", "auto");
            });
		}).focus();
        
        return wrap;
    };
    
})(jQuery);