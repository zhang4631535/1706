function setCookie(name, value, day) {
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + day);
	document.cookie = name + "=" + value + ";expires=" + oDate;

}

function getCookie(name) {
	var strCookie = document.cookie;
	//需要对字符串进行分割（;）
	var arrCookie = strCookie.split("; ");
	//console.log(arrCookie);
	for(var i = 0; i < arrCookie.length; i++) {
		//把数组中的每一项以=分割，判断形参和分割后的数组中的第一元素是否相等，相等则返回第二个元素
		var arr = arrCookie[i].split("=");
		if(arr[0] == name) {
			return arr[1];
		}
	}
}

function removeCookie(name) {
	setCookie(name, 1, -1);

}

/*
 		封装ajas
 		
 	 封装ajax方法的参数说明
			 * type: 请求类型 （必须）
			 * url:  请求地址(必须)
			 * data: 请求参数 （非必须）
			 * fnSuc: 请求成功时的回调函数（必须）
			 * fnFail: 请求失败时的回调函数（非必须）
			 * 
			
			
			 data
			 * var data = {"username":"john","age":20}
			 * => username=john&age=20
			 * data.php?username=john&age=20
			 
 */
function Ajax(type, url, data, fnSuc, fnFail) {
	var xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	var str = "";
	for(var i in data) {
		str += i + "=" + data[i] + "&";
	}
	str = str.replace(/&$/, "");

	if(type.toUpperCase() == "GET") {
		xhr.open("GET", url + "?" + str, true);
		xhr.send();
	} else {
		xhr.open("POST", url, true);
		xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
		xhr.send(str);
	}
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4) {
			if(xhr.status == 200) {
				if(fnSuc) {
					var data = xhr.responseText;
					fnSuc(data);
				}
			} else {
				if(fnFail) {
					fnFail();
				}
			}
		}
	}
}