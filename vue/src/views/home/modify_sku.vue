<template>
    <div id="app">
        <div class="order_content">
            <ul class="order_list">
                <li class="list_ordername">
                    <label>商品编码</label><input type="text" @input="change()" v-model="items.goodid" placeholder="请输入"><button @click="getinfo">获取</button>
                </li>
                <li>
                    <div class="img_oss">
                        <div>
                            <label>价格表URL:</label><input style="border: 1px solid #e6e6e6;width: 400px;background: #CCCCCC" type="text" v-model="items.priceimage">
                        </div>
                        <div>
                            <img  :src="items.priceimage" alt="" width="100" height="100">
                            <form action="" id="form1">
                                <input id="file" type="file" name="file" />
                            </form>
                        </div>
                        <button @click="getfile()">上传</button>
                    </div>
                </li>
                <ul >
                    <li v-for="(item2, index2) in items.canshu">
                        <input style="border: 1px solid #e6e6e6;" v-for="(item3,index3) in item2" type="text" v-model ="item2[index3]" >
                    </li>
                </ul>
                <button @click="addNewTodo">增加</button>
                <button @click="post">提交</button>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        name: "modify_sku",
        data(){
            return{ parentMessage: 'Parent',
            items: { goodid:698,
                canshu:[
                    [ "商品编号",698],
                    [ "材质", "锦纶 再生纤维"],
                    ["厚薄","薄款"],
                    // ["面料","锦纶 "],
                    // ["成分含量", "91%-95%"],
                    // ["年份季节", "锦纶 再生纤维"],
                    ["颜色分类", "淡蓝色/果绿色/霓虹色/白色/粉色"],
                    ["尺码", "均码"]
                ]                     ,
                "priceimage":"https://garytext.oss-cn-beijing.aliyuncs.com/price.png"
            }
            }
        },
        created(){
            console.log(this.items);
        },
        methods: {
            addNewTodo:  function (){
                console.log(222)
                console.log(this.items)
                this.items.canshu.push(["",""])
            },
            post: function () {
                // axios.post(
                //     'https://api.vvc.tw/suc/goods/orderDetail/?id='+this.items.goodid,
                //     {data:JSON.stringify( this.items)}
                // ).then(function(resp){
                //     console.log(resp.data);
                // })
                $.ajax({
                    type:"post",
                    url: 'https://api.vvc.tw/suc/goods/orderDetail/?id='+this.items.goodid,
                    data:{
                        data:JSON.stringify( this.items),
                    },
                    success:(resp)=>{
                        console.log(resp.data);
                        // this.items = resp.data;
                    }
                })
            },
            getinfo:function() {
                console.log(this.items.goodid);
                $.ajax({
                    type:"post",
                    url: 'https://api.vvc.tw/suc/goods/getDetail/?id=' + this.items.goodid,
                    success:(resp)=>{
                        console.log(resp);
                        this.items = resp.data;
                    }
                })
            },
            change:function (e) {
                console.log(23232 ,this.items.canshu[0]);
                Vue.set(this.items.canshu[0],1,this.items.goodid);
            },
            getfile(){
                this.upload({el:"#file"});
                this.$forceUpdate();
            },
            upload(option){
                var getUrl = option.getUrl?option.getUrl:"https://api.vvc.tw/dlxin/index/getoss2" +
                    "";
                var postUrl = option.postUrl?option.postUrl:"https://cdn.vvc.tw";
                console.log(getUrl,postUrl);
                var fileName = option.fileType ? option.fileType:'vvc';
                $.ajax({
                    url:getUrl,
                    type:"get",
                    success:(res) =>{
                        var responent = JSON.parse(res);
                        console.log($(option.el)[0].files[0]);
                        var file= option.el?$(option.el)[0].files[0]:option.imagePath;
                        var date = new Date().getTime();
                        var datas = new FormData();
                        datas.set('policy',responent.policy);
                        datas.set('OSSAccessKeyId',responent.accessid);
                        datas.set('Signature',responent.signature);
                        datas.set('key',responent.dir+fileName+"_"+date+".jpg");
                        datas.set('file',file);
                        $.ajax({
                            url:postUrl,
                            data:datas,
                            type:'post',
                            dataType:'json',
                            async:false,
                            cache: false,
                            processData: false,
                            contentType: false,
                            success:()=>{
                                console.log("我",this.items.priceimage);
                                this.items.priceimage = "https://cdn.vvc.tw/"+responent.dir+fileName+"_"+date+".jpg"
                            }
                        })
                    }
                });
            }
        }
    }
</script>
<style scoped>
    html{
        height: 92.5%;
    }
    body{
        height: 100%;
    }
    #app {
        width: 93%;
        min-height: 100%;
        background: white;
        padding: 25px 30px 10px 30px;
        margin: 25px;
    }
    .order_content{
        width: 100%;
        min-height:100%;
        padding: 25px;
    }
    .order_list{
        list-style: none;
    }
    .img_oss{
        width: 100%;
        /*display: flex;*/
        /*justify-content: space-around;*/
        /*align-items: center;*/
    }
    .list_ordername label{
        color: #2e2d3c;
        line-height: 30px;
        font-size: 16px;
        margin-right: 10px;
    }
    .list_ordername input{
        width: 300px;
        line-height: 28px;
        border:1px #c2c2c2 solid;
        border-radius: 2px;
        padding-left: 10px;
    }
    .list_ordername button{
        width: 60px;
        line-height: 30px;
        border: none;
        background:#0092fb;
        color: white;
        font-size: 14px;
        vertical-align: middle;
    }
</style>
