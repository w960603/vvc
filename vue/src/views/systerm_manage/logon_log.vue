<template>
    <div id="app">
        <div class="layui-form-item line-block" >
            <input type="search"  lay-verify="required" :checked="status" placeholder="用户ID" autocomplete="off" class="layui-input">
            <input type="search"  lay-verify="required" :checked="status" placeholder="用户账号" autocomplete="off" class="layui-input">
            <input type="search"  lay-verify="required" :checked="status" placeholder="用户姓名" autocomplete="off" class="layui-input">
            <input type="search"  lay-verify="required" :checked="status" placeholder="登录IP" autocomplete="off" class="layui-input">
            <input type="search"  lay-verify="required" :checked="status" placeholder="登录地点" autocomplete="off" class="layui-input">

            <button class="layui-btn layui-btn-normal">搜索</button>
        </div>
        <div class="flex">
            <div>共有数据:<strong>{{loginList.length}}</strong>条</div>
        </div>
        <table class="layui-table">
            <col-group>
                <tr>
                    <col width="40">
                    <col width="100">
                    <col width="100">
                    <col width="120">
                    <col width="100">
                    <col width="120">
                    <col width="100">
                    <col width="120">
                </tr>
            </col-group>
            <thead>
            <th><input type="checkbox" id="quan" title="全选" lay-skin="primary" @click="checkAll($event)"></th>
            <th v-for="(row,index) in logon_log" :key="index">
                {{row.cn}}
            </th>
            <th>操作</th>
            </thead>
            <tbody>
            <tr v-for="(col,index) in loginList" :key="index">
                <!--@click="col.checked != col.checked" :checked="col.checked"-->
                <!--name="" :value="col" v-model="checkData"-->
                <td> <input type="checkbox" title="单选"  lay-skin="primary"  :value="col" v-model="checkData"></td>
                <td v-for="row in logon_log">{{col[row.en]}}</td>
                <td><button class="layui-btn layui-btn-danger  layui-btn-xs">禁用</button>
                    <button class="layui-btn layui-btn-primary layui-btn-xs" >
                        <i class="layui-icon">&#xe642;</i>
                    </button>
                    <button class="layui-btn layui-btn-primary layui-btn-xs" @click="deleteOneProduct">
                        <i class="layui-icon">&#xe640;</i>
                    </button>
                    <button class="layui-btn layui-btn-normal  layui-btn-xs">用户列表</button>
                    <button class="layui-btn layui-btn-normal  layui-btn-xs">授权</button>
                </td>
                <td>

                    <button type="button" class="btn btn-primary btn-sm">禁用</button>


                    <button type="button" class="btn btn-primary btn-sm">小的原始按钮</button>
                    <!-- 信息警告消息的上下文按钮 -->

                    <button type="button" class="btn btn-primary btn-sm">小的原始按钮</button>
                    <!-- 表示应谨慎采取的动作 -->

                    <button type="button" class="btn btn-primary btn-sm">小的原始按钮</button>
                    <!-- 表示一个危险的或潜在的负面动作 -->

                    <button type="button" class="btn btn-primary btn-sm">小的原始按钮</button>
                    <!-- 并不强调是一个按钮，看起来像一个链接，但同时保持按钮的行为 -->
                </td>
            </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
    export default {
        data(){
            return {
                loginList:[],
                logon_log: [
                    {'cn':'用户名ID',
                        'en':''},
                    {'cn':'用户账号',
                        'en':'rolename'},
                    {'cn':'用户姓名',
                        'en':'start_time'},
                    {'cn':'登录IP',
                        'en':'out_time'},
                    {'cn':'登录地点',
                        'en':'out_time'},
                    {'cn':'浏览器',
                        'en':'out_time'},
                    {'cn':'操作系统',
                        'en':'out_time'},
                    {'cn':'登录时间',
                        'en':'out_time'},
                ],
                checkData:[],
                status:false
            }
        },
        created(){
            this.qingqiu()
        },
        watch:{
            checkData: { // 监视双向绑定的数组变化
                handler(){
                    if(this.checkData.length == this.loginList.length) {
                        // $(".dan").prop('checked',true);
                        document.querySelector('#quan').checked = true;
                    } else {
                        document.querySelector('#quan').checked = false;
                        // $(".dan").prop('checked',false);
                    }
                },
                deep: true
            }
        },

        methods:{
            qingqiu(){
                $.ajax({
                    type:'get',
                    url:'https://api.vvc.tw/suc/role/rolelist',
                    success:(res)=>{
                        console.log(res)
                        this.loginList = res.data
                    }
                })
            },

            checkAll(e) {
                console.log(this.checkData);
                if(e.target.checked) {
                    this.loginList.forEach((el, i) => {
                        if(this.checkData.indexOf(el) == '-1') {
                            this.checkData.push(el);
                        }
                    });
                } else {
                    this.checkData = [];
                }
            },

            // 删除选中的项目
            deleteProduct:function () {

                // this.loginList = this.loginList.filter(function () {
                //     return !col.check
                //     console.log(this.col.check,180)
                // })


            },
            //删除单条项目
            deleteOneProduct:function (index) {
                // layer.confirm('确定删除吗？', {
                //     btn: ['确定', '取消'] //可以无限个按钮
                //
                // }, function(index, layer){
                //
                // }, function(index){
                //     //按钮【按钮二】的回调
                // });
                this.loginList.splice(index,1);


            },
        },

        // computed:{
        //     //监测全选
        //     isCheckAll:function(){
        //         return this.loginList.every(function(val){
        //             console.log(val.checked);
        //             return val.checked
        //         })
        //     },
        //
        // },

    }
</script>

<style scoped>
    #app{
        width: 80%;
        margin:20px auto;
    }
    .line-block{
        display:flex;
    }
    input{
        margin:0 10px;
    }
    .flex{
        text-align: end;
        border:1px solid lightgray;
        padding:5px;
        border-radius:5px;
    }
    table{text-align: center!important;}
    th{text-align: center!important;}
</style>
