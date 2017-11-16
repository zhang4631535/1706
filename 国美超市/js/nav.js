$(function(){
	
	$(".nav-list li").mouseenter(function(){
		$(".navCon").show();
		
		var index = $(this).index();
		$.get("json/nav_data.json",function(data){
			var html = template("navCon",data[index]);

			$(".navCon").html(html);
		})
	})
	$("nav").on("mouseleave",function(){
		$(".navCon").hide();
	})	
})
