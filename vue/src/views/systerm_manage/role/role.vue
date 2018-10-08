<template>
    <div class="overlay">
        <div class="con">
            <div class="layui-layer-title">添加</div>
            <form class="layui-form" action="">
                <div class="layui-form-item">
                    <label class="layui-form-label"><strong style="color:red">*</strong>名称：</label>
                    <div class="layui-input-block">
                        <input type="text" name="title" required  lay-verify="required" placeholder="请输入名称" autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label"><strong style="color:red">*</strong>状态：</label>
                    <div class="layui-input-block">
                        <input type="radio" name="sex" value="启用" title="启用" class="radio" checked>启用
                        <input type="radio" name="sex" value="禁用" title="禁用" class="radio"  :disabled="disabled" >禁用
                    </div>
                </div>
                <div class="layui-form-item layui-form-text">
                    <label class="layui-form-label">备注：</label>
                    <div class="layui-input-block">
                        <textarea name="desc" placeholder="请输入内容" class="layui-textarea"></textarea>
                    </div>
                </div>
                <div class="layui-form-item">
                    <div class="layui-input-block">
                        <button class="layui-btn" lay-submit lay-filter="formDemo"  @click="save">提交</button>
                        <button type="reset" class="layui-btn layui-btn-primary"  @click="cancel">取消</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['list'],
        template: `#addnews`,
        computed: {
            modifylist() {
                return this.list;
            }
        },
        created(){
            // console.log(1111,this.isactive);
        },
        methods: {
            cancel() {

                this.$emit("cancel",false);

            },
            save() {
                this.$emit('save', this.modifylist);
            },
        }
    }
</script>

<style scoped>

</style>
