//使用方法：lee_css({context:'控件文本类容',width:空间宽度,height:控件高度,timeout:空间自动消失时间});
function lee_css(obj){
	var obj=obj;
	//设置加载狂内容和宽高
	function loadingIn(obj){
		$("#loading").remove();
		var $centon="<div id='loading' class='loading "+loadingAnimateIn()+"'>"+obj.context+"</div>";
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
	//点击弹出消失
	function loadingOut(obj){
		//点击弹出消失
		$("#loading").click(function(){
			var $this=$(this);
			$this.removeClass().addClass("loading");
			$this.toggleClass(loadingAnimateOut());
		});
		//自动消失
		function autoLost(){
			$("#loading").removeClass().addClass("loading");
			$("#loading").toggleClass(loadingAnimateOut());
		}
		if(obj.timeout){
			setTimeout(function(){
				try{
					$("#loading").trigger(autoLost());
				}
				catch (e){
					return;
				}
			},obj.timeout*1000);
		}
	}
	//开场动画
	function loadingAnimateIn(){
		var animateIn = new Array();
		animateIn.push(
			"animated bounce",
			"animated tada",
			"animated swing",
			"animated wobble",
			"animated flip",
			"animated flipInX",
			"animated flipInY",
			"animated fadeIn",
			"animated fadeInUp",
			"animated fadeInDown",
			"animated fadeInLeft",
			"animated fadeInRight",
			"animated fadeInUpBig",
			"animated fadeInDownBig",
			"animated fadeInLeftBig",
			"animated fadeInRightBig",
			"animated bounceIn",
			"animated bounceInUp",
			"animated bounceInDown",
			"animated bounceInLeft",
			"animated bounceInRight",
			"animated rotateIn",
			"animated rotateInUpLeft",
			"animated rotateInDownLeft",
			"animated rotateInUpRight",
			"animated rotateInDownRight",
			"animated rollIn"
			);
		var len = animateIn.length;
		var random = Math.floor(Math.random()*len);
		return animateIn[random];
	}
	//消失动画
	function loadingAnimateOut(){
		var animateOut = new Array();
		animateOut.push("animated fadeOut",
						"animated fadeOutUp",
						"animated fadeOutLeft",
						"animated fadeOutRight",
						"animated fadeOutUpBig",
						"animated fadeOutDownBig",
						"animated fadeOutLeftBig",
						"animated fadeOutRightBig",
						"animated bounceOut",
						"animated bounceOutUp",
						"animated bounceOutDown",
						"animated bounceOutLeft",
						"animated bounceOutRight",
						"animated rotateOut",
						"animated rotateOutUpLeft",
						"animated rotateOutDownLeft",
						"animated rotateOutDownRight"
						);
		var len = animateOut.length;
		var random = Math.floor(Math.random()*len);
		return animateOut[random];
	}
	//函数调用
	loadingIn(obj);
	center();
	eventListening();
	loadingOut(obj);
	
}