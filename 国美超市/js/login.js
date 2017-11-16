$(function(){
	$('.login-head-left').click(function(){
		$('.login-tool-1').css({display:'block'});
		$('.login-tool-2').css({display:'none'});
	})
	$('.login-head-right').click(function(){
		$('.login-tool-1').css({display:'none'});
		$('.login-tool-2').css({display:'block'});
	})
	
	var ipt1=document.getElementById('userName');
	var ipt2=document.getElementById('pwd');
	var ipt3=document.getElementById('submit');
	var userName=getCookie('userName');
	var passWord=getCookie('passWord');
	console.log(userName,passWord);
	ipt3.onclick=function(){
		if(ipt1.value==userName&&ipt2.value==passWord){
			window.open('index.html');
		}else{
			alert('账号或密码错误!')
		}
	}
	
	
})
