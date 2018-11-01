<template>
    <div>
        <div class="back">
            <img src="https://cdn.vvc.tw/a/images/back.png">
        </div>
        <div class="content">
            <div class="img_phone">
                <img src="https://cdn.vvc.tw/a/images/phone-login.png">
            </div>
            <div class="container"></div>
            <div class="loginform">
                <P class="theme">LOGIN FORM</P>
                <form action="#" name="f" method="post">
                    <div class="input_outer">
                        <p class="u_user">手机号</p>
                        <input name="username" class="text" type="text" id="number" required="required">
                    </div>
                    <div class="input_outer ">
                        <p class="u_user">验证码</p>
                        <input name="password" class="text" type="text" id="password">
                        <input type="button" value="获取验证码" class="pass_true" id="pass_true" @click="obtain">
                    </div>
                    <div style="text-align: center;"><span id="PhoneTip"></span></div>
                    <div class="btn">
                        <input type="button"  class="act-but submit" style="color: #FFFFFF" id="submit" @click="submit" value="登  录">
                    </div>
                </form>
                <div class="goback">
                    <router-link to="/"><img src="https://cdn.vvc.tw/a/images/goback.png"></router-link>
                </div>

                <p class="produce">@PRODUCED BY VVC</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "phone_login",
        data(){
            return{
                telephone:null
            }
        },
        created(){
            // $(function() {
            //
            //     })

                // $('#submit').bind('keyup', function(event) {
                //     if (event.keyCode == "13") {
                //         $('#submit').click();
                //     }
                // });

                $(function () {
                    $(document).keydown(function (event) {
                        if (event.keyCode == 13) {
                            $('#submit').click();
                        }
                    });
                });

            this.telephone = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;

            // });
        },
        methods:{
            obtain(){
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


                // $("#pass_true").click(function(e) {
                        var number = $("#number").val().trim();
                        var password = $("#password").val().trim();
                        e.preventDefault();
                        if(number == "") {
                            layer.tips('手机号码不能为空@_@！', "#number", { tips: 3 });
                            return
                        } else if(!this.telephone.test(number)) {layer.tips("手机号码不正确*_*！", "#number", {tips: 3})
                            return
                        } else {
                            console.log("我走啦",number);

                            //发送验证码
                            $.ajax({
                                type: "POST",
                                dataType: "json",
                                url: "http://api.vvc.tw/suc/pubc/sendsms",
                                data: {
                                    mobile: number,
                                },
                                success: function(data) {
                                    console.log(data);
                                    if(data.code == 1) {
                                        layer.tips(data.msg, "#password", {tips: 3});							//window.location.href = '/aoyi/forgetpasswd/forgetpasswd3.jsp'; //验证成功
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
                            settime(this)
                        }
                // })
            },
            submit(){
                    var number = $("#number").val().trim();
                    var password = $("#password").val().trim();
                    if(number == "") {
                        alert('手机号码不能为空@_@！');
                        return
                    }
                    if(!this.telephone.test(number)) {
                        alert("手机号码不正确*_*！")
                        return
                    }
                    if(password == "") {
                        alert("验证码不能为空@_@！")
                        return
                    }
                    // window.location.href = 'http://jd.vvc.tw/store/dist/#/';
                    //验证码登录
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        url: "http://vvc.date/suc/pubc/login",
                        data: {
                            phone: number,
                            code: password,
                            // phone:13296736308,
                            // code:8888,
                            type:2,
                        },
                        success: (data)=> {
                            console.log(data);
                            if(data.code == 1) {
                                console.log("我怕",this);
                                //layer.tips(data.msg, "#password", {tips: 3});
                                // alert(data.msg)
                                console.log(this);
                                window.location.href = 'http://localhost:8081/#/index'; //验证成功
                                this.$router.go("/index");
                            } else {
                                alert(data.msg)
                                return
                            }
                        }
                    });
            }
        }
    }
</script>

<style scoped>
    /* Header */

    body {
        margin: 0;
        padding: 0;
    }

    img {
        width: 100%;
        height: 100%;
    }

    input {
        outline: none;
        background: none!important;
    }

    .back {
        position: fixed;
        top: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
    }

    .back img {
        width: 100%;
        height: 100%;
    }

    .content {
        width: 806px;
        margin: 0 auto;
        padding-top: 146px;
        text-align: center;
    }

    .img_phone {
        padding-bottom: 38px;
    }

    .img_phone img {
        width: 156px;
        height: 129px;
    }

    .container {
        width: 806px;
        height: 401px;
        border-radius: 10px;
        background: #8C8094;
        opacity: 0.7;
        position: absolute;
    }

    .loginform {
        position: relative;
        width: 806px;
        height: 401px;
        border-radius: 10px;
    }

    .theme {
        color: white;
        font-size: 23px;
        font-weight: 100;
    }

    .input_outer {
        border-bottom: 2px solid white!important;
        position: relative;
        margin: 20px 80px;
    }

    .u_user {
        text-align: left;
        color: white;
    }

    .text {
        height: 38px;
        width: 686px;
        outline: none;
        border: none;
        background: none!important;
        font-size: 18px;
        color: white;
    }

    .text:focus {
        background: none!important;
    }

    .pass_true {
        position: absolute;
        top: 42px;
        right: 0;
        padding: 5px 6px;
        border-radius: 2px;
        border: 0;
        background: rgba(255, 255, 255, 0.6)!important;
    }

    .btn {
        text-align: center;
    }

    #submit {
        height: 45px;
        width: 248px;
        border-radius: 10px;
        border: none;
        margin-top: 40px;
        font-size: 18px;
        color: #383A3C!important;
        background: rgba(255, 255, 255, 0.6)!important;
    }

    .goback {
        height: 49px;
        width: 49px;
        margin: 130px auto;
    }

    .produce {
        text-align: center;
        color: #DDDDDD;
        font-size: 16px;
    }
</style>
