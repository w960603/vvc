<template>
    <div class="overlay">
        <div class="con">
            <div class="title">添加</div>
            <form class="form" action="">
                <div class="form-item">
                    <div class="label"><strong style="color:red">*</strong>名称：
                        <input type="text" name="title" required  lay-verify="required" placeholder="请输入名称" autocomplete="off" class="input">
                    </div>
                </div>
                <div class="form-item">
                    <div class="label"><strong style="color:red">*</strong>状态：
                        <input type="radio" name="sex" value="启用" title="启用" class="radio" checked>启用
                        <input type="radio" name="sex" value="禁用" title="禁用" class="radio"  :disable="disabled" >禁用
                    </div>
                </div>
                <div>
                    <label class="title1">备注：</label>
                    <div class="input-textarea">
                        <textarea  placeholder="请输入内容" class="textarea"></textarea>
                    </div>
                </div>
                <div class="flex">
                        <button type="submit" class="btn blue"  @click="save">提交</button>
                        <button type="reset" class="btn gray"  @click="cancel">取消</button>
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
        width: 520px;
        min-height: 500px;
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
    .title1{
        font-weight: 600;
        padding:5px 20px;
    }
    .form{
        margin:20px;

    }
    .label{
        display:flex;
        align-items: center;
        padding:10px;
    }
    .input{
        width: 370px;
        height: 30px;
        border-radius: 5px;
        border: 1px solid lightgray;
    }
    .textarea{
        width: 370px;
        height: 180px;
        margin-left: 58px;
        border: 1px solid lightgray;
        border-radius: 5px;
    }
    .btn{
        width: 60px;
        height: 30px;
        font-size: 12px;
        color: white;
    }
    .blue{
        background:#2b87fb;
    }
    .gary{
        background:#1d2124;
    }
    .flex{
        text-align: right;
        margin-top:30px;
    }

</style>
