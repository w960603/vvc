<template>
    <div>
        <div class="back">
            <img src="https://cdn.vvc.tw/a/images/back.png">
        </div>
        <div class="content">
            <div class="img_phone">
                <img src="https://cdn.vvc.tw/a/images/vvc.png">
            </div>
            <div class="loginform">
                <form action="#" name="f" method="post">
                    <div class="login">
                        <router-link to="/phoneLogin"><input value="手机登录" type="text" class="text"></router-link>
                        <!--<a href="phone_login.html"><input value="手机登录" type="text" class="text"></a>-->
                    </div>
                    <div class="login">
                        <router-link to="/scanLogin"><input value="扫码登录登录" type="text" class="text"></router-link>
                        <!--<a href="scan_login.html"></a>-->
                    </div>
                    <div class="login">
                        <router-link to="/faceLogin"><input value="人脸登录" type="text" class="text"></router-link>
                    </div>
                </form>
                <p class="produce">@PRODUCED BY VVC</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "vuelogin"
    }
</script>

<style scoped>
    /* Header */
    body{
        margin:0;
        padding:0;
    }
    img {
        width: 100%;
        height: 100%;
    }

    input {
        outline: none;
    }

    .back {
        position: fixed;
        top:0;
        z-index: -1;
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
        padding-top: 166px;
        padding-bottom: 53px;
    }

    .img_phone img {
        width: 299px;
        height: 196px;
    }
    .text:hover{background:#D0CFD8;color:#34495E;}
    .text {
        height: 53px;
        width: 358px;
        outline: none;
        border: 2px solid white;
        background: none;
        font-size: 18px;
        color: white;
        margin-bottom: 36px;
        text-align: center;
        border-radius: 10px;
    }

    .text:focus {
        background: none;
    }

    .goback {
        height: 49px;
        width: 49px;
        margin: 74px auto;
    }

    .produce {
        text-align: center;
        color: white;
        font-size: 16px;
        margin-top:306px;
    }
</style>
