$(document).ready(function () {
	$(".icon-xiangzuo").click(function () {
		window.history.go(-1)
	})
	var wait = 180;
	function time(o) {
		if (wait == 0) {
			o.removeAttribute("disabled");
			o.value = "获取验证码";
			wait = 180;
		} else {
			o.setAttribute("disabled",ture);
			o.value = "重新发送('+ wait +')";
			wait--
			setTimeout(function () {
				time(o)
			},1000)
		}
	}
	$(".small").click(function () {
		var phone = $(".number").value()
		$.ajax({
			dataType: 'json',
            type: 'post',
            url: 'http://192.168.2.103:3000/data',
            data: {phone: phone,type: 1},
            success: function (result) {
               if (result.flag == 1) {
					// alert('成功');
					time(btn);
				} else {
						alert(result.content);
				}
            }
		})
	})	
		
	
      $("input").focus(function () {
        	console.log($("input"))
        	if ($(".full").is(":visible")) {
        		 $(".full").hide()
        	}
        	if ($(".error").is(":visible")) {
        		$(".error").hide()
        	}
			if ($("span").is(":visible")) {
				$("span").hide()
			}
			if ($(".eql").is(":visible")) {
				$(".eql").hide()
			}
        }) 
    $('.btn-register').click(function () {
        var name = $(".number").val().trim()
        var pasw1 = $(".password1").val().trim()
        var pasw2 = $(".password2").val().trim()
        var pasw3 = $(".password3").val().trim()
        var telephone = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
        if (name == "") {
            $(".full").show()
            return
        }
        if (!telephone.test(name)) {
            $(".error").show()
            return
        }
        if (pasw2 == "" || pasw2.length < 6) {
            $("span").show()
            return
        }
//      if (pasw4 == "" || pasw4.length < 6) {
//          $("span").show()
//          return
//      }
        if (pasw2 !== pasw3) {
        	$(".eql").show()
        	return
        }
//      if (pasw4 !== pasw5) {
//      	$(".eql").show()
//      	return
//      }
       
        $.ajax({
            dataType: 'json',
            type: 'post',
            url: 'http://192.168.2.103:3000/data',
            data: {name: name,password: pasw1},
            success: function (data) {
                if(data.code==302) {
                    console.log("200")
                } else {
                    location.href = 'login.html/'
                }
            }
        })
    }) 
})