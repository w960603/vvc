<template>
<div id="app">
    <div class="zto">中通：<input type="text" :value="zto"  id="zto"> <input type="button" onclick="javascript:localStorage.zto=document.getElementById('zto').value;" value="设置"></div>
    <div  class="sf">顺丰：<input type="text" :value="sf" id="sf"><input type="button" onclick="javascript:localStorage.sf=document.getElementById('sf').value;" value="设置"></div>
    <div  class="yk">永康：<input type="text" :value="yk" id="yk"><input type="button" onclick="javascript:localStorage.yk=document.getElementById('yk').value;" value="设置"></div>
    <div  class="server">服务器：<input type="text" :value="server"   id="server"><input type="button"  onclick="javascript:localStorage.server=document.getElementById('server').value; window.location.reload()" value="设置"></div>
    <div id="list">
        <b>服务器有以下打印机(不要复制空格)</b>

    </div>
</div>
</template>

<!--<script type="text/javascript" src="https://cdn.vvc.tw/a/dl/js/zepto.min.js"></script>-->
<script>

    export default {
        name: "setprint",
        data:{
          zto:"",
          server:"",
          sf:"",
          yk:"",
        },
        created() {
           this.zto=localStorage.zto

            this.sf=(localStorage.sf)
            this.yk=localStorage.yk
            this.server=(localStorage.server)
            $('div input:nth-child(2)').bind('click', function () {
                location.reload();
            })
            var webSocket = {};
            webSocket = new WebSocket('ws://' + localStorage.server + ':13528');
            // request.printer="电子面单打印机";

            //备注：webSocket 是全局对象，不要每次发送请求丢去创建一个，做到webSocket对象重用，和打印组件保持长连接。


            webSocket.onopen = function (event) {
                webSocket.send(JSON.stringify({
                        "cmd": "getPrinters",
                        "requestID": "123458976",
                        "version": "1.0"
                    })
                );

                //doPrint("电子面单打印机",["343464646"])

                // 监听消息
                webSocket.onmessage = function (event) {
                    console.log('Client received a message', event);
                    var back = eval('(' + event.data + ')');


                    //   $("#yulan").attr('src',back.previewImage)

                    if (back.previewImage && back.status == "success") {

                        $("#yulan").attr('src', back.previewImage)
                    } else if (back.cmd == "notifyPrintResult") {
                        $('#send_text').html(back.printStatus[0].msg);
                    }
                    if (back.cmd == "getPrinters") {
                        for (var i in back.printers) {
                            $('#list').append("<li>" + back.printers[i].name + "</li>")
                        }
                    }


                };
                // 监听Socket的关闭
                webSocket.onclose = function (event) {
                    console.log('Client notified socket has closed', event);
                };
            };
        }
    }
</script>

<style scoped>

</style>
