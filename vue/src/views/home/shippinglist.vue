<template>
    <div id="app">
        <div>
            <div style="margin-top:30px">
                <div>
                    <label>搜索</label>
                    <input style="border: 1px solid #cccccc;width: 300px;height: 30px;padding-left:5px " type="text" name="title" required v-model="order_name"   placeholder="请输入标题" autocomplete="off">
                </div>
            </div>
            <div style="margin: 20px 0">
                <button  class="btn1" @click="sku_show = false">全部商品</button>
                <button  class="btn2" @click="num_click()">发货列表</button>
                <button  class="btn3" @click="show_member = !show_member">显示分类</button>
                <button  class="btn4" @click="update()">刷新</button>
            </div>
        </div>
        <table v-if="!sku_show" style="margin: 0 auto" class="table table-hover table-bordered table-responsive">
            <colgroup>
                <col width="200">
                <col width="200">
                <col width="200">
                <col width="200">
            </colgroup>
            <thead>
                <th style="text-align: center;height: 40px;font-size: 16px;border: 1px solid #e6e6e6;" v-for="title in titles">{{title}}</th>
            </thead>
            <tbody>
            <template v-for="(list,index) in send_list">
                <template v-if="order_name.length>1?goods_info[index1].title == order_name:true" v-for="(arr,index1) in list">
                    <tr :class="show_member?'bg_black':''">
                        <td>{{index}}</td>
                        <td @click="order(index1)">{{goods_info[index1].title}}</td>
                        <td ></td>
                        <td @click="num_click(index1)">{{arr.total_num}}</td>
                    </tr>
                    <tr v-if="show_member"  v-for="arr1 in arr.child">
                        <td></td>
                        <td @click="order_name = ''"></td>
                        <td>{{option_info[arr1.color].title}}</td>
                        <td @click="num_click(index1,arr1.color)">{{arr1.shu}}</td>
                    </tr>
                </template>
            </template>
            </tbody>
        </table>
        <table  v-if="sku_show" style="margin: 0 auto" class="table table-hover table-bordered table-responsive">
            <colgroup>
                <col width="100">
                <col width="100">
                <col width="200">
                <col width="150">
                <col width="200">
                <col width="200">
                <col width="50">
                <col width="100">
                <col width="100">
            </colgroup>

            <thead>
                <th style="text-align: center;height: 40px;font-size: 16px;border: 1px solid #e6e6e6;" v-for="title in titles1">{{title}}</th>
            </thead>

            <tbody>
            <template v-for="(list,index) in send_list1">
                <tr >
                    <td>{{list.send_id}}</td>
                    <td>{{list.days}}</td>
                    <td>{{list.nick_name}}</td>
                    <td >{{goods_info[list.order_goods].title}}</td>
                    <td >{{list.color>0?option_info[list.color].title:""}}{{list.size>0?"【"+option_info[list.size].title+"】":""}}</td>
                    <td >{{list.note}}</td>
                    <td >0</td>
                    <td >{{list.send_by}}</td>
                    <td @click="num_click(index1)">{{list.send_num}}</td>
                </tr>
            </template>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: "absmartlist",
        data(){
            return{
            titles:["日期","商品订单","sku","数量",],
            titles1:["发货号","日期","昵称","商品名称","sku","运费","扫码","发货人","数量",],
            goods_info:[],
            show_member:false,
            option_info:[],
            sku_show:false,
            send_list:{},
            send_list1:[],
            setOrders:{},
            order_name:"",
            }
        },
        created(){
            this.qingqiu();
        },
        methods:{
            // 排序
            setOrder:function(){
                var colOrders = {};
                var list = this.send_list[0];
                console.log(list);
                console.log(this.send_list[0]);
                for(let key in list) {
                    colOrders[key] = 1;
                };
                this.setOrders = colOrders;
                console.log(this.setOrders);
            },

            qingqiu(){
                $.ajax({
                    type:'get',
                    url:'http://api.vvc.tw/suc/order/getordersendlist',
                    success:(res)=>{
                        if (res.code===1){
                            console.log(res);
                            this.goods_info = res.data.goods_info;
                            this.option_info = res.data.option_info;
                            this.send_list = res.data.send_list;
                            this.setOrder()
                        }

                    }
                })
            },
            update(){
                window.location.reload();

            },
            order(key){
                this.order_name = this.goods_info[key].title;
                console.log(11,key);
                this.setOrders[key]=this.setOrders[key]*-1;
                console.log(this.setOrders[key]);
                if (key==="order_goods"){
                    this.send_list.sort((a,b)=>{
                        if (a.order_goods === b.order_goods){
                            if (a.color === b.color){
                                return a.shu - b.shu
                            } else{
                                return  a.color - b.color
                            }
                        }else{
                            return  this.setOrders[key]* (b.order_goods-a.order_goods);
                        }
                    })
                }

            },
            num_click(good,color){
                $.ajax({
                    type:'get',
                    url:'http://api.vvc.tw/suc/order/getgoodssendlist',
                    data:{
                        good:good,
                        color:color,
                    },
                    success:(res)=>{
                        if (res.code===1){
                            console.log(res);
                            this.goods_info = res.data.goods_info;
                            this.option_info = res.data.option_info;
                            this.send_list1 = res.data.send_list;
                            // this.setOrder()
                        }

                    }
                })
                this.sku_show = true;
            }
        }
    }
</script>

<style scoped>
    #app{
        width: 70%;
        margin: auto;
    }
    .form{
        padding-top:30px;
    }
    .bg_black{
        background: #f1f1f1
    }
    button{
        padding: 5px 10px;
        border-radius: 4px;
        background: #2b87fb;
        border: none;
        color: white;
    }
</style>
