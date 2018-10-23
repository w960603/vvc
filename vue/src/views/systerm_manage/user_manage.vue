<template>
    <div id="app">
        <div class="form-item">
            <!--<div class="layui-row search">-->
                <!--<input type="search" name="password" required lay-verify="required" placeholder="姓名" autocomplete="off" class="layui-input"/>-->
                <!--<input type="search" name="password" required lay-verify="required" placeholder="账号" autocomplete="off" class="layui-input"/>-->
                <!--<input type="search" name="password" required lay-verify="required" placeholder="邮箱" autocomplete="off" class="layui-input"/>-->
                <!--<input type="search" name="password" required lay-verify="required" placeholder="手机" autocomplete="off" class="layui-input"/>-->
                <!--<button class="layui-btn layui-btn-normal">搜索</button>-->
            <!--</div>-->
            <a-input-search
                placeholder="input search text"
                style="width: 200px"
                @search="onSearch"
            />
            <a-input-search
                placeholder="input search text"
                style="width: 200px"
                @search="onSearch"
            />
            <a-input-search
                placeholder="input search text"
                style="width: 200px"
                @search="onSearch"
            />

        </div>
        <div class="flex">
            <div>
                <a-button style="color:lightgreen">添加</a-button>
                <a-button style="color:red">禁用</a-button>
                <a-button style="color:orange">恢复</a-button>
            </div>
            <div>共有数据:<strong>{{pro_title.length}}</strong>条</div>
        </div>
        <table class="layui-table">
            <group>
                <tr>
                    <col width="80">
                    <col width="100">
                    <col width="100">
                    <col width="120">
                    <col width="120">
                    <col width="120">
                    <col width="100">
                    <col width="120">
                    <col width="100">
                    <col width="100">
                    <col width="100">
                    <col width="160">
                </tr>
            </group>
            <thead>
            <th><input type="checkbox" name="" title="全选" lay-skin="primary" @click="selectProduct(isSelectAll)"></th>
            <th v-for="row in sub_title">
                {{row.cn}}
            </th>
            <th>操作</th>
            </thead>
            <tbody>
            <tr v-for="(col,index) in pro_title">
                <td> <input type="checkbox" name="" title="单选" lay-skin="primary" @click="item.select=!item.select"></td>
                <td v-for="row in sub_title">{{row.en}}</td>
                <td><button class="btn red">禁用</button>
                    <button class="btn ">
                        <i class="layui-icon">&#xe642;</i>
                    </button>
                    <button class="btn">修改密码</button>
                </td>
            </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                pro_title:[],
                sub_title: [
                    {'cn':'ID',
                        'en':'id'},
                    {'cn':'姓名',
                        'en':'name'},
                    {'cn':'账号',
                        'en':'account'},
                    {'cn':'邮箱',
                        'en':'email'},
                    {'cn':'手机',
                        'en':'phone'},
                    {'cn':'添加时间',
                        'en':'addtime'},
                    {'cn':'最后登录时间',
                        'en':'lasttime'},
                    {'cn':'登陆次数',
                        'en':'logoncount'},
                    {'cn':'状态',
                        'en':'status'},
                    {'cn':'备注',
                        'en':'text'},
                ]
            }
        },
        created(){
            this.qingqiu()
        },
        methods:{
            qingqiu(){
                $.ajax({
                    type:'get',
                    url:'',

                })
            },
            onSearch (value) {
                console.log(value)
            },

        },
        computed:{},
        mounted:function(){}

    }
</script>

<style scoped>
    #app{
        width: 75%;
        margin: auto;
    }
    .flex{
        display:flex;
        justify-content: space-between;
        align-items: center;
        border:1px solid lightgray;
        padding:5px;
        border-radius:5px;
    }
    .search{
        display:flex;align-items: center;
        width:60%;
    }
    input{
        margin:10px 15px;
    }
</style>
