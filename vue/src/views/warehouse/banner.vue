<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-8 bd col-md-offset-2 ">
                <div class="col-md-8 bd col-md-offset-2 ">
                    <h3 class="h3">轮播图</h3>
                    <div class="col-md-12">
                        <ul>
                            <li class="banner-list" v-for="(item,index) in imgs">
                                <span class="cancel" @click="delBanner(item.img,index)">&times;</span>
                                <img :src="item.img" alt="">
                                <p>商品名:{{item.title}}</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-8 bd col-md-offset-2">
                    <div class="form-group" style="padding-bottom:10px">
                        <label class="col-md-2 h5">选择商品编码:</label>
                        <div class="col-md-10">
                            <select class="form-control" @change="getinfo($event)">
                                <option selected v-for="item in couponList" :value="item.id">{{item.title}}{{item.id}}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="col-md-8 bd col-md-offset-2 ">
                    <h5 class="h4 bold">商品详情</h5>
                    <div>
                        <img :src="uploadedImage" width="500"
                             style="min-width:500px;min-height:300px;max-width:500px; border:1px solid #ddd"
                             alt="预览图">
                        <label for="upload-img2" class=" btn btn-primary">选择图片</label>
                        <input id="upload-img2" type="file" style="display: none;">
                        <button class="btn btn-primary" @click="getfile('#upload-img2','uploadedImage')">上传并预览
                        </button>
                        <button class="btn btn-primary" @click="submitImg">提交保存</button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "banner",
        data() {
            return {
                uploadedImage: null,
                imgs: [],
                draged: {},
                droped: {},

                couponList: [],
                goods_id: '667',
                bannerList: [],
            }
        },
        computed: {
            dragImg() {
                return this.imgs
            }
        },
        created() {
            this.getList();
            this.myclick()
        },
        methods: {
            myclick() {
                $.ajax({
                    type: "post",
                    url: "https://xxx.xxx.xxx/xxx/goods/goodsDetail",
                    success: (res) => {
                        this.couponList = res.data;
                    }
                });
            },
            delBanner(img,index){
              $.ajax({
                  url:'https://xxx.xxx.xxx/xxx/goods/delBanner',
                  type:'post',
                  data:{
                      img:img
                  }
              }).then(res=>{
                  console.log(res);
                  this.$message.info(res.msg);
                  if(res.code===1){
                      this.imgs.splice(index,1)
                  }
              })
            },
            getinfo(e) {
                console.log(e.target.value);
                this.goods_id = e.target.value
            },
            drag(item, index) {

                this.draged.item = item;
                this.draged.index = index
            },
            drop(item, index) {
                this.droped.item = item;
                this.droped.index = index;

                this.imgs[this.droped.index] = this.draged.item;
                this.imgs[this.draged.index] = this.droped.item;
                this.$forceUpdate()
            },
            allowDrop(ev) {
                ev.preventDefault();
            },
            submitImg() {
                $.ajax({
                    url: 'https://xxx.xxx.xxx/xxx/goods/createBanner',
                    type: 'post',
                    data: {
                        goods_id: this.goods_id,
                        img: this.uploadedImage
                    },
                    success: (res) => {
                        // if (res.code==1){
                        this.$message.info(res.msg);
                        this.getList()
                        // }
                    }
                })
            },
            getfile(el) {
                this.upload({
                    el: el,
                    callback: (responent, fileName, date) => {
                        this.uploadedImage = "https://cdn.vvc.tw/" + responent.dir + fileName + "_" + date + ".jpg";
                    }
                });
            },
            upload: function (option) {
                var getUrl = option.getUrl ? option.getUrl : "https://xxx.xxx.xxx/xxx/index/getoss";
                var postUrl = option.postUrl ? option.postUrl : "https://cdn.vvc.tw";
                var fileName = option.fileType ? option.fileType : 'vvc';
                $.ajax({
                    url: getUrl,
                    type: "get",
                    data: {
                        type: 2,
                    },
                    success: (res) => {
                        var responent = res.data;
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
                            success: (res) => {

                                option.callback(responent, fileName, date);
                                // this.uploadedImage = "https://cdn.vvc.tw/" + responent.dir + fileName + "_" + date + ".jpg";

                            }
                        })
                    }
                });
            },
            getList() {

                this.axios.post('https://xxx.xxx.xxx/xxx/goods/bannerList').then(res => {
                    console.log(res);
                    if (res.data.code === 1) {
                        this.imgs = res.data.data

                    }
                })

            },

        }
    }
</script>

<style scoped>

    ul {
        list-style: none;
        display: flex;
        width: 100%;
    }

    .banner-list {
        position: relative;
        width: 300px;
        padding: 30px;
        text-align: center;
        box-sizing: border-box;
    }

    .banner-list .cancel {
        display: block;
        position: absolute;
        right: 15px;
        top: 15px;
        width: 25px;
        height: 25px;
        border: 1px solid #000;
        line-height: 18px;
        color: #000;
        font-size: 30px;
        border-radius:50%;
        background-color: #fff;
        cursor:pointer;
        text-align: center;
        vertical-align: middle;
    }
    .cancel:hover{
        border-color:#bbb;
        color:#bbb
    }
    .banner-list img {
        width: 100%;
    }
</style>
