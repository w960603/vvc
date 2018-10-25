<template>
    <div class="container-fluid pd12">
        <div class="form-item row clearfix">
            <div class="col-md-4  col-md-offset-4">
                <div class="col-md-8">
                    <input type="text" class="form-control" v-model="nick_name" placeholder="搜索昵称"/>
                </div>
                <button class="btn btn-primary col-md-2" @click="onSearch">
                    搜索
                </button>
                <!--<a-input-search-->
                <!--placeholder="input search text"-->
                <!--style="width: 200px"-->
                <!--@search="onSearch"-->
                <!--&gt;</a-input-search>-->
                <!--<a-input-search-->
                <!--placeholder="input search text"-->
                <!--style="width: 200px"-->
                <!--@search="onSearch"-->
                <!--&gt;</a-input-search>-->
            </div>
            <div class="col-md-8 pd12 col-md-offset-2">
                <!--<div >-->
                    <!--<a-button style="color:lightgreen">添加</a-button>-->
                    <!--<a-button style="color:red">禁用</a-button>-->
                    <!--<a-button style="color:orange">恢复</a-button>-->
                <!--</div>-->
                <div>共有数据:<strong>{{userList.length}}</strong>条</div>
            </div>
            <div class="col-md-10 col-md-offset-1 table-wrap">
                <table class="table table-bordered">
                    <colgroup>
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
                    </colgroup>
                    <thead>
                    <tr>
                        <th v-for="row in title">
                            {{row.cn}}
                        </th>
                        <th>操作</th>
                    </tr>

                    </thead>
                    <tbody>
                    <tr v-for="row in userList">
                        <td v-for="(col,index) in title">{{row[col.en]}}</td>
                        <td>
                            <!--<button class="btn btn-primary">-->

                                <router-link :to="{name:'userinfo',query:{
                                    id:row.id
                                }}"
                                             class="btn btn-primary"
                                             @click="userInfo(row.id)">
                                    详细信息
                                </router-link>
                            <!--</button>-->
                            <!--<button class="btn ">-->
                            <!---->
                            <!--</button>-->
                            <!--<button class="btn">修改密码</button>-->
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                title: [
                    {
                        'cn': '用户ID',
                        'en': 'id'
                    },
                    {
                        'cn': '等级',
                        'en': 'level'
                    },
                    {
                        'cn': '昵称',
                        'en': 'nick_name'
                    },
                    {
                        'cn': '上级用户名',
                        'en': 'unick_name'
                    },
                    {
                        'cn': '用户名',
                        'en': 'username'
                    },
                ],
                userList: [],
                nick_name: ''
            }
        },
        created() {
            this.qingqiu();
        },
        methods: {
            qingqiu() {
                this.axios.post('https://api.vvc.tw/suc/user/userlist').then(res => {
                    console.log(res);
                    this.userList = res.data.data
                })
            },
            onSearch() {

                // this.axios.post('https://api.vvc.tw/suc/user/userlist',{
                //     nick_name:this.nick_name
                // }).then(res=>{
                //     console.log(res);
                // })
                $.ajax({
                    url:'https://api.vvc.tw/suc/user/userlist',
                    type:'post',
                    data:{
                        nick_name: this.nick_name
                    },
                    success:res=>{
                        console.log(res);
                        if(res.code==1){
                            this.userList = res.data
                        }
                    }

                })

            },

            userInfo(id){
                $.ajax({
                    url:'https://api.vvc.tw/suc/user/userinfo',
                    type:'post',
                    data:{
                        id:id
                    },
                    success:res=>{
                        console.log(res);
                    }
                })
            }

        },
        computed: {

        },
        mounted: function () {
        }

    }
</script>

<style scoped>

    .pd12 {
        padding: 12px;
    }
.table-wrap{
    position:relative;
    height:80vh;
    overflow:auto;
}
</style>
