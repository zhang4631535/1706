$(function() {
	$("header").load("./header.html");
	$("section").load("./section.html");
	$("footer").load("./footer.html");
	$("#item4").click(function() {
		$("body,html").stop().animate({
			"scrollTop": 0
		}, 500)
	})
	var flag = true;
	$(window).scroll(function() {
		if(flag) {
			var $scrollTop = $(this).scrollTop();
			if($scrollTop > 1700) {
				$("#fixed-bar-wrap").css("position","fixed").css("top","-42px");
			} else {
				$("#fixed-bar-wrap").css("position","relative");
			}
			//						console.log($("#main .Louti").eq(1).offset().top);
			$("#index-section #floor-area-wrap").each(function() {
				if($(this).offset().top >= $scrollTop) {
					//								console.log($(this).index());
					console.log($(this).index());
					$("#index-floor li").eq($(this).index()).addClass("floors").siblings().removeClass("floors");
					return false;
				}
			})
		}
	})
	$("#item1 i").mouseenter(function(){
		$("#item1 a").animate({"left":-82},100).css("display","block");
	})
	$("#item1 i").mouseleave(function(){
		$("#item1 a").animate({"left":0},100).css("display","none");
	})
	$("#item3 i").mouseenter(function(){
		$("#item3 a").animate({"left":-82},100).css("display","block");
	})
	$("#item3 i").mouseleave(function(){
		$("#item3 a").animate({"left":0},100).css("display","none");
	})
})