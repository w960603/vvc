<template>
    <div style="padding: 20px">
        <table style="margin: 0 auto" class="table table-hover table-bordered table-responsive">
            <colgroup>
                <col width="150">
                <col width="50">
                <col width="120">
                <col width="100">
            </colgroup>
            <thead class="jdorder_heard">
                <th  style="text-align: center;height: 40px;font-size: 16px;border: 1px solid #e6e6e6;" v-for="col in titles">{{col}}</th>
            </thead>
            <tbody>
            <tr  v-for="(row,index) in shop_list" :key="index" class="jdorder_tr">
                <td>{{row.name}}</td>
                <td>{{row.price}}元</td>
                <td>{{row.sortName}}</td>
                <td>
                    <input type="text" @change="text($event)" :value="row.outh_id" style="height:30px;border: 1px solid #e6e6e6;">
                    <button style="height:30px;width: 60px" @click="chioce_shop(index)">确认</button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: "generativephrase",
        data(){
            return{
                shop_list:[],
                skuname:"",
                titles: ["商品名称", "价格","sku简称", "简称数字"]
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
                    // url:"http://xxx.xxx.xxx/index/printorder/goodslist",
                    url:"http://xxx.xxx.xxx/dorder/xhs/goodslist",

                success:(res)=>{
                    // console.log(res);
                        // JD服务器写法
                        this.shop_list = res.data;

                        // 本地写法
                        // var objs = JSON.parse(res);
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
               // console.log(this.shop_list[idx].name)//原来的
               //  console.log(this.shop_list[idx].skucode);
               //  console.log(this.skuname);//新的
                $.ajax({
                    type:"post",
                    // url:"http://xxx.xxx.xxx/index/printorder//updateXhsSku",
                    url:"http://xxx.xxx.xxx/dorder/xhs/updateXhsSku",
                    data:{
                        // skuName:this.shop_list[idx].name,
                        id:this.skuname,
                        skucode:this.shop_list[idx].skucode
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
