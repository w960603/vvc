<template>
    <div id="app">
        <!--<div class="order">-->
            <!--<div>订单编号<input type="search" v-model="msg" @input="search(msg,'orderId')"/></div>-->
            <!--<div>收件人<input type="search" v-model="name" @input="search(name,'user')"/></div>-->
            <!--&lt;!&ndash;<div>地址<input type="search" ></div>&ndash;&gt;-->
            <!--<div>价格<input type="search"  v-model="price" @input="search(price,'orderPayment')"></div>-->
            <!--&lt;!&ndash;<div>商品SKU<input type="search"></div>&ndash;&gt;-->
            <!--&lt;!&ndash;style="background: #1e7e34;padding:10px;color:#fff"&ndash;&gt;-->
            <!--<div @click="getprinter" class="btn btn-success">获取打印机</div>-->
            <!--<select style="width: 150px" @change="changeprinter($event)">-->
                <!--<option  v-if="printers.length == 0">请获取打印机</option>-->
                <!--<option v-for="item in printers" :value="item.name" v-else>{{item.name}}</option>-->
            <!--</select>-->
            <!--<div @click="dayin" class="btn btn-success">一键打单</div>-->
        <!--</div>-->
        <table style="margin: 0 auto" class="table table-hover table-bordered table-responsive">
            <colgroup>
                <col width="150">
                <col width="120">
                <col width="120">
                <col width="120">
                <col width="150">
                <col width="120">
                <col width="150">
                <col width="100">
                <col width="100">
                <col width="200">
            </colgroup>
            <thead class="jdorder_heard">
            <th v-for="col in titles">
                {{col}}
            </th>
            <th>订单</th>
            </thead>
            <tbody>
            <tr v-for="(row,index) in sub_lists" :key="index" class="jdorder_tr">
                <td>{{row.package_id}}</td>
                <td>{{row.receiver_name}}</td>
                <td>{{row.receiver_address}}</td>
                <td>{{row.receiver_phone}}</td>
                <td>{{row.item_list[0].item_name}}</td>
                <td>{{row.pay_amount}}</td>
                <td>{{row.time}}</td>
                <td>{{row.express_company_name}}</td>
                <td>{{row.orderRemark}}</td>
                <td>
                    <button class="btn btn-info" @click="getLists(row)">获取订单</button>
                    <button @click="one_dayin(row.orderId)" class="btn btn-primary">面单</button>
                    <button @click="one_dayin(row.orderId)" class="btn btn-danger">发货</button>
                </td>
            </tr>
            </tbody>
        </table>
        <div class="wrap" v-show="isShow">
            <div id="order-list">
                <ul >
                    <li>
                        <span>收货人:</span>
                        <span>{{customerInfo.fullname}}</span>
                    </li>
                    <li>
                        <span>详细地址:</span>
                        <span>{{customerInfo.fullAddress}}</span>
                    </li>
                    <li>
                        <span>手机:</span>
                        <span> {{customerInfo.telephone}}</span>
                    </li>
                    <li>
                        <span>城市编号:</span>
                        <span>{{customerInfo.cityId}}</span>
                    </li>
                    <li v-for="col in list_title">
                        <span>{{col.cn}}:</span>
                        <span>{{order_list[col.en]}}</span>
                    </li>
                </ul>

                <button class="button" @click="close">关闭</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "orderdetail",
        data() {
            return {
                titles: ["订单编号", "收件人", "地址", "手机", "商品sku", "价格", "更新时间", "发货位置", "备注"],
                product_lists: [],
                sub_lists:[],
                phone_list:[],
                fullName:[],
                order_list: [],
                customerInfo: {},
                list_title: [
                    {
                        en: 'orderSellerPrice',
                        cn: '价格'
                    },
                    {
                        en: 'orderId',
                        cn: '订单编号'
                    },
                    {
                        en: 'orderStartTime',
                        cn: '订单创建时间'
                    },
                    {
                        en: 'orderStateRemark',
                        cn: '订单状态'
                    },
                    {
                        en: 'storeOrder',
                        cn: '发货位置'
                    },
                    {
                        en: 'deliveryType',
                        cn: '派送时间'
                    },
                    {
                        en: 'invoiceInfo',
                        cn: '是否开具发票'
                    },
                    {
                        en: 'orderRemark',
                        cn: '备注'
                    },
                ],
                isShow: false,
                msg:'',
                name:'',
                price:'',
                WebSocket:null,
                bools:false,
                orderid:[],
                //获取打印机
                printers:[],
                printer_name:""

            }
        },
        mounted() {
            this.qignqiu()
        },
        created() {
            var that = this;
            this.WebSocket = new WebSocket('ws://localhost:8880');
            this.WebSocket.onopen = function (res) {
                console.log(res, 'open');
                that.bools = true;
                console.log("连接打印机成功", this.bools);
            };
            this.WebSocket.onerror = function (err) {
                that.bools = false;
                console.log("连接打印机失败");
                console.log(err);
            };
            this.WebSocket.close = function (clo) {
                that.bools = false;
                console.log("断开连接");
            };
            // 接收服务端消息
            this.WebSocket.onmessage = (event)=> {
                // console.log("我走啦",event);
                // 获取打印机列表
                var datas = JSON.parse(event.data);

                console.log(datas);

                if (datas.cmd == "getPrinters") {
                    console.log("获取到的打印机", datas.printers);
                    this.printers = datas.printers;
                };

                if (datas.cmd == "getPrinterConfig") {
                    console.log("获取打印机配置", datas.msg);
                };

                if (datas.cmd == "setPrinterConfig") {
                    console.log("设置打印机配置", datas.msg);
                };

                if (datas.cmd == "notifyPrintResult") {
                    console.log("打印通知", datas.msg);
                };
                //打印成功把订单从本地
                var datas = localStorage.getItem("orderid");
                if (datas.cmd == "print"){
                    // console.log("设置打印机配置", datas.msg);
                    if (datas.status == "failed"){
                        // console.log(datas.taskID);//任务id
                        // console.log(datas.requestID);//
                        for (var i = 0;i<dcu_id.length;i++){
                            if (dcu_id[i].taskID == datas.taskID){
                                console.log("dcu_id",dcu_id[i].documentID);
                            }
                        }
                    }else if (datas.status == "success") {
                        $.ajax({
                            type:"post",
                            url:"https://jd.vvc.tw/index/order/failureorder",
                            data:{
                                waybillCode:datas.requestID
                            },
                            success:(res)=>{
                                console.log(res);
                            }
                        })
                    }
                }
                // console.log(JSON.parse(datas));
                // console.log( "订单完成id",this.orderid);
            };
        },
        methods: {
            changeprinter(ev){
                console.log(ev.path[0].value);
                this.printer_name = ev.path[0].value;
            },
            qignqiu(){
                $.ajax({
                    type: "post",
                    url: 'http://hz1.vvc.tw/index/text/showorders',
                    success: (res) => {
                        // console.log(33333,res);
                        var datas = {};
                        datas =  JSON.parse(res);
                        console.log(datas);
                        if (datas.code) {
                            this.product_lists = datas.data;
                            this.sub_lists = datas.data;
                        }
                        console.log(this.sub_lists);
                    }
                })
            },
            close() {
                this.isShow = false
            },
            getLists(arr) {
                this.order_list=[];
                this.customerInfo=[];
                this.isShow = true;
                $.ajax({
                    type: 'post',
                    url: 'https://jd.vvc.tw/index/index/getorder',
                    data: {
                        orderId: arr.orderId
                    },
                    success: (res) => {
                        console.log(res,123);
                        if (res.code) {
                            this.order_list = res.data.orderInfo;
                            this.customerInfo = this.order_list.consigneeInfo;
                            console.log(this.order_list.length);
                        }
                    }
                })
            },
            //搜索订单编号
            search(val,item) {
                var that = this;
                var list = [];
                console.log(item);
                if(item==='user'){
                    list = this.product_lists.filter(function (val1) {
                        console.log(val1);
                        return val1.consigneeInfo.fullname.indexOf(val)>-1;
                        // return val.consigneeInfo.fullname.indexOf(that.name)>-1;
                    })
                }else{
                    list = this.product_lists.filter(function (val1) {
                        return val1[item].indexOf(val)>-1;
                        // return val.consigneeInfo.fullname.indexOf(that.name)>-1;
                    })
                }
                this.sub_lists = list
            },
            dayin(){
                console.log(this.bools);
                if (this.bools){
                    var requestid = this.getUUID(8,10);
                    //获取打印机列表


                    // console.log("执行啦");
                    //即将触发发送消息

                    //开始发送
                    if (this.printers.length == 0){
                        alert("请获取打印机");
                    }else{
                        if (this.printer_name == null){
                            console.log(this.printers[0].name);
                            this.allorder(this.printers[0].name);
                        }else {
                            console.log(this.printer_name);
                            this.allorder(this.printer_name);
                        }
                    }

                    //开始发送
                    // this.allorder();

                    //发送完成

                }else{
                    alert("连接失败")
                }

            },
            one_dayin(orderid){
                if (this.bools){
                    // var ordernum = orderid
                    var requestid = this.getUUID(8,10);
                    //获取打印机列表
                    // console.log("执行啦");

                    //即将触发发送消息

                    //开始发送
                    this.one_order(orderid);

                    //发送完成

                }else{
                    alert("连接失败")
                }
            },
            // 多个面单打印
            allorder() {
                // console.log(res);
                var documentid = this.getUUID(8,5);
                $.ajax({
                    type:"post",
                    url:"https://jd.vvc.tw/index/xhs/printOrderlist",
                    success:(res)=>{
                        console.log("执行操作",res,res.data);
                        for (var i = 0;i<res.data.length;i++){
                                var requestid = this.getUUID(8,10);
                                var taskid = this.getUUID(8,10) ;
                                // console.log(taskid);
                                // this.orderid.push({documentID:res.data[i].documentID});
                                // localStorage.setItem("documentID",res.data[i].documentID);
                                // console.log("订单完成id",this.orderid);
                                var  miandan = {
                                    "cmd": "print",
                                    "requestID": requestid,
                                    "version": "1.0",
                                    "task": {
                                        "taskID": taskid,
                                        "preview": true,
                                        "taskStatus":"printed",
                                        "previewType": "image",
                                        "printer": "HPRT G42D LABEL(USB)",
                                        "paperSize": {
                                            "width": 100,
                                            "height": 120
                                        },
                                        "documents": [{
                                            "documentID":res.data[i].documentID,
                                            "contents":res.data[i].contents
                                        }]
                                    }
                                };
                                // localStorage.setItem(this.orderid, res.data[i][j].documentID);
                                this.WebSocket.send(JSON.stringify(miandan));
                                // 建立连接
                            // }
                        }
                        // this.orderid 把数组转化成字符串存到本地
                        var str = JSON.stringify(this.orderid);
                        localStorage.setItem("orderid",str);
                        //
                        //
                        //
                        //localStorage.setItem("orderid", this.orderid);
                        //this.WebSocket.send({
                        //"cmd": "getPrinters",
                        //"requestID": "123458976",
                        //"version": "1.0"
                        //})
                    }
                })
            },
            //单个面单打印
            one_order(orderid){
                var documentid = this.getUUID(8,5);
                $.ajax({
                    type:"post",
                    url:"http://jd.vvc.tw/index/order/printone",
                    data:{
                        orderId:orderid
                    },
                    success:(res)=>{
                        console.log("执行操作",res,res.data);
                        var requestid = this.getUUID(8,10);
                        var taskid = this.getUUID(8,2) ;
                        var  miandan = {
                            "cmd": "print",
                            "requestID": requestid,
                            "version": "1.0",
                            "task": {
                                "taskID": taskid,
                                "preview": false,
                                "taskStatus":"printed",
                                "previewType": "image",
                                "printer": "HPRT G42D LABEL(USB)",
                                "paperSize": {
                                    "width": 100,
                                    "height": 120
                                },
                                "documents": [{
                                    "documentID":res.data[0].documentID,
                                    "contents":res.data[0].contents
                                }]
                            }
                        };
                        this.WebSocket.send(JSON.stringify(miandan));

                        // this.orderid 把数组转化成字符串存到本地
                        var str = JSON.stringify(this.orderid);
                        localStorage.setItem("one_orderid",str);
                    }
                })
            },
            getUUID(len, radix){
                var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
                var uuid = [], i;
                radix = radix || chars.length;
                if (len) {
                    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
                } else {
                    var r;
                    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
                    uuid[14] = '4';
                    for (i = 0; i < 36; i++) {
                        if (!uuid[i]) {
                            r = 0 | Math.random()*16;
                            uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                        }
                    }
                }
                return uuid.join('');
            },

            getprinter(){
                var  info = {
                    "cmd": "getPrinters",
                    "requestID": "123458976",
                    "version": "1.0"
                }
                this.WebSocket.send(JSON.stringify(info));
            }
            //搜索手机号码
            // searchPhone(){
            //     var that = this
            //     var phone = []
            //     phone = this.product_lists.filter(function(val){
            //         return val.orderPayment.indexOf(that.phone)>-1;
            //     })
            //     this.sub_lists = phone
            // },
            //搜索收件人
            // searchName(){
            //     var that = this
            //     var  listName = [];
            //     listName = this.product_lists.consigneeInfo.filter(function(val){
            //         console.log(product_lists.consigneeInfo.fullname,55555);
            //         return val.consigneeInfo.fullname.indexOf(that.name)>-1;
            //     })
            //     this.fullName = listName
            // }

        },
    }
</script>

<style scoped>
    #app {
        position: relative;
        left: 20px;
        right: 20px;
        background: white;
        padding: 20px;
    }
    .order{
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 20px;
    }
    .order input{
        line-height: 35px;
        border:1px solid #e6e6e6;
    }
    #order-list {
        position: relative;
        width: 50%;
        top: 50%;
        left: 50%;
        padding: 30px;
        background-color: #fff;
        color: #000;
        font-size: 18px;
        transform: translate(-50%, -50%);
    }

    /*#order-list li span:nth-child(1) {*/
    /*display: inline-block;*/
    /*width: 20%;*/
    /*margin-right: 10px;*/
    /*}*/
    /*table tr th{*/
    /*color: #000;*/
    /*font-size: 15px;*/
    /*}*/
    .jdorder_heard th{
        height: 50px;
        border:1px solid #e6e6e6;
        text-align: center;
    }
    .jdorder_tr td{
        padding: 8px;
        vertical-align: middle;
    }
    #order-list li {
        padding: 5px 0;
        border:1px solid #e6e6e6;
    }

    .wrap {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
    }


</style>
