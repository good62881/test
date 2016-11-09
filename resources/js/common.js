// JavaScript Document



//REM自适配
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if(clientWidth > 640){
                clientWidth = 640;
            }
            docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);



var even='click'||'touchstart';



$(function() {



//初始化
var mySwiper = new Swiper ('.swiper-container', {
	direction: 'vertical',
	onSlideChangeEnd: function(swiper){
		if(swiper.activeIndex==6){
			$(".array").hide();
		}else{
			$(".array").show();
		}
    }
});

$('.p7 input,.p7 textarea').focus(function(){
	mySwiper.detachEvents();
});
$('.p7 input,.p7 textarea').blur(function(){
	mySwiper.attachEvents();
});



});