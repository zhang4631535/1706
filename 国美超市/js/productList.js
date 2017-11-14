$(function() {
	$.get("json/test.json", function(data) {
		var str = "";
		for(var i in data) {
			str += "<li><a class='pic' href='detail.html?id=" + i + "'><img src='" + data[i].imgsrc + "'/></a><p class='name'><a href='#'>" + data[i].title + "</a></p><p class='price'>" + data[i].price + "</p></li>"
		}
		console.log(str);
		$("#prolist").html(str);
	})
})
/*var oUl = document.getElementById('proList');
	//		var oSpan = document.getElementById('cartNum').children[0].children[0];

	var str = "";
	for(var i in data) {
		str += "<li><a href='detail.html?id=" + i + "'><img src='" + data[i].imgsrc + "'/></a><h4>" + data[i].title + "</h4><p>" + data[i].price + "</p><input type='button' data-id ='" + i + "' value='加入购物车'></li>"
	}
	oUl.innerHTML = str;

	var aBtn = document.getElementsByTagName("input");

	if(getCookie("cart")) {
		var objCookie = JSON.parse(getCookie("cart"));
	} else {
		var objCookie = {};
	}

	//		var total = 0;
	//		for(var i in objCookie){
	//			total += objCookie[i];
	//		}
	//		oSpan.innerHTML = total;

	for(var i = 0; i < aBtn.length; i++) {
		aBtn[i].onclick = function() {

			var proId = this.getAttribute("data-id");

			if(!objCookie[proId]) {
				objCookie[proId] = 1;
			} else {
				objCookie[proId] += 1;
			}

			var strCookie = JSON.stringify(objCookie);

			setCookie("cart", strCookie, 7);

			//				total += 1;
			//				oSpan.innerHTML = total;

		}
	}
*/