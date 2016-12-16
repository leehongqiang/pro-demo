//使用方法：lee_css({context:'控件文本类容',width:空间宽度,height:控件高度});
function lee_css(obj){
	var obj=obj;
	//设置加载狂内容和宽高
	function loading(obj){
		$("#loading").remove();
		var $centon="<div id='loading' class='loading magictime swap'>"+obj.context+"</div>";
		var $width = obj.width+"px";
		var $height = obj.height+"px";
		$("body").append($centon);
		$("#loading").css({width:$width,height:$height});
	} 
	//定位加载框位置于浏览器中间
	function center(){
		var $width = $("#loading").width();
		var $height = $("#loading").height();
		var browser_width = ($(window).width()-$width)/2;
		var browser_height = ($(window).height()-$height)/2;
		$("#loading").css({left:browser_width,top:browser_height,lineHeight:$height+"px"});
	}
	//监听浏览器改变，始终让控件居中显示
	function eventListening(){
		$(window).resize(function(){
			center();
		});
	}
	//函数调用
	loading(obj);
	center();
	eventListening();
}