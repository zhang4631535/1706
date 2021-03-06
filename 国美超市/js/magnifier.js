$(function() {
	var dataId = location.search;
	var dId = dataId.split("=")[1];
	var quan = document.getElementById("gome-container");
	console.log(dId);
	
	$.get("json/test1.json", function(data) {

		for(var i in data) {
			
			if(data[i].id == dId) {
				var str = `<div id="fangda-left">
											<div id="zoomBox">
												<div id="midArea">
													<img src="${data[i].imgsrc1}">
													<div id="zoom"></div>
												</div>
												<div id="bigArea">
													<img src="${data[i].imgsrc1}">
												</div>
												<div id="smallArea">
													<div id="pic-btn">
														<a href="javascript:;" class="pic-btn-l">
															<b>
																<s></s>
															</b>
														</a>
														<a href="javascript:;" class="pic-btn-r">
															<b>
																<s></s>
															</b>
														</a>
													</div>
													<ul id="smalllist">
														<li><img src="${data[i].imgsrc1}"></li>
														<li><img src="${data[i].imgsrc2}"></li>
														<li><img src="${data[i].imgsrc3}"></li>
														<li><img src="${data[i].imgsrc4}"></li>
														<li><img src="${data[i].imgsrc5}"></li>
													</ul>
												</div>
											</div>
										</div>
										<div id="prd">
											<div id="hgroup">
												<h1>${data[i].title}</h1>
												<h4>${data[i].title2}</h4>
												<div>对比</div>
											</div>
											<div id="prd-price">
												<div id="prd-price-left">
													国&nbsp;&nbsp;美&nbsp;&nbsp;价
												</div>
												<div id="prd-price-center">
													<span>${data[i].price}</span>
													<a href="#">降价通知</a>
												</div>
												<div id="prd-price-right">
													<span>|</span>
													<div>
														<p class="p1">好评度<em>99%</em></p>
														<p class="p2">
															<a href="#">
																<em>388888</em>人评价
															</a>
														</p>
													</div>
												</div>
											</div>
											<div id="prd-proper">
												<div id="prd-proper1">
													<lable>特&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色</lable>
													<div id="prd-proper1-r">
														<span id="guanjia">
															<em></em>
															<b></b>
															<a href="#">管家服务</a>
														</span>
													</div>
												</div>
												<div id="prd-proper2">
													<lable>送&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;至</lable>
													<div id="prd-proper2-r">
														<div>北京市朝阳区朝外街道</div>
														<span>有货</span>
														<span>
															支持
															<a href="#">免运费</a>
														</span>
													</div>
												</div>
												<div id="prd-proper3">
													<lable>服&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;务</lable>
													<div>
														由
														<a href="#">${data[i].qijian}</a>
														<span>发货并负责售后服务。</span>
													</div>
												</div>
											</div>
											<div id="prd-btn">
												<div id="count-wrap">
													<input id="enterqty" type="text" maxlength="5"
													value="1" onblur="this.className='blur'" onfocus="this.className='focus'"/>
													<a href="javascript:;" class="jia" id="add">+</a>
													<a href="javascript:;" class="jian" id="reduce">-</a>
												</div>
												<a href="./cart.html"><button id="addcart">加入购物车</button></a>
												<a href="javascript:;" id="mobtn">
													<i></i>
													手机下单
												</a>
											</div>
											<div id="prd-tip">
												<span>温馨提示 &nbsp;&nbsp;&nbsp;1.正品保障；&nbsp;&nbsp;不支持7天无理由退货</span>
											</div>
										</div>`;
				quan.innerHTML = str;
				var add = document.getElementById("add");
				var reduce = document.getElementById("reduce");
				var aBtn = document.getElementById("addcart");
				//如果有cart，取出cart对应的值
				if(getCookie("cart")){
					var objCookie = JSON.parse(getCookie("cart"));
				}else{
					//没有的话 定义一个对象去，未来点击按钮时保存数据
					var objCookie = {};
				}
				
				aBtn.onclick = function(){
					console.log(dId);
					//取出当前商品ID
					var proId = dId;
					//同种商品增加数量
					if(!objCookie[proId]){
						objCookie[proId] = 1;
					}else{
						//不同商品增加一个新的属性，并赋值为1
						objCookie[proId] += 1;
					}
					
					//cookie存的是字符串，需要转换
					var strCookie = JSON.stringify(objCookie);
					
					setCookie("cart",strCookie,7);
					
					//点击时，右上角的数字要同时发生改变
//					total+=1;
//					oSpan.innerHTML = total;
					
					
				}
				var oZoomBox = document.getElementById("zoomBox");
				var oMidArea = document.getElementById("midArea");
				var oZoom = document.getElementById("zoom");
				var oBigArea = document.getElementById("bigArea");
				var oBigImg = oBigArea.children[0];
				var oSmallArea = document.getElementById("smallArea");
				var aSmallLists = oSmallArea.children[1].children;

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

				var num = i;

				for(let a = 0; a < aSmallLists.length; a++) {
					aSmallLists[a].onmouseenter = function() {
						for(var j = 0; j < aSmallLists.length; j++) {
							aSmallLists[j].className = "";
						}
						this.className = "hover";

						if(a == 0) {
							oMidArea.children[0].src = data[num].imgsrc1;
							oBigImg.src = data[num].imgsrc1;
						}
						if(a == 1) {
							oMidArea.children[0].src = data[num].imgsrc2;
							oBigImg.src = data[num].imgsrc2;
						}
						if(a == 2) {
							oMidArea.children[0].src = data[num].imgsrc3;
							oBigImg.src = data[num].imgsrc3;
						}
						if(a == 3) {
							oMidArea.children[0].src = data[num].imgsrc4;
							oBigImg.src = data[num].imgsrc4;
						}
						if(a == 4) {
							oMidArea.children[0].src = data[num].imgsrc5;
							oBigImg.src = data[num].imgsrc5;
						}
					}
				}
			}
		}

	})
})