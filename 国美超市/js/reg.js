window.onload = function() {
	var oIn1 = document.getElementById("inp1");
	var oIn2 = document.getElementById("inp2");
	var oIn3 = document.getElementById("inp3");
	var oIn5 = document.getElementById("inp4");
	var oIn6 = document.getElementById("massage");
	var oIn7 = document.getElementById("tian");
	var oDiv = document.getElementsByTagName("form");
	var oD = oDiv.children;
	var oSp1 = document.getElementById("sp1");
	var oSp2 = document.getElementById("sp2");
	var oSp3 = document.getElementById("sp3");
	var oSp4 = document.getElementById("sp4");
	var oSp5 = document.getElementById("sp5");
	var oSp6 = document.getElementById("sp6");
	var oSp7 = document.getElementById("sp7");
	var aBtn = document.getElementById("inp8");
	var aBtnn = document.getElementById("inp7");
	var aI1 = document.getElementById("dui1");
	var aI2 = document.getElementById("dui2");
	var aI3 = document.getElementById("dui3");
	var aI5 = document.getElementById("dui5");
	var aI6 = document.getElementById("dui6");

	oIn1.onfocus = function() {
		if(oIn1.value === "请输入用户名") {
			oIn1.value = "";
		}
	}
	oIn2.onfocus = function() {
		if(oIn2.value === "请输入密码") {
			oIn2.value = "";
		}

	}
	oIn3.onfocus = function() {
		if(oIn3.value === "请再次输入密码") {
			oIn3.value = "";
		}
	}
	oIn5.onfocus = function() {
		if(oIn5.value === "请输入手机号") {
			oIn5.value = "";
		}
	}
	oIn7.onfocus = function() {
		if(oIn7.value === "填推荐码，帮好友赚收入") {
			oIn7.value = "";
		}
	}

	var reg1 = /^([0-z-_]){5,15}([0-z-_])$/;
	oIn1.onchange = function() {
		oIn1.onblur = function() {
			var val1 = oIn1.value;
			if(!reg1.test(val1)) {
				oSp1.innerHTML = "*格式错误，仅支持6-16个字符的组合";
			} else {
				oSp1.innerHTML = "";
				aI1.style.display = "block";
			}
		}
	}
	var reg2 = /^([0-z-_]){5,19}([0-z-_])$/;
	oIn2.onchange = function() {
		oIn2.onblur = function() {
			var val2 = oIn2.value;
			if(!reg2.test(val2)) {
				oSp2.innerHTML = "*格式错误，密码长度为6-20个字符";
			} else {
				oSp2.innerHTML = "";
				aI2.style.display = "block";
			}
		}
	}

	oIn3.onchange = function() {
		oIn3.onblur = function() {
			var val2 = oIn2.value;
			var val3 = oIn3.value;
			if(val3 !== val2) {
				oSp3.innerHTML = "*两次输入不一样，请检查";
			} else {
				oSp3.innerHTML = "";
				aI3.style.display = "block";
			}
		}
	}
	var reg5 = /^1[34578]\d{8}\d$/;
	oIn5.onchange = function() {
		oIn5.onblur = function() {
			var val5 = oIn5.value;
			if(!reg5.test(val5)) {
				oSp5.innerHTML = "*请输入正确的手机号";
			} else {
				oSp5.innerHTML = "";
				aI5.style.display = "block";
			}
		}
	}
	aBtn.onclick = function() {
		var val1 = oIn1.value;
		var val2 = oIn2.value;
		var val3 = oIn3.value;
		var val5 = oIn5.value;
		var val6 = oIn6.value;
		var str = String(Math.floor(Math.random() * 1000000));
		while(str.length < 6) {
			str = "0" + str;
		}
		var reg1 = /[0-z-_]{6,16}/;
		var reg2 = /[0-z-_]{6,20}/;
		var reg4 = /[0-z]{6,20}@[0-9a-z]{2,6}\.[a-z\.]{3,6}/;
		var reg5 = /^1[34578]\d{8}\d$/;
		if(!reg1.test(val1)) {
			oSp1.innerHTML = "*格式错误，仅支持6-16个字符的组合";
		}
		if(!reg2.test(val2)) {
			oSp2.innerHTML = "*格式错误，密码长度为6-20个字符";
		}
		if(val3 !== val2) {
			oSp3.innerHTML = "*两次输入不一样，请检查";
		}
		if(!reg5.test(val5)) {
			oSp5.innerHTML = "*请输入正确的手机号";
		} else {
				var res = window.confirm('注册成功!是否跳转到登录页面？');
				if(res = true) {
					window.open('login.html');
				}
				let userName = oIn1.value;
				setCookie('userName', userName, 7);
				let passWord = oIn2.value;
				setCookie('passWord', passWord, 7);
				let cellphone = oIn5.value;
				setCookie('cellphone', nickName, 7);			
		}
	}
	aBtnn.onclick = function() {
		var val5 = oIn5.value;
		var reg5 = /^1[34578]\d{8}\d$/;
		if(!reg5.test(val5)) {
			oSp5.innerHTML = "*请输入正确的手机号";
		} else {
			var str = String(Math.floor(Math.random() * 1000000));
			while(str.length < 6) {
				str = "0" + str;
			}
			oSp7.style.display = "block";
			oSp7.innerHTML = str;

			aBtnn.onblur = function() {
				var val6 = oIn6.value;
				if(val6 !== str) {
					oSp6.innerHTML = "*请输入验证码";
					aI6.style.display = "none";
				} else {
					oSp7.style.display = "none";
					oSp6.innerHTML = "";
					aI6.style.display = "block";
				}
			}
			oIn6.onblur = function() {
				var val6 = oIn6.value;
				if(val6 !== str) {
					oSp6.innerHTML = "*验证码错误";
					aI6.style.display = "none";
				} else {
					oSp7.style.display = "none";
					oSp6.innerHTML = "";
					aI6.style.display = "block";
				}
			}
		}

	}

}