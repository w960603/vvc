$(document).ready(function () {
    $("input").focus(function () {
        if($(".full").is(":visible")){
             $(".full").hide()
        }
        if($(".error").is(":visible")){
            $(".error").hide()
        }
    })  
    $('.lang-btn').click(function () {
        var name = $(".name").val().trim()
        var pasw = $(".pasw").val().trim()
        var telephone = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
        if (name == "") {
            $(".full").show()
            return
        }
        if (!telephone.test(name)) {
            $(".error").show()
            return
        }
        if (pasw == "" || pasw.length < 6) {
            $(".error").show()
            return
        }
        $.ajax({
            dataType: 'json',
            type: 'post',
            url: 'http://192.168.2.103:3000/data',
            data: {name: name,password: pasw},
            success: function (data) {
                if(data.code==302) {
                    console.log(data.message)
                } else {
                    location.href = 'first.html/'
                }
            }
        })
    }) 
})