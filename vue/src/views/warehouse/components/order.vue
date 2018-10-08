<template>
  <div v-show="isshow" class="order-lay layui-form-item" >
    <input type="text" class="layui-input" v-model="modifylist.order">
    <button class="layui-btn layui-btn-danger" @click="cancel">取消</button>
    <button class="layui-btn layui-btn-normal" @click="modify">提交</button>
  </div>
</template>

<script>
    export default {

      props:["list","isshow","index"],

      computed:{
        modifylist:function(){
          return this.list
        }
      },

      data(){
        return{
          childorder:this.list.order
        }
      },
      methods: {
        cancel:function(){
          Vue.delete(this.modifylist,"orderable") ;
          this.modifylist.order=this.childorder;

          this.$emit('cancel');
        },
        modify:function(){
          Vue.delete(this.modifylist,"orderable") ;

          this.$emit('save', this.modifylist);
        },

      }
    }
</script>

<style scoped>

</style>
