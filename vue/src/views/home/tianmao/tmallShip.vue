<template>
    <div>
        <div class="container-fluid col-space10">
            <div class="row">
                <button class="btn btn-primary   mr-2 ml-3">1151</button>
                <button class="btn btn-normal  mr-2">2252</button>
                <button class="btn btn-info  mr-2">3533</button>
                <button class="btn btn-success  mr-2">4454</button>
                <button class="btn btn-success  mr-2">5555</button>
                <div class="col-md-4">
                    <input type="text" class="form-control" placeholder="搜索...">
                </div>
            </div>

        </div>
        <div class="m-4">
            <table class="table table-bordered table-hover">
                <colgroup>
                    <col width="100">
                    <col width="100">
                    <col width="100">
                    <col width="400">
                    <col width="150">
                    <col width="150">
                    <col width="200">
                    <col width="100">
                    <col width="150">
                    <col width="100">
                </colgroup>
                <thead>
                <tr>
                    <th v-for="col in title">{{col.cn}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="row in lists">
                    <td v-for="col in title">
                        <template v-if="col.en==='operate'">
                            <button class="btn btn-primary">查看</button>
                            <button class="btn btn-info">打单</button>
                            <button class="btn btn-danger">发货</button>
                        </template>
                        <template v-else>
                            {{row[col.en]}}
                        </template>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                title: [

                    {
                        cn: '用户',
                        en: 'username'
                    },
                    {
                        cn: '手机号',
                        en: 'phone',
                    },
                    {
                        cn: '省',
                        en: 'province',
                    },
                    {
                        cn: '商品信息',
                        en: 'product',
                    },
                    {
                        cn: '买家备注',
                        en: 'note1'
                    },
                    {
                        cn: '卖家备注',
                        en: 'note2'
                    },
                    {
                        cn: '操作',
                        en: 'operate'
                    },
                    {
                        cn: '快递',
                        en: 'express'
                    },
                    {
                        cn: '单号',
                        en: 'orderId'
                    },
                    {
                        cn: '状态',
                        en: 'status'
                    }
                ],
                lists: [
                    {
                        orderId: '65431235415132',
                        express: '中通',
                        username: '二狗',
                        province: '广东省',
                        phone: '17826806840',
                        product: '女神帽,霓虹色',
                        note1: '发个好的',
                        note2: '发个烂的',
                        status: '0'
                    },
                    {
                        orderId: '65431235415132',
                        express: '中通',
                        username: '二狗',
                        province: '广东省',
                        phone: '17826806840',
                        product: '女神帽,霓虹色',
                        note1: '发个好的',
                        note2: '发个烂的',
                        status: '0'
                    },
                    {
                        orderId: '65431235415132',
                        express: '中通',
                        username: '二狗',
                        province: '广东省',
                        phone: '17826806840',
                        product: '女神帽,霓虹色',
                        note1: '发个好的',
                        note2: '发个烂的',
                        status: '0'
                    },
                    {
                        orderId: '65431235415132',
                        express: '中通',
                        username: '二狗',
                        province: '广东省',
                        phone: '17826806840',
                        product: '女神帽,霓虹色',
                        note1: '发个好的',
                        note2: '发个烂的',
                        status: '0'
                    },
                    {
                        orderId: '65431235415132',
                        express: '中通',
                        username: '二狗',
                        province: '广东省',
                        phone: '17826806840',
                        product: '女神帽,霓虹色',
                        note1: '发个好的',
                        note2: '发个烂的',
                        status: '0'
                    },

                ]
            }
        }
    }
</script>

<style scoped>

</style>
