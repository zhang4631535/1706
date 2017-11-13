window.onload = function() {

	var oZoomBox = document.getElementById("zoomBox");
	var oMidArea = document.getElementById("midArea");
	var oZoom = document.getElementById("zoom");
	var oBigArea = document.getElementById("bigArea");
	var oBigImg = oBigArea.children[0];
	var oSmallArea = document.getElementById("smallArea");
	var aSmallLists = oSmallArea.children[1].children;
	
	var oScroll = document.documentElement.scrollTop || document.body.scrollTop;
		console.log(oScroll);

	oMidArea.onmousemove = function(e) {
		var evt = e || event;
		oZoom.style.display = "block";
		oBigArea.style.display = "block";

		//因为放大镜是相对于oZoomBox定位的，需要用鼠标坐标值减去oZoomBox距离可视区域左边和上边的距离
		//假设放大镜是相对于oMidArea定位的，需要用鼠标坐标值减去oZoomBox距离可视区域左边和上边的距离，还要减去oMidArea
		//距离oZoomBox的距离
		
		var _left = evt.clientX - oZoomBox.offsetLeft - oZoom.offsetWidth / 2;
		var _top = evt.clientY - oZoomBox.offsetTop - oZoom.offsetHeight / 2;

		//不能越界

		if(_left <= 0) {
			_left = 0;
		}
		if(_top <= 0) {
			_top = 0;
		}
		if(_left >= oMidArea.offsetWidth - oZoom.offsetWidth) {
			_left = oMidArea.offsetWidth - oZoom.offsetWidth;
		}
		if(_top >= oMidArea.offsetHeight - oZoom.offsetHeight) {
			_top = oMidArea.offsetHeight - oZoom.offsetHeight;
		}
		oZoom.style.left = _left + "px";
		oZoom.style.top = _top + "px";
		//放大镜向右移动的距离与中图区域宽度的比 和  大图向左移动的距离和大图宽度的比 相等
		oBigImg.style.left = -oZoom.offsetLeft / oMidArea.offsetWidth * oBigImg.offsetWidth + "px";
		oBigImg.style.top = -oZoom.offsetTop / oMidArea.offsetHeight * oBigImg.offsetHeight + "px";

	}
	oMidArea.onmouseout = function() {
		oZoom.style.display = "none";
		oBigArea.style.display = "none";

	}

	for(let i = 0; i < aSmallLists.length; i++) {
		aSmallLists[i].onmouseover = function() {
			for(var j = 0; j < aSmallLists.length; j++) {
				aSmallLists[j].className = "";
			}
			this.className = "hover";
			oMidArea.children[0].src = "img/3big"+(i+1)+".jpg";
			oBigImg.src = "img/3big"+(i+1)+".jpg";
		}
	}
}