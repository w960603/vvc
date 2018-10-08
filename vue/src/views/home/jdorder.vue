<template>
    <div id="app">
        <div class="order">
            <div>订单编号<input type="search" v-model="msg" @input="search(msg,'orderId')"/></div>
            <div>收件人<input type="search" v-model="name" @input="search(name,'user')"/></div>
            <!--<div>地址<input type="search" ></div>-->
            <div>价格<input type="search"  v-model="price" @input="search(price,'orderPayment')"></div>
            <!--<div>商品SKU<input type="search"></div>-->
        </div>
        <table>
            <colgroup>
                <col width="150">
                <col width="120">
                <col width="120">
                <col width="150">
                <col width="150">
                <col width="120">
                <col width="150">
                <col width="100">
                <col width="150">
                <col width="150">
            </colgroup>
            <thead class="layui-table-header">
            <th v-for="col in titles">
                {{col}}
            </th>
            <th>订单</th>
            </thead>
            <tbody>
            <tr v-for="(row,index) in sub_lists">
                <!--<template v-for="item in row">-->
                <td>{{row.orderId}}</td>
                <td>{{row.consigneeInfo.fullname}}</td>
                <td>{{row.consigneeInfo.province}}</td>
                <td>{{row.consigneeInfo.mobile}}</td>
                <td>{{row.itemInfoList[0].skuId}}</td>
                <td>{{row.orderPayment}}</td>
                <td>{{row.modified}}</td>
                <td>{{row.storeOrder}}</td>
                <td>{{row.orderRemark}}</td>
                <td>
                    <button class="obtain" @click="getLists(row)">获取订单</button>
                </td>
                <!--</template>-->
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
        name: "jdorder",
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
                price:''
            }

        },
        mounted() {
            this.qignqiu()
        },

        //     computed: {
        //         items: function() {
        //             var _search = this.search;
        //             if (_search) {
        //                 return this.product_lists.filter(function(product) {
        //                     return Object.keys(product).some(function(key) {
        //                         return String(product[key]).toLowerCase().indexOf(_search) > -1
        //                     })
        //                 })
        //             }
        //
        //             return this.products;
        //         }
        // },
        methods: {
            qignqiu() {
                $.ajax({
                    type: "post",
                    url: 'https://jd.vvc.tw/index/index/orderlist',
                    success: (res) => {
                        console.log(33333,res)
                        if (res.code) {
                            this.product_lists = res.data;

                            this.sub_lists = res.data;
                        }
                        // console.log(this.product_lists);
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
                            //console.log(JSON.parse(datas.data));
                            this.order_list = res.data.orderInfo;
                            this.customerInfo = this.order_list.consigneeInfo;
                            console.log(this.order_list.length);
                        }
                    }
                })
            },
            //搜索订单编号
            search(val,item) {
                var that = this
                var list = [];
                console.log(item);
                if(item=='user'){
                    list = this.product_lists.filter(function (val1) {
                        console.log(val1);
                        return val1.consigneeInfo.fullname.indexOf(val)>-1
                            ;
                        // return val.consigneeInfo.fullname.indexOf(that.name)>-1;

                    })
                }else{
                    list = this.product_lists.filter(function (val1) {
                        return val1[item].indexOf(val)>-1
                            ;
                        // return val.consigneeInfo.fullname.indexOf(that.name)>-1;

                    })
                }

                this.sub_lists = list
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
    /*.order:nth-child() div{*/
        /*background: #0b2e13;*/
    /*}*/
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
    table,thead,table tr th, table tr td {
        border:1px solid #e6e6e6;
        padding:10px;
    }
    tr:hover{
        /*opacity: ;*/
        background:#f2f2f2;
    }
    tr:nth-child(2n){
        background:#f2f2f2;
    }
    #order-list li {
        padding: 5px 0;
        border:1px solid #e6e6e6;
    }
    .obtain{
        padding:10px 15px;
        border: none;
        color:white;
        font-size: 14px;
        background:#1890ff;
    }

    .button {
        display: inline-block;
        height: 38px;
        margin-top: 15px;
        padding: 0 18px;
        border: none;
        background-color: #009688;
        color: #fff;
        line-height: 38px;
        white-space: nowrap;
        text-align: center;
        font-size: 14px;
        border-radius: 2px;
        cursor: pointer;
    }
    .wrap {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
    }
    .text2{
        width:120px;
        height:120px;
        border:none;
        vertical-align:middle;
    }
    .red{
        background: #f57c6b;
    }

</style>
