<template>
    <div class="mask">
        <div class="container">
            <div class="row">
                <form class="form clearfix">
                    <div class="col-md-12 title clearfix">
                        <h3 class="h3">
                            {{title}}
                        </h3>
                        <hr>
                    </div>

                    <div class="form-group col-md-8 col-offset-2">
                        <label class="col-sm-2 control-label">名称</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" v-model="modify_item.title" placeholder="请输入名称">
                        </div>
                    </div>
                    <div class="form-group col-md-8 col-offset-2">
                        <label class="col-sm-2 control-label">类型</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" v-model="modify_item.company" placeholder="请输入类型">
                        </div>
                    </div>
                    <div class="form-group col-md-8 col-offset-2">
                        <label class="col-sm-2 control-label">num</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" v-model="modify_item.num" placeholder="请输入数量">
                        </div>
                    </div>
                    <div class="form-group col-md-6 ">
                        <div class="col-md-12">
                            <button class="btn btn-primary" @click="save">保存</button>
                            <button class="btn btn-danger" @click="cancel">取消</button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "semi_add",
        props: ['title','item'],
        computed:{
            modify_item(){
                let obj = {};
                Object.keys(this.item).forEach((item,value)=>{
                    obj[item] = this.item[item]
                });
                return obj
            }
        },
        created(){
        },
        methods:{
            save(){
                this.$emit('save',this.modify_item)
            },
            cancel(){
                this.$emit('save')
            }
        }
    }
</script>

<style scoped>
    .mask {
        position: fixed;
        z-index: 999;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .3);
    }

    .container {
        position: absolute;
        top:20%;left:0;right:0;
        margin: auto;
        min-height:500px;
    }

    .form {
        background-color: #fff;
        border: 1px solid #ddd;
    }

    .title {
        height: 100px;
        line-height: 100px;
        padding-bottom: 20px;
    }
</style>
