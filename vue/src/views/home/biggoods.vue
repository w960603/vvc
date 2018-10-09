<template>
    <div id="app">
        <div class="order_title">
            <div class="order_title_left" >
                <img src="https://cdn.vvc.tw/ailogin_image/image/log/2018/biggoods.png">
                <span>快递剩余：{{total}}</span>
            </div>
            <div class="search">
                <input type="text" placeholder="输入搜索订单..." class="form-control">
            </div>
            <div class="order_title_right">
                <span class="title_span1">永康单</span>
                <span class="title_span2">全国单</span>
                <span class="title_span3">本地系统</span>
            </div>
        </div>
        <div class="date_time">
            <div style="width: 12%">
                <span :class="isbg? 'no_goods' : 'yes_goods'" @click="isbg = true">未发货</span>
                <!--yes_goods-->
                <span :class="!isbg? 'no_goods' : 'yes_goods'" @click="isbg = false">已发货</span>
            </div>
            <div style="width: 50%">
                <!--<template>-->
                    <!--<div>-->
                        <!--<template>-->
                            <!--<div>-->
                <label class="name_label">日期范围</label>
                <a-range-picker
                    :ranges="{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }"
                    @change="onChange"
                />
                <button class="btn btn-info" @click="confirm($event)">确认</button>
            </div>
            <div style="width: 38%">
                <button class="btn btn-info" @click="date(1)">今天</button>
                <button class="btn btn-info" @click="date(2)">昨天</button>
                <button class="btn btn-info" @click="date(3)">一个月</button>
            </div>
        </div>
        <!--全部商品-->
        <div class="content">
            <ul class="just_content">
                <li class="box_xing"  v-for="arr in this.arr">
                    <div class="order_name">{{arr[0].title}}</div>
                    <div class="clear_both">
                        <div class="box_xing_left">
                            <img :src="arr[0].img">
                        </div>
                        <div class="box_xing_right" v-if="arr.length > 1">
                            <div v-for="array in arr">
                                <div v-if="array.sizename != null" class="box_xing_text1"   @click="myclick(array.order_goods,array.color,array.size)"  ><span  class="order_sku">{{array.guige}}</span> {{array.sizename}} 剩余：{{array.num}}</div>
                                <div v-else class="box_xing_text2" @click="myclick(array.order_goods,array.color,array.size)">
                                    <span  class="order_sku">{{array.guige}}</span>剩余：{{array.num}}
                                </div>
                            </div>
                        </div>
                        <div class="box_xing_right" @click="myclick(arr[0].order_goods,arr[0].color,arr[0].size)" v-else><span class="order_sku">均码</span>剩余:{{arr[0].num}}</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import 'moment/locale/zh-cn';
    export default {
        name: "biggoods",
        data(){
            return {
                obj:[],
                num:69,
                order_data:{},
                arr:[],
                total:0,
                values:"",
                isbg:true,
                dateFormat: 'YYYY/MM/DD',
                monthFormat: 'YYYY/MM',
                // size: 'default',
            }
        },
        created(){
            var urls = "http://api.vvc.tw/suc/order/surplus";
            var data =  this.data_ajax(urls,0);
            console.log(data);
        },
        methods:{
            moment,
            onChange(dates, dateStrings) {
                console.log('From: ', dates[0], ', to: ', dates[1]);
                console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
            },
            myclick(ids,sku_color,size){
                console.log(ids,sku_color,size);
                window.location.href = "../warehouse/ordertype.html?id="+ids+"&sku_color="+sku_color+"&size="+size+"&t="+new Date().getTime();
            },
            //封装请求未发货/已发货
            data_ajax(urls,datas){
                if (datas == 0){
                    $.ajax({
                        type:"post",
                        url:urls,
                        success:(res)=>{
                            this.total = res.total;
                            for (var i in res.data){
                                this.arr.push(res.data[i]);
                            }
                        }
                    });
                    return this.arr,this.total;
                }else{
                    $.ajax({
                        type:"post",
                        url:urls,
                        data:datas,
                        success:(res)=>{
                            this.total = res.total;
                            for (var i in res.data){
                                this.arr.push(res.data[i]);
                            }
                        }
                    });
                    return this.arr,this.total;
                }
            },

            //根据日期查询未发货/已发货
            confirm(){
                console.log(this.isbg);
                console.log(start_dates);
                // 模拟
                // var urls = "https://www.baidu.com";
                // var datas = {
                //     data1:null,
                //     data2:null,
                // };
                // this.data_ajax(urls,datas);
            },

            //根据天数查询已发货
            date(id){
                console.log("我走啦",id);
                //模拟
                // var urls = "https://www.baidu.com";
                // var datas = {
                //     data1:null,
                //     data2:null,
                // }
                // this.data_ajax(urls,datas);
            }
        }
    }
</script>

<style scoped>
    html{
        height: 1600px;
        /*background: white;*/
    }
    body{
        height: 100%;
    }
    #app {
        width: 1600px;
        min-height: 100%;
        background: white;
        padding: 25px 30px 10px 30px;
        margin: 25px auto;
        /*margin: 25px;*/
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
    }
    .order_title{
        padding: 10px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-bottom: 1px solid #e7e7e7;
    }
    .order_title_left{
        width: 17%;
    }
    .goods{
        width: 12%;
    }
    .search{
        width: 15%;
        height: 28px;
        border-radius: 4px;
    }
    .order_title_right{
        width: 20%;
        text-align: center;
    }

    .order_title_left img{
        width: 60px;
        height: 50px;
    }
    .order_title_left span{
        display: inline-block;
        line-height: 60px;
        font-size: 20px;
        color: #323232;
        font-weight: 600;
    }
    /*搜索订单*/
    .search input{
        width: 100%;
        height: 100%;
        border: 1px solid #c2c2c2;
        border-radius: 4px;
    }
    .title_span1,.title_span3,.title_span2,.no_goods,.yes_goods{
        display: inline-block;
        padding: 6px;
        color: white;
        border-radius: 5px;
        cursor:pointer;
        user-select: none;
    }
    .no_goods{
        user-select: none;
        background: #f94763;
    }
    .yes_goods{
        user-select: none;
        background: #ccc;
    }
    .title_span1{
        background: #f94763;
        margin: 0 10px;
    }
    .title_span2{
        background: #009fd6;
        margin: 0 10px;
    }
    .title_span3{
        background:#ff986a;
    }
    /*时间*/
    .date_time{
        width: 80%;
        margin: 0 auto;
        padding: 20px 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    /*全部商品*/
    .content{
        width: 100%;
    }
    .just_content{
        width: 80%;
        display: flex;
        flex-wrap:wrap;
        margin:0 auto;
    }
    .order_name{
        line-height: 30px;
        color:#666666;
        font-size: 15px;
        font-weight: 600;
    }
    .box_xing_left{
        width: 35%;
        float: left;
        font-size: 0;
        margin-right: 10px;
    }
    .box_xing_left img{
        display: inline-block;
        width: 90px;
        height: 90px;
        font-size: 0;
        border-radius: 4px;
    }
    .box_xing_right{
        width: 60%;
        float: right;
    }
    .box_xing{
        flex:0 0 25%;
        margin: 20px 20px 0 20px;
        padding: 0 10px 15px 10px;
        box-sizing: border-box;
        box-shadow: 6px 6px 30px #e9e9e9;
        border: 2px solid #efefef;
        border-radius: 5px;
    }
    .order_sku{
        font-size: 15px;
        font-weight: 600;
        color: #333333;
        margin-right: 5px;
    }
    .clear_both{
        width: 100%;
        overflow: hidden;
    }
    .box_xing_text1{
        font-size: 12px;
    }
    .box_xing_text2{
        font-size: 12px;
    }
    .name_label{
        margin-left: 5px!important;
    }
</style>
