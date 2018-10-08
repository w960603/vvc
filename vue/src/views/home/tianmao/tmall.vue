<template>
    <div id="app">
        <table class="layui-table">
            <thead>
            <th v-for="title in titles">{{title.cn}}</th>
            </thead>
            <tbody>
            <tr v-for="(list,index) in product_lists">
                <template v-for="title in titles">
                    <td v-if="title.en =='pic_url'">
                        <img :src="list[title.en]" alt="VVC商品图">
                    </td>
                    <td v-else>{{list[title.en]}}</td>
                </template>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: "tmall",
        data: {
            titles: [
                {
                    en: 'pic_url',
                    cn: '商品预览'
                },
                {
                    en: 'title',
                    cn: '商品名称'
                },
                {
                    en: 'num_iid',
                    cn: 'sku'
                },
                {
                    en: 'price',
                    cn: '商品价格'
                },
                {
                    en: 'num',
                    cn: '商品数量'
                },
                {
                    en: 'modified',
                    cn: '修改时间'
                },
                {
                    en: 'approve_status',
                    cn: '商品状态'
                },
            ],
            product_lists: []


        },
        created() {
            this.qingqiu();
        },
        methods: {
            qingqiu() {
                $.ajax({
                    type: 'get',
                    url: 'https://api.vvc.tw/order/tmorder/goodslist',
                    success: (res) => {
                        console.log(res);
                        if (res.code) {
                            this.product_lists = res.data.items.item;
                            for (var i = 0; i < this.product_lists.length; i++) {
                                if (this.product_lists[i].approve_status === 'onsale') {
                                    this.product_lists[i].approve_status = "出售中"
                                } else {
                                    this.product_lists[i].approve_status = "在库中"
                                }
                            }
                        }
                    }
                })
            }
        }
    }
</script>

<style scoped>
    #app {
        padding: 20px 50px;
        margin: auto;
    }
</style>
