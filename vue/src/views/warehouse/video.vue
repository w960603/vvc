<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-8 bd col-md-offset-2 ">
                <div class="col-md-8 bd col-md-offset-2 ">
                    <h3 class="h3">视频</h3>
                    <div class="col-md-12">
                        <ul>
                            <li class="banner-list" v-for="(item,val,index) in imgs">
                                <span class="cancel" @click="delBanner(val,index)">&times;</span>
                                <video :src="val" controls="controls"></video>
                                <p>状态:{{item?'使用中':"未使用"}}</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-8 bd col-md-offset-2 ">
                    <h5 class="h4 bold">视频</h5>
                    <div class="col-md-12">
                        <video :src="uploadedImage" width="300"
                               style="min-width:300px;min-height:150px;max-width:300px; border:1px solid #ddd"
                               controls="controls"
                        >
                        </video>
                        <div class="col-md-12 pd15">
                            <label for="upload-img2" class=" btn btn-primary">选择视频</label>
                            <input id="upload-img2" type="file" accept="video/mp4" style="display: none;">
                            <button class="btn btn-primary" @click="getfile('#upload-img2','uploadedImage')">上传并预览
                            </button>
                            <button class="btn btn-primary" @click="submitImg">提交保存</button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
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
            this.myclick();
            console.dir({})
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
            delBanner(url) {
                $.ajax({
                    url: 'https://xxx.xxx.xxx/xxx/index/delVideo',
                    type: 'post',
                    data: {
                        url
                    }
                }).then(res => {
                    console.log(res);
                    this.$message.info(res.msg);
                    if (res.code === 1) {
                        Vue.delete(this.imgs,url)
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
                if (this.uploadedImage)
                    $.ajax({
                        url: 'https://xxx.xxx.xxx/xxx/index/createVideo',
                        type: 'post',
                        data: {
                            type: 1,
                            url: this.uploadedImage
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
                        this.uploadedImage = "https://cdn.vvc.tw/" + responent.dir + fileName + "_" + date + ".mp4";
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
                        type: 4,
                    },
                    success: (res) => {
                        var responent = res.data;
                        var file = option.el ? $(option.el)[0].files[0] : option.imagePath;
                        var date = new Date().getTime();
                        var datas = new FormData();
                        datas.set('policy', responent.policy);
                        datas.set('OSSAccessKeyId', responent.accessid);
                        datas.set('Signature', responent.signature);
                        datas.set('key', responent.dir + fileName + "_" + date + ".mp4");
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
                this.axios.post('https://xxx.xxx.xxx/xxx/index/videoList').then(res => {
                    console.log(res);
                    if (res.data.code === 1) {
                        this.imgs = res.data.data.list
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
        border-radius: 50%;
        background-color: #fff;
        cursor: pointer;
        text-align: center;
        vertical-align: middle;
    }

    .cancel:hover {
        border-color: #bbb;
        color: #bbb
    }

    .banner-list video {
        width: 100%;
    }
</style>
