<template>
  <div id="app">
    <div class="store layui-col-md3" v-for="(express,val,key) in stores">
      <h2>{{val}}</h2>
      <div class="express" v-for="list in express">
        <h3>网点: {{list.branch_account_cols.waybill_branch_account[0].branch_name}}</h3>
        <p>快递公司: {{list.cp_code}}</p>
        <p>已用: {{list.branch_account_cols.waybill_branch_account[0].allocated_quantity}}</p>
        <p class="remain">剩余: {{list.branch_account_cols.waybill_branch_account[0].quantity}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        stores: {},
        jdStores: {},
      }
    },
    created() {
      this.qingqiu()
    },
    methods: {
      qingqiu() {
        $.ajax({
          type: 'post',
          url: 'http://xxx.xxx.xxx/xxx/tmorder/yue',
          success: (res) => {
            var datas = res;
            console.log(datas);
            for (var key in datas) {
              for (var i = 0; i < datas[key].length; i++) {
                // console.log(datas[key][i]);

                switch (datas[key][i].cp_code.toLowerCase()) {
                  case 'YTO'.toLocaleLowerCase() :
                    datas[key][i].cp_code = '圆通快递';
                  case 'ZTO'.toLocaleLowerCase() :
                    datas[key][i].cp_code = '中通快递';
                  case 'TTKDEX'.toLocaleLowerCase() :
                    datas[key][i].cp_code = '中通快递';
                }
              }

            }
            this.stores = datas;
          }
        })
      },
    },
  }
</script>

<style scoped>
  #app {
    display: flex;
    justify-content: space-around;
    /*flex-wrap: wrap;*/
    padding: 30px;
  }

  #app .store {
    border: 1px solid #ddd;

  }

  h2 {
    font-size: 30px;
    margin-bottom: 15px;
  }

  h3 {
    font-size: 24px;
  }

  .express {
    padding: 15px;

  }

  p {
    font-size: 20px;
    padding: 10px;
  }

  .remain {
    font-size: 24px;
    color: red;
  }
</style>
