<template>
  <div id="app">
    <div class="layui-col-md6  store">
      <h2>京东:</h2>
      <div class="store layui-col-md6" v-for="express in jdStores" >
        <h3>网点:{{express.address.countryName}}</h3>
        <p >快递公司: {{express.providerName}}</p>
        <p class="remain">剩余: {{express.amount}}</p>

      </div>
    </div>

  </div>
</template>

<script>
    export default {
      data(){
        return{
          jdStores :{

          },
        }
      },
      created(){
        this.qingqiu();
      },
      methods:{
        qingqiu(){
          $.ajax({
            type:'post',
            url:'https://jd.vvc.tw/index/index/getkuaidi',
            success:(res)=>{

              if (JSON.parse(res)) {

                this.jdStores = JSON.parse(res).data;
              }
              // console.log(this.jdStores);
            }
          })
        },
      },
    }
</script>

<style scoped>
  #app{
    display: flex;
    justify-content: space-around;
    /*flex-wrap: wrap;*/
    padding: 30px;
  }
  #app .store{
    border: 1px solid #ddd;

  }
  h2{
    font-size: 30px;
    margin-bottom: 15px;
  }
  h3{
    font-size: 24px;
  }
  .express{
    padding: 15px;

  }
  p{
    font-size: 20px;
    padding: 10px;
  }
  .remain{
    font-size: 24px;
    color: red;
  }
</style>
