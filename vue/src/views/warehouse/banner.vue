<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-8 bd col-md-offset-2 ">
                <h5 class="h4 bold">商品详情</h5>
                <div>
                    <img :src="uploadedImage" width="50" height="50"
                         style="min-width:50px;min-height:50px ;max-width:50px;max-height:50px; border:1px solid #ddd"
                         alt="预览图">
                    <label for="upload-img2" class=" btn btn-primary">选择图片</label>
                    <input id="upload-img2" type="file" style="display: none;">
                    <button class="btn btn-primary" @click="getfile('#upload-img2','this.uploadedImage')">上传并预览
                    </button>
                    <button class="btn btn-primary" @click="addImg">添加到下面</button>
                </div>
                <div class="col-md-12 m-15" style="background-color: #eee;">

                    <ul style="max-height:800px;min-height:400px;overflow: auto;width:100%;display:flex">
                        <li class="drag" style="width:300px; font-size: 0;" v-for="(item,index) in dragImg"
                            :key="index">
                            <input type="text" class="form-control">
                            <img draggable="true"
                                 @dragstart.stop="drag(item,index)"
                                 :data-img="item"
                                 class="draged-img"
                                 @dragover="allowDrop"
                                 @drop="drop(item,index)"
                                 style="width:100%;" :src="item" alt=""
                                 :index="item.index"/>
                        </li>
                    </ul>

                </div>
                <!--<button >提交保存</button>-->
                <a-button type="primary" class="center-block m-15" @click="submitImg">提交保存</a-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "banner",
        data() {
            return {
                uploadedImage: 111,
                imgs: [],
                draged: {},
                droped: {},

                bannerList: [],
            }
        },
        computed: {
            dragImg() {
                return this.imgs
            }
        },
        created() {
            this.getList()
        },
        methods: {
            addImg() {
                this.imgs.push(this.uploadedImage)
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
                    url: 'https://api.vvc.tw/suc/goods/createBanner',
                    type: 'post',
                    data: {
                        img: JSON.stringify(this.imgs)
                    },
                    success: (res) => {
                        // if (res.code==1){
                        this.$message.info(res.msg);
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
                var getUrl = option.getUrl ? option.getUrl : "https://api.vvc.tw/dlxin/index/getoss";
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
                this.axios.post('https://api.vvc.tw/suc/goods/bannerList').then(res => {
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

    .m-15 {
        margin: 15px auto
    }

</style>
