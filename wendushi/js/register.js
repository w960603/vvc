var countdown = 60;
function settime(obj) {
	if(countdown == 0) {
		obj.removeAttribute("disabled");
		obj.value = "获取验证码";
		countdown = 60;
		return;
	} else {
		obj.setAttribute("disabled", true);
		obj.value = "重新发送(" + countdown + ")";
		countdown--;
	}
	setTimeout(function() {
		settime(obj)
	}, 1000)
}
$(function() {
	var telephone = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
	$("#auth_code").click(function(e) {
		var number = $("#number").val().trim();
		var password = $("#password").val().trim();
		var pass_true = $("#pass_true").val().trim();
		e.preventDefault();
		if(number == "") {
			layer.tips('手机号码不能为空@_@！', "#number", {tips: 3});

			return
		}if(!telephone.test(number)) {
			layer.tips("手机号码不正确*_*！", "#number", {tips: 3})
			return
			
		}if(password == "" || password.length<6){
			layer.tips("密码长度不能少于6位！","#password",{tips:3})
		}else {
			settime(this)
			$.ajax({
				type: "POST",
				dataType: "json",
				url: "http://hz5.vvc.tw/index/pubc/sendsms",
				data: {
					mobile: number
				},
				success: function(data) {
					if(data.code == 1) {
						layer.tips(data.msg, "#pass_true", {
							tips: 3
						});

					} else {
						alert(data.msg)
						return
					}
					if(data == 1) {

					} else if(data == 0) {
						$("#PhoneTip").html("<font color='red'>×短信验证码不正确请重新输入</font>");
					} else if(data == 2) {
						$("#PhoneTip").html("<font color='red'>×验证码已失效请重新获取验证码</font>");
					}
				}
			});	
		}
	})
	$(".submit").click(function(event) {
		var number = $("#number").val().trim();
		var password = $("#password").val().trim();
		if(number == "") {
			layer.tips('手机号码不能为空@_@！', "#number", {
				tips: 3
			});

			return
		}
		if(!telephone.test(number)) {
			layer.tips("手机号码不正确*_*！", "#number", {
				tips: 3
			})
			return
		}

		if(password == "") {
			layer.tips("验证码不能为空@_@！", "#password", {
				tips: 3
			})
			return
		}
		$.ajax({
			type: "POST",
			dataType: "json",
			url: "http://hz5.vvc.tw/index/pubc/login",
			data: {
				mobile: number,
				code: password
			},
			success: function(data) {
				if(data.code == 1) {
					//									layer.tips(data.msg, "#password", {tips: 3});
					alert(data.msg)
					window.location.href = 'index.html'; //验证成功
				} else {
					alert(data.msg)
					return
				}
			}
		});

	})
})