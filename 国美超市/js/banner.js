$(function(){
	var i = 0;
	move();
	function move(){
		$("#banner-list li").eq(i).fadeIn().siblings().fadeOut();
		$("#banner-meau ul li").eq(i).addClass("active").siblings().removeClass("active");
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
			$(this).addClass("active").siblings().removeClass("active");
			$("#banner-list li").eq($(this).index()).fadeIn().siblings().fadeOut();
		})
	});
	$("#prev").click(function(){
		i--;
		if(i<0){
			i=$("#banner-meau ul li").length-1;
		}
		$("#banner-list li").eq(i).fadeIn().siblings().fadeOut();
		$("#banner-meau ul li").eq(i).addClass("active").siblings().removeClass("active");
	})
	$("#next").click(function(){
		i++;
		if(i>=$("#banner-meau ul li").length){
			i=0;
		}
		$("#banner-list li").eq(i).fadeIn().siblings().fadeOut();
		$("#banner-meau ul li").eq(i).addClass("active").siblings().removeClass("active");
	})
})
