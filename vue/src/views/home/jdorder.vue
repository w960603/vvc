<template>
    <div id="app">
        <div class="order">
            <div>
                <!--<span style="flex: 1">订单编号<input type="search" v-model="msg" @input="search(msg,'orderId')"/></span>-->
                <!--<span style="flex: 1">收件人<input type="search" v-model="name" @input="search(name,'user')"/></span>-->

                <button class="btn btn-primary" style="margin-right: 20px;" @click="with_jdorder">同步京东订单</button>
                <button class="btn btn-primary" style="margin-right: 20px;" @click="xsh_order">同步小红书订单</button>
                <button class="btn btn-primary" style="margin-right: 20px;" @click="syncphrase">同步短语</button>
                <button class="btn btn-primary" @click="stopprint">暂停打印</button>
                <button class="btn btn-primary" @click="recovery">恢复打印</button>
                <button class="btn btn-primary" @click="getorder">获取面单</button>
                <!--<div>地址<input type="search" ></div>-->
                <!--<span style="flex: 2">价格<input type="search"  v-model="price" @input="search(price,'orderPayment')"></span>-->
            </div>
            <!--<div>商品SKU<input type="search"></div>-->
            <!--style="background: #1e7e34;padding:10px;color:#fff"-->

            <!--<div  class="btn btn-success">获取打印机</div>-->
            <!--<span>打印机名称:</span>-->
            <!--<a-button @click="error">Error</a-button>-->
            <!--<select style="width: 150px" @change="changeprinter($event)">-->
                <!--<option v-if="printers.length == 0">请获取打印机</option>-->
                <!--<option v-for="item in printers" :value="item.name" v-else>{{item.name}}</option>-->
            <!--</select>-->
            <div> <router-link to="/setprint">设置打印机</router-link></div>


            <!--设置快递类型-->
            <!--<select style="width: 150px" @change="express_type($event)">-->
                <!--<option v-for="item in express" :value="item.name">{{item.name}}</option>-->
            <!--</select>-->



            <div @click="dayin" class="btn btn-success">一键打单</div>
            <div @click="delivergoods" class="btn btn-danger">一键发货</div>

            <!--<button @click="one_dayin(row.orderId)" class="btn btn-danger">发货</button>-->

        </div>
        <table style="margin: 0 auto" class="table table-hover table-bordered table-responsive">
            <colgroup>
                <col width="150">
                <col width="120">
                <col width="100">
                <col width="250">
                <col width="300">
                <col width="100">
                <!--<col width="100">-->
                <col width="150">
                <col width="150">
                <col width="220">
            </colgroup>
            <thead class="jdorder_heard">
            <th v-for="col in titles">{{col}}</th>
            <th>订单</th>
            </thead>
            <tbody>
            <tr style="user-select:none;" v-for="(row,index) in sub_lists" :key="index" class="jdorder_tr">
                <td>{{row.orderid}}</td>
                <td>{{row.usename}}</td>
                <td>{{row.from == "jd"?"京东":""}}{{row.from == "xhs"?"小红书":""}}{{row.from == "tamll"?"天猫":""}}</td>
                <!--<td>{{row.consigneeInfo.mobile}}</td>-->
                <td >{{row.sortname}}</td>
                <td :class="row.presortname?'red':''">{{row.presortname}}</td>
                <td>{{row.express == "zto"?"中通":""}}{{row.express == "sf"?"顺丰":""}}</td>
                <td :class="row.has_remark ==''  ?'':'yes_goods'">
                    {{row.buyer_note?row.buyer_note:"无"}}
                </td>
                <td>{{row.seller_note?row.seller_note:"无"}}</td>
                <!--<td>{{row.orderPayment}}</td>-->
                <!--<td>{{row.modified}}</td>-->
                <!--<td>{{row.storeOrder}}</td>-->
                <!--卖家备注-->
                <!--isbg = true-->
                <!--<td @click="sellerRemark($event,index) ">{{row.venderRemark}}</td>-->
                <!--买家备注-->
                <!--isbg = false"-->
                <!--<td @click="buyerRemark($event,index)">{{row.orderRemark}}</td>-->
                <td>
                    <button class="btn btn-info" @click="getLists(index)">修改订单</button>
                    <button @click="one_dayin(row.orderId)" class="btn btn-primary">面单</button>
                </td>
            </tr>
            </tbody>
        </table>
        <div class="wrap" v-show="isShow" v-if="customerInfo">
            <div id="order-list">
                <ul style="list-style: none;">
                    <li style="padding-left: 10px">
                        <span>订单编号:</span>
                        <span>{{customerInfo.orderid}}</span>
                    </li>
                    <li style="padding-left: 10px">
                        <span>收件人:</span>
                        <span>{{customerInfo.usename}}</span>
                    </li>
                    <li style="padding-left: 10px">
                        <span>订单类型:</span>
                        <span>
                            {{customerInfo.from == "jd"?"京东":""}}{{customerInfo.from == "xhs"?"小红书":""}}{{customerInfo.from == "tamll"?"天猫":""}}
                        </span>
                    </li>
                    <li style="padding-left: 10px">
                        <span style="font-size: 18px">未设置短语:</span>
                        <span style="font-size: 16px">{{customerInfo.presortname}}</span>
                    </li>
                    <li style="padding-left: 10px">
                        <span>快递类型:</span>
                        <!--<span>{{customerInfo.express == "zto"?"中通":""}}{{customerInfo.express == "sf"?"顺丰":""}}</span>-->
                        <!--<input type="text" :value="customerInfo.express">-->
                        <!--@change="changeprinter($event)"-->
                        <select style="width: 150px" @change="changetype($event)">
                            <option value="zto">中通</option>
                            <option value="sf">顺丰</option>
                        </select>
                        <!--顺丰：运送方式transport-->
                        <select style="width: 150px" v-if="displays" @change="transport($event)">
                            <option value="38">陆运</option>
                            <option value="37">空运</option>
                        </select>
                    </li>
                    <!--<li v-for="col in list_title">-->
                    <!--<span>{{col.cn}}:</span>-->
                    <!--<span>{{order_list[col.en]}}</span>-->
                    <!--</li>-->
                    <!--<li>-->
                    <!--<span>卖家备注</span>-->
                    <!--<input type="text" :value="customerInfo.seller_note">-->
                    <!--</li>-->
                    <!--<li>-->
                    <!--<span>买家备注</span>-->
                    <!--<input type="text" :value="customerInfo.buyer_note">-->
                    <!--</li>-->
                    <li style="padding:0 10px;">
                        <div style="padding:10px 0">面单备注:</div>
                        <!--<input type="text" :value="customerInfo.seller_note">-->
                        <textarea style="border:1px solid #c2c2c2;margin-bottom:20px;" cols="40" rows="3"
                                  placeholder="请添写备注" v-model="remark"></textarea>
                    </li>
                </ul>
                <button class="button" @click="close">关闭</button>
                <button class="button" @click="save_tijiao">提交</button>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        name: "jdorder",
        data() {
            return {
                titles: ["订单编号", "收件人", "订单类型", "已生成短语","未设置短语","快递类型", "卖家备注", "买家备注"],// "价格","发货位置","更新时间",
                product_lists: [],
                sub_lists: [],
                // phone_list:[],
                // fullName:[],
                // order_list: [],
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
                msg: '',
                name: '',
                price: '',
                WebSocket: null,
                bools: false,
                boolss: false,
                orderid: [],

                //获取打印机
                printers: [],

                // 打印机的名称
                printer_name: null,

                //打印快递类型
                express: [
                    {name: "中通", idx: 1},
                    {name: "顺丰", idx: 2}
                ],
                //配合快递idx
                express_num: null,

                //打印机状态
                status: [],
                // no_goods:false,
                // yes_goods:true,
                displays: false,

                //修改运送方式 zto/sf
                yunsong: null,

                //顺丰运送方式 陆运/空运
                sf_type: null,

                // 修改备注
                remark: null,
            }
        },
        mounted() {
            this.qingqiu();
        },
        created() {

            var source = {};
            source = new EventSource("http://hz1.vvc.tw/index/text/subscribeOrder");
            console.log(1111, source);

            source.onerror = (event) => {
                console.log(event);
            };
            source.onmessage = (event) => {
                console.log("第一次");
                console.log(event);
                var data = {};
                data = JSON.parse(event.data);
                //开始发送
                if (data.cmd == "print_info"){
                    if (this.printers.length < 0) {
                        alert("请获取打印机");
                    }else {
                        console.log("1111",this.printer_name);
                        // if (this.express_num == null){
                        //     // console.log(this.printer_name, this.express[0].idx);
                        //     this.allorder(this.printer_name,this.express[0].idx,this.miandan );
                        // }else{
                        //     // console.log(this.printer_name, this.express[this.express_num].idx);
                        //     this.allorder(this.printer_name,this.express[this.express_num].idx,this.miandan  );
                        // }
                        // this.printer_name, 打印机名称
                            this.allorder(data.data);
                    };
                }else if (data.cmd == "message"){
                    console.log("111",data)
                    this.success(data.message);
                }
            }
            this.WebSocket = new WebSocket('ws://'+localStorage.server+':13528');
            this.WebSocket.onopen = (res) => {
                this.bools = true;
                this.WebSocket.send(JSON.stringify({
                        "cmd": "getPrinters",
                        "requestID": "123458976",
                        "version": "1.0"
                    })
                );
                // console.log("连接打印机成功", this.bools);
                //获取打印机状态
                this.WebSocket.send(JSON.stringify({
                    "cmd": "getTaskStatus",
                    "requestID": "123458976",
                    "version": "1.0",
                    "taskID": [
                        "12311",
                        "12312"
                    ]
                }))
            };
            this.WebSocket.onerror = (err) => {
                this.bools = false;
            };

            // 接收服务端消息
            this.WebSocket.onmessage = (event) => {
                var datas = JSON.parse(event.data);
                //
                if (datas.cmd == "getPrinters") {
                    this.success('打印机连接成功');
                };
                if(datas.cmd == "notifyPrintResult" ){
                    console.log(8888,datas);
                    if (datas.taskStatus == "printed") {
                            $.ajax({
                                url: "http://hz1.vvc.tw/index/text/receiveOrder",
                                type: "post",
                                data: {
                                    waybillCode: datas.requestID
                                },
                                success: (res) => {
                                    var msg = "成功";
                                    this.success(msg);
                                }
                            });
                    }
                }
                //打印通知

                if (datas.cmd == "print") {
                    // console.log(11111,datas);
                    if (datas.status == "failed") {
                        // obj = JSON.parse(localStorage.getItem("temp2"));
                    } else if (datas.status == "success") {
                       // var obj = localStorage.getItem();
                        //断开打印机
                        console.log(77777,datas)

                    }
                }
            };
            this.WebSocket.close = (clo) => {
                // //获取打印机
                this.bools = false;
                console.log("断开连接");
            };
        },
        methods: {
            error(msg) {
                this.$message.error(msg);
            },
            success(msg) {
                this.$message.success(msg);
            },
            express_type(ev) {
                // console.log(ev.path[0].selectedIndex);
                this.express_num = ev.path[0].selectedIndex
            },

            //修改打印机
            changeprinter(ev) {
                console.log(ev.path[0].value);
                this.printer_name = ev.path[0].value;
            },

            //请求页面数据
            qingqiu() {
                $.ajax({
                    type:"post",
                    url:"http://hz1.vvc.tw/index/text/showorders",
                    success:(res)=>{
                       var  response =  JSON.parse(res);
                       console.log(response);
                        if (response.code) {
                            this.product_lists = response.data;
                            this.sub_lists = response.data;
                            if (response.data.length< 0){
                                var msg = "获取成功，暂无订单";
                                this.success(msg);
                            }else {
                                var msg = "获取数据成功";
                                this.success(msg);
                            }
                            this.$forceUpdate();
                        }
                    }
                })

                // this.axios.post("http://hz1.vvc.tw/index/text/showorders").then((response)=>{
                //     // console.log(3333,res)
                //     // var datas = {};
                //     // datas = JSON.parse(res);
                //     if (response.data.code) {
                //         this.product_lists = response.data.data;
                //         this.sub_lists = response.data.data;
                //         if (response.data.data.length< 0){
                //             var msg = "获取成功，暂无订单";
                //             this.success(msg);
                //         }else {
                //             var msg = "获取数据成功";
                //             this.success(msg);
                //         }
                //         this.$forceUpdate();
                //     }
                // })
            },

            close() {
                this.isShow = false
            },

            //提交 修改信息
            save_tijiao() {
                var str = "zto";
                var datas = [];
                if (this.yunsong == null) {
                    this.yunsong = str;
                }
                if (this.customerInfo && this.remark != null) {
                    // console.log(this.customerInfo); //源数据
                    // console.log(this.customerInfo.orderid); //订单id orderid
                    // console.log(this.customerInfo.from); //来源
                    // console.log(this.yunsong);//快递类型 zto/sf
                    // console.log(this.sf_type); //顺丰的快递类型 陆运/空运
                    // console.log(this.remark); //备注（必填）

                    // console.log("11",this.customerInfo);
                    // delete this.customerInfo.has_remark;
                    // console.log("22",this.customerInfo);
                    //
                    var obj = {
                        childorder: Number(this.customerInfo.childorder),
                        skusuanfa: this.customerInfo.skusuanfa,
                        skutotalnum: this.customerInfo.skutotalnum,
                        remark: this.customerInfo.remark,
                        time: this.customerInfo.time,
                        orderid: this.customerInfo.orderid,
                        usename: this.customerInfo.usename,
                        sortname: this.customerInfo.sortname,
                        presortname: this.customerInfo.presortname,
                        seller_note: this.customerInfo.seller_note,
                        buyer_note: this.customerInfo.buyer_note,
                        express: this.customerInfo.express,
                        method: this.customerInfo.method,
                        from: this.customerInfo.from,
                    };
                    // var aa =  JSON.stringify(obj);
                    // console.log("2222",obj);
                    var objs = {
                        remark: this.remark,
                        orderId: this.customerInfo.orderid,
                        data: obj,
                        from: this.customerInfo.from,
                        express: this.yunsong,
                        method: this.sf_type
                    }

                    datas.push(objs);
                    $.ajax({
                        url: "http://hz1.vvc.tw/index/text/modifyOrder",
                        type: "post",
                        data: {
                            datas: datas,
                            // kkk:parseInt(datas[0].data.childorder),
                        },
                        success: (res) => {
                            console.log(res);
                            // ress = JSON.parse(res)
                            // if (res.code == 1){
                            var msg = "成功";
                            this.success(msg);
                            this.qingqiu();
                            // };
                            this.isShow = false;
                        }
                    })
                }
            },

            //修改订单
            getLists(idx) {
                    this.isShow = true;
                    this.customerInfo = this.sub_lists[idx];
            },

            //快递运送选择
            changetype(e) {
                console.log(e);
                var str = "zto";
                if (e.path[0].value == "zto") {
                    this.displays = false;
                    str = e.path[0].value
                } else if (e.path[0].value == "sf") {
                    this.displays = true;
                    str = e.path[0].value == "sf"
                }
                this.yunsong = str;
            },

            //顺风运送类型
            transport(e) {
                console.log(e.path[0].value);
                var strs = null;
                if (e.path[0].value == null) {
                    strs = 38;
                } else {
                    strs = e.path[0].value
                }
                this.sf_type = strs;
            },

            //同步京东订单
            with_jdorder() {
                $.ajax({
                    type: "post",
                    url: "http://hz1.vvc.tw/index/text/getOrder",
                    success: (res) => {
                        // console.log(res);
                        this.qingqiu();
                    }
                })
            },

            //小红书订单
            xsh_order() {
                $.ajax({
                    type: "post",
                    url: "http://hz1.vvc.tw/index/text/getxhsOrder",
                    success: (res) => {
                        console.log(res);
                        this.qingqiu();
                    }
                })
            },

            //获取面单
            getorder() {
                $.ajax({
                    url: "http://hz1.vvc.tw/index/text/getExpress",
                    type: "post",
                    success: (res) => {
                        console.log(res);
                        if (res.code == 1) {
                            this.qingqiu();
                            var msg = "成功"
                            this.success(mag);
                        }
                    }
                })
            },

            //恢复打印
            recovery(){
              $.ajax({
                  type:"post",
                  url:"http://hz1.vvc.tw/index/text/startPrint",
                  success:()=>{}
              })
            },

            //搜索订单编号
            search(val, item) {
                var that = this;
                var list = [];
                console.log(item);
                if (item === 'user') {
                    list = this.product_lists.filter(function (val1) {
                        console.log(val1);
                        return val1.consigneeInfo.fullname.indexOf(val) > -1;
                        // return val.consigneeInfo.fullname.indexOf(that.name)>-1;
                    })
                } else {
                    list = this.product_lists.filter(function (val1) {
                        return val1[item].indexOf(val) > -1;
                        // return val.consigneeInfo.fullname.indexOf(that.name)>-1;
                    })
                }
                this.sub_lists = list
            },

            //一键发货
            delivergoods(){
                console.log("一键发货");
                this.axios.post("http://hz1.vvc.tw/index/text/sendOrders").then((res)=>{
                    console.log(res);
                    var data = JSON.parse(res);
                    if (data.code){
                        var msg = "发货成功";
                        this.success(msg)
                    }
                })
            },
            //同步短语
            syncphrase() {
                $.ajax({
                    type: "post",
                    url: "http://hz1.vvc.tw/index/text/updateSortName",
                    success:() => {
                        this.qingqiu();
                    }
                })
            },

            dayin() {
                $.ajax({
                    // url:"http://hz1.vvc.tw/index/text/furui",
                    type: "post",
                    url: "http://hz1.vvc.tw/index/text/publishOrder",
                    success: (res) => {
                        // console.log(res);
                    }
                })
                // console.log(this.bools);
                // if (this.boolss){
                // //     //即将触发发送消息
                // //
                // //     //开始发送
                //     if (this.printers.length < 1){
                //         alert("请获取打印机");
                //     }
                //     //判断 打印机以及打印机的状态
                //     else if (this.printers.length > 1 && this.printstatus < 1) {
                //         if (this.printer_name == null){
                //
                //             this.allorder(this.printers[0].name,this.miandan );
                //
                //             // console.log(this.printers[0].name);
                //             // if (this.express_num == null){
                //             //     // console.log(this.printers[0].name, this.express[0].idx);
                //             //     this.allorder(this.printers[0].name,this.express[0].idx,this.miandan );
                //             // }else{
                //             //     // console.log(this.printers[0].name, this.express[this.express_num].idx);
                //             //     this.allorder(this.printers[0].name,this.express[this.express_num].idx,this.miandan );
                //             // }
                //         }else {
                //
                //             this.allorder(this.printer_name,this.miandan );
                //
                //             // if (this.express_num == null){
                //             //     // console.log(this.printer_name, this.express[0].idx);
                //             //     this.allorder(this.printer_name,this.express[0].idx,this.miandan );
                //             // }else{
                //             //     // console.log(this.printer_name, this.express[this.express_num].idx);
                //             //     this.allorder(this.printer_name,this.express[this.express_num].idx,this.miandan  );
                //             // }
                //         }
                //     }
                //     //发送完成
                // }else{
                //     alert("没有获取打印机或打印机被占用");
                // }
            },

            // 多个面单打印
            allorder(miandan) {
                console.log(miandan);

                var taskid = this.getUUID(8, 10);

                var mian = {
                    "cmd": "print",
                    "requestID": miandan.documentID.toString(),
                    "version": "1.0",
                    "task": {
                        "taskID": taskid.toString(),
                        "preview": true,
                        "printer": localStorage.zto.toString(),
                        // "taskStatus": "printed",
                        "previewType": "image",
                        "documents": [{
                            "documentID": miandan.documentID.toString(),
                            "contents": miandan.contents
                        }]
                    }
                };
                console.log(66666,mian);

                var json_miandan = JSON.stringify(mian);
                this.WebSocket.send(json_miandan);
            },

            // one_dayin(orderid) {
            //     if (this.bools) {
            //         var requestid = this.getUUID(8, 10);
            //         //即将触发发送消息
            //
            //         //开始发送
            //         if (this.printers.length == 0) {
            //             alert("请获取打印机");
            //         } else {
            //             if (this.printer_name == null) {
            //                 console.log(this.printers[0].name);
            //                 this.one_order(this.printers[0].name, orderid);
            //             } else {
            //                 console.log(this.printer_name);
            //                 this.one_order(this.printer_name, orderid);
            //             }
            //         }
            //         //发送完成
            //
            //     } else {
            //         alert("连接失败")
            //     }
            // },
            //单个面单打印
            // one_order(printers, orderid) {
            //     $.ajax({
            //         type: "post",
            //         url: "http://jd.vvc.tw/index/order/printone",
            //         data: {
            //             orderId: orderid
            //         },
            //         success: (res) => {
            //             console.log("执行操作", res.data);
            //             // var requestid = this.getUUID(8,10);
            //             var taskid = this.getUUID(8, 10);
            //             var miandan = {
            //                 "cmd": "print",
            //                 "requestID": res.data.documentID,
            //                 "version": "1.0",
            //                 "task": {
            //                     "taskID": taskid,
            //                     "preview": true,
            //                     "taskStatus": "printed",
            //                     "previewType": "image",
            //                     "printer": printers,
            //                     "documents": [{
            //                         "documentID": res.data.documentID,
            //                         "contents": res.data.contents
            //                     }]
            //                 }
            //             };
            //             this.WebSocket.send(JSON.stringify(miandan));
            //
            //             // this.orderid 把数组转化成字符串存到本地
            //             var str = JSON.stringify(this.orderid);
            //             localStorage.setItem("one_orderid", str);
            //         }
            //     })
            // },
            //产生随机数uuid

            //随机ID
            getUUID(len, radix) {
                var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
                var uuid = [], i;
                radix = radix || chars.length;
                if (len) {
                    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
                } else {
                    var r;
                    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
                    uuid[14] = '4';
                    for (i = 0; i < 36; i++) {
                        if (!uuid[i]) {
                            r = 0 | Math.random() * 16;
                            uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                        }
                    }
                }
                return uuid.join('');
            },

            //停止打印机
            stopprint() {
                $.ajax({
                    type: "post",
                    url: "http://hz1.vvc.tw/index/text/printStatus",
                    success: () => {
                        console.log("已经暂停了");
                    }
                })
            },

            // sellerRemark buyerRemark
            // 卖家备注
            sellerRemark(ev, idx) {
                // console.log(ev.path[0].innerHTML);
                if (ev.path[0].innerHTML != "") {
                    ev.path[1].childNodes[12].className = "no_goods";
                    if (ev.path[0].className == "yes_goods") {
                        ev.path[0].className = "no_goods"
                    } else {
                        ev.path[0].className = "yes_goods"
                    }
                }
            },

            buyerRemark(ev, idx) {
                // console.log(ev.path[0].innerHTML);
                if (ev.path[0].innerHTML != "") {
                    ev.path[1].childNodes[10].className = "no_goods";
                    if (ev.path[0].className == "yes_goods") {
                        ev.path[0].className = "no_goods"
                    } else {
                        ev.path[0].className = "yes_goods"
                    }
                }
                // console.log(this.sub_lists[idx].orderRemark);
            },
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

    .button {
        display: inline-block;
        margin-top: 15px;
        padding: 0 18px;
        border: none;
        background-color: #009688;
        color: #fff;
        line-height: 30px;
        white-space: nowrap;
        text-align: center;
        font-size: 14px;
        border-radius: 2px;
        cursor: pointer;
    }

    .order {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 20px;
    }

    .order input {
        line-height: 35px;
        border: 1px solid #e6e6e6;
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
    .jdorder_heard th {
        height: 50px;
        border: 1px solid #e6e6e6;
        text-align: center;
    }

    .jdorder_tr:nth-child(4){
        user-select: all;
    }
    .jdorder_tr:nth-child(5){
        user-select: all;
    }

    .jdorder_tr td {
        padding: 8px;
        vertical-align: middle;
    }

    #order-list li {
        padding: 5px 0;
        border: 1px solid #e6e6e6;
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
    .no_goods {
        background: none;
    }

    .yes_goods {
        background: red;
        color: white;
    }

    .red {
        color: red;
        font-weight: 600;
        font-size: 16px;
    }
</style>
