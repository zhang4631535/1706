$(function(){
	var i = 0;
	move();
	function bgcolor(){
		switch (i){
			case 0 :
				$("#index-banner-top-wrap").css("background","rgb(59,9,130)");
				break;
			case 1 :
				$("#index-banner-top-wrap").css("background","rgb(255,255,255)");
				break;
			case 2 :
				$("#index-banner-top-wrap").css("background","rgb(114,20,230)");
				break;
			case 3 :
				$("#index-banner-top-wrap").css("background","rgb(230,12,132)");
				break;
			case 4 :
				$("#index-banner-top-wrap").css("background","rgb(254,104,9)");
				break;
			case 5 :
				$("#index-banner-top-wrap").css("background","rgb(242,129,11)");
				break;
			case 6 :
				$("#index-banner-top-wrap").css("background","rgb(219,7,107)");
				break;
			case 7 :
				$("#index-banner-top-wrap").css("background","rgb(117,23,231)");
				break;
		}
	}
	function move(){
		$("#banner-list li").eq(i).fadeIn().siblings().fadeOut();
		$("#banner-meau ul li").eq(i).addClass("active").siblings().removeClass("active");
		bgcolor();
	}
	automove();
	function automove(){
		timer = setInterval(function(){
			i++;
			if(i == $("#banner-list li").length){
				i = 0;
			}
			move();
		},3000);
	}
	$("#banner").mousemove(function(){
		clearInterval(timer);
	})
	$("#banner").mouseleave(function(){
		automove();
	})
	$("#banner-meau ul li").each(function(index,item){
		$(this).mouseenter(function(){
			var i= $(this).index();
			console.log(i);
			$(this).addClass("active").siblings().removeClass("active");
			$("#banner-list li").eq($(this).index()).fadeIn().siblings().fadeOut();
			switch (i){
				case 0 :
					$("#index-banner-top-wrap").css("background","rgb(59,9,130)");
					break;
				case 1 :
					$("#index-banner-top-wrap").css("background","rgb(255,255,255)");
					break;
				case 2 :
					$("#index-banner-top-wrap").css("background","rgb(114,20,230)");
					break;
				case 3 :
					$("#index-banner-top-wrap").css("background","rgb(230,12,132)");
					break;
				case 4 :
					$("#index-banner-top-wrap").css("background","rgb(254,104,9)");
					break;
				case 5 :
					$("#index-banner-top-wrap").css("background","rgb(242,129,11)");
					break;
				case 6 :
					$("#index-banner-top-wrap").css("background","rgb(219,7,107)");
					break;
				case 7 :
					$("#index-banner-top-wrap").css("background","rgb(117,23,231)");
					break;
			}
		})
	});
	$("#prev").click(function(){
		i--;
		if(i<0){
			i=$("#banner-meau ul li").length-1;
		}
		$("#banner-list li").eq(i).fadeIn().siblings().fadeOut();
		$("#banner-meau ul li").eq(i).addClass("active").siblings().removeClass("active");
		bgcolor();
	})
	$("#next").click(function(){
		i++;
		if(i>=$("#banner-meau ul li").length){
			i=0;
		}
		$("#banner-list li").eq(i).fadeIn().siblings().fadeOut();
		$("#banner-meau ul li").eq(i).addClass("active").siblings().removeClass("active");
		bgcolor();
	})
	$("#floor-bant ul li").each(function(index,item){
		$(this).mouseenter(function(){
			var i= $(this).index();
			console.log(i);
			$(this).addClass("fl-act").siblings().removeClass("fl-act");
			$("#floor-banner li").eq(i).fadeIn().siblings().fadeOut();
		})
	});
	
})
