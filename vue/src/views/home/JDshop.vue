<template>
    <div id="app" >
        <table style="margin:0 auto">
            <colgroup>
                <col width="100">
                <col width="200">
                <col width="150">
                <col width="150">
                <col width="150">
                <col width="150">
                <col width="150">
                <col width="150">
                <col width="150">
                <col width="150">
            </colgroup>
            <thead class="jdshop_thead">
                <th v-for="col in titles">
                    {{col.cn}}
                </th>
                <th>获取订单</th>
            </thead>
            <tbody>
            <tr v-for="(row,index) in product_lists">
                <!--<template v-for="item in row">-->
                <template v-for="col in titles">
                    <td v-if="col.en =='logo'">
                        <img style="width:100px;height: 100px" :src="row[col.en]"  alt="图片拼命加载中">
                    </td>
                    <td v-else>
                        {{row[col.en]}}
                    </td>
                </template>
                <td>
                    <button class="obtain_btn" @click="getLists(row)">获取sku</button>
                </td>
            </tr>
            </tbody>
        </table>
        <div class="wrap" v-show="isShow">
            <div id="order-list">
                <div style="width:100%;min-height:100%;">
                    <table>
                        <colgroup>
                            <col width="250">
                            <col width="250">
                            <col width="150">
                            <col width="80">
                            <col width="100">
                            <col width="100">
                            <col width="100">
                        </colgroup>
                        <thead class="jdshop_thead">
                            <th v-for="row in sub_title">
                                {{row.cn}}
                            </th>
                            <th>SKU简称</th>
                        </thead>
                        <tbody>
                        <tr v-for="(col,index) in order_list">
                            <td v-for="row in sub_title">{{col[row.en]}}</td>
                            <!--:change="cedited(edit)"-->
                            <!--v-if="col[index].skuName? vuls = 1111 :vuls = ''"-->
                            <td ><textarea type="text" :class="col.error" class="text2" value="vuls"  placeholder=""   @keyup='edited($event,index)' ></textarea></td>
                        </tr>
                        </tbody>
                    </table>
                    <!--<div class="edit" ><input type="text" class="text2" v-model="edit" @keyup.esc='cancelEdit(list)'  @focus='editBefore(edit)' @keyup.13='edited'/></div>-->
                    <div style="width: 200px;margin: 0 auto">
                        <button class="button" @click="close">关闭</button>
                        <button class="button" style="background: #1E9FFF"  @click="ajax_sku()">提交</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "JDshop",
        data() {
            return {
                titles: [
                    {
                        en:'logo',
                        cn:'商品预览'
                    },
                    {
                        cn:'商品名称',
                        en:'title'
                    },
                    {
                        cn:'商品ID',
                        en:'wareId'
                    },
                    {
                        cn:'京东价',
                        en:'jdPrice'
                    },
                    {
                        cn:'库存',
                        en:'stockNum'
                    },
                    {
                        cn:'商品货号',
                        en:'itemNum'
                    },
                    {
                        cn:'最后上架时间',
                        en:'onlineTime'
                    },
                    {
                        cn:'商品状态',
                        en:'wareStatus'
                    },
                ],
                product_lists: [],
                order_list: [],
                customerInfo: {},
                isShow: false,
                edit:'',
                values:"",
                sort_name:"",
                sub_title: [
                    {
                        cn:'商品名称',
                        en:'wareTitle'
                    },
                    {
                        cn:'货号名称',
                        en:'skuName'
                    },
                    {
                        en:'jdPrice',
                        cn:'京东价'
                    },
                    {
                        cn:'商品货号',
                        en:'skuId'
                    },
                    {
                        cn:'商品ID',
                        en:'wareId'
                    },
                    {
                        cn:'状态',
                        en:'status'
                    },
                ],
            }
        },
        mounted() {
            this.qignqiu();
        },
        methods: {
            qignqiu() {
                $.ajax({
                    type: 'get',
                    url: 'https://jd.vvc.tw/index/index/goodslist',
                    data:{
                        page:1,
                        values:""
                    },
                    success: (res) => {
                        console.log(res,247);
                        if (res.code) {
                            this.product_lists = res.data.data;

                            for (var i = 0, len = res.data.data.length; i < len; i++) {
                                var date = new Date(this.product_lists[i].onlineTime);

                                this.product_lists[i].onlineTime= date.toLocaleDateString().replace(/\//g, "-");

                                var status = '';
                                switch (this.product_lists[i].wareStatus){
                                    case 1 :status = '从未上架';break;
                                    case 2 :status = '自主下架';break;
                                    case 4 :status = '系统下架';break;
                                    case 8 :status = '上架';break;
                                    case 513 :status = '从未上架待审';break;
                                    case 514 :status = '自主下架待审';break;
                                    case 516 :status = '系统下架待审';break;
                                    case 520 :status = '上架待审核';break;
                                    case 1028 :status = '系统下架审核失败';break;
                                }

                                this.product_lists[i].logo = '//img10.360buyimg.com/n1/'+this.product_lists[i].logo;
                                this.product_lists[i].wareStatus = status
                            }
                            console.log(this.product_lists);
                        }
                    }
                })
            },
            close() {
                this.isShow = false
            },
            getLists(arr) {
                this.isShow = true;
                console.log(arr);
                $.ajax({
                    type: 'post',
                    url: 'https://jd.vvc.tw/index/index/goodsku',
                    data: {
                        goodId: arr.wareId
                    },
                    success: (res) => {
                        console.log(res,282);
                        if (res.code) {
                            console.log(res.data);
                            this.order_list = res.data;
                            // this.customerInfo = this.order_list.consigneeInfo
                        }
                        // console.log(JSON.parse(res));
                    }
                })
            },
            edited($event,index){
                // console.log($event.srcElement.value,index,this.order_list[index].skuName,299);
                this.sort_name = this.order_list[index].skuName;
                console.log(this.order_list[index].skuName);
                this.values = $event.srcElement.value;
                console.log($event.srcElement.value,this.values);
            },
            ajax_sku(){
                console.log(111);
                if (this.values != null){
                    console.log(this.sort_name, this.values);
                    $.ajax({
                        type:"post",
                        url:"https://jd.vvc.tw/index/index/renamesku",
                        data:{
                            sortname:this.values,
                            skuname:this.sort_name,
                        },
                        success:(res)=>{
                            console.log(res, 322);
                            layer.msg('修改成功！');
                            this.close();
                        }
                    })
                }else{
                    console.log(22);
                }

            },
        }
    }
</script>

<style scoped>
    #app {
        position: relative;
        left: 20px;
        right: 20px;
        z-index: 0;
        padding: 20px 0;
        /*background: white;*/
        /*padding: 20px;*/
    }
    .jdshop_thead{
        text-align: center;
    }
    .jdshop_thead th{
        height: 50px;
        border:1px solid #e6e6e6;
    }
    table tr th{
        color: #000;
        font-size: 15px;
    }
    table,thead,table tr th, table tr td {
        border:1px solid #e6e6e6;
        padding: 10px;
        margin: 0 auto;
    }
    #order-list {
        position: relative;
        width: 60%;
        top: 50%;
        height: 70%;
        left: 55%;
        padding: 30px;
        background-color: #fff;
        color: #000;
        font-size: 15px;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        overflow-y: scroll;
    }
    .obtain_btn{
        padding:10px 15px;
        border: none;
        color:white;
        font-size: 14px;
        background:#009688;
    }
    #order-list li span:nth-child(1) {
        display: inline-block;
        width: 20%;
        margin-right: 10px;
    }

    #order-list li {
        padding: 5px 0;
    }
    .button {
        display: inline-block;
        height: 38px;
        margin: 53px 10px;
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
