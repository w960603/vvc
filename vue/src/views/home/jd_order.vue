<template>
    <div id="app">
        <div class="order">
            <div>
                <span style="flex: 1">订单编号<input type="search" v-model="msg" @input="search(msg,'orderId')"/></span>
                <span style="flex: 1">收件人<input type="search" v-model="name" @input="search(name,'user')"/></span>
                <!--<div>地址<input type="search" ></div>-->
                <!--<span style="flex: 2">价格<input type="search"  v-model="price" @input="search(price,'orderPayment')"></span>-->
            </div>
            <!--<div>商品SKU<input type="search"></div>-->
            <!--style="background: #1e7e34;padding:10px;color:#fff"-->

            <div  class="btn btn-success">获取打印机</div>
            <!--<span>打印机名称:</span>-->
            <select style="width: 150px" @change="changeprinter($event)">
                <option  v-if="printers.length == 0">请获取打印机</option>
                <option v-for="item in printers" :value="item.name" v-else>{{item.name}}</option>
            </select>
            <select style="width: 150px" @change="express_type($event)">
                <option v-for="item in express" :value="item.name">{{item.name}}</option>
            </select>
            <div   class="btn btn-success">一键打单</div>
        </div>
        <table style="margin: 0 auto" class="table table-hover table-bordered table-responsive">
            <colgroup>
                <col width="150">
                <col width="120">
                <col width="120">
                <col width="120">
                <col width="150">
                <col width="120">
                <!--<col width="100">-->
                <!--<col width="100">-->
                <col width="120">
                <col width="200">
            </colgroup>
            <thead class="jdorder_heard">
            <th v-for="col in titles">{{col}}</th>
            <th>订单</th>
            </thead>
            <tbody>
            <tr style="user-select:none;" v-for="(row,index) in sub_lists" :key="index" class="jdorder_tr">
                <td>{{row.orderId}}</td>
                <td>{{row.consigneeInfo.fullname}}</td>
                <td>{{row.consigneeInfo.province}}</td>
                <td>{{row.consigneeInfo.mobile}}</td>
                <td>{{row.itemInfoList[0].skuId}}</td>
                <!--<td>{{row.orderPayment}}</td>-->
                <!--<td>{{row.modified}}</td>-->
                <!--<td>{{row.storeOrder}}</td>-->

                <!--卖家备注-->
                <td @click="sellerRemark($event,index) ">{{row.venderRemark}}</td>
                <!--买家备注-->
                <td @click="buyerRemark($event,index)">{{row.orderRemark}}</td>
                <td>
                    <button class="btn btn-info" @click="getLists(row)">修改订单</button>
                    <button @click="one_dayin(row.orderId)" class="btn btn-primary">面单</button>
                    <button @click="one_dayin(row.orderId)" class="btn btn-danger">发货</button>
                </td>
            </tr>
            </tbody>
        </table>
        <div class="wrap" v-show="isShow">
            <div id="order-list">
                <ul style="list-style: none;">
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
                    <li>
                        <span>卖家备注</span>
                        <input type="text" :value="order_list.venderRemark">
                    </li>
                    <li>
                        <span>买家备注</span>
                        <input type="text" :value="order_list.orderRemark">
                    </li>
                </ul>
                <button class="button" @click="close">关闭</button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "jd_order",
        data() {
            return {
                titles: ["订单编号", "收件人", "地址", "手机", "商品sku","卖家","买家"],// "价格","发货位置","更新时间",
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
                    // {
                    //     en: 'orderRemark',
                    //     cn: '备注'
                    // },
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

                // 打印机的名称
                printer_name:null,

                //快递类型
                express:[
                    {name:"中通",idx:1},
                    {name:"顺丰",idx:2}
                ],
                //配合快递idx
                express_num:null,

                //打印机状态
                status:[],
                no_goods:false,
                yes_goods:true,
            }
        },
        mounted() {
            this.qignqiu()
        },
        created() {
            this.WebSocket = new WebSocket('wss://localhost:13529');
            this.WebSocket.onopen = (res)=> {
                this.bools = true;
                this.WebSocket.send(JSON.stringify({
                    "cmd": "getPrinters",
                    "requestID": "123458976",
                    "version": "1.0"})
                );
                // console.log("连接打印机成功", this.bools);

                //获取打印机状态
                this.WebSocket.send(JSON.stringify({
                    "cmd":"getTaskStatus",
                    "requestID":"123458976",
                    "version":"1.0",
                    "taskID":[
                        "12311",
                        "12312"
                    ]
                }))
            };
            this.WebSocket.onerror = (err)=> {
                this.bools = false;
                // console.log("连接打印机失败");
                // console.log(err);
            };

            // 接收服务端消息
            this.WebSocket.onmessage = (event)=>{
                // console.log("我走啦",event);

                // console.log(event);
                var datas = JSON.parse(event.data);
                var dcu_id = JSON.parse(localStorage.getItem("orderid"));



                //获取打印机
                if (datas.cmd == "getPrinters"){
                    console.log("获取到的打印机", datas.printers);
                    this.printers = datas.printers;//数据类型：array
                };


                //获取打印机状态
                if (datas.cmd == "getTaskStatus"){
                    // console.log("获取打印机状态",datas);
                    this.printstatus = datas.printStatus;//获取打印机状态：array
                }

                // //获取打印机配置
                // if (datas.cmd == "getPrinterConfig") {
                //         console.log("获取打印机配置", datas.msg);
                // };


                // //设置打印机配置
                // if (datas.cmd == "setPrinterConfig") {
                //         console.log("设置打印机配置", datas.msg);
                // };


                //打印通知
                // if (datas.cmd == "notifyPrintResult") {
                //     console.log("打印通知", JSON.parse(event));
                // };


                //打印通知
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
                        console.log(datas);
                        // $.ajax({
                        //     type:"post",
                        //     url:"https://jd.vvc.tw/index/order/failureorder",
                        //     data:{
                        //         waybillCode:datas.requestID
                        //     },
                        //     success:(res)=>{
                        //         console.log(res);
                        //     }
                        // })
                    }
                }
            };

            //断开打印机
            this.WebSocket.close = (clo)=>{
                this.bools = false;
                console.log("断开连接");
            };

        },
        methods: {
            express_type(ev){
                console.log(ev.path[0].selectedIndex);
                this.express_num = ev.path[0].selectedIndex
            },
            changeprinter(ev){
                console.log(ev.path[0].value);
                this.printer_name = ev.path[0].value;
            },
            //请求页面数据
            qignqiu() {
                $.ajax({
                    type: "post",
                    url: 'https://.vvc.tw/index/index/orderlist',
                    success: (res) => {
                        console.log(33333,res);
                        if (res.code) {
                            this.product_lists = res.data;
                            this.sub_lists = res.data;
                        }
                    }
                })
            },
            close() {
                this.isShow = false
            },

            //
            getLists(arr){
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
                        }
                    }
                })
            },
            //搜索订单编号
            // search(val,item) {
            //     var that = this;
            //     var list = [];
            //     console.log(item);
            //     if(item==='user'){
            //         list = this.product_lists.filter(function (val1) {
            //             console.log(val1);
            //             return val1.consigneeInfo.fullname.indexOf(val)>-1;
            //             // return val.consigneeInfo.fullname.indexOf(that.name)>-1;
            //         })
            //     }else{
            //         list = this.product_lists.filter(function (val1) {
            //             return val1[item].indexOf(val)>-1;
            //             // return val.consigneeInfo.fullname.indexOf(that.name)>-1;
            //         })
            //     }
            //     this.sub_lists = list
            // },
            dayin(){
                console.log(this.bools);
                if (this.bools){
                    //即将触发发送消息

                    //开始发送
                    if (this.printers.length < 1){
                        alert("请获取打印机");
                    }
                    //判断 打印机以及打印机的状态
                    else if (this.printers.length > 1 && this.printstatus < 1) {
                        if (this.printer_name == null){
                            // console.log(this.printers[0].name);
                            if (this.express_num == null){
                                // console.log(this.printers[0].name, this.express[0].idx);
                                this.allorder(this.printers[0].name,this.express[0].idx);
                            }else{
                                // console.log(this.printers[0].name, this.express[this.express_num].idx);
                                this.allorder(this.printers[0].name,this.express[this.express_num].idx);
                            }
                        }else {
                            if (this.express_num == null){
                                // console.log(this.printer_name, this.express[0].idx);
                                this.allorder(this.printer_name,this.express[0].idx);
                            }else{
                                // console.log(this.printer_name, this.express[this.express_num].idx);
                                this.allorder(this.printer_name,this.express[this.express_num].idx);
                            }
                        }
                    }
                    //发送完成
                }else{
                    alert("没有获取打印机或打印机被占用");
                }
            },
            // 多个面单打印

            allorder(printers,express) {
                $.ajax({
                    type:"post",
                    url:"https://jd.vvc.tw/index/order/orderlist12",
                    data:{
                        type:express
                    },
                    success:(res)=>{
                        console.log("执行操作",res);
                        for (var i = 0;i<res.data.length;i++){
                            console.log(res.data[i]);
                            // 数据结构发生改变
                            // for (var j = 0; j < res.data[i].length;j++){
                            var taskid = this.getUUID(8,10);
                            console.log(res.data[i].documentID);
                            this.orderid.push({documentID:res.data[i].documentID,taskID:taskid});
                            localStorage.setItem("documentID",res.data[i].documentID);
                            // console.log("订单完成id",this.orderid);
                            var  miandan = {
                                "cmd": "print",
                                "requestID": res.data[i].documentID,
                                "version": "1.0",
                                "task":{
                                    "taskID": taskid,
                                    "preview": false,
                                    "taskStatus":"printed",
                                    "previewType": "image",
                                    "printer": printers,
                                    "documents": [{
                                        "documentID":res.data[i].documentID,
                                        "contents":res.data[i].contents
                                    }]
                                }
                            };
                            console.log("面单",miandan);
                            // var json_miandan =JSON.stringify(miandan);
                            // if ()
                            // this.WebSocket.send(miandan);
                            // console.log(res.data[i][j].documentID);
                            // 建立连接
                        }
                        // this.orderid 把数组转化成字符串存到本地
                        var str = JSON.stringify(this.orderid);
                        localStorage.setItem("orderid",str);
                    }
                })
            },

            one_dayin(orderid){
                if (this.bools){
                    var requestid = this.getUUID(8,10);
                    //即将触发发送消息

                    //开始发送
                    if (this.printers.length == 0){
                        alert("请获取打印机");
                    }else{
                        if (this.printer_name == null){
                            console.log(this.printers[0].name);
                            this.one_order(this.printers[0].name,orderid);
                        }else {
                            console.log(this.printer_name);
                            this.one_order(this.printer_name,orderid);
                        }
                    }
                    //发送完成

                }else{
                    alert("连接失败")
                }
            },
            //单个面单打印
            one_order(printers,orderid){
                $.ajax({
                    type:"post",
                    url:"http://jd.vvc.tw/index/order/printone",
                    data:{
                        orderId:orderid
                    },
                    success:(res)=>{
                        console.log("执行操作",res.data);
                        // var requestid = this.getUUID(8,10);
                        var taskid = this.getUUID(8,10) ;
                        var  miandan = {
                            "cmd": "print",
                            "requestID": res.data.documentID,
                            "version": "1.0",
                            "task": {
                                "taskID": taskid,
                                "preview": true,
                                "taskStatus":"printed",
                                "previewType": "image",
                                "printer": printers,
                                "documents": [{
                                    "documentID":res.data.documentID,
                                    "contents":res.data.contents
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
            //产生随机数uuid
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

            // sellerRemark buyerRemark

            // 卖家备注
            sellerRemark(ev,idx){
                // console.log(ev.path[0].innerHTML);
                if (ev.path[0].innerHTML != ""){
                    ev.path[1].childNodes[12].className = "no_goods";
                    if (ev.path[0].className == "yes_goods"){
                        ev.path[0].className = "no_goods"
                    }else {
                        ev.path[0].className = "yes_goods"
                    }
                }
            },
            buyerRemark(ev,idx){
                // console.log(ev.path[0].innerHTML);
                if (ev.path[0].innerHTML != ""){
                    ev.path[1].childNodes[10].className = "no_goods";
                    if (ev.path[0].className == "yes_goods"){
                        ev.path[0].className = "no_goods"
                    }else {
                        ev.path[0].className = "yes_goods"
                    }
                }
                // console.log(this.sub_lists[idx].orderRemark);
            }

        }
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
    /*订单备注*/
    .no_goods{
        background: none;
    }
    .yes_goods{
        background:red;
        color: white;
    }

</style>
