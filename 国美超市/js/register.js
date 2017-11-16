
	var ipt1 = document.getElementById('userName');//$('#userName')
	var ipt2 = document.getElementById('pwd');//$('#pwd')
	var ipt3 = document.getElementById('nickName');//$('#nickName')
	var ipt4 = document.getElementById('submit');//$('#submit')

	/*通过ID获取HTML对象的通用方法，使用$代替函数名称*/
	function $(elementId) {
		return document.getElementById(elementId);
	}
	/*当鼠标放在用户文本框时，提示文本及样式*/
	function userNameFocus() {
		var userNameId = $("userNameId");
		userNameId.innerHTML = "1、由字母、数字、下划线、点、减号组成<br/>2、只能以数字、字母开头或结尾，且长度为4-18";
	}
	/*当鼠标离开用户名文本框时，提示文本及样式*/
	function userNameBlur() {
		var userName = $("userName");
		var userNameId = $("userNameId");
		var reg = /^[0-9a-zA-Z][0-9a-zA-Z_.-]{2,16}[0-9a-zA-Z]$/;
		if(userName.value == "") {
			userNameId.innerHTML = "账号不能为空，请输入账号";
			return false;
		}
		if(reg.test(userName.value) == false) {
			userNameId.innerHTML = "只能以字母、数字、下划线组成";
			return false;
		}
		userNameId.innerHTML = "账号输入正确";
		return true;
	}
	/*当鼠标放在密码文本框时，提示文本及样式*/
	function pwdFocus() {
		pwdId = $("pwdId");
		pwdId.innerHTML = "密码长度为6-16";
	}
	/*当鼠标离开密码文本框时，提示文本及样式*/
	function pwdBlur() {
		var pwd = $("pwd");
		var pwdId = $("pwdId");
		if(pwd.value == "") {
			pwdId.innerHTML = "密码不能为空，请输入密码";
			return false;
		}
		if(pwd.value.length < 6 || pwd.value.length > 16) {
			pwdId.innerHTML = "密码长度为6-16";
			return false;
		}
		pwdId.innerHTML = "密码格式正确";
		return true;
	}
	/*当鼠标放在昵称文本框时，提示文本及样式*/
	function nickNameFocus() {
		var nickNameId = $("nickNameId");
		nickNameId.innerHTML = "1、包含汉字、字母、数字、下划线以及@!#$%&*特殊字符<br/>2、长度为4－20个字符<br/>3、一个汉字占两个字符";
	}

	/*当鼠标离开昵称文本框时，提示文本及样式*/
	function nickNameBlur() {
		var nickName = $("nickName");
		var nickNameId = $("nickNameId");
		var k = 0;
		var reg = /^([\u4e00-\u9fa5]|\w|[@!#$%&*])+$/; // 匹配昵称
		var chinaReg = /[\u4e00-\u9fa5]/g; //匹配中文字符
		if(nickName.value == "") {
			nickNameId.innerHTML = "昵称不能为空，请输入昵称";
			return false;
		}
		if(reg.test(nickName.value) == false) {
			nickNameId.innerHTML = "只能由汉字、字母、数字、下划线以及@!#$%&*特殊字符组成";
			return false;
		}
		nickNameId.innerHTML = "昵称输入正确";
		return true;
	}
	ipt4.onclick = function() {
		var flagUserName = userNameBlur();
		var flagPwd = pwdBlur();
		var flagNickName = nickNameBlur();
		userNameBlur();
		pwdBlur();
		if(flagUserName == true && flagPwd == true && flagNickName == true) {
			var res = window.confirm('注册成功!是否跳转到登录页面？');
			if(res = true) {
				window.open('login.html');
			}
			let userName = ipt1.value;
			setCookie('userName', userName, 7);
			let passWord = ipt2.value;
			setCookie('passWord', passWord, 7);
			let nickName = ipt3.value;
			setCookie('nickName', nickName, 7);
		} else {
			alert('注册失败，格式错误，请重新输入!');
		}

	}
