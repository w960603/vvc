<template>
    <div id="app">
        <div class="layui-btn-container">
            <button class="layui-btn">所有退货</button>
            <button class="layui-btn">申请退货</button>
            <button class="layui-btn">在途中</button>
            <button class="layui-btn">等待发回</button>
            <button class="layui-btn">商品寄回</button>
        </div>
        <table class="layui-table">
            <thead>
            <th>退货商品</th>
            <th>退货用户</th>
            <th>时间</th>
            <th>状态</th>
            </thead>
            <tbody>
            <tr v-for="items in details">
                <td>
                    <div v-for="item in items.goods_list">
                        {{item.name}}
                    </div>
                </td>
                <td>{{items.nick_name}}</td>
                <td>{{items.time}}</td>
                <td>{{items.status}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                details :[],
            }
        },
        created(){
            this.qingqiu()
        },
        methods:{
            qingqiu(){
                $.ajax({
                    type:'post',
                    url:'https://xxx.xxx.xxx/xxx/tmorder/tuihuo',
                    data:{
                        id:0
                    },
                    success:(res)=>{
                        var datas = res;

                        if(datas.code){
                            for (var i = 0 ,len = datas.data.length;i<len;i++){

                                switch(datas.data[i].status){
                                    case 1 : datas.data[i].status = '申请退货';break;
                                    case 2 : datas.data[i].status = '同意退货';break;
                                    case 3 : datas.data[i].status = '商品回仓中';break;
                                    case 4 : datas.data[i].status = '退货完成';break;
                                    case 5 : datas.data[i].status = '仓库返回';break;
                                    case 6 : datas.data[i].status = '拒绝退货';break;
                                    case 7 : datas.data[i].status = '二次申请';break;
                                    case 8 : datas.data[i].status = '拒绝';break;
                                }
                                var date = datas.data[i].time*1000;

                                datas.data[i].time =  new Date(date).toLocaleString().replace(/:\d{1,2}$/, ' ');
                            }
                            this.details =datas.data;
                        }
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
