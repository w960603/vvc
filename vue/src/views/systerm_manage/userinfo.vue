<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-6">
                <div class="form">
                    <div class="col-md-2" style="text-align: center">
                        <h3 class="h5">头像</h3>
                        <div class="img-circle col-md-8 col-md-offset-2">
                            <img :src="user_info.img_url" class="avatar" alt="">
                        </div>
                        <p class="h5 col-md-12">
                            真名: {{user_info.truename}}
                        </p>
                    </div>
                    <div class="col-md-10">
                        <div class="col-md-6">
                            <p class="h5">
                                昵称: {{user_info.nick_name}}
                            </p>
                            <p class="h5">
                                等级: {{user_info.level===1?"天使":(user_info.level===2?"仙女":(user_info.level===3?"女神":(user_info.level===10?"董事":"团长")))}}
                            </p>
                        </div>
                        <div class="col-md-6">
                            <p class="h5">
                                openid: {{user_info.openid}}
                            </p>

                        </div>
                        <div class="col-md-6">
                            <p class="h5">
                                用户名: {{user_info.username}}
                            </p>
                            <p class="h5">
                                密码: {{user_info.password}}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <h3 class="h3">收货地址</h3>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th v-for="col in address_title">
                                {{col.cn}}
                            </th>
                            <th>
                                操作
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="row in user_address">
                            <td v-for="col in address_title">
                                {{row[col.en]}}
                            </td>
                            <td>
                                <button class="btn btn-primary">同意授权</button>
                                <button class="btn btn-primary">拒绝授权</button>
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
                // id: 2,
                user_address:[],
                user_info:{},

                address_title:[
                    {
                        cn:'用户名',
                        en:'username'
                    },
                    {
                        cn:'收件人',
                        en:'name'
                    },
                    {
                        cn:'地址',
                        en:'full_address'
                    },
                    {
                        cn:'电话',
                        en:'phone'
                    },
                ]
            }
        },
        created() {
            this.qingqiu()
        },
        methods: {
            qingqiu() {
                let id = this.$route.query.id;
                $.ajax({
                    url: "https://api.vvc.tw/suc/user/userinfo",
                    type: 'post',
                    data: {id},
                    success: res => {
                        console.log(res);
                        if(res.code===1){
                            this.user_address=res.data.user_address;
                            this.user_info=res.data.user_info
                        }
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .table th, .table td{
        vertical-align: middle;
        text-align: center;
    }
    .avatar{
        width:100%;
        border-radius:50%;
    }
</style>
