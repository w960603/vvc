<template>
    <div>
        <div style="width: 1200px; margin: 0 auto; display: flex; height:50px " v-for="(arr,index) in shop_list">
            <div style="width: 600px;" >{{arr.name}}</div>
            <div  style="width: 200px;" >{{arr.skucode}}</div>
            <input type="text" @change="text($event)" :value="arr.outh_id" style="height:30px ">
            <button style="height:30px" @click="chioce_shop(index)">确认</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "generativephrase",
        data(){
            return{
                shop_list:[],
                skuname:"",
            }
        },
        created(){
            $.ajax({
                type:"post",
                url:"http://hz1.vvc.tw/index/xhs/goodslist",
                // url:"https://hz1.vvc.tw/index/xhs/goodslist",
                success:(res)=>{
                    var objs = JSON.parse(res);
                    this.shop_list = objs.data;
                    console.log(this.shop_list);
                }
            })
        },
        methods:{
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
                    url:"http://hz1.vvc.tw/index/xhs/updateXhsSku",
                    data:{
                        // skuName:this.shop_list[idx].name,
                        id:this.skuname,
                        skucode:this.shop_list[idx].skucode

                    },
                    success:(res)=>{
                        console.log(res);
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
