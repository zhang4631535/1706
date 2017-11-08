/*
	通过ID获取DOM对象
*/
function $(id) {
	return document.getElementById(id);
}

/*
	给数字添加前缀0
*/
function addPrefixZero(num) {
	if(num < 10) {
		return '0' + num;
	}
	return num;
}
/*
 * 增加cookie
 * name表示cookie名
 * value表示cookie值
 * day表示有效期
 */
function setCookie(name, value, day) {
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + day);
	document.cookie = name + "=" + value + ";expires=" + oDate;
}

/*
 * 通过cookie名查询单个cookie值
 * name表示cookie名
 */
function getCookie(name) {
	var strCookie = document.cookie;
	var arrCookie = strCookie.split("; ");
	for(var i = 0; i < arrCookie.length; i++) {
		var arr = arrCookie[i].split("=");
		if(arr[0] == name) {
			return arr[1];
		}
	}
}

/*
 * 通过cookie名删除cookie
 * name表示cookie名
 */
function removeCookie(name) {
	setCookie(name, 1, -1);
}

/*
 * 拖拽
 * ele表示元素名
 */
function drag(ele) {
	ele.onmousedown = function(e) {
		var evt = e || event;
		var disX = evt.offsetX;
		var disY = evt.offsetY;
		document.onmousemove = function(e) {
			var evt = e || event;
			var _left = evt.clientX - disX;
			var _top = evt.clientY - disY;
			ele.style.left = _left + "px";
			ele.style.top = _top + "px";
		}
		document.onmouseup = function() {
			document.onmousemove = null;
			document.onmouseup = null;
		}
	}
}

/*
 * TAB栏切换
 * arr表示要实现切换的元素数组
 * classname表示元素的效果类名
 */
function tab(arr, classname) {
	for(var i = 0; i < arr.length; i++) {
		arr[i].onclick = function() {
			for(var j = 0; j < arr.length; j++) {
				arr[j].className = "";
			}
			this.className = classname;
		}
	}
}

/*
 * 获取元素
 * ele表示元素
 */
function get(ele) {
	if(ele.charAt(0) == ".") {
		var newEle = ele.slice(1);
		return document.getElementsByClassName(newEle);
	} else if(ele.charAt(0) == "#") {
		var newEle = ele.slice(1);
		return document.getElementById(newEle);
	} else {
		return document.getElementsByTagName(ele);
	}
}

/*
 * 获取当前正在生效样式
 * ele表示元素
 * attr是要获取的元素的属性名
 */
function getStyle(ele, attr) {
	if(ele.currentStyle) {
		return ele.currentStyle[attr];
	} else {
		return getComputedStyle(ele, false)[attr];
	}
}

/*
 * 缓动动画完整封装
 * ele表示元素
 * json表示要改变的元素的属性和值  {"width":200,"height":300}
 * fn为回调函数
 */
function startMove(ele, json, fn) {
	clearInterval(ele.timer);
	ele.timer = setInterval(function() {
		var flag = true;
		for(var attr in json) {
			if(attr == "opacity") {
				var iCur = Math.round(getStyle(ele, attr) * 100);
			} else {
				var iCur = parseInt(getStyle(ele, attr));
			}
			var iTarget = json[attr];
			var iSpeed = (iTarget - iCur) / 10;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			if(attr == "opacity") {
				ele.style.opacity = (iCur + iSpeed) / 100;
				ele.style.filter = "alpha(opacity=" + (iCur + iSpeed) + ")";
			} else {
				ele.style[attr] = iCur + iSpeed + "px";
			}
			if(iCur != iTarget) {
				flag = false;
			}
		}
		if(flag) {
			clearInterval(ele.timer);
			if(fn) {
				fn();
			}
		}
	}, 30)
}

/*
 * 缓动动画封装（仅限于水平方向）
 * ele表示元素
 * target表示目标值
 */
function huandong(ele, target) {
	clearInterval(ele.timer);
	ele.timer = setInterval(function() {
		var step = (target - ele.offsetLeft) / 10;
		step = step > 0 ? Math.ceil(step) : Math.floor(step);
		ele.style.left = ele.offsetLeft + step + "px";
		if(ele.offsetLeft == target) {
			clearInterval(ele.timer);
		}
	}, 30)
}

/*
 * 匀速运动封装（仅限于水平方向）
 * ele表示元素
 * target表示目标值
 */
function yunsu(ele, target) {
	clearInterval(ele.timer);
	var speed = target > ele.offsetLeft ? 10 : -10;
	ele.timer = setInterval(function() {
		ele.style.left = ele.offsetLeft + speed + "px";
		if(Math.abs(target - ele.offsetLeft) <= Math.abs(speed)) {
			ele.style.left = target + "px";
			clearInterval(ele.timer);
		}
	}, 30)
}

/*
 * 页面滚动条跳转
 * target表示要滚动条要跳转到的目标值
 */
function toTop(target) {
	clearInterval(timer);
	timer = setInterval(function() {
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		var step = (target - scrollTop) / 10;
		step = step > 0 ? Math.ceil(step) : Math.floor(step);
		document.documentElement.scrollTop = document.body.scrollTop = scrollTop + step;
		if(Math.abs(target - scrollTop) <= Math.abs(step)) {
			document.documentElement.scrollTop = document.body.scrollTop = target;
			clearInterval(timer);
		}
	}, 30)
}

/*
 * 获取数组中的最小值的索引
 * arr表示数组
 */
function getMinIndex(arr) {
	var minVal = Math.min.apply(null, arr);
	var minIndex = arr.indexOf(minVal);
	return minIndex;
}

/*
 * 获取数组中的最大值的索引
 * arr表示数组
 */
function getMaxIndex(arr) {
	var maxVal = Math.max.apply(null, arr);
	var maxIndex = arr.indexOf(maxVal);
	return maxIndex;
}

/*
 * 轮播图（此封装局限性很大，请按照如下注释布局，id名一定要正确）
 * 调用方法：  window.onload=function(){
 * 			  lunbo();
 * 		  }
 */

/*<div id="banner">
	<ul id="imgWrap">
		<li>
			<a href="#"><img src="img/1.jpg"/></a>
		</li>
		<li>
			<a href="#"><img src="img/2.jpg"/></a>
		</li>
		<li>
			<a href="#"><img src="img/3.jpg"/></a>
		</li>
		<li>
			<a href="#"><img src="img/4.jpg"/></a>
		</li>
		<li>
			<a href="#"><img src="img/5.jpg"/></a>
		</li>
	</ul>
	<ol id="focusWrap">
		<li id="cur">1</li>
		<li>2</li>
		<li>3</li>
		<li>4</li>
		<li>5</li>
	</ol>
	<div id="btn">
		<span>&lt;</span>
		<span>&gt;</span>
	</div>
</div>*/

function lunbo() {
	var banner = document.getElementById("banner");
	var ul = document.getElementById("imgWrap");
	var ol = document.getElementById("focusWrap");
	var btn = document.getElementById("btn");
	var cloneLi = ul.children[0].cloneNode(true);
	ul.appendChild(cloneLi);
	var aFocus = ol.children;
	var aLi = ul.children;
	var timer = null;
	var imgWidth = ul.children[0].offsetWidth;
	timer = setInterval(animate, 3000)
	var i = 0;
	for(var j = 0; j < aFocus.length; j++) {
		aFocus[j].index = j;
		aFocus[j].onmouseover = function() {
			i = this.index - 1;
			animate();
		}
	}
	banner.onmouseover = function() {
		btn.style.display = "block";
		clearInterval(timer);
	}
	banner.onmouseout = function() {
		btn.style.display = "none";
		timer = setInterval(animate, 3000);
	}
	btn.children[0].onclick = function() {
		i = i - 2;
		animate();
	}
	btn.children[0].onselectstart = function() {
		return false;
	}
	btn.children[1].onclick = function() {
		animate();
	}
	btn.children[1].onselectstart = function() {
		return false;
	}

	function animate() {
		i++;
		if(i == aLi.length) {
			i = 1;
			ul.style.left = 0;
		}
		if(i == -1) {
			i = aLi.length - 2;
			ul.style.left = -imgWidth * (aLi.length - 1) + "px";
		}
		startMove(ul, {
			"left": -imgWidth * i
		});

		for(var j = 0; j < aFocus.length; j++) {
			aFocus[j].id = "";
		}
		if(i == aFocus.length) {
			aFocus[0].id = "cur";
		} else {
			aFocus[i].id = "cur";
		}
	}
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