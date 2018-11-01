<template>
    <div id="qr">
        <div style="padding-top: 200px;">
            <div class="container">
                <div id="scan_img">
                    <div class="img_phone">
                        <!--https://cdn.vvc.tw/a/images/-->
                        <img src="https://cdn.vvc.tw/a/images/scan-login.png" class="scan-login">
                    </div>
                    <div class="scan">
                        <h2 style="color: red"><img id="qrcode" :src="url" width="275px" height="275px"></h2>
                        <h1 class="" id="result">扫描二维码登录</h1>
                        <!--<a id="url" target="_blank" href="">立即登录</a>-->
                    </div>
                </div>
            </div>
            <div class="goback">
                <router-link to="/"><img src="https://cdn.vvc.tw/a/images/goback.png"></router-link>
            </div>
            <p class="produce">@PRODUCED BY VVC</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "scan_login",
        data(){
            return{
                url:null,
            }
        },
        created(){
            var randNum = Math.floor(new Date() / 1000);
            // var randNum = 1512328552;
            var scanUrl = "http://api.vvc.tw/suc/pubc/scanLogin/code/" + randNum;
            // document.getElementById('qrcode').src = '//api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + encodeURIComponent(scanUrl);
            this.url = '//api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + encodeURIComponent(scanUrl);
            //document.getElementById('url').href = scanUrl
            var source = new EventSource("http://api.vvc.tw/suc/pubc/login_status/code/" + randNum);
            source.onmessage = (event)=> {
                console.log(event)
                var back = eval('(' + event.data + ')')
                if (back.status == "access") {
                    console.log(this)
                    this.$router.push("./index");
                } else {
                    document.getElementById("result").innerHTML = back.data + "<br />";
                    document.getElementById("result").style.setProperty("color", "#C00")
                }
            };
        }
    }
</script>

<style scoped>
    /* Header */
    body{
        margin:0;
        padding:0;
    }

    input {
        outline: none;
    }

    #qr{
        background-image: url("https://cdn.vvc.tw/a/images/back.png");
        background-size: 100% 100%;
        z-index: 1;
        width: 100%;
        height: 100%;
    }
    /*html {*/
        /*background-image: url("https://cdn.vvc.tw/a/images/back.png");*/
        /*background-size: 100% 100%;*/
        /*z-index: 1;*/
        /*width: 100%;*/
        /*height: 100%;*/
    /*}*/

    .content {
        width: 414px;
        margin: 0 auto;
        padding-top: 176px;
        text-align: center;

    }
    .container {

        /*height: 442px;*/
        border-radius: 10px;
        background: rgba(255,255,255,0.6);


    }
    #qrcode{
        opacity: 0.7;
    }
    #scan_img{


        margin-top:35px;
        margin-botton:48px;
        padding-bottom: 20px;
        text-align: center;
    }
    /*.img_phone {
        padding-top: 166px;
        padding-bottom: 53px;
    }*/

    .img_phone .scan-login {
        width: 162px;
        height: 120px;
        margin-top: 30px;
    }
    .img_phone .scan{
        width:200px;
        height:201px;
        padding-top:12px;
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
