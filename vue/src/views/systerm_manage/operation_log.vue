<template>
    <div id="app">
        <div class="layui-form-item line-block" >
            <input type="search"  lay-verify="required" :checked="status" placeholder="控制器" autocomplete="off" class="layui-input">
            <input type="search"  lay-verify="required" :checked="status" placeholder="方法" autocomplete="off" class="layui-input">
            <input type="search"  lay-verify="required" :checked="status" placeholder="描述" autocomplete="off" class="layui-input">
            <button class="layui-btn layui-btn layui-bg-green">搜索</button>
        </div>
        <div class="flex">
            <div>共有数据:<strong>{{operationList.length}}</strong>条</div>
        </div>
        <table class="layui-table">
            <col-group>
                <tr>
                    <col width="80">
                    <col width="80">
                    <col width="80">
                    <col width="120">
                    <col width="140">
                    <col width="120">
                    <col width="100">
                </tr>
            </col-group>
            <thead>
            <th v-for="(row,index) in logon_log" >
                {{row.cn}}
            </th>
            <th>操作</th>
            </thead>
            <tbody>
            <tr v-for="(col,index) in operationList">
                <td v-for="row in logon_log">{{col[row.en]}}</td>
                <td><button class="">详情</button>
                </td>
            </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
    export default {
        data(){
            return {
                operationList:[],
                logon_log: [
                    {'cn':'用户',
                        'en':'超级管理员'},
                    {'cn':'请求方式',
                        'en':'Get'},
                    {'cn':'模块',
                        'en':'admin'},
                    {'cn':'节点图',
                        'en':'login_log'},
                    {'cn':'描述',
                        'en':'logon_log首页'},
                    {'cn':'时间',
                        'en':'out_time'}
                ],
                checkData:[],
                status:false
            }
        },
        created(){
            this.qingqiu()
        },
        watch:{
            checkData: { // 监视双向绑定的数组变化
                handler(){
                    if(this.checkData.length == this.operationList.length) {
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
                    url:'https://xxx.xxx.xxx/xxx/role/rolelist',
                    success:(res)=>{
                        console.log(res)
                        this.operationList = res.data
                    }
                })
            },

            checkAll(e) {
                console.log(this.checkData);
                if(e.target.checked) {
                    this.operationList.forEach((el, i) => {
                        if(this.checkData.indexOf(el) == '-1') {
                            this.checkData.push(el);
                        }
                    });
                } else {
                    this.checkData = [];
                }
            },

            // 删除选中的项目
            deleteProduct:function () {

                // this.loginList = this.loginList.filter(function () {
                //     return !col.check
                //     console.log(this.col.check,180)
                // })


            },
            //删除单条项目
            deleteOneProduct:function (index) {
                this.loginList.splice(index,1);

            },
        },

        // computed:{
        //     //监测全选
        //     isCheckAll:function(){
        //         return this.loginList.every(function(val){
        //             console.log(val.checked);
        //             return val.checked
        //         })
        //     },
        //
        // },

    }
</script>

<style scoped>
    #app{
        width: 70%;
        margin:20px auto;
    }
    .line-block{
        display:flex;
        width:50%;
    }
    input{
        margin:0 10px;
    }
    .flex{
        text-align: end;
        border:1px solid lightgray;
        padding:5px;
        border-radius:5px;
    }
    table{text-align: center!important;}
    th{text-align: center!important;}
</style>
