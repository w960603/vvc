<template>
    <div id="app">
        <div class="layui-form-item">

            <div class="layui-input-inline">
                <input type="search" name="password"  :checked="status" placeholder="名称" autocomplete="off" class="layui-input"  @input="search()" v-model="searchVal">
            </div>
            <button class="layui-btn layui-btn-normal" @click="search()">搜索</button>
        </div>
        <div class="flex">
            <div>
                <button class="layui-btn layui-btn-warm  layui-btn-sm" @click="addshow"> <i class="layui-icon">&#xe608;</i> 添加</button>
                <button class="layui-btn layui-bg-blue layui-btn-sm">禁用</button>
                <button class="layui-btn layui-btn layui-bg-cyan  layui-btn-sm">恢复</button>
                <button class="layui-btn layui-btn layui-bg-red  layui-btn-sm" > <i class="layui-icon">&#xe640;</i>删除</button>
                <button class="layui-btn layui-btn layui-bg-#2F4056  layui-btn-sm">回收站</button>
            </div>
            <div>共有数据:<strong> {{productList.length}} </strong>条</div>
        </div>
        <table class="layui-table">
            <group>
                <tr>
                    <col width="80">
                    <col width="100">
                    <col width="200">
                    <col width="100">
                    <col width="100">
                    <col width="200">
                    <col width="100">
                </tr>
            </group>
            <thead>
            <th><input type="checkbox" id="quan" title="全选" lay-skin="primary" @click="checkAll($event)"></th>
            <th v-for="(row,index) in role_title" :key="index">
                {{row.cn}}
            </th>
            <th>操作</th>
            </thead>
            <tbody>
            <tr v-for="(col,index) in productList" :key="index" v-if="productList.length">
                <!--@click="col.checked != col.checked" :checked="col.checked"-->
                <!--name="" :value="col" v-model="checkData"-->
                <td> <input type="checkbox" title="单选"  lay-skin="primary"  :value="col" v-model="checkData"></td>
                <td v-for="row in role_title">{{col[row.en]}}</td>
                <td><button class="layui-btn layui-btn-danger  layui-btn-xs" >禁用</button>
                    <button class="layui-btn layui-btn-primary layui-btn-xs">
                        <i class="layui-icon">&#xe642;</i>
                    </button>
                    <button class="layui-btn layui-btn-primary layui-btn-xs" @click="deleteOneProduct">
                        <i class="layui-icon">&#xe640;</i>
                    </button>
                    <button class="layui-btn layui-btn-normal  layui-btn-xs">用户列表</button>
                    <button class="layui-btn layui-btn-normal  layui-btn-xs">授权</button>
                </td>
            </tr>
            </tbody>
        </table>
        <!--<p v-else>数据加载中。。。</p>-->
        <addnew  v-show="isAddActive" :list='checkedlist'  @cancel="click"  ></addnew>
    </div>
</template>

<script>
    import addnew from './role/role'

    export default {
        components:{
          addnew
        },
        data(){
            return {
                productList:[],
                role_title: [
                    {'cn':'ID',
                        'en':'id'},
                    {'cn':'名称',
                        'en':'rolename'},
                    {'cn':'开始时间',
                        'en':'start_time'},
                    {'cn':'结束时间',
                        'en':'out_time'},

                ],
                checkedlist:{},
                checkData:[],
                status:false,
                colList:[],
                // isactive:false,
                isshow:false,
                // disabled:false,
                isAddActive:false,
                searchVal:'',
            }
        },
        created(){
            // this.isAddActive = false;

            this.qingqiu()
        },
        watch:{
            checkData: { // 监视双向绑定的数组变化
                handler(){
                    if(this.checkData.length == this.productList.length) {
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
                        this.productList = res.data
                    }
                })
            },
            click(e){

                console.log(e);
                this.isAddActive = e;
            },
            addshow(){
                console.log(5555);
                this.isAddActive = true;
                console.log(this.isAddActive);

            },
            checkAll(e) {
                console.log(this.checkData);
                if(e.target.checked) {
                    this.productList.forEach((el, i) => {
                        if(this.checkData.indexOf(el) == '-1') {
                            this.checkData.push(el);
                        }
                    });
                } else {
                    this.checkData = [];
                }
            },
            //禁用开关
            // disabled(){
            //     this.disabled = true
            // },
            //添加数组的方法
            addSave(arr){
                if(arr){
                    $.ajax({
                        url:"https://api.vvc.tw/suc/role/roleupd",
                        type:'post',
                        data:arr,
                        success:(res)=>{
                            this.qingqiu()
                        }
                    })
                }
            },
            add: function () {
                this.checkedlist = {};
                this.isAddActive = true;
            },
            //删除单条项目
            deleteOneProduct:function (index) {
                this.isshow =! isshow
                this.productList.splice(index,1);
            },
        },
        computed:{
            search(){
                // var _this = this
                var colList = []
                for(var i = 0;i<this.productList.length;i++){
                    if(this.productList[i].rolename.search(this.searchVal)!= -1){
                        colList.push(this.productList[i])
                    }
                }
                this.productList = colList
            }
        },

    }
</script>

<style scoped>
    #app{
        width: 70%;
        margin:20px auto;
    }
    .flex{
        display:flex;
        justify-content: space-between;
        align-items: center;
        border:1px solid lightgray;
        padding:5px;
        border-radius:5px;
    }
    table{text-align: center!important;}
    th{text-align: center!important;}
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 6;
        background: rgba(0, 0, 0, 0.7);
    }

    .overlay td:first-child {
        width: 66px;
    }

    .overlay .con {
        position: absolute;
        width: 650px;
        min-height: 520px;
        background: #fff;
        left: 29%;
        top: 15%;
        animation: wfrProjectileFrame 0.4s linear;
    }
    .layui-input, .layui-textarea{
        width:80%!important;
    }
    .radio{
        display:inline-block!important;  margin-top: 12px;
    }
</style>
