<template>
    <div style="padding: 20px">
        <table style="margin: 0 auto" class="table table-hover table-bordered table-responsive">
            <colgroup>
                <col width="150px">
                <col width="150px">
                <col width="50px">
                <col width="120px">
                <col width="100px">
            </colgroup>
            <thead class="jdorder_heard">
                <th  style="text-align: center;height: 40px;font-size: 16px;border: 1px solid #e6e6e6;" v-for="col in titles">{{col}}</th>
            </thead>
            <tbody>
            <tr  v-for="(row,index) in shop_list" :key="index" class="jdorder_tr">
                <td>{{row.title}}</td>
                <td>{{row.properties_name}}</td>
                <td>{{row.price}}元</td>
                <td>{{row.sortname}}</td>
                <td>
                    <input type="text" @change="text($event)" :value="row.outh_id" style="height:30px;border: 1px solid #e6e6e6;border-radius: 4px;margin-right: 10px">
                    <button style="height:30px;width: 60px" @click="chioce_shop(index)">确认</button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: "phrasetmall",
        data(){
            return{
                shop_list:[],
                skuname:"",
                titles: ["商品名称","商品sku名称", "价格","sku简称", "简称数字"]
            }
        },
        created(){
            this.data_sku();

            var patt = /e/;
            var n = patt.test("The best things in life are free!");
            console.log(n);
        },
        methods:{
            data_sku(){
                $.ajax({
                    type:"post",
                    // url:"http://jd.vvc.tw/index/printorder/goodslist",
                    url:"http://jd.vvc.tw/dorder/tmorder/getsku",

                    success:(res)=>{
                        console.log(res);
                        // JD服务器写法
                        this.shop_list = res.data;

                        // 本地写法
                        // var objs = JSON.parse(res);
                        // console.log(objs);
                        // this.shop_list = objs.data;
                        // console.log(this.shop_list);
                        // console.log(1111,this.shop_list);
                    }
                })
            },
            success(msg) {
                this.$message.success(msg);
            },
            text(ev){
                console.log(ev.path[0].value);
                this.skuname = ev.path[0].value
            },
            chioce_shop(idx){

                console.log(this.shop_list[idx].sku_id)//原来的
                //  console.log(this.shop_list[idx].skucode);
                 console.log(this.skuname);//新的
                $.ajax({
                    type:"post",
                    // url:"http://jd.vvc.tw/index/printorder//updateXhsSku",
                    url:"http://jd.vvc.tw/dorder/tmorder/setTmllOuthid",
                    data:{
                        // skuName:this.shop_list[idx].name,
                        id:this.skuname,
                        sku_id:this.shop_list[idx].sku_id
                    },
                    success:(res)=>{
                        console.log(res);
                        // var objs = JSON.parse(res);
                        if(res.code == 1){
                            this.success(res.msg);
                            this.data_sku();
                        }
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .table td {
        padding: 8px;
        text-align: left;
        vertical-align: middle!important;
    }
</style>
