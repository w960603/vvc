<template>
    <div id="app" class="layui-container">

        <table  class="layui-table " lay-even >
            <colgroup>
                <col width="150">
                <col width="200">
                <col>
            </colgroup>
            <thead class="layui-table-header">
            <th v-for="col in columnData" @click="order(col.en)" :class="!(col=='name')?'order':''">
                <span>{{col.cn}}</span>
                <!--不同的列有不同的排序，需要一个保存列的排序对象setOrder-->
            </th>
            </thead>
            <tbody>
            <tr v-for="(row,index) in slist">
                <template  v-for="item in columnData">
                    <td v-if="row[item.en]">
                        <template v-if="item.en=='pic'">
                            <img  :src="row[item.en]" alt="">
                        </template>
                        <template v-else>
                            {{row[item.en]}}
                        </template>
                    </td>
                    <td v-else-if="item.en=='operate'">
                        <a href="javascript:;" @click="showOverlay(index)">分类</a> | <a href="javascript:;" @click="del(index)">删除</a>
                    </td>
                    <td v-else-if="item.en=='desc'">
                        {{row[item.en]}}
                    </td>
                </template>
            </tr>
            </tbody>
        </table>
        <!--<p v-else>No match data...</p>-->
        <model :list='selectedlist' :isactive="isActive" v-cloak @change="changeOverlay" @modify="modify"></model>
    </div>
</template>

<script>

    export default {

        data:{
            columnData:[
                { en:"pic",
                    cn:'商品图片'
                }, { en:"name",
                    cn:'商品名称'
                },{ en:"order",
                    cn:'商品排序'
                },{ en:"price",
                    cn:'价格'
                },{ en:"operate",
                    cn:'操作'
                },{ en:"desc",
                    cn:'商品说明'
                }],
            searchQuery:'',
            products_data:[
                {
                    pic:"image/pic1.jpg",
                    name:'VVC夏季女神帽子',
                    order:'550',
                    price:'60',
                    desc:'111'
                },
                {
                    pic:"image/pic1.jpg",
                    name:'VVC夏季女神帽子',
                    order:'550',
                    price:'60',
                },
                {
                    pic:"image/pic1.jpg",
                    name:'VVC夏季女神帽子',
                    order:'550',
                    price:'60',
                },
            ],//原始数据
            selectedlist:{},
            isActive: false,
            selected: -1,
            slist: [],
            searchlist: [],
            sortKey:''

        },
        created() {
            // this.qingqiu();
            // console.log("请求了");
            this.setSlist(this.products_data);
        },
        mounted(){

        },
        methods:{
            order: function(key) {
                console.log(new Date().getTime());
                this.sortKey = key;
                this.setOrder[key] = this.setOrder[key] * -1
            },
            qingqiu:function() {
                $.ajax({
                    type:'get',
                    url: "http://hz5.vvc.tw/index/goods/goodslist",
                    success: (res)=> {

                        this.products_data = res.data
                            .filter(function(number,index){
                                if (index < 200){
                                    //console.log(666);
                                    return true
                                }

                            });
                        this.setSlist(this.products_data);
                    }
                })
            },
            showOverlay(index) {
                //console.log(index);
                this.selected = index;
                this.selectedlist = this.products_data[index];
                this.changeOverlay();

                //console.log(this.selected,this.selectedlist);
            },
            // 点击保存按钮
            modify(arr) {
                if (this.selected > -1) {
                    Vue.set(this.products_data, this.selected, arr);
                } else {
                    this.products_data.push(arr);
                }
                this.setSlist(this.products_data);
                this.changeOverlay();
            },
            add: function () {
                this.selectedlist = {
                    username: '',
                    email: '',
                    sex: '男',
                    province: '北京市',
                    hobby: []
                };
                this.isActive = true;
            },
            // delete list in index location
            del(index) {
                this.products_data.splice(index, 1);
                this.setSlist(this.products_data);
            },
            changeOverlay() {

                this.isActive = !this.isActive;

            },
            // 获取需要渲染到页面中的数据
            setSlist(arr) {
                this.slist = arr.slice();

            },

        },
    }
</script>

<style scoped>
    [v-cloak] {
        display: none
    }
    .overlay {
        position: absolute;
        bottom: 0!important;
        right: 0!important;
        top: 0!important;
        left: 0!important;
        width: 100%;
        height: 100%;
        z-index: 6;
        background: black;
    }
    .overlay td:first-child {
        width: 66px;
    }
    .overlay .con {
        position: absolute;
        width: 420px;
        min-height: 300px;
        background: #fff;
        left: 50%;
        top: 50%;
        -webkit-transform: translate3d(-50%, -50%, 0);
        transform: translate3d(-50%, -50%, 0);
        padding: 20px;
    }
</style>
