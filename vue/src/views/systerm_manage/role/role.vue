<!--<template>-->
    <!--<div class="overlay">-->
        <!--<div class="con">-->
            <!--<div class="title">添加</div>-->
            <!--<form class="layui-form" action="">-->
                <!--<div class="layui-form-item">-->
                    <!--<label class="label"><strong style="color:red">*</strong>名称：</label>-->
                    <!--<div class="input">-->
                        <!--<input type="text" name="title" required  lay-verify="required" placeholder="请输入名称" autocomplete="off" class="layui-input">-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div class="layui-form-item">-->
                    <!--<label class="layui-form-label"><strong style="color:red">*</strong>状态：</label>-->
                    <!--<div class="layui-input-block">-->
                        <!--<input type="radio" name="sex" value="启用" title="启用" class="radio" checked>启用-->
                        <!--<input type="radio" name="sex" value="禁用" title="禁用" class="radio"  :disable="disabled" >禁用-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div class="layui-form-item layui-form-text">-->
                    <!--<label class="layui-form-label">备注：</label>-->
                    <!--<div class="layui-input-block">-->
                        <!--<textarea name="desc" placeholder="请输入内容" class="layui-textarea"></textarea>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div class="layui-form-item">-->
                    <!--<div class="layui-input-block">-->
                        <!--<button class="layui-btn" lay-submit lay-filter="formDemo"  @click="save">提交</button>-->
                        <!--<button type="reset" class="layui-btn layui-btn-primary"  @click="cancel">取消</button>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</form>-->
        <!--</div>-->
    <!--</div>-->
<!--</template>-->
<template>
    <div class="overlay">
    <div class="con">
        <p class="title">添加</p>
    <a-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}">
        <a-form-item
            label='名称'
            :labelCol="{ span: 5 }"
            :wrapperCol="{ span: 12 }"
            fieldDecoratorId="note"
            :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入名称!' }]}"
        >
            <a-input />
        </a-form-item>
        <a-form-item
            label='状态'
            :labelCol="{ span: 5 }"
            :wrapperCol="{ span: 12 }"
            fieldDecoratorId="gender"
            :fieldDecoratorOptions="{rules: [{ required: true, message: '选择状态!' }]}"
        >
            <a-select
                placeholder='Select a option and change input text above'
                @change="this.handleSelectChange"
            >
                <a-select-option value='启用'>启用</a-select-option>
                <a-select-option value='禁用'>禁用</a-select-option>
            </a-select>
        </a-form-item>
        <a-form-item
            :wrapperCol="{ span: 12, offset: 5 }"
        >
            <a-button type='primary' htmlType='submit'>
                提交
            </a-button>
        </a-form-item>
    </a-form>
    </div>
    </div>
    <!--<div class="layui-form-item">-->
    <!--<div class="layui-input-block">-->
    <!--<button class="layui-btn" lay-submit lay-filter="formDemo"  @click="save">提交</button>-->
    <!--<button type="reset" class="layui-btn layui-btn-primary"  @click="cancel">取消</button>-->
    <!--</div>-->
    <!--</div>-->
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
        data(){
          return {
              disabled:true,
              formLayout: 'horizontal',
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
            handleSubmit (e) {
                e.preventDefault()
                this.form.validateFields((err, values) => {
                    if (!err) {
                        console.log('Received values of form: ', values)
                    }
                })
            },
            handleSelectChange (value) {
                console.log(value)
                this.form.setFieldsValue({
                    note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
                })
            },
        },
    }
</script>

<style scoped>
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
   .title{
       font-weight: 600;
       padding:10px 20px;
       border-bottom: 1px solid lightgray;
   }
    .radio{
        display:inline-block!important;  margin-top: 12px;
    }

</style>
