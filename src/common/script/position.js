;(function(window){
	//取得当前浏览器窗口宽度
    var winW = document.documentElement.clientWidth || document.body.clientWidth;
    //将根节点fontsize设置为宽度的十分之一
    document.documentElement.style.fontSize = winW /750*100+ "px";
    //当页面大小发生改变，重新修正1rem为新窗口尺寸的十分之一
    window.onresize = function(){
        document.documentElement.style.fontSize = (document.documentElement.clientWidth || document.body.clientWidth) /750*100 + "px";
    }
})(window);
