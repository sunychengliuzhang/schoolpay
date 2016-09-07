$(function(){

    var btnwrap = $('.pay-complete-wrap');

    $('.pay-btn',btnwrap).on('click',function(){

        var that = $(this);

        if(that.hasClass('other-pay')){

        }else if(that.hasClass('return-home')){

        }else if(that.hasClass('pay-again-btn')){

        }
    });

});

//返回快速缴学费首页
function backFastPayTuition(){
    location.href = contextPath + "/tuitionQueryAction/tuitionQuery";
}
