<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="col-md-12 pd20">
                    <button class="btn btn-success"
                            @click="add_product"
                    >添加
                    </button>
                </div>

                <table class="table table-bordered">
                    <colgroup>
                        <col width="100">
                        <col width="100">
                        <col width="100">
                        <col width="100">
                        <col width="100">
                    </colgroup>
                    <thead>
                    <tr>
                        <th v-for="col in title">
                            {{col.cn}}
                        </th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(row,index) in list" :key="index">
                        <td v-for="col in title">
                            {{row[col.en]}}
                        </td>
                        <td>
                            <button class="btn btn-primary" @click="modify(row,index)">修改</button>
                            <button class="btn btn-danger" @click="showModal(row,index)">删除</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <v-add v-if="showAdd"
               :item="this.item"
               :title="add_title"
               @save = 'saveAdd'
        ></v-add>
        <a-modal
            title="删除"
            :visible="visible"
            @ok="handleOk"
            @cancel="handleCancel"
        >
            <p>你确定要删除吗</p>
        </a-modal>
    </div>
</template>

<script>
    import vAdd from './components/semi_add'
    import Vue from 'vue'
    export default {
        name: "semi_product",
        components:{
          vAdd
        },
        data(){
            return{
                visible:false,
                id:'',
                index:'',
                list:[],
                item:{},
                type:1,
                showAdd:false,
                add_title:'',
                title:[
                    {
                        cn:'名称',
                        en:'title'
                    },
                    {
                        cn:'类型',
                        en:'company',
                    },
                    {
                        cn:'数量',
                        en:'num',
                    },
                    {
                        cn:'时间',
                        en:'create_time',
                    }
                ]
            }
        },
        created(){
            this.halfList();
        },
        methods:{
            handleOk(){
                this.delhalf();
              this.visible = false;

            },
            add_product(){
                this.row = {};
                this.showAdd = true;
                this.index = this.list.length;
                this.type = 2;
            },
            handleCancel(){
                this.visible = false;
            },
            showModal(row,index){
                this.id = row.id;
                this.index = index;
                this.visible = true
            },
            modify(item,index){
              this.item = item;
              this.index = index;
              this.add_title = '修改半成品';
              this.showAdd = true;
                this.type = 2;
            },
            saveAdd(item){
                console.log('save');
                this.showAdd = false;
                if(item){
                    if(this.type===1)
                    this.updatehalf(item);
                    else if(this.type===2)
                        this.createHalf(item);
                }
            },
            halfList(){
                $.ajax({
                    url:'https://api.vvc.tw/suc/goods/halfList',
                    type:'post',
                }).then(res=>{
                    console.log(res);
                    if(res.code ===1){
                        this.list = res.data.list;
                        this.$message.info('更新成功')
                    }
                })
            },

            delhalf(){
                $.ajax({
                    url:'https://api.vvc.tw/suc/goods/delhalf',
                    type:'post',
                    data:{
                        id:this.id
                    }
                }).then(res=>{
                    if(res.code===1)
                        this.list.splice(this.index,1);
                })
            },
            updatehalf(item){
                $.ajax({
                    url:'https://api.vvc.tw/suc/goods/updatehalf',
                    type:'post',
                    data:item,
                }).then(res=>{
                    console.log(item);
                    Vue.set(this.list,this.index,item);

                })
            },
            createHalf(item){
                this.axios.post('https://api.vvc.tw/suc/goods/updatehalf',item).then(res=>{
                    console.log(res);
                })
                // $.ajax({
                //     url:'https://api.vvc.tw/suc/goods/createHalf',
                //     type:'post',
                //     data:item,
                // }).then(res=>{
                //     if(res.code ===1){
                //         this.halfList()
                //     }
                // })

            },


        }
    }
</script>

<style scoped>
.pd20{
    padding: 20px;
}
</style>
