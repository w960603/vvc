<template>
    <div>
        <canvas id='canvas' width='700' height='700' style="position:absolute;top:0px;left:0px;z-index:99;"></canvas>
        <div class="border"></div>
        <div class="back">
            <img src="https://cdn.vvc.tw/a/images/back.png">
        </div>
        <div class="content">
            <div class="container"></div>
            <div class="face">
                <canvas style="position:absolute;display: none" ></canvas>
                <!--调用摄像头人脸登陆-->
                <div class="booth">
                    <!--<div style=" overflow: hidden; width: 553px; height: 553px; " class="large-header">
                        <video style="float: left;margin-left: -100px;" id="video" height="553" width="750"></video>
                    </div>-->
                    <div class="wrapper">
                        <div class="video">
                            <!--<video autoplay playsinline ></video>-->
                            <div style=" overflow: hidden; width: 553px; height: 553px; " class="large-header">
                                <video autoplay playsinline style="float: left;margin-left: -100px;" id="video" height="553" width="750"></video>
                            </div>
                        </div>
                        <select style="display: none" id="myselect" data-value=0></select>
                        <div class="photo" ><img src="https://cdn.vvc.tw/a/images/photo.png" id="photo"></div>

                        <!--<a class="button confirm" href="javascript:;"  id="trueCamera">确定</a>-->
                        <!--<canvas></canvas>-->
                    </div>
                    <button id='tack' @click="tack()">点击登陆</button>
                    <img id='img' src='' style="display:none">
                    <button id="a" value="123" style="display:none"></button>
                </div>
            </div>
        </div>
        <div class="nav">
            <p class="second">识别中. 请稍后...</p>
            <div class="goback">
                <router-link to="/"><img src="https://cdn.vvc.tw/a/images/goback.png"></router-link>
            </div>
            <p class="produce">@PRODUCED BY VVC</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "face_login",
        data(){
            return{

            }
        },
        created(){
            // $(function() { //人脸登陆
                var video = document.getElementById('video'),
                    canvas = document.getElementById('canvas'),
                    snap = document.getElementById('tack'),
                    img = document.getElementById('img'),
                    vendorUrl = window.URL || window.webkitURL;
                //媒体对象
                navigator.getMedia = navigator.getUserMedia ||
                    navagator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia ||
                    navigator.msGetUserMedia;
                navigator.getMedia({
                    video: true, //使用摄像头对象
                    audio: false //不适用音频
                }, function(strem) {
                    // console.log(strem);
                    video.src = vendorUrl.createObjectURL(strem);
                    //					video.src);
                    video.play();
                }, function(error) {
                    //error.code
                    // console.log(error);
                });

            //     document.getElementById("tack").addEventListener('click', () =>{
            //
            // })


        },
        methods:{
            msg(msg) {
                var Odiv1 = document.createElement('div');
                Odiv1.id = 'msg';
                Odiv1.innerHTML = msg;
                document.body.appendChild(Odiv1);
                setTimeout(function() {
                    Odiv1.style.display = 'none';
                }, 1000)
            },
            tack(){
                //绘制canvas图形
                var num = 0
                var timer = setInterval(()=> {
                    if (num < 6){
                        num ++;
                        canvas.getContext('2d').drawImage(video, 0, 0, 750, 553); //把canvas图像转为img图片
                        img.src = canvas.toDataURL("image/jpeg");
                        console.log(img);
                        this.upload({imagePath: img.src});
                    }else {
                        clearInterval(timer);
                        window.location.href = "http://localhost:8081/#/";
                    }
                },1500);
                // })

                //	    var demo = function(){
                $(".border").click(function(width, height, rotation) {
                    console.log(123)
                })
                $(function() {
                    $("#tack").click();
                    $(".border").click();
                })
                $.ajax({
                    type: "POST",
                    url: "http://api.vvc.tw/suc//pubc/ailogin",
                    data: $(".loginform").serialize(),
                    dataType: "json",
                    success: (data)=> {
                        if(data.code == 1) {
                            // window.location.href = "index.html";
                        } else {
                            this.msg(data.msg);
                        }
                    },
                    error: function(jqXHR) {
                       this. msg("发生错误：" + jqXHR.status);
                    },
                })
            },

            upload(option) {
        var getUrl = option.getUrl ? option.getUrl : "https://api.vvc.tw/dlxin/index/getoss";
        var postUrl = option.postUrl ? option.postUrl : "https://oss1.vvc.tw/";
        var fileName = option.fileType ? option.fileType : 'vvc';
        $.ajax({
            url: getUrl,
            type: "get",
            success: function(res) {
                // console.log(res);
                var responent = res.data;
                console.log(responent);
                //console.log($(option.el)[0].files[0]);
                //  var file= option.el?$(option.el)[0].files[0]:option.imagePath;
                var date = new Date().getTime();
                var datas = new FormData();
                datas.append('policy', responent.policy);
                datas.append('OSSAccessKeyId', responent.accessid);
                datas.append('Signature', responent.signature);
                datas.append('key', responent.dir + fileName + "_" + date + ".jpg");
                datas.append("file", convertBase64UrlToBlob(option.imagePath));
                clearInterval(timer);
                $.ajax({
                    type: 'post',
                    url: postUrl,
                    data: datas,
                    contentType: 'multipart/form-data',
                    async: false,
                    cache: false,
                    processData: false,
                    contentType: false,
                    success:function(res) {
                        console.log(datas);
                        console.log("https://oss1.vvc.tw/" + responent.dir + fileName + "_" + date + ".jpg");
                        $.ajax({
                            url: 'http://api.vvc.tw/suc//pubc/ailogin',
                            type: 'post',
                            dataType: 'json',
                            data: {
                                image: "https://oss1.vvc.tw/" + responent.dir + fileName + "_" + date + ".jpg",
                                type: 1
                            },
                            success: function(data) {
                                console.log(data)
                                var option = img.src
                                if(data.code == 0) {
                                    $("#tack").click();
                                } else {
                                    //												var width = data.data.info.location.width;
                                    //												var height = data.data.info.location.height;
                                    //												var left = data.data.info.location.left;
                                    //												var top = data.data.info.location.top;
                                    //												var rotation = data.data.info.location.rotation;
                                    //												$(".border").css({
                                    //														'width': width ,
                                    //														'height': height,
                                    //														'left': left,
                                    //														'top': top,
                                    //														'border': '2px solid #CD950C',
                                    //														'transform': 'rotate(' + rotation + 'deg)'
                                    //													}),
                                    alert(data.msg)

                                    window.location.href = "http://jd.vvc.tw/store/dist/#/"
                                }
                            }
                        })
                    }
                })
            }
        });
    },
       convertBase64UrlToBlob(urlData) {
                const bytes = window.atob(urlData.split(',')[1]);
                // 去掉url的头，并转换为byte
                // 处理异常,将ascii码小于0的转换为大于0
                const ab = new ArrayBuffer(bytes.length);
                const ia = new Uint8Array(ab);
                for(let i = 0; i < bytes.length; i++) {
                    ia[i] = bytes.charCodeAt(i);
                }
                return new Blob([ab], {
                    type: 'image/png'
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
        /*background:url(../img/back.png);*/
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
        top: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
    }

    .content {
        width: 553px;
        height: 553px;
        margin: 0 auto;
        padding-top: 164px;
        text-align: center;
        position: relative;
    }

    .container {
        width: 604px;
        height: 604px;
        margin: auto;
        border-radius: 50%;
        background: white;
        opacity: 0.6;
        position: absolute;
        left: -26px;
    }

    .face {
        width: 553px;
        height: 553px;
        border-radius: 50%;
    }

    .large-header {
        /*width: 553px;
        height: 553px;*/
        margin: auto;
        border-radius: 50%;
    }

    #msg {
        color: #fff;
        font-size: 14px;
        text-align: center;
        line-height: 20px;
        background: rgba(0, 0, 0, .5);
        padding: 10px 20px;
        border-radius: 2px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        z-index: 99;
    }

    .booth {
        width: 553px;
        height: 553px;
        /*background: url('img/face.png')50%;*/
        /*border: 1px solid #ddd;*/
        margin: 0 auto;
        position: relative;
        z-index: 999;
        top: 24px;
    }

    #tack {
        position: absolute;
        top: 260px;
        left: 58px;
        padding: 5px 8px;
        opacity: 0;
    }

    .border {
        position: relative;
        z-index: 999;
    }

    .nav {
        text-align: center;
        position: relative;
        top: 130px;
        color: #CECBD3;
    }

    .second{
        font-size: 20px;
    }

    .goback{
        height: 49px;
        width: 49px;
        margin: 74px auto;
    }

    .produce{
        font-size: 16px;
    }
    .photo{
        width:60px;
        height:60px;
        margin: 0 auto;
        position: relative;
        top: -26px;
        left: 259px;
    }
</style>
