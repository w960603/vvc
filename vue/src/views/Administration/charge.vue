<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <div class="col-md-12 pd15">
                    <button class="btn btn-primary" @click="getList()">
                        全部
                    </button>
                    <button class="btn btn-success" @click="getList(1)">
                        已通过
                    </button>
                    <button class="btn btn-danger" @click="getList(2)">
                        未通过
                    </button>
                    <button class="btn btn-info" @click="getList(0)">
                        待审核
                    </button>
                </div>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th v-for="col in title">{{col.cn}}</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(row,index) in list">
                        <td v-for="col in title">
                            <template v-if="col.en==='kimg'">
                                <img class="img" :src="row.kimg" :alt="row.pay_info" @click="bigImg(row.kimg)">
                            </template>
                            <template v-else-if="col.en==='kstatus'">
                                {{row[col.en]===0?'待审核':(row.kstatus===1)?'审核通过':'审核未通过'}}
                            </template>
                            <template v-else>
                                {{row[col.en]}}
                            </template>
                        </td>
                        <td>
                            <template v-if="row.kstatus===0">
                                <button class="btn btn-primary" @click="operation(row,1,index)">通过</button>
                                <button class="btn btn-danger"  @click="operation(row,2,index)">拒绝</button>
                            </template>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="wrap container-fluid" @click="hidden" v-show="showImg">
            <div class="row">
                <div class="img-box">
                    <img :src="img" alt="">
                </div>
                <button class="push-right btn btn-primary" @click="hidden">关闭</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "charge",
        data() {
            return {
                list: [],
                title: [
                    {
                        cn: '充值对象',
                        en: 'knick_name',
                    },
                    {
                        cn: '充值截图',
                        en: 'kimg',
                    },
                    {
                        cn: '对象手机号',
                        en: 'kphone',
                    },
                    {
                        cn: '订单状态',
                        en: 'kstatus',
                    },
                    {
                        cn: '充值人',
                        en: 'nick_name',
                    },
                    {
                        cn: '充值金额',
                        en: 'order_money',
                    },
                ],
                showImg: false,
                img:''
            }
        },
        created() {
            this.getList()
        },
        methods: {
            operation(row,status,index){
                $.ajax({
                    url:'https://xxx.xxx.xxx/xxx/user/rechargeStatus',
                    type:'post',
                    data:{
                        id:row.id,
                        status,
                    }
                }).then(res=>{
                    console.log(res);
                    if(res.code===1){
                        this.list.splice(index,1);

                    }
                    this.$message.info(res.msg)
                })
            },
            getList(index) {
                let data = null;
                if (index === 0 || index > 0) {
                    data = {
                        status:index
                    }
                }
                $.ajax({
                    url:'https://xxx.xxx.xxx/xxx/user/rechargeList',
                    type:'post',
                    data:data
                }).then(res => {
                        console.log(res);
                        if (res.code === 1)
                            this.list = res.data.list
                    })
            },
            bigImg(img) {
                this.showImg = true;
                this.img = img
            },
            hidden() {
                this.showImg = false

            },
        },
    }
</script>

<style scoped>
    .img {
        height: 200px;
    }

    .wrap {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .3);
    }

    .img-box {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        height: 70vh;
        margin: auto;
        text-align: center;
        vertical-align: center;
    }
    .img-box img{
        height:100%;
    }
</style>
