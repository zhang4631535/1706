$(function() {
	var dataId = location.search;
	var dId = dataId.split("=")[1];
	var quan = document.getElementById("gome-container");
	console.log(dId);
	$.get("json/test1.json", function(data) {

		for(var i in data) {
			console.log(data[i]);
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
												<h1>清风绿花2层200抽20包小规格抽面（整箱销售）</h1>
												<h4>纸质细腻柔韧，吸水不易破</h4>
												<div>对比</div>
											</div>
											<div id="prd-price">
												<div id="prd-price-left">
													国&nbsp;&nbsp;美&nbsp;&nbsp;价
												</div>
												<div id="prd-price-center">
													<span><em>￥</em>43.9</span>
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
														<a href="#">清风旗舰店</a>
														<span>发货并负责售后服务。</span>
													</div>
												</div>
											</div>
											<div id="prd-btn">
												<div id="count-wrap">
													<input id="enterqty" type="text" maxlength="5"
													value="1" onblur="this.className='blur'" onfocus="this.className='focus'"/>
													<a href="javascript:;" class="jia">+</a>
													<a href="javascript:;" class="jian">-</a>
												</div>
												<a href="javascript:;" id="addcart">加入购物车</a>
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
				var oZoomBox = document.getElementById("zoomBox");
				var oMidArea = document.getElementById("midArea");
				var oZoom = document.getElementById("zoom");
				var oBigArea = document.getElementById("bigArea");
				var oBigImg = oBigArea.children[0];
				var oSmallArea = document.getElementById("smallArea");
				var aSmallLists = oSmallArea.children[1].children;

				var oScroll = document.documentElement.scrollTop || document.body.scrollTop;
				

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
				
				var num=i;
				
				for(let a = 0; a < aSmallLists.length; a++) {
					aSmallLists[a].onmouseenter = function() {
						for(var j = 0; j < aSmallLists.length; j++) {
							aSmallLists[j].className = "";
						}
						this.className = "hover";
						
						if(a ==0){
							oMidArea.children[0].src = data[num].imgsrc1;
							oBigImg.src =data[num].imgsrc1;							
						}
						if(a ==1){
							oMidArea.children[0].src = data[num].imgsrc2;
							oBigImg.src = data[num].imgsrc2;
						}
						if(a ==3){
							console.log(data[num].imgsrc2)
							console.log(a)
							oMidArea.children[0].src = data[num].imgsrc4;
							oBigImg.src = data[num].imgsrc4;
						}
					}
				}
			}
		}

	})
})