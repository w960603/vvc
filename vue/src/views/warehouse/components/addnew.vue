<template>
  <div class="overlay" v-show="isactive">
    <div class="con">
      <div class="title">新增</div>
      <div class="wfr-content-frame">
        <!--<label><input type="text" v-model="modifylist.image_url"></label>-->
        <div class="wrfList">
          <div class="store">商品编码<input type="text" v-model="modifylist.sn"></div><br>
          <div class="store">商品名称<input type="text" v-model="modifylist.name"></div><br>
        </div>
        <div class="wrfList">
          <div class="store">	分类名称id<input type="text" v-model="modifylist.category_id"></div><br>
          <div class="store">仓库区域id<input type="text" v-model="modifylist.storage_id"></div><br>
        </div>
        <div class="wrfList">
          <div class="store">商品价格<input type="text" v-model="modifylist.price"></div><br>
          <div class="store">商品数量<input type="text" v-model="modifylist.num"></div><br>
        </div>
        <div class="wrfList">
          <div class="store">商品分类<input type="text" v-model="modifylist.category"></div><br>
          <div class="store">商品排序值<input type="text" v-model="modifylist.order"></div>
        </div>
      </div>
      <div class="img_file">
        <img style="width: 50px;height: 50px;" :src="modifylist.image_url"  alt="">
        <label class="add-img layui-btn layui-btn-normal" for="img1">
          添加文件
        </label>
        <input id="img1" type="file" @change="wfrfile()" class="wrfFile">
      </div>
      <div class="wfr-Warehouse-btn Warehouse-right">
        <input type="button" class="Warehouse-cancel" @click="cancel" value="取消">
        <input type="button" class="Warehouse-Submission" @click="save" value="提交">
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      props: ['list', 'isactive',"upload"],
      computed: {
        modifylist() {
          return this.list;
        }
      },

      methods: {
        cancel() {
          this.$emit('cancel');
        },
        save() {
          this.$emit('save', this.modifylist);
        },
        wfrfile(){
          var aa = {
            el:'#img1'
          };
          this.upload(aa,this.modifylist);
        },
      }
    }
</script>

<style scoped>

</style>
