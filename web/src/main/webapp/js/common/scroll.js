(function($,window) {
    var $scrollElem = $('html, body'),
        $win = $(window),
        isIE6 = !-[1,] && !window.XMLHttpRequest,
        isMac = window.navigator.platform.toLowerCase().indexOf('mac') > -1,
        thisDot = $('.change-page-play .dot'),
        thisTab = $('#s_tab_wrap .com-tab');
        loginEn = $('#other_login_enter');
 

         /*初始化的时候记录dot是第几个以及第几个tab*/
        var num =  0;
        if(window.pageYOffset ||window.pageYOffset == 0){
            setTimeout(function(){
                num = window.pageYOffset;
                changestatus(num);
            },300);
            
        }else if(document.documentElement.scrollTop || document.documentElement.scrollTop == 0){
            setTimeout(function(){
                num = document.documentElement.scrollTop;
                changestatus(num);
            },300);
        }
        function _placeholder(){
            var doc=document,
            inputs=doc.getElementsByTagName('input'),
            supportPlaceholder='placeholder'in doc.createElement('input');
      
         placeholder=function(input,placer,isture){
              var text = placer,
                  defaultValue = input.defaultValue;
              if(isture){
                if(defaultValue==''){
                     input.value=text
                  }
                  input.onfocus=function(){
                    if(input.value===text)
                      {
                       this.value=''
                      }
                    };
                  input.onblur=function(){
                      if(input.value===''){
                           this.value=text
                          }
                      }
              }else{
                input.onfocus=function(){
                    var that =$(this);
                    that.parent().find('.mask').hide();
                    };
                    $(input).parent().delegate('.mask','click',function(){
        				var cur = $(this);
        				cur.prev().focus();
        				cur.hide();
        			});
                input.onblur=function(){
                    var that =$(this);
                    if(!that.val()){
    			  		that.parent().find('.mask').show();
    		  		}
                };
              }   
         };
      
         if(!supportPlaceholder){
             
              $.each(inputs,function(e){
                var that = $(this);
                var text = that.attr('placeholder');
                if(that.attr('type') ==='text' && text){
                    placeholder(that[0],text,true);
                }else if(that.attr('type') =='password' && text){
                    that.parent().append('<div class="mask" style="width:200px;position:absolute;top:10px;left:55px;font-size:14px;">密码</div>')
                    placeholder(that[0],text,false);
                }

              });
         }
        }
    function changestatus(num){
         if(num < 600){
                thisDot.removeClass('cur-dot');
                thisTab.removeClass('cur-tab');
                thisDot.eq(0).addClass('cur-dot');
                thisTab.filter('.home-page').addClass('cur-tab');
                loginEn.hide();
            }else if( 600<= num && num< 1240) {
                thisDot.removeClass('cur-dot');
                thisTab.removeClass('cur-tab');
                loginEn.show();
                thisDot.eq(1).addClass('cur-dot');
                thisTab.filter('.safe-protect').addClass('cur-tab');
            }else if(1240<= num && num < 1840){
                thisDot.removeClass('cur-dot');
                thisTab.removeClass('cur-tab');
                loginEn.show();
                thisDot.eq(2).addClass('cur-dot');
                thisTab.filter('.merchants-server').addClass('cur-tab');
            }else if(num >= 1840){
                thisDot.removeClass('cur-dot');
                thisTab.removeClass('cur-tab');
                loginEn.show();
                thisDot.eq(3).addClass('cur-dot');
            }
    }
       

    var PageCtrl = function(options) {
        this.init(options);
    };

    PageCtrl.prototype = {
        init: function(options) {
            this.curIndex = 0;
            this.wrapper = options.wrapper;
            this.pages = this.wrapper.children('section');
            this.pageCount = this.pages.length;
            this.scrollTop = 0;
            this.isScroll = false;
            this.time = null;
            this._bindEvent();
        },

         /* 事件绑定
         * @private
         */
        _bindEvent: function() {
            var self = this;


            /*兼容个浏览器mousewheel事件*/
            if (window.addEventListener) {
                window.addEventListener('DOMMouseScroll', function(event) {self.scroll.call(self, event)}, false);
                window.addEventListener('mousewheel', function(event) {
                    self.scroll.call(self, event);
                }, false);
                window.addEventListener('MozMousePixelScroll', function(event) {
                    event.preventDefault();
                }, false);
            } else {
                document.onmousewheel = function() {
                    self.scroll.call(self);
                };
            }

            // change.page事件
            var topDelta = isIE6 ? 0 : 50,
                animateName = isMac ? 'mac' : 'pc';

            var animateFn = {
                mac: function(scrollTop) {
                    $scrollElem.animate({
                        scrollTop: scrollTop
                    }, 1000, function() {
                        setTimeout(function() {
                            self.isScroll = false;

                            if(scrollTop>=690){
                                loginEn.show();
                            }else{
                                loginEn.hide();
                            }
                        }, 500);
                    });
                },
                pc: function(scrollTop) {
                    $scrollElem.animate({
                        scrollTop: scrollTop
                    }, function() {
                        self.isScroll = false;
                        if(scrollTop>=690){
                            loginEn.show();
                        }else{
                            loginEn.hide();
                        }
                    });
                }
            };

            this.wrapper.on('changepage', function(event, data) {
                var $nextPage = self.pages.eq(data.nextIndex);

                self.pages.eq(data.prevIndex).trigger('exit');

                $nextPage.trigger('enter');

                self.scrollTop = data.nextIndex === 0 ? 0 : $nextPage.offset().top;

                // self.scrollTop -= topDelta;

                animateFn[animateName](self.scrollTop);
            });

            // pages 进入/退出事件
            self.pages.on('enter', function() {
                var $this = $(this);
                self.onEnter($this);
            });
            self.pages.on('exit', function() {
                var $this = $(this);
                self.onExit($this);
            });
        },
        scroll: function(event) {
            var oEvent = event || window.event;

            if (oEvent.preventDefault) {
                oEvent.preventDefault();
            } else {
                oEvent.returnValue = false;
            }

            if (this.isScroll) {
                return;
            }
             //play-dot
            var changeDot = function(idx){
                thisDot.removeClass('cur-dot');
                thisDot.eq(idx).addClass('cur-dot');
            }
            //change cur tab
            var changeTab = function(seq){
                thisTab.removeClass('cur-tab');
                thisTab.each(function(){
                    var that = $(this);
                    var id = that.attr('data-id');
                    if(seq == id){
                        that.addClass('cur-tab');
                    }
                });
            }

            this.isScroll = true;
            var self = this,
                delta = oEvent.wheelDelta ? oEvent.wheelDelta : -oEvent.detail;
            var curIndex = 0;
            if (delta < 0) {

                curIndex = Math.min((self.curIndex + 1), self.pageCount - 1);
                
            } else {
                curIndex = Math.max((self.curIndex - 1), 0);
                 
            }

            changeDot(curIndex); 
            changeTab(curIndex);
            self.setIndex(curIndex);
        },
        onEnter: function($dom) {
            $dom.addClass('animate-enter').removeClass('animate-exit');
        },
        onExit: function($dom) {
            $dom.removeClass('animate-enter').addClass('animate-exit');
        },

        setIndex: function(index) {

            var prevIndex = this.curIndex;
            this.curIndex = index;
            this.wrapper.trigger('changepage', {
                prevIndex: prevIndex,
                nextIndex: index
            });
        }
    };

    var pageCtrl = new PageCtrl({
        wrapper: $('#s_main')
    });

    //不使用鼠标向下滚动的状态
    $win.on('scroll',function(){
        if(window.pageYOffset ||window.pageYOffset == 0){
            setTimeout(function(){
                num = window.pageYOffset;
                changestatus(num);
            },30);
            
        }else if(document.documentElement.scrollTop || document.documentElement.scrollTop == 0){
            setTimeout(function(){
                num = document.documentElement.scrollTop;
                changestatus(num);
            },30);
        }
        
    });
    //点击登录
    $('.login-enter-btn',loginEn).on('click',function(){

        if($('body').find('#mask_login_wrap').length){
            var _layerId = $('#mask_login_wrap');

            changeValidCode($("#idVilidCodeInMask").get(0));
            $("#passRandomMask").val($("#passRandom").val());
            _layerId.show();
        }else{
            var layerLogin = '<div class="mask-login-wrap" id="mask_login_wrap">'+
                                '<div class="mask-layer"></div>'+
                                '<div class="mask-layer-con">'+
                                    '<div class="opacity-login-wrap"></div>'+
                                    '<div class="login-wrap">'+
                                            '<form action="" method="post" id="maskLoginVo">'+
                                                '<div class="login-title">登录鸿支付</div>'+
                                                '<div class="login-user-name"><input type="text" placeholder="手机/账号" id="userAcctMask" name="userAcct"/></div>'+
                                                '<div class="login-user-password"><input type="password" placeholder="密码" id="userPwdMask" name="userPwd"/><input type="hidden" name="passRandom" id="passRandomMask"/></div>'+
                                                '<div class="login-check"><span class="login-check-input"><input type="text" placeholder="验证码" id="virifiNumMask" name="virifiNum"/></span><span class="check-num"><img id="idVilidCodeInMask" onclick="changeValidCode(this)"  style="cursor:pointer;height:100%;width:100%" alt="换一张"/></span></div>'+
                                                '<a class="login-btn" href="javascript:void(0);" onclick="doUserLoginMask();return false">登录</a>'+
                                                '<div class="login-other"><a class="forget-password" href="javascript:void(0);" onclick="forgetPwd(\'mask\');return false">忘记登录密码？</a><a class="free-register" href="javascript:void(0);" onclick="regist();return false">免费注册</a></div>'+
                                            '</form>'+
                                            '<div class="login-err-msg" style="display:none" id="msgDivMask"><span class="err-img"></span><span class="login-err-detail" id="loginUpMsgMask"></span></div>'+
                                    '</div>'+
                                    '<div class="mask-close-btn"></div>'+
                                '</div>'+
                            '</div>';
            $('body').append(layerLogin);
            _placeholder();
            $("#passRandomMask").val($("#passRandom").val());
            changeValidCode($("#idVilidCodeInMask").get(0));
        }
        
        var layerId = $('#mask_login_wrap');

        layerId.delegate('.mask-close-btn','click',function(){
            layerId.hide();

        });
    });
    // qrcode go-top
    if (isIE6) {
        var time = null, $qrcode = $('.qrcode');
        $win.on('scroll', function() {
            if (time) {
                clearTimeout(time);
                time = null;
            }
            time = setTimeout(function() {
                var top = $win.scrollTop(),
                    height = $win.height();
                $qrcode.animate({
                    top: top + 100
                });
                $goTop.animate({
                    top: top + height - 100
                })
            }, 300);
        });
    }


})(jQuery, window);
