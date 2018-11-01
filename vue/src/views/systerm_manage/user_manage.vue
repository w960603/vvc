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
                        <th v-for="col in title">
                            <template>
                                {{col.cn}}
                            </template>
                        </th>
                        <th>操作</th>
                    </tr>

                    </thead>

                    <tbody>
                    <tr v-for="row in userList">

                        <td v-for="(col,index) in title">
                            <template v-if="col.en==='in_ues'&&row.in_ues===-1">
                                已禁用
                            </template>
                            <template v-else-if="col.en==='in_ues'&&row.in_ues===1">
                                正常
                            </template>
                            <template v-else-if="col.en==='img_url'">
                                <img class="img" :src="row.img_url" alt="">
                            </template>
                            <template v-else>
                                {{row[col.en]}}
                            </template>

                        </td>


                        <td>
                            <router-link :to="{name:'userinfo',query:{
                                    id:row.id
                                }}"
                                         class="btn btn-primary"
                                         @click="userInfo(row.id)">
                                详细信息
                            </router-link>
                            <button class="btn btn-success" v-if="row.in_ues===-1" @click="use(row.id)">开通</button>
                            <button class="btn btn-danger" v-else-if="row.in_ues===1" @click="use(row.id)" >禁用</button>
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
                        'cn': '头像',
                        'en': 'img_url'
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
                        'cn': '用户名',
                        'en': 'username'
                    },
                    {
                        'cn': '上级用户名',
                        'en': 'unick_name'
                    },
                    {
                        'cn': '状态',
                        'en': 'in_ues'
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
            use(id){
              $.ajax({
                  url:'https://api.vvc.tw/suc/user/userInUes',
                  type:'post' ,
                  data:{
                      id:id
                  },
                  success:res=>{
                      console.log(res);
                  }
              })
            },
            onSearch() {

                // this.axios.post('https://api.vvc.tw/suc/user/userlist',{
                //     nick_name:this.nick_name
                // }).then(res=>{
                //     console.log(res);
                // })
                $.ajax({
                    url: 'https://api.vvc.tw/suc/user/userlist',
                    type: 'post',
                    data: {
                        nick_name: this.nick_name
                    },
                    success: res => {
                        console.log(res);
                        if (res.code === 1) {
                            this.userList = res.data
                        }
                    }

                })

            },

            userInfo(id) {
                $.ajax({
                    url: 'https://api.vvc.tw/suc/user/userinfo',
                    type: 'post',
                    data: {
                        id: id
                    },
                    success: res => {
                        if(res.code===1){
                            this.userList.forEach((item,index)=>{
                                console.log(item);
                                if(item.id===id){
                                    console.log(item);
                                    item.in_ues = -1*item.in_ues
                                }
                            })
                        }
                    }
                })
            }

        },
        computed: {},
        mounted: function () {
        }

    }
</script>

<style scoped>

    .pd12 {
        padding: 12px;
    }

    .table-wrap {
        position: relative;
        height: 80vh;
        overflow: auto;
    }

    .table th, .table td {
        vertical-align: middle;
        text-align: center;
    }

    .img {
        width: 36px;
    }

    .thead {
        position: absolute;
        top: 0;
        left: 0;
    }
</style>
