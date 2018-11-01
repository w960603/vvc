<template>
    <div id="app">
        <div>
            <div class="tiaomall">{{tianmao_data1?"evopowerboards天兔专卖店":""}}</div>
            <div class="con">
                <div class="order_con" v-for="(arr,index) in tianmao_data1">
                    <div class="order_title" style="font-size: 16px">{{index == 0?'今天':""}} {{index == 1?'昨天':""}}{{index == 2?'当月':""}}{{index == 3?'上个月':""}}{{index == 4?'两个月前':""}}{{index == 5?'三个月前':""}}</div>
                    <div>订单发货数量：{{arr.order_send?arr.order_send:arr.order_send = '0'}}</div>
                    <div>订单总数量：{{arr.order_total_num? arr.order_total_num : arr.order_total_num = '0'}}</div>
                </div>
            </div>
            <div class="tiaomall">{{tianmao_data2?"vvc旗舰店":""}}</div>
            <div class="con">
                <div class="order_con" v-for="(arr,index) in tianmao_data2">
                    <div class="order_title" style="font-size: 16px">{{index == 0?'今天':""}} {{index == 1?'昨天':""}}{{index == 2?'当月':""}}{{index == 3?'上个月':""}}{{index == 4?'两个月前':""}}{{index == 5?'三个月前':""}}</div>
                    <div>订单发货数量：{{arr.order_send?arr.order_send:arr.order_send = '0'}}</div>
                    <div>订单总数量：{{arr.order_total_num? arr.order_total_num : arr.order_total_num = '0'}}</div>
                </div>
            </div>
            <div class="tiaomall">{{tianmao_data3?"vvc青蛇专卖店":""}}</div>
            <div class="con">
                <div class="order_con" v-for="(arr,index) in tianmao_data3">
                    <div class="order_title" style="font-size: 16px">{{index == 0?'今天':""}} {{index == 1?'昨天':""}}{{index == 2?'当月':""}}{{index == 3?'上个月':""}}{{index == 4?'两个月前':""}}{{index == 5?'三个月前':""}}</div>
                    <div>订单发货数量：{{arr.order_send?arr.order_send:arr.order_send = '0'}}</div>
                    <div>订单总数量：{{arr.order_total_num? arr.order_total_num : arr.order_total_num = '0'}}</div>
                </div>
            </div>
            <div class="tiaomall">{{tianmao_data4?"贞瑰旗舰店":""}}</div>
            <div class="con">
                <div class="order_con" v-for="(arr,index) in tianmao_data4">
                    <div class="order_title" style="font-size: 16px">{{index == 0?'今天':""}} {{index == 1?'昨天':""}}{{index == 2?'当月':""}}{{index == 3?'上个月':""}}{{index == 4?'两个月前':""}}{{index == 5?'三个月前':""}}</div>
                    <div>订单发货数量：{{arr.order_send?arr.order_send:arr.order_send = '0'}}</div>
                    <div>订单总数量：{{arr.order_total_num? arr.order_total_num : arr.order_total_num = '0'}}</div>
                </div>
            </div>
            <div class="tiaomall">京东已发货统计</div>
            <div class="con">
                <div class="order_con" v-for="(array,index) in jingdong_data">
                    <div class="order_title" style="font-size: 16px">{{index == 0?'今天':""}} {{index == 1?'昨天':""}}{{index == 2?'30天':""}}{{index == 3?'这个月':""}}{{index == 4?'上个月前':""}}</div>
                    <div>已发货总订单数：{{array== null?'0':array.ordertotalnum}} </div>
                    <div>销量：{{array== null?"0":array.goodtotalnum}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name:"statistics",
        data(){
            return{
                tianmao_data1: [],
                tianmao_data2: [],
                tianmao_data3: [],
                tianmao_data4: [],
                jingdong_data:[],
            }
        },
        created(){
            //天猫已发货统计
            var url = "https://xxx.xxx.xxx/xxx/tianmao/totalorder",
                urls = "https://xxx.xxx.xxx/index/ordercount/showall";
            this.ajax_data(url);
            // console.log("天猫",this.tianmao_data);
            this.ajax_data(urls);
            // console.log("京东",this.jingdong_data);
        },
        methods:{
            ajax_data(url,arr){
                $.ajax({
                    type:"post",
                    url: url,
                    success:(res)=> {
                        // console.log(res.data);
                        if(url == "https://xxx.xxx.xxx/xxx/tianmao/totalorder"){
                            console.log(res);
                            for(var i in res.data){
                                console.log(i);
                                if (i == "evopowerboards天兔专卖店"){
                                    this.tianmao_data1.push(res.data[i].today,res.data[i].yesterday,res.data[i].month,res.data[i].last_month,res.data[i].two_month_ago);
                                }else if(i == "vvc旗舰店"){
                                    this.tianmao_data2.push(res.data[i].today,res.data[i].yesterday,res.data[i].month,res.data[i].last_month,res.data[i].two_month_ago);
                                }else if(i == "vvc青蛇专卖店"){
                                    this.tianmao_data3.push(res.data[i].today,res.data[i].yesterday,res.data[i].month,res.data[i].last_month,res.data[i].two_month_ago);
                                }else if(i == "贞瑰旗舰店"){
                                    this.tianmao_data4.push(res.data[i].today,res.data[i].yesterday,res.data[i].month,res.data[i].last_month,res.data[i].two_month_ago);
                                }
                                // this.tianmao_data.push(res.data[i].today,res.data[i].yesterday,res.data[i].month,res.data[i].last_month,res.data[i].two_month_ago);
                            }
                            // ,res.three_month_ago
                        }else if(url == 'https://xxx.xxx.xxx/index/ordercount/showall'){
                            console.log("jing",res);
                            this.jingdong_data.push(res.data.res_today,res.data.res_yesterday,res.data.month,res.data.res_thismonth,res.data.res_lastmonth);
                        }
                    }
                })
                return arr;
            }
        }
    }
</script>
<style scoped>
    #app{
        width: 100%;
    }
    .con{
        width: 80%;
        margin: 0 auto;
        display:flex;
        justify-content: space-around;
        align-items: center;
        padding: 20px 0;
    }
    .con div{
        width: 180px;

    }
    .con div{
        padding-bottom: 10px;
    }
    .order_con{
        background: white;
        height: 120px;
        padding: 10px;
        margin: 0 10px;
        box-shadow: 2px 5px 10px #999999;
        border-radius: 4px;
    }
    .order_title{
        font-size: 20px;
    }
    .tiaomall{
        width: 80%;
        margin: 0 auto;
        margin-top: 10px;
        margin-bottom: 10px;
        font-size: 24px;
        color: #2E2D3C;
    }
</style>
