<template>
    <div style="width:100% ; padding:10px">

        <div class="container-fluid" style="height:80vh; overflow-x: scroll">
            <div class="row">
                <div class="form-group col-md-12">
                    <div class="col-md-3">
                        <div class="col-md-6">
                            <input type="date" class="form-control" v-model="startTime" placeholder="查询">
                        </div>

                        <div class="col-md-6">
                            <input type="date" class="form-control" v-model="endTime" placeholder="查询">
                        </div>
                    </div>

                    <div class="col-md-1">
                        <input type="text" class="form-control" v-model="modular" placeholder="模块">
                    </div>
                    <div class="col-md-1">
                        <input type="text" class="form-control" v-model="ip" placeholder="用户ip">
                    </div>
                    <div class="col-md-1">
                        <input type="text" class="form-control" v-model="nick_name" placeholder="用户昵称">
                    </div>
                    <div class="col-md-1">
                        <input type="text" class="form-control" v-model="type" placeholder="登录类型">
                    </div>
                    <div class="col-md-1">
                        <input type="text" class="form-control" v-model="username" placeholder="用户账户">
                    </div>
                    <div class="col-md-1">
                        <input type="text" class="form-control" v-model="version" placeholder="微信版本号">
                    </div>
                    <div class="col-md-1">
                        <input type="text" class="form-control" v-model="timestamp" placeholder="登录时间">
                    </div>

                    <button class="btn btn-primary col-md-1" @click="search">查询</button>
                </div>
                <table class="table table-bordered width:90vw">
                    <!---->
                    <thead>
                    <tr>
                        <!--<td v-for="item in title">{{item}}</td>-->
                        <td v-for="item in title">{{item.cn}}</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(lists,index) in returned" :key="index">
                        <td v-for="(col,index) in title" :key="index">
                            <template v-for="(list,index) in lists.attribute_columns" v-if="list[0]===col.en">
                                <template v-if="col.en==='type'">
                                    {{list[1]===1?'账号密码':(list[1]===2?'手机验证码':"人脸登录")}}
                                </template>
                                <template v-else>
                                    {{list[1]}}
                                </template>
                            </template>
                            <template v-if="col.en ==='timestamp'">
                                {{lists.primary_key[0][1]}}
                            </template>

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
        name: "userlog",
        data() {
            return {
                title: [
                    {
                        cn: '客户端基础库版本',
                        en: 'SDKVersion'
                    },
                    {
                        cn: '手机品牌',
                        en: 'brand'
                    },
                    {
                        cn: '用户字体大小设置',
                        en: 'fontSizeSetting'
                    },
                    {
                        cn: '微信设置的语言',
                        en: 'language'
                    },
                    {
                        cn: '模块',
                        en: 'modular'
                    },
                    {
                        cn: '用户ip',
                        en: 'ip'
                    },
                    {
                        cn: '用户昵称',
                        en: 'nick_name'
                    },
                    {
                        cn: '客户端平台',
                        en: 'platform'
                    },
                    {
                        cn: '屏幕高度',
                        en: 'screenHeight'
                    },
                    {
                        cn: '屏幕宽度',
                        en: 'screenWidth'
                    },
                    {
                        cn: '状态栏高度',
                        en: 'statusBarHeight'
                    },
                    {
                        cn: '操作系统版本',
                        en: 'system'
                    },
                    {
                        cn: '登录类型:1:账密,2:验证码,3:人脸',
                        en: 'type'
                    },
                    {
                        cn: '用户账户',
                        en: 'username'
                    },
                    {
                        cn: '微信版本号',
                        en: 'version'
                    },
                    {
                        cn: '可使用窗口高度',
                        en: 'windowHeight'
                    },
                    {
                        cn: '可使用窗口宽度',
                        en: 'windowWidth'
                    },
                    {
                        cn: '登录时间',
                        en: 'timestamp'
                    },
                ],
                keywords: '',
                returned: null,
                startTime: null,
                endTime: null,
                modular: '',
                ip: '',
                nick_name: '',
                type: '',
                username: '',
                version: '',
                timestamp: '',
            }
        },
        created() {
            this.request()
        },
        methods: {
            request() {

                $.ajax({
                    url: 'http://api.vvc.tw/suc/pubc/log',
                    type: 'post',
                    data: {
                        type: 2
                    },
                    success: res => {
                        console.log(res);
                        if (res.code === 1) {
                            this.returned = res.data.rows

                        }
                    }
                })
            },
            search() {
                let datas = {
                    type:2,
                    start_time:new Date(this.startTime).getTime()/1000,
                    end_time:new Date(this.endTime).getTime()/1000,
                    content:JSON.stringify({
                        modular: this.modular,
                        ip: this.ip,
                        nick_name: this.nick_name,
                        type: this.type,
                        username: this.username,
                        version: this.version,
                        timestamp: this.timestamp,
                    })

                };

                    $.ajax({
                        url: 'http://api.vvc.tw/suc/pubc/log',
                        type: 'post',
                        data: datas,
                        success: res => {
                            console.log(res);
                            if (res.code === 1) {
                                this.returned = res.data.rows

                            }
                        }
                    })

            }
        }
    }
</script>

<style scoped>
    .table th, .table td {
        vertical-align: center;
        text-align: center;
    }
</style>
