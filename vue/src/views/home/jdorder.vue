<template>
    <div id="app">
        <!--<div class="order">-->
        <!--<div>-->
        <!--&lt;!&ndash;<span style="flex: 1">订单编号<input type="search" v-model="msg" @input="search(msg,'orderId')"/></span>&ndash;&gt;-->
        <!--&lt;!&ndash;<span style="flex: 1">收件人<input type="search" v-model="name" @input="search(name,'user')"/></span>&ndash;&gt;-->

        <!--<button class="btn btn-primary" style="margin-right: 20px;" @click="with_jdorder">同步京东订单</button>-->
        <!--<button class="btn btn-primary" style="margin-right: 20px;" @click="xsh_order">同步小红书订单</button>-->
        <!--<button class="btn btn-primary" style="margin-right: 20px;" @click="syncphrase">同步短语</button>-->
        <!--<button class="btn btn-primary" @click="stopprint">暂停打印</button>-->
        <!--<button class="btn btn-primary" @click="recovery">恢复打印</button>-->
        <!--<button class="btn btn-primary" @click="getorder">获取面单</button>-->
        <!--&lt;!&ndash;<img src="https://cdn.vvc.tw/a/images/headimg.jpg">&ndash;&gt;-->
        <!--<img src="https://cdn.vvc.tw/a/images/headimg.jpg">-->
        <!--</div>-->
        <!--&lt;!&ndash;</select>&ndash;&gt;-->
        <!--<div> <router-link to="/setprint">设置打印机</router-link></div>-->
        <!--<div @click="dayin" v-if="prints != ''" class="btn btn-success">一键打单</div>-->
        <!--<div  class="btn btn-default" disabled="disabled" v-else>一键打单</div>-->
        <!--<div @click="delivergoods" class="btn btn-danger">一键发货</div>-->
        <!--&lt;!&ndash;<button @click="one_dayin(row.orderId)" class="btn btn-danger">发货</button>&ndash;&gt;-->
        <!--</div>-->
        <!--<table style="margin: 0 auto" class="table table-hover table-bordered table-responsive">-->
        <!--<colgroup>-->
        <!--<col width="150">-->
        <!--<col width="120">-->
        <!--<col width="100">-->
        <!--<col width="250">-->
        <!--<col width="300">-->
        <!--<col width="100">-->
        <!--&lt;!&ndash;<col width="100">&ndash;&gt;-->
        <!--<col width="150">-->
        <!--<col width="150">-->
        <!--<col width="220">-->
        <!--</colgroup>-->
        <!--<thead class="jdorder_heard">-->
        <!--<th v-for="col in titles">{{col}}</th>-->
        <!--<th>订单</th>-->
        <!--</thead>-->
        <!--<tbody>-->
        <!--<tr style="user-select:none;" v-for="(row,index) in sub_lists" :key="index" class="jdorder_tr">-->
        <!--<td>{{row.orderid}}</td>-->
        <!--<td>{{row.usename}}</td>-->
        <!--<td>{{row.from == "jd"?"京东":""}}{{row.from == "xhs"?"小红书":""}}{{row.from == "tamll"?"天猫":""}}</td>-->
        <!--&lt;!&ndash;<td>{{row.consigneeInfo.mobile}}</td>&ndash;&gt;-->
        <!--<td >{{row.sortname}}</td>-->
        <!--<td :class="row.presortname?'red':''">{{row.presortname}}</td>-->
        <!--<td>{{row.express == "zto"?"中通":""}}{{row.express == "sf"?"顺丰":""}}</td>-->
        <!--<td :class="row.has_remark  ||( row.buyer_note =='' &&  row.seller_note =='') ?'':'yes_goods'"> {{row.buyer_note?row.buyer_note:"无"}}-->
        <!--</td>-->
        <!--<td :class="row.has_remark  ||( row.buyer_note =='' &&  row.seller_note =='') ?'':'yes_goods'">{{row.seller_note?row.seller_note:"无"}}</td>-->
        <!--<td>-->
        <!--<button class="btn btn-info" @click="getLists(index)">修改订单</button>-->
        <!--<button @click="one_dayin(row.orderId)" class="btn btn-primary">面单</button>-->
        <!--</td>-->
        <!--</tr>-->
        <!--</tbody>-->
        <!--</table>-->
        <!--<template>-->
        <!--&lt;!&ndash;pagination: // 默认分页器形式展开&ndash;&gt;-->
        <!--<a-table  :rowSelection="rowSelection" :columns="columns" :dataSource="shuju" />-->
        <!--</template>-->
        <!--新页面-->
        <div>
            <div class="pattern" style="margin-left:20px">
                <span style="color:#1e9ffb;text-shadow:0px 0px 1px #1e9ffb;padding-right: 10px">普通搜索</span>
                <span style="color: #cecece">搜索模式</span>
            </div>
            <div class="con">
                <!--第一个块-->
                <div class="sales-volume">
                    <div class="order_date">
                        <span class="text1">今日</span>
                        <span class="text1" style="margin: 0 5px">昨日</span>
                        <span class="text1 text2">前日</span>
                    </div>
                    <div class="sales-volume-num">
                        <span class="order_num">120/176</span>
                    </div>
                    <div class="order-img">
                        <img src="https://wangfurui.oss-cn-hangzhou.aliyuncs.com/image/shuju.png"/>
                    </div>
                </div>
                <!--第一个块-->
                <div class="sales-volume">
                    <div class="order_date">
                        <span class="text3">快递单数</span>
                    </div>
                    <div class="sales-volume-num">
                        <span class="order_num1">46</span>
                    </div>
                    <div class="express">
                        <div class="express-left">
                            <span>周同比</span>
                            <span></span>
                            <span>12%</span>
                        </div>
                        <div class="express-right">
                            <span>日环比</span>
                            <span></span>
                            <span>11%</span>
                        </div>
                    </div>
                </div>
                <div>
                    <div>门店销售额排名</div>
                </div>
            </div>

            <div class="order">
                <div style="float: left;">
                    <button class="btn" style="margin-right: 10px;background: #0092fb;color: white"
                            @click="with_jdorder">同步京东(5/63)
                    </button>
                    <button class="btn" style="margin-right: 10px;background: #0092fb;color: white" @click="xsh_order">
                        同步小红书(5/30)
                    </button>
                    <!--<button class="btn" style="margin-right: 10px;background: #0092fb;color: white"-->
                            <!--@click="with_tmall">同步天猫(5/63)-->
                    <!--</button>-->
                    <label for=""class="btn"  style="margin-right: 10px;background: #0092fb;color: white" @click="with_tmall()">同步天猫(5/30)</label>
                    <select name="" id="" @change="tamll_name($event)" style="height:30px;vertical-align: middle">
                        <option v-for="arr in tamll" :value="arr.idx">{{arr.name}}</option>
                    </select>

                    <button class="btn" style="margin-right: 10px;background: #0092fb;color: white" @click="syncphrase">
                        刷新短语
                    </button>
                    <button class="btn" style="margin-right: 10px;background: #0092fb;color: white" @click="syncphrase">
                        一键拼单
                    </button>
                </div>
                <div class="btn-float" style="float: right;">
                    <button class="btn" style="background:#639afb;color: white" @click="getorder">获取面单</button>
                    <button class="btn" style="background:none;border:#ff6515 solid 1px;color: #ff6515"
                            @click="stopprint"><i class="anticon anticon-poweroff" style="color:#fe4b57;"></i> 暂停打印
                    </button>
                    <button class="btn" style="background:#ffac2f;color: white" @click="recovery">恢复打印</button>
                    <button class="btn" @click="dayin" v-if="prints != ''" style="background: #35c436;color: white;">
                        一键打单
                    </button>
                    <button class="btn btn-default" disabled="disabled" v-else>一键打单</button>
                    <button @click="delivergoods" class="btn btn-danger">一键发货</button>
                    <router-link to="/setprint" class="prints"></router-link>
                </div>
            </div>
            <div class="ant-table-wrapper" data-v-36d04910="">
                <div class="ant-spin-nested-loading">
                    <div class="ant-spin-container">
                        <div class="ant-table ant-table-scroll-position-left ant-table-default" style="height: 540px;overflow-y: scroll;">
                            <div class="ant-table-content">
                                <div class="ant-table-body">
                                    <table class="">
                                        <colgroup>
                                            <col width="50">
                                            <col width="200">
                                            <col width="100">
                                            <col width="270">
                                            <col width="400">
                                            <col width="150">
                                            <col width="200">
                                            <col width="150">
                                        </colgroup>
                                        <thead class="ant-table-thead">
                                            <tr>
                                            <th key="selection-column" class="ant-table-selection-column">
                                                <span>
                                                    <div class="ant-table-selection">
                                                        <label class="ant-checkbox-wrapper" >
                                                            <span :class="checked?'ant-checkbox-checked ant-checkbox':'ant-checkbox'">
                                                                <input type="checkbox"  class="ant-checkbox-input" v-model='checked' v-on:click='checkedAll($event)'>
                                                                <span class="ant-checkbox-inner " ></span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                </span>
                                            </th>
                                            <th><span>订单编号</span></th>
                                            <th><span>地区</span></th>
                                            <th><span>订单类型</span></th>
                                            <th><span>面单内容</span></th>
                                            <th><span>快递类型</span></th>
                                            <th><span>快递单号</span></th>
                                            <th><span>订单</span></th>
                                            <th><span>买家/卖家备注</span></th>
                                        </tr>
                                        </thead>
                                        <tbody class="ant-table-tbody">
                                        <tr class="ant-table-row  ant-table-row-level-0" data-row-key="0" v-for="(arr,index) in sub_lists">
                                            <td class="ant-table-selection-column">
                                                <span>
                                                    <label class="ant-checkbox-wrapper">
                                                        <span :class="checked?'ant-checkbox ant-checkbox-checked':'ant-checkbox'">
                                                            <input type="checkbox"  class="ant-checkbox-input" v-model='checkList' :value="arr.id"  value="">
                                                            <span class="ant-checkbox-inner " ></span>
                                                        </span>
                                                    </label>
                                                </span>
                                            </td>
                                            <td>
                                                {{arr.orderid}}
                                                <span v-if="arr.from =='jd'" class="imgs1"></span>
                                                <span v-else-if="arr.from =='xhs'" class="imgs2"></span>
                                                <span v-else="arr.from =='tmall'" class="imgs3"></span>
                                            </td>
                                            <td>
                                                <span class="ant-table-row-indent indent-level-0">{{arr.address}}</span>
                                            </td>
                                            <td>
                                                <span v-if="arr.from == 'jd'">京东</span>
                                                <span v-else-if="arr.from == 'xhs'">小红书</span>
                                                <span v-else="arr.from == 'tmll'">天猫【{{arr.from}}】</span>
                                            </td>
                                            <td  :class="arr.order_good == arr.sortname?'':'red'">{{arr.order_good}}</td>
                                            <td>
                                                <span v-if="arr.express =='zto'" class="imgs4"></span>
                                                <span v-if="arr.express =='SF'" class="imgs5"></span>
                                            </td>
                                            <td>{{arr.willCode}}</td>

                                            <!--修改订单-->
                                            <td>
                                                <span  @click="getLists(arr.orderid,index)" style="margin-right: 10px;color: #0a96fb;font-size: 14px;">修改订单</span>
                                                <span style="color: #0a96fb;font-size: 14px;">面单</span></td>
                                            <td>
                                                <div style="font-size: 12px;border-bottom:1px solid #e2e2e2;"  :class="arr.has_remark  ||( arr.buyer_note =='' &&  arr.seller_note =='') ?'':'yes_goods'">{{arr.buyer_note}}</div>
                                                <span style="font-size: 12px"  :class="arr.has_remark  ||( arr.buyer_note =='' &&  arr.seller_note =='') ?'':'yes_goods'">{{arr.seller_note}}</span>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer">
                <div class="operation_log" style="float: left">
                    <div class="operation-log-text">操作记录</div>
                    <div class="operation-log-for">
                        <div v-if="index < 20" v-for="(list,index) in operation">
                            <span>{{list.time}}</span>
                            <span>{{list.fahuo}}</span>
                        </div>
                    </div>
                </div>
                <div class="print-img" style="float: right">
                    <img :src="item" alt="" v-if="index<11" v-for="(item,index) in print_img">
                </div>
            </div>
        </div>

        <div class="wrap" v-show="isShow"  v-if="isShow">
            <div id="order-list">
                <div class="order-info" style="display: flex">
                    <div>
                        <div>订单标号</div>
                        <!--<input type="text" :value="customerInfo.orderId">-->
                        <span>{{customerInfo.orderid}}</span>
                    </div>
                    <div>
                        <div>昵称</div>
                        <!--<input type="text" :value="customerInfo.consigneeInfo.fullname">-->
                        <span>{{customerInfo.name}}</span>
                    </div>
                    <div>
                        <div>订单来源</div>
                        <!--<input type="text" :value="customerInfo.from">-->
                        <span>{{customerInfo.from}}</span>
                    </div>
                    <!--<div>-->
                        <!--<div>订单状态</div>-->
                        <!--<input type="text" :value='customerInfo.orderState == "FINISHED_L"?"订单完成":"在途"'>-->
                    <!--</div>-->
                    <!--<div>-->
                        <!--<div>快递状态</div>-->
                        <!--<input type="text" :vaule="customerInfo.orderStateRemark?customerInfo.orderStateRemark:'无' ">-->
                    <!--</div>-->
                </div>
                <div>
                    <table style="margin: 0 auto" class="table table-hover table-bordered table-responsive">
                        <colgroup>
                            <!--<col width="150">-->
                            <col width="350">
                            <col width="100">
                            <col width="100">
                            <col width="100">
                            <col width="100">
                            <col width="200">
                            <col width="150">
                        </colgroup>
                        <thead class="jdorder_heard1">
                            <!--<th >商品图片</th>-->
                            <th >商品名称</th>
                            <th >货号名称</th>
                            <th >京东价</th>
                            <th >商品ID</th>
                            <!--<th>状态</th>-->
                            <!--<th >sku简称</th>-->
                            <th >时间</th>
                        </thead>
                        <tbody>
                            <tr class="list" v-for="item in customerInfo.childorder">
                                <!--<td style="width: 80px;height: 80px"><img style="width:100%;height:100%" :src="item.shop_img" alt=""></td>-->
                                <td style="width:80px;font-size: 12px"> {{item.skuname}}</td>
                                <td>{{item.goodid}}</td>
                                <td>{{item.price}}</td>
                                <td>{{item.skuid}}</td>
                                <!--<td>{{customerInfo.orderState == "FINISHED_L"?"订单完成":"在途"}}</td>-->
                                <!--<td>{{item.productNo}}</td>-->
                                <td >{{customerInfo.modified}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style="overflow: hidden">
                    <div style="width: 300px;float: left;">
                        <div class="receiving-address" style="margin-bottom: 20px">
                            <div>收货地址</div>
                            <input type="text" :value="customerInfo.address">
                        </div>
                        <div class="receiving-address" style="width: 400px;">
                            <div>快递类型</div>
                            <select style="width: 150px" @change="changetype($event)">
                                <option value="zto">中通</option>
                                <option value="sf">顺丰</option>
                            </select>
                            <!--顺丰：运送方式transport-->
                            <select style="width:150px" v-if="displays" @change="transport($event)">
                                <option value="38">陆运</option>
                                <option value="37">空运</option>
                            </select>
                        </div>
                    </div>
                    <div style="width: 460px; float: right;">
                        <div class="remark">
                           <span>买家备注</span>
                            <!--<input type="text" :value="customerInfo.buyer_note">-->
                            <span>{{customerInfo.buyer_note}}</span>
                            <span class="span2">引用</span>
                        </div>
                        <div class="remark">
                            <span>卖家备注</span>
                            <!--<input type="text" :value="customerInfo.seller_note">-->
                            <span>{{customerInfo.seller_note}}</span>
                            <span class="span2">引用</span>
                        </div>
                        <div class="remark">
                           <span>面单备注</span> <input type="text" v-model="ipt_remark" ><span class="span2">智能</span>
                        </div>
                    </div>
                </div>
                <!--<ul style="list-style: none;">-->
                    <!--<li style="padding-left: 10px">-->
                        <!--<span>订单编号:</span>-->
                        <!--<span>{{customerInfo.orderid}}</span>-->
                    <!--</li>-->
                    <!--<li style="padding-left: 10px">-->
                        <!--<span>收件人:</span>-->
                        <!--<span>{{customerInfo.usename}}</span>-->
                    <!--</li>-->
                    <!--<li style="padding-left: 10px">-->
                        <!--<span>订单类型:</span>-->
                        <!--<span>{{customerInfo.from == "jd"?"京东":""}}{{customerInfo.from == "xhs"?"小红书":""}}{{customerInfo.from == "tamll"?"天猫":""}}</span>-->
                    <!--</li>-->
                    <!--<li style="padding-left: 10px">-->
                        <!--<span style="font-size: 18px">未设置短语:</span>-->
                        <!--<span style="font-size: 16px">{{customerInfo.presortname}}</span>-->
                    <!--</li>-->
                    <!--<li style="padding-left: 10px">-->
                        <!--<span>快递类型:</span>-->
                        <!--&lt;!&ndash;<span>{{customerInfo.express == "zto"?"中通":""}}{{customerInfo.express == "sf"?"顺丰":""}}</span>&ndash;&gt;-->
                        <!--&lt;!&ndash;<input type="text" :value="customerInfo.express">&ndash;&gt;-->
                        <!--&lt;!&ndash;@change="changeprinter($event)"&ndash;&gt;-->
                        <!--<select style="width: 150px" @change="changetype($event)">-->
                            <!--<option value="zto">中通</option>-->
                            <!--<option value="sf">顺丰</option>-->
                        <!--</select>-->
                        <!--&lt;!&ndash;顺丰：运送方式transport&ndash;&gt;-->
                        <!--<select style="width: 150px" v-if="displays" @change="transport($event)">-->
                            <!--<option value="38">陆运</option>-->
                            <!--<option value="37">空运</option>-->
                        <!--</select>-->
                    <!--</li>-->
                    <!--&lt;!&ndash;<li v-for="col in list_title">&ndash;&gt;-->
                    <!--&lt;!&ndash;<span>{{col.cn}}:</span>&ndash;&gt;-->
                    <!--&lt;!&ndash;<span>{{order_list[col.en]}}</span>&ndash;&gt;-->
                    <!--&lt;!&ndash;</li>&ndash;&gt;-->
                    <!--&lt;!&ndash;<li>&ndash;&gt;-->
                    <!--&lt;!&ndash;<span>卖家备注</span>&ndash;&gt;-->
                    <!--&lt;!&ndash;<input type="text" :value="customerInfo.seller_note">&ndash;&gt;-->
                    <!--&lt;!&ndash;</li>&ndash;&gt;-->
                    <!--&lt;!&ndash;<li>&ndash;&gt;-->
                    <!--&lt;!&ndash;<span>买家备注</span>&ndash;&gt;-->
                    <!--&lt;!&ndash;<input type="text" :value="customerInfo.buyer_note">&ndash;&gt;-->
                    <!--&lt;!&ndash;</li>&ndash;&gt;-->
                    <!--<li style="padding:0 10px;">-->
                        <!--<div style="padding:10px 0">面单备注:</div>-->
                        <!--&lt;!&ndash;<input type="text" :value="customerInfo.seller_note">&ndash;&gt;-->
                        <!--<textarea style="border:1px solid #c2c2c2;margin-bottom:20px;" cols="40" rows="3"-->
                                  <!--placeholder="请添写备注" v-model="remark"></textarea>-->
                    <!--</li>-->
                <!--</ul>-->
                <div style="width: 100%;display: flex;justify-content: flex-end;">
                    <div style="margin-right: 30px;user-select:none">
                        <button class="button1" style="margin: 0 10px" @click="close">关闭</button>
                        <button class="button" @click="save_tijiao">提交</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    // var nexttime=0;
    // var operation1=[{time: "123510113464", fahuo: "理想:发货VVC女神帽1个"}]
    // var render_list=[]
    // var timer=0;
    export default {
        name: "jdorder",
        data() {
            return {
                titles: ["订单编号", "收件人", "订单类型", "已生成短语", "未设置短语", "快递类型", "卖家备注", "买家备注"],// "价格","发货位置","更新时间",
                tit: ["订单标号", "地区", "订单类型", "未设置短语", "快递类型", "订单", "买家/卖家备注"],
                product_lists: [],
                sub_lists: [],
                // phone_list:[],
                // fullName:[],
                // order_list: [],
                customerInfo:{},

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
                orderid: [],
                //打印快递类型
                express: [
                    {name: "中通", idx: 1},
                    {name: "顺丰", idx: 2}
                ],
                //配合快递idx
                express_num: null,
                objjjjj:{
                  nameL:"121212",
                  names:"121212",
                },

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
                prints: null,
                selectedRowKeys: [],

                //模拟数组
                sub_lists: [],

                //操作记录
                operation: [],
                imgs: [],
                checked: false, //全选框
                checkList: [],
                print_img:[],

                //数组下标
                idx:null,
                ipt_remark:"",
                tamll:[
                    {name:"vvc旗舰店",idx:1},
                    {name:"evopowerboards天兔专卖店",idx:2},
                    {name:"贞瑰旗舰店",idx:3},
                    {name:"vvc青蛇专卖店",idx:4},
                ],
                tmallstore:null,
            }
        },
        mounted() {
            this.qingqiu();
        },
        computed: {
            // onChange: (selectedRowKeys, selectedRows) => {
            //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            // },
            // onSelect: (record, selected, selectedRows) => {
            //     console.log(record, selected, selectedRows);
            // },
            // onSelectAll: (selected, selectedRows, changeRows) => {
            //     console.log(selected, selectedRows, changeRows);
            // },

        },

        created() {
            this.prints = localStorage.getItem("zto");
            var source = {};
            var arr = [];

            source = new EventSource("http://jd.vvc.tw/dorder/printorder/subscribeOrder");
            // source = new EventSource("http://hz1.vvc.tw:8080/ws/SSE?uname=Alex");
            // console.log(1111, source);
            source.onerror = (event) => {
                // console.log(event);
            };
            source.onmessage = (event) =>{
                // console.log("第一次");
                // console.log(event);
                var data = {};
                data = JSON.parse(event.data);
                // console.log(data);
                //开始发送

                this.allorder(data);
                // this.allorder(data.data);
                if (data.cmd == "print_info") {
                    // if (this.printers.length < 0) {

                    //     alert("请获取打印机");
                    // } else {
                    console.log(111);
                        this.allorder(data.data);
                    // };
                } else if (data.cmd == "message") {
                    //console.log("111", data)
                    //console.log(new Date().getTime(),data.message);
                     // this.success(data.message);

                    // if(data.message.indexOf("1000")!=-1){
                    //     console.log(new Date().toLocaleTimeString(),data.message,222)
                    // }


                    // this.operation.unshift({
                    //     time:new Date().toLocaleTimeString(),
                    //     fahuo:data.message
                    // })
                    // this.operation.length = 20;
                    //
                    // return
                     this.operation.unshift({
                         time:new Date().toLocaleTimeString(),
                         fahuo:data.message
                     })
                    // this.operation.length = 20;
                    // let n=new Date().getTime()
                    // render_list.unshift(n)
                    // this.render1()

                }
            }
            //
            // var WebSocket1 = new WebSocket('ws://192.168.31.139:8080/ws/join?uname=Alex');
            // WebSocket1.onmessage = (res) => {
            //     var data = {};
            //     data = JSON.parse(res.data);
            //     //console.log(new Date().getTime(),data.message);
            //
            //     if(data.message.indexOf("1000")!=-1){
            //         console.log(new Date().toLocaleTimeString(),data.message)
            //     }
            //
            //     // this.operation.unshift({
            //     //     time:new Date().toLocaleTimeString(),
            //     //     fahuo:data.message
            //     // })
            //     // this.operation.length = 20;
            //
            //
            //
            //     operation1.unshift({
            //         time:new Date().toLocaleTimeString(),
            //         fahuo:data.message
            //     })
            //     operation1.length = 20;
            //     let n=new Date().getTime()
            //     render_list.unshift(n)
            //     this.render1()
            //
            // }

            // this.WebSocket = new WebSocket('ws://' + localStorage.server + ':13528');
            this.WebSocket = new WebSocket('ws://localhost:13528 ');
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
                // console.log(datas);
                if (datas.cmd == "getPrinters") {
                    this.success('打印机连接成功');
                };
                if (datas.cmd == "notifyPrintResult") {
                    // console.log(8888, datas);
                    if (datas.taskStatus == "printed") {
                        $.ajax({
                            url: "http://jd.vvc.tw/dorder/printorder/receiveOrder",
                            // url: "http://hz1.vvc.tw/index/text/receiveOrder",
                            type: "post",
                            data: {
                                waybillCode: datas.requestID
                            },
                            success: (res) => {
                                // var msg = "成功";
                                // this.success(msg);
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
                        if ("previewImage" in datas){
                            // console.log(...datas.previewImage);
                            this.imgs.unshift(...datas.previewImage);

                            let set =Array.from(new Set(this.imgs));
                            this.print_img = set
                            console.log(this.print_img);
                            this.$forceUpdate();
                        }
                    }
                }
            };
            this.WebSocket.close = (clo) => {
                // //获取打印机
                this.bools = false;
                console.log("断开连接");
            };
        },

        watch: { //深度 watcher
            'checkList': {
                handler: function(val, oldVal) {
                    if (val.length === this.array.length) {
                        this.checked = true;
                    } else {
                        this.checked = false;
                    }
                },
                deep: true
            }
        },
        methods: {
            // render1(){
            //     if(render_list.length<=0){
            //         return
            //     }else{
            //         render_list.length=1
            //         var n= render_list.shift()// 最新渲染时间
            //
            //         if(n-nexttime>200){// 大于0.1秒就渲染
            //             nexttime=n
            //             this.operation= [].concat(operation1)// 深拷贝
            //         }else{
            //           render_list.push(new Date().getTime());
            //          clearTimeout(timer);
            //          timer= setTimeout(()=>{
            //              this.render1();
            //          },100)
            //         }
            //     }
            // },

            tamll_name(e){
                this.tmallstore = e.path[0].value;
            },
            //同步天猫订单
            with_tmall(){
                console.log(this.tmallstore);
              // this.axios.post("http://hz1.vvc.tw/index/tmorder/getorder",{dianpu:this.tmallstore}).then((res)=>{
              //     console.log(res);
              // });
                var tm = "";
                if (this.tmallstore == null ){
                    tm = this.tamll[0].idx;
                }else {
                    tm = this.tmallstore
                }

              $.ajax({
                  type:"post",
                  url:"http://jd.vvc.tw/dorder/tmorder/getorder",
                  data:{
                      dianpu:tm
                  },
                  success:(res)=>{
                      console.log(res);
                      this.success(res.msg)
                      this.qingqiu();
                      // this.$forceUpdate();
                  }
              })
            },
            ceshi: function() {
                console.log(this.checked)
            },
            checkedAll: function(e) {
                console.log(999,e.target.checked);
                var _this = this;
                console.log(_this.checkList);
                console.log(_this.checked);
                this.$nextTick(function() {
                    // DOM 现在更新了
                    console.log(_this.checked);
                });
                if (_this.checked) { //实现反选
                    _this.checkList = [];
                } else { //实现全选
                    _this.checkList = [];
                    _this.array.forEach(function(item, index) {
                        _this.checkList.push(item.id);
                    });
                }
            },


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

           return2Br(str) {
                return str.replace(/\r?\n/g,"<br />");
            },
            //请求页面数据
            qingqiu() {
                // $.ajax({
                //     type: "post",
                //     // url:"http://jd.vvc.tw/index/printorder/showorders",
                //     // url:"http://jd.vvc.tw/index/printorder/showorders",
                //     url: "http://hz1.vvc.tw/index/text/showorders",
                //     success: (res) => {
                //         // var  response =  JSON.parse(res);
                //         // console.log(response);
                //         if (res.code) {
                //             this.product_lists = res.data;
                //             this.sub_lists = res.data;
                //             if (res.data.length < 0) {
                //                 var msg = "获取成功，暂无订单";
                //                 this.success(msg);
                //             } else {
                //                 var msg = "获取数据成功";
                //                 this.success(msg);
                //             }
                //             this.$forceUpdate();
                //         }
                //     }
                // })

                this.axios.post("http://jd.vvc.tw/dorder/printorder/showorders").then((res)=>{
                    // var datas = {};
                    // datas = JSON.parse(res);
                    // console.log(3333,res.data.code)

                    if (res.data.code) {
                        // console.log(3333,res)
                        this.product_lists = res.data.data;
                        // for (var i = 0;i<res.data.data.length;i++){
                        //         // var str = res.data.data[i].order_good;
                        //         // if ()){
                        //         //     // var br =document.createElement("br");
                        //             var str = this.return2Br(res.data.data[i].presortname);
                        //             console.log(typeof str);
                        //         // }else {
                        //         //     console.log("我");
                        //         // }
                        //     res.data.data[i].order_good = str;
                        // }

                        this.sub_lists = res.data.data;
                        // console.log(this.sub_lists);
                        // if (res.data.length < 0) {
                        //     var msg = "获取成功，暂无订单";
                        //     this.success(msg);
                        // } else {
                        //     var msg = "获取数据成功";
                        //     this.success(msg);
                        // }

                    }
                })
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

                if (this.customerInfo) {
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
                        childorder: Number(this.sub_lists[this.idx].childorder),
                        skusuanfa: this.sub_lists[this.idx].skusuanfa,
                        skutotalnum: this.sub_lists[this.idx].skutotalnum,
                        remark: this.sub_lists[this.idx].remark,
                        time: this.sub_lists[this.idx].time,
                        orderid: this.sub_lists[this.idx].orderid,
                        usename: this.sub_lists[this.idx].usename,
                        sortname: this.sub_lists[this.idx].sortname,
                        presortname: this.sub_lists[this.idx].presortname,
                        seller_note: this.sub_lists[this.idx].seller_note,
                        buyer_note: this.sub_lists[this.idx].buyer_note,
                        address:this.sub_lists[this.idx].address,
                        express: this.sub_lists[this.idx].express,
                        method: this.sub_lists[this.idx].method,
                        from: this.sub_lists[this.idx].from,
                    };
                    // var aa =  JSON.stringify(obj);
                    // console.log("2222",obj);
                    var objs = {
                        remark: this.ipt_remark,
                        orderId: this.sub_lists[this.idx].orderid,
                        data: obj,
                        from: this.sub_lists[this.idx].from,
                        express: this.yunsong,
                        method: this.sf_type
                    }
                    datas.push(objs);
                    $.ajax({
                        url: "http://jd.vvc.tw/dorder/printorder/modifyOrder",
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
            getLists(id,index) {
                this.idx = index;
                this.isShow = true;

                var url = "http://jd.vvc.tw/dorder/printorder/searchOrder"
                this.axios.post(url,{id:id}).then((res)=>{
                        this.customerInfo = res.data.data;
                        console.log(this.customerInfo);
                }).catch(function (error) {
                        console.log(error);
                });
                // this.customerInfo = this.sub_lists[idx];
            },

            //同步京东订单
            with_jdorder() {
                $.ajax({
                    type: "post",
                    url: "http://jd.vvc.tw/dorder/printorder/getOrder",
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
                    url: "http://jd.vvc.tw/dorder/printorder/getxhsOrder",
                    success: (res) => {
                        console.log(res);
                        this.qingqiu();
                    }
                })
            },

            //获取面单
            getorder() {
                $.ajax({
                    // url: "http://jd.vvc.tw/index/printorder/getExpress",
                    url: "http://jd.vvc.tw/dorder/printorder/getExpress",
                    type: "post",
                    success: (res) => {
                        console.log(res);
                        if (res.code == 1) {
                            this.qingqiu();
                            var msg = "成功"
                            // this.success(mag);
                        }
                    }
                })
            },

            //恢复打印
            recovery() {
                $.ajax({
                    type: "post",
                    url: "http://jd.vvc.tw/dorder/printorder/startPrint",
                    success: () => {
                        var msg = "恢复成功";
                        this.success(msg);
                    }
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
            delivergoods() {
                console.log("一键发货");
                this.axios.post("http://jd.vvc.tw/dorder/orderprint/sendOrders").then((res) => {
                    console.log(res);
                    var data = JSON.parse(res);
                    if (data.code) {
                        var msg = "发货成功";
                        this.success(msg)
                    }
                })
            },
            //同步短语
            syncphrase() {
                $.ajax({
                    type: "post",
                    url: "http://jd.vvc.tw/dorder/printorder/updateSortName",
                    success: () => {
                        this.qingqiu();
                    }
                })
            },

            dayin() {
                $.ajax({
                    // url:"http://jd.vvc.tw/index/printorder/furui",
                    type: "post",
                    url: "http://jd.vvc.tw/dorder/printorder/publishOrder",
                    success: (res) => {
                        console.log(res);
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
                var taskid = this.getUUID(8, 10);
                var mian = {
                    "cmd": "print",
                    "requestID": miandan.documentID,
                    "version": "1.0",
                    "task": {
                        "taskID": miandan.documentID,
                        "preview": true,
                        "printer": localStorage.zto.toString(),
                        // "taskStatus": "printed",
                        "previewType": "image",
                        "documents": [{
                            "documentID": miandan.documentID,
                            "contents": miandan.contents
                        }]
                    }
                };
                var str = JSON.stringify(mian)
                this.WebSocket.send(str);

                mian.task.preview = false;
                mian.task.taskID = taskid.toString();

                console.log(99999,miandan);
                var str1 = JSON.stringify(mian)
                this.WebSocket.send(str1);
            },
            //单个面单打印
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
                    url: "http://jd.vvc.tw/dorder/printorder/printStatus",
                    success: () => {
                        console.log("已经暂停了");
                        var msg = "暂停成功"
                        this.success(msg);
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

            //修改快递类型 zto/sf
            changetype(e){
                console.log();
                if (e.path[0].value == "sf"){
                    this.displays = true;
                    this.yunsong = e.path[0].value;
                } else {
                    this.displays = false;
                    this.yunsong = e.path[0].value;
                }

            },

            //顺丰 陆运/空运
            transport(e){
                this.sf_type = e.path[0].value;
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
        background: white;
        padding: 10px 20px;
        min-height: 1000px;
        border-radius: 6px;
    }

    .con {
        padding: 15px 0 30px 0;
        margin-left: 20px;
        display: flex;
        border-bottom: 1px solid #e2e2e2;
    }

    .sales-volume {
        width: 250px;
        height: 140px;
        border: 1px solid #f1f1f1;
        padding: 10px 0;
        margin-right: 20px;
        box-shadow: 2px 4px 6px #e2e2e2;
    }

    .text1 {
        /*color:#656565;*/
        padding: 0 5px;
        color: #7a7a7a;
        border-radius: 2px;
    }

    .text2 {
        background: #2b87fb;
        border-radius: 2px;
        color: #f9fcff;
        box-shadow: 0px 0px 2px #2b87fb;
    }

    .sales-volume-num {
        width: 160px;
        margin: 10px auto;
        text-align: center;
    }

    .order_date {
        width: 150px;
        margin: 0 auto;
        text-align: center;
    }

    .order_num {
        color: #333333;
        font-size: 30px;
        font-weight: 700;
    }

    .order-img {
        width: 100%;
        text-align: center;
    }

    .order-img img {
        width: 80%;
        height: 30px;
    }

    .text3 {
        padding: 0 5px;
        color: #333333;
        border-radius: 2px;
        font-weight: 800;
    }

    .order_num1 {
        color: #333333;
        font-size: 34px;
        font-weight: 700;
    }

    .express {
        padding: 0 20px;
        overflow: hidden;
    }

    .express-left span:nth-child(2) {
        display: inline-block;
        width: 0;
        height: 0;
        vertical-align: 3px;
        border-width: 5px;
        border-style: solid dashed dashed dashed;
        border-color: transparent transparent #7eda7f transparent;
    }

    .express-right span:nth-child(2) {
        display: inline-block;
        width: 0;
        height: 0;
        vertical-align: -3px;
        border-width: 5px;
        border-style: solid dashed dashed dashed;
        border-color: #fe202e transparent transparent transparent;
    }

    .express-left {
        float: left;
    }

    .express-right {
        float: right;
    }

    .imgs1 {
        display: inline-block;
        width: 20px;
        height: 10px;
        background: url("https://cdn.vvc.tw/a/images/jd.svg") no-repeat;
        background-size: 100% 100%;
    }
    .imgs2{
        display: inline-block;
        width: 20px;
        height: 10px;
        background: url("https://cdn.vvc.tw/a/images/xhs.svg") no-repeat;
        background-size: 100% 100%;
    }
    .imgs3 {
        display: inline-block;
        width: 20px;
        height: 10px;
        background: url("https://cdn.vvc.tw/a/images/tamll.svg") no-repeat;
        background-size: 100% 100%;
    }


    .imgs4 {
        display: inline-block;
        width: 60px;
        height: 20px;
        background: url("https://cdn.vvc.tw/a/images/zto.svg") no-repeat;
        background-size: 100% 100%;
    }
    .imgs5 {
        display: inline-block;
        width: 60px;
        height: 20px;
        background: url("https://cdn.vvc.tw/a/images/sf.svg") no-repeat;
        background-size: 100% 100%;
    }


    .prints {
        display: inline-block;
        width: 25px;
        height: 30px;
        background: url("https://cdn.vvc.tw/a/images/print.svg") no-repeat;
        background-size: 100% 100%;
        vertical-align: middle;
    }

    .button1{
        display: inline-block;
        padding: 0 16px;
        line-height: 30px;
        text-align: center;
        font-size: 14px;
        border-radius: 4px;
        cursor: pointer;
        background: none;
        border: 1px solid #e2e2e2;
    }
    .button {
        display: inline-block;
        margin-top: 15px;
        padding: 0 18px;
        border: none;
        background-color: #0092fb;
        color: #fff;
        line-height: 30px;
        white-space: nowrap;
        text-align: center;
        font-size: 14px;
        border-radius: 2px;
        cursor: pointer;
    }
    .receiving-address{
        margin: 20px 0;
    }
    .receiving-address div{
        color:#5d5d5d;
        font-size: 16px;
        font-weight: 600;
        margin: 10px 0;
        text-shadow: 2px 2px 3px #e2e2e2;
    }
    .receiving-address input{
        width: 250px;
        height: 30px;
        border-radius:4px;
        border: 1px solid #e2e2e2;
    }
    .receiving-address select{
        display: inline-block;
        width: 300px;
        height: 30px;
        font-size: 12px;
        border-radius:4px;
        border: 1px solid #e2e2e2;
    }
    .order {
        /*display: flex;*/
        /*justify-content: space-around;*/
        /*align-items: center;*/
        overflow: hidden;
        padding: 20px;
    }
    .order-info div{
        margin: 0 20px 10px 20px;
    }
    .order-info div span{
        display: inline-block;
        width: 150px;
        border: 1px solid #e2e2e2;
        border-radius: 4px;
        padding: 5px 8px!important;
        height: 32px!important;
        font-size: 12px;
    }

    .btn-float button {
        margin: 0 5px;
    }

    .order input {
        line-height: 30px;
        border: 1px solid #e6e6e6;
    }
    .list td{
        font-size: 12px;
    }
    .remark{
        margin: 25px 0;
    }
    .remark input{
        width: 300px;
        /*height: 30px;*/
        border: 1px solid #e2e2e2;
        border-radius: 4px;
        margin:0 10px 0 14px;
    }
    input{
        display: inline-block;
        padding: 5px 5px!important;
        height: 32px!important;
        font-size: 12px;
    }

    .span2{
        display: inline-block;
        padding:4px 10px;
        background: #0092fb;
        font-size: 12px!important;
        color:white!important;
        font-weight: normal!important;
        box-shadow: 0px 0px 1px #0092fb;
        border-radius: 4px;
    }
    .remark span{
        color: #626262;
        font-size: 15px;
        font-weight:600;
    }

    .remark span:nth-child(2){
        display: inline-block;
        width: 300px;
        height: 35px;
        line-height: 35px;
        border: 1px solid #e2e2e2;
        border-radius: 4px;
        margin: 0 10px;
        padding: 0 5px;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: middle;

    }
    #order-list {
        position: relative;
        width: 900px;
        top: 50%;
        left: 55%;
        padding: 30px;
        background-color: #fff;
        color: #000;
        height: 600px;
        font-size: 18px;
        transform: translate(-50%, -50%);
    }
    .jdorder_heard th {
        height: 50px;
        border: 1px solid #e6e6e6;
        text-align: center;
    }
    .jdorder_heard1 th {
        height: 30px;
        border: 1px solid #e6e6e6;
        text-align: center;
        font-size: 14px;
    }
    .jdorder_tr td:nth-child(4) {
        user-select: text !important;
    }

    .jdorder_tr td:nth-child(5) {
        user-select: text !important;
    }

    .jdorder_tr td {
        padding: 8px;
        vertical-align: middle;
    }

    #order-list li {
        padding: 5px 0;
        border: 1px solid #e6e6e6;
    }

    .footer {
        margin-top: 20px;
        overflow: hidden;
    }

    .operation_log {
        width: 400px;
        border: 1px solid #e2e2e2;
        border-radius: 3px;
    }

    .operation-log-text {
        line-height: 30px;
        color: #333333;
        font-weight: 600;
        padding: 0 10px;
        font-size: 14px;
        border-bottom: 1px solid #e2e2e2;
    }

    .operation-log-for {
        padding: 5px;
        min-height: 192px;
    }

    .operation-log-for div {
        line-height: 30px;
    }

    .operation-log-for div span {
        font-size: 12px;
        color: #a1a1a1;
        /*padding: 5px 8px!important;*/
        /*height: 32px!important;*/
        /*font-size: 12px;*/
    }

    .print-img {
        width: 1100px;
        height: 220px;
        border: 1px solid #e2e2e2;
        text-align: center;
        overflow-y:hidden;
    }

    .print-img img {
        display: inline-block;
        width: 120px;
        height: 180px;
        margin: 0 5px;
        margin-top: 20px;
        border: 1px solid #e2e2e2;
    }

    /*弹出层*/
    .wrap {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        z-index: 999;
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
