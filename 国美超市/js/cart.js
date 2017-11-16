window.onload = function() {
	/**/
	//cookie添加
	$(function() {
		$.get("json/test.json", function(data) {
			var oUl = document.getElementById("cart-list");

			//获取cookie转换成对象
			if(getCookie("cart")) {
				var objCookie = JSON.parse(getCookie("cart"));
			} else {
				var objCookie = {};
			}
			//根据cookie中保存的数据生成DOM结构
			var str = "";
			for(var i in objCookie) {
				//i指产品id，取出该产品id对应的值（一个包含产品属性的对象）
				var obj = data[i];
				str += `<li>
							<p data-id="${i}" class="checkbox"><input class="check-one check" type="checkbox" /></p>
							<p class="goods"><img src="${obj.imgsrc}" alt="" /><span>${obj.title}</span></p>
							<p class="price">${obj.price}</p>
							<p class="count"><span class="reduce"></span><input class="count-input" type="text" value="${objCookie[i]}" /><span class="add">+</span></p>
							<p class="subtotal">${objCookie[i]*data[i].price}</p>
							<p data-id="${i}" class="operation"><span class="delete">删除</span></p>
						</li>`
			var num = document.getElementsByClassName("count-input");
//			console.log(num);
			}
			
			oUl.innerHTML = str;

			var aBtn = document.getElementsByTagName("input");

			//如果有cart，取出cart对应的值
			if(getCookie("cart")) {
				var objCookie = JSON.parse(getCookie("cart"));
			} else {
				//没有的话 定义一个对象去，未来点击按钮时保存数据
				var objCookie = {};
			}
			if(!document.getElementsByClassName) {
				document.getElementsByClassName = function(cls) {
					var ret = [];
					var els = document.getElementsByTagName('*');
					for(var i = 0, len = els.length; i < len; i++) {

						if(els[i].className.indexOf(cls + ' ') >= 0 || els[i].className.indexOf(' ' + cls + ' ') >= 0 || els[i].className.indexOf(' ' + cls) >= 0) {
							ret.push(els[i]);
						}
					}
					return ret;
				}
			}

			var oBox = document.getElementById('cart-box'); // 大box
			var selectInputs = document.getElementsByClassName('check'); // 所有勾选框
			var checkAllInputs = document.getElementsByClassName('check-all') // 全选框
			var tr = oBox.children[1].children; //行
			var selectedTotal = document.getElementById('selectedTotal'); //已选商品数目容器
			var priceTotal = document.getElementById('priceTotal'); //总计
			var deleteAll = document.getElementById('deleteAll'); // 删除全部按钮
			var selectedViewList = document.getElementById('selectedViewList'); //浮层已选商品列表容器
			var selected = document.getElementById('selected'); //已选商品
			var foot = document.getElementById('foot');

			// 更新总数和总价格，已选浮层
			function getTotal() {
				var selected = 0,
					price = 0,
					html = '';
				for(var i = 0; i < tr.length; i++) {
					if(tr[i].getElementsByTagName('input')[0].checked) {
						tr[i].className = 'on';
						selected += parseInt(tr[i].getElementsByTagName('input')[1].value); //计算已选商品数目
						price += parseFloat(tr[i].getElementsByTagName('p')[4].innerHTML); //计算总计价格
						html += '<div><img src="' + tr[i].getElementsByTagName('img')[0].src + '"><span class="del" index="' + i + '">取消选择</span></div>'; // 添加图片到弹出层已选商品列表容器
					} else {
						tr[i].className = '';
					}
				}
				selectedTotal.innerHTML = selected; // 已选数目
				priceTotal.innerHTML = price.toFixed(2); // 总价
				selectedViewList.innerHTML = html;
				if(selected == 0) {
					foot.className = 'foot';
				}
			}

			// 计算单行价格
			function getSubtotal(tr) {
				var cells = tr.children;
				var price = cells[2]; //单价
				var subtotal = cells[4]; //小计td
				var countInput = tr.getElementsByTagName('input')[1]; //数目input
				var span = tr.getElementsByTagName('span')[1]; //-号
				//写入HTML
				subtotal.innerHTML = (countInput.value * price.innerHTML).toFixed(2);
				console.log(countInput.value, price.innerHTML);
				//如果数目只有一个，把-号去掉
				if(countInput.value == 1) {
					span.innerHTML = '';
				} else {
					span.innerHTML = '-';
				}
			}

			// 点击选择框
			for(var i = 0; i < selectInputs.length; i++) {
				selectInputs[i].onclick = function() {
					if(this.className.indexOf('check-all') >= 0) { //如果是全选，则吧所有的选择框选中
						for(var j = 0; j < selectInputs.length; j++) {
							selectInputs[j].checked = this.checked;
						}
					}
					if(!this.checked) { //只要有一个未勾选，则取消全选框的选中状态
						for(var i = 0; i < checkAllInputs.length; i++) {
							checkAllInputs[i].checked = false;
						}
					}
					getTotal(); //选完更新总计
				}
			}

			// 显示已选商品弹层
			selected.onclick = function() {
				if(selectedTotal.innerHTML != 0) {
					console.log(this)
					foot.className = (foot.className == 'foot' ? 'show' : 'foot');
					selectedViewList.style.display = "block";
				}
			}

			//已选商品弹层中的取消选择按钮
			selectedViewList.onclick = function(e) {
				var e = e || window.event;
				var el = e.srcElement;
				if(el.className == 'del') {
					var input = tr[el.getAttribute('index')].getElementsByTagName('input')[0]
					input.checked = false;
					input.onclick();
				}
			}

			//为每行元素添加事件
			for(var i = 0; i < tr.length; i++) {
				//将点击事件绑定到tr元素
				tr[i].onclick = function(e) {
					var e = e || window.event;
					var el = e.target || e.srcElement; //通过事件对象的target属性获取触发元素
					var cls = el.className; //触发元素的class
					var countInout = this.getElementsByTagName('input')[1]; // 数目input
					var value = parseInt(countInout.value); //数目
					//通过判断触发元素的class确定用户点击了哪个元素
					switch(cls) {
						case 'add': //点击了加号
							countInout.value = value + 1;
							getSubtotal(this);
							break;
						case 'reduce': //点击了减号
							if(value > 1) {
								countInout.value = value - 1;
								getSubtotal(this);
							}
							break;
						case 'delete': //点击了删除
							var conf = confirm('确定删除此商品吗？');
							if(conf) {
								this.parentNode.removeChild(this);
								var id=this.children[5].getAttribute("data-id");
								delete objCookie[id];
								var strCookie = JSON.stringify(objCookie);
								setCookie("cart", strCookie, 7);
							}
							break;
					}
					getTotal();
				}
				
				// 给数目输入框绑定keyup事件
				tr[i].getElementsByTagName('input')[1].onkeyup = function() {
					var val = parseInt(this.value);
					if(isNaN(val) || val <= 0) {
						val = 1;
					}
					if(this.value != val) {
						this.value = val;
					}
					getSubtotal(this.parentNode.parentNode); //更新小计
					getTotal(); //更新总数
				}
			}

			// 点击全部删除
			deleteAll.onclick = function() {
				if(selectedTotal.innerHTML != 0) {
					var con = confirm('确定删除所选商品吗？'); //弹出确认框
					if(con) {
						for(var i = 0; i < tr.length; i++) {
							// 如果被选中，就删除相应的行
							if(tr[i].getElementsByTagName('input')[0].checked) {
								console.log(tr[i])
								var id=tr[i].children[0].getAttribute("data-id");
								console.log(id)
								delete objCookie[id];
								var strCookie = JSON.stringify(objCookie);
								setCookie("cart", strCookie, 7);
								tr[i].parentNode.removeChild(tr[i]); // 删除相应节点
								i--; //回退下标位置
							}
						}
					}
				} else {
					alert('请选择商品！');
				}
				getTotal(); //更新总数
			}

			// 默认全选
			checkAllInputs[0].checked = true;
			checkAllInputs[0].onclick();
		})
	})
}