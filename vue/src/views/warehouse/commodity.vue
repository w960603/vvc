<template>
  <div id="order-list">

    <div class="row">
      <div class=" form-group col-md-12">
        <input type="text" v-model="SearchGoods" placeholder="请输入搜索内容..." class="form-control col-md-8 col-md-offset-2"><br/>
        <button class="btn btn-primary  " @click="add">添加商品</button>
        <button @click="showDelLayer" class="btn btn-danger  ">删除</button>
      </div>
    </div>

    <table class="table table-bordered table-hover " v-if="filterData.length">
      <colgroup>
        <col width="150">
        <col width="200">
        <col width="300">
        <col width="200">
        <col width="200">
        <col width="200">
        <col width="200">
        <col width="200">
        <col width="200">
      </colgroup>
      <thead >
      <tr>
        <th >

          <a-checkbox @click="checkAll" v-model="allChecked">全选</a-checkbox>

        </th>
        <th v-for="col in titles" @click="order(col.en)">
          {{col.cn}}
        </th>
      </tr>

      </thead>
      <tbody>
      <tr v-for="(row,index) in filterData" >
        <td style="vertical-align: center"  >

          <a-checkbox type="checkbox"
                      class="input"
                      v-model="row.state"
                      @click="changeCheck(row)"
                      >
          </a-checkbox>

        </td>
        <td v-for="col in titles" >
          <template v-if="col.en == 'img'">
            <img :src="row[col.en]" class="product-img">
          </template>
          <template v-else-if="col.en == 'order'">
            <span @click="showbox(row)">{{row[col.en]}}</span>
            <order :list="row" :isshow="row.orderable" v-cloak @save="orderSave" @cancel="orderSave"></order>
          </template>
          <template v-else-if="col.en==='operate'">
            <button class="btn btn-primary btn-sm wfrpadd" @click="showOverlay(row,index)">分类</button>
            <button class="btn btn-danger btn-sm wfrpadd" @click="shanchu(row,index)">删除</button>
          </template>
          <template v-else>{{row[col.en]}}</template>
        </td>
      </tr>
      </tbody>
    </table>
    <p v-else>数据加载中。。。</p>

    <model :list='selectedlist'
           :isactive="isModelActive"
           v-cloak
           @save="modelSave"
           @cancel="modelSave"
           :upload="upload">

    </model>
    <addnew :list='selectedlist' :upload="upload" :isactive="isAddActive" v-cloak @save="addSave"
            @cancel="addSave">
    </addnew>

    <!--删除弹框-->
    <div class="wfr-show-frame" v-show="wfrshow">
      <p>是否确定删除</p>
      <button class="wfr-btn1" @click="quxiao">取消</button>
      <button class="wfr-btn2" @click="del()">确认</button>
    </div>

    <div class="wfr-show-frame" v-show="delAllShow">
      <p>是否确定删除</p>
      <button class="wfr-btn1" @click="quxiaoAll">取消</button>
      <button class="wfr-btn2" @click="delChecked">确认</button>
    </div>
  </div>
</template>

<script>
  import model from './components/model'
  import addnew from './components/addnew'
  import order from './components/order'

  export default {
    components: {
      model,
      addnew,
      order
    },
    data() {
      return {
        titles: [
          {
            en: "img",
            cn: '商品图片'
          }, {
            en: "title",
            cn: '商品名称'
          }, {
            en: "displayorder",
            cn: '商品排序'
          }, {
            en: "mon1",
            cn: '董事'
          }, {
            en: "mon2",
            cn: '女神'
          }, {
            en: "mon3",
            cn: '仙女'
          }, {
            en: "mon4",
            cn: '天使'
          }, {
            en: "operate",
            cn: '操作'
          }],
        products_data: [],//原始数据

        status: true,
        active: false,
        selectedlist: {},

        //搜索相关
        setOrders: {},//排序关键词对象
        sortKey: "",//排序关键词
        SearchGoods: '',//输入值

        isAddActive: false,//新增

        isModelActive: false,  //修改

        wfrshow: false,//是否删除

        deleteData: [],//勾选用到的
        delAllShow: false,
        allChecked: false,

        loading: false,
        visible: false,
      }
    },
    created() {
      this.qingqiu();
      this.setOrder();
    },
    methods: {
      showModal() {
        this.visible = true;
      },
      handleOk(e) {
        this.loading = true;
        setTimeout(() => {
          this.visible = false;
          this.loading = false;
        }, 3000);
      },
      handleCancel(e) {
        this.visible = false;
      },

      qingqiu() {
        $.ajax({
          type: "get",
          url: "https://api.vvc.tw/suc/goods/goodslist",
          // dataType:'json',
          success: (res) => {
            console.log(res.data.list);
            this.products_data = res.data.list.sort(function (a, b) {
              return b.id - a.id
            });
            console.log(this.products_data)

          }
        })
      },

      /******************勾选的方法******************/

      showDelLayer() {
        for (var i = 0, len = this.products_data.length; i < len; i++) {
          if (this.products_data[i].state) {
            return this.delAllShow = true
          }
        }
      },
      changeCheck(item) {
        var status;
        this.$set(item, 'state', !item.state);
        for (var i = 0, len = this.products_data.length; i < len; i++) {
          if (this.products_data[i].state) {
            status = true
          } else {
            status = false;
            this.allChecked = false;
            return
          }
        }
        if (status) {
          this.allChecked = true
        }

      },
      quxiaoAll() {
        this.delAllShow = false;
        this.deleteData = [];
      },
      delChecked() {
        for (var i = 0, len = this.products_data.length; i < len; i++) {
          if (this.products_data[i].state) {

            this.deleteData.push({
              id: this.products_data[i].id
            })
          }
        }
        // console.log(JSON.stringify(this.deleteData));
        $.ajax({
          type: 'post',
          url: 'https://api.vvc.tw/suc/goods/goodsdel',
          data: {
            id: JSON.stringify(this.deleteData)
          },
          success: (res) => {
            // console.log(res);
            this.qingqiu();
            this.delAllShow = false;
            this.allChecked = false
          }
        })
      },

      checkAll(e) {

        this.allChecked = !this.allChecked;
        var that = this.products_data;

        for (var i = 0, len = that.length; i < len; i++) {
          if ((!!that[i].state) === false) {

            for (var j = 0; j < len; j++) {
              Vue.set(that[j], "state", true)
            }

            return
          } else {
            Vue.set(that[i], "state", false)
          }
        }
      },

      // 修改的组件的方法
      showOverlay(row, index) {
        //this.selected=index;
        console.log(row);
        $.ajax({
          type: 'get',
          url: 'https://api.vvc.tw/suc/goods/goodslist',
          data: {
            id: row.id
          },
          success: (res) => {
            console.log(res);
            this.isModelActive = true;
            this.selectedlist = res.data[0];
            console.log(this.selectedlist);
          }
        });
      },
      modelSave(arr) {

        if (arr) {
          $.ajax({
            type: 'post',
            url: 'https://api.vvc.tw/suc/goods/goodsupd',
            data: arr,
            success: (res) => {
              console.log(res);
              this.qingqiu()
            }
          });
        }
        this.isModelActive = false
      },
      //修改order
      showbox(arr) {
        if (this.status) {

          this.$set(arr, "orderable", true);
        }
        this.status = false

      },
      orderSave: function (arr) {
        // console.log(arr);
        // Vue.delete(arr,"orderable");
        if (arr) {
          $.ajax({
            type: 'post',
            url: 'https://api.vvc.tw/suc/goods/goodsupd',
            data: arr,
            success: (res) => {
              this.qingqiu();
            }
          });
        }
        this.status = true

      },

      //图片上传oss
      upload(option, arr) {

        var getUrl = option.getUrl ? option.getUrl : "https://hz.vvc.tw/get.php";
        var postUrl = option.postUrl ? option.postUrl : "https://hzoss1.vvc.tw";
        //console.log(getUrl,postUrl);
        var fileName = option.fileType ? option.fileType : 'vvc';
        $.ajax({
          url: getUrl,
          type: "get",
          success: (res) => {
            var responent = JSON.parse(res);
            //console.log($(option.el)[0].files[0]);
            var file = option.el ? $(option.el)[0].files[0] : option.imagePath;
            var date = new Date().getTime();
            var datas = new FormData();
            datas.set('policy', responent.policy);
            datas.set('OSSAccessKeyId', responent.accessid);
            datas.set('Signature', responent.signature);
            datas.set('key', responent.dir + fileName + "_" + date + ".jpg");

            datas.set('file', file);
            $.ajax({
              url: postUrl,
              data: datas,
              type: 'post',
              dataType: 'json',
              async: false,
              cache: false,
              processData: false,
              contentType: false,
              success: () => {
                // console.log(arr);
                Vue.set(arr, 'image_url', "https://hzoss1.vvc.tw/" + responent.dir + fileName + "_" + date + ".jpg");
                // arr.image_url = "https://hzoss1.vvc.tw/"+responent.dir+fileName+"_"+date+".jpg";

                option.callback && option.callback();
              }
            })
          }
        });
      },
      //添加上传
      addSave(arr) {
        if (arr) {
          $.ajax({
            type: 'post',
            url: 'https://api.vvc.tw/suc/goods/goodsadd',
            data: arr,
            success: (res) => {
              //console.log(res);
              this.qingqiu();
            }
          });
        }
        this.isAddActive = false
      },
      add: function () {
        this.selectedlist = {};
        this.isAddActive = true;
      },


      //删除
      del() {
        $.ajax({
          type: 'post',
          url: 'https://api.vvc.tw/suc/goods/goodsdel',
          data: {
            id: this.selectedlist.id,
          },
          success: (res) => {
            this.qingqiu();
            this.wfrshow = false;
          }
        });

      },
      shanchu(arr) {
        this.selectedlist = arr;
        this.wfrshow = true
      },
      quxiao(item) {
        this.wfrshow = false;
      },

      //排序
      order: function (key) {

        this.sortKey = key;
        this.setOrders[key] = this.setOrders[key] * -1;
      },
      setOrder: function () {
        var colOrders = {};
        this.titles.forEach(function (col) {
          colOrders[col.en] = 1;
        });
        this.setOrders = colOrders
      },
      Deleteshop() {
        this.wfrshow1 = false;
      }
    },
    computed: {
      //搜索/过滤
      filterData: function () {

        //console.log("rows:"+this.rows.length);
        var sortKey = this.sortKey;
        var data = this.products_data.slice();
        var filterKey = this.SearchGoods && this.SearchGoods.toLowerCase();
        var order = this.setOrders[sortKey];
        //console.log("第一次"+new Date().getTime());
        if (filterKey) {
          data = data.filter(function (row) {
            return Object.keys(row).some(function (key) {
              return String(row[key]).toLowerCase().indexOf(filterKey) > -1
            })
          })
        }
        if (sortKey) {

          data.sort(function (a, b) {
            a = a[sortKey];
            b = b[sortKey];
            return order < 0 ? (a - b) : (b - a)
          })
        }
        return data;
      }
    },
  }
</script>

<style >
  #order-list {
    position: relative;
    padding: 20px;
    background: white;
  }

  .add {
    width: 100%;
    text-align: center;
    margin: 20px 0;
  }

  .add input, .add button {
    width: 400px;
    height: 40px;
    margin-bottom: 10px;
    border-radius: 4px;
    font-size: 18px;
    border: 1px solid #d8d8d8;
  }

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
    min-height: 545px;
    background: #fff;
    left: 29%;
    top: 15%;
    animation: wfrProjectileFrame 0.4s linear;
  }

  @keyframes wfrProjectileFrame {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  .wfr-show-frame {
    position: fixed;
    width: 200px;
    height: 150px;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.5);
    top: 50%;
    left: 50%;
    margin-left:-100px;
    margin-top:-75px;
    animation: wfrProjectileFrame 0.4s linear;
  }

  .store {
    margin: 10px 30px;
    width: 300px;
  }

  .wfr-content-frame .list {
    margin: 10px 30px;
    width: 300px;
  }

  .wfr-show-frame p {
    color: white;
    text-align: center;
    font-size: 16px;
    margin: 40px 0;

  }

  .wfr-btn1, .wfr-btn2 {
    width: 65px;
    height: 30px;
    margin-left: 20px;
    background: white;
    border: 0;
    color: black;
    border-radius: 4px;
  }

  .wfr-content-frame {
    padding: 10px 35px;
    margin-top: 10px;
  }

  .title {
    padding: 10px 20px;
    font-size: 20px;
    border-bottom: 1px solid lightgray;
  }

  .wrfList {
    display: flex;
    justify-content: space-around;
  }

  .wfr-Warehouse-btn {
    text-align: right;
    margin: 60px auto;
  }

  .wfr-content-frame input {
    font-size: 16px;
    width: 245px;
    border: 1px solid #d8d8d8;
    margin: 10px 5px;
    height: 32px;
    border-radius: 4px;
  }

  .wfrList input {
    padding: 5px 13px;
    margin: 0 20px;
    border-radius: 5px;
    border: 1px solid lightgray;
    background: none;
  }

  .wfr-Warehouse-btn input:nth-child(2) {
    background: #2b87fb;
    color: white;
  }

  .wfr-Warehouse-btn {
    text-align: right;
    margin: 60px auto;
  }

  .wfr-Warehouse-btn input {
    padding: 5px 20px;
    margin-right: 20px;
    border-radius: 3px;
    border: 1px solid lightgray;
    background: none;
  }

  .wfr-Warehouse-btn input:nth-child(2) {
    background: #2b87fb;
    color: white;
  }

  .product-img {
    width: 50px;
  }

  .add-img {
    margin: 0 auto;
    cursor: pointer;
    color: #fff;
  }

  .add-img + input {
    opacity: 0;
  }

  .img_file {
    padding-left: 10%;
  }

  .table th {
    text-align: center;
    padding: 8px;
    vertical-align: middle!important;
  }
  .table td {
    padding: 8px;
    text-align: center;
    vertical-align: middle!important;
  }
  input[type='checkbox'] {
    width: 30px;
  }

</style>
