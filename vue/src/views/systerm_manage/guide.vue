<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <div class="col-md-10 pd20">
                    <button class="btn btn-primary" @click="addnew">
                        添加
                    </button>
                </div>
                <table class="table table table-bordered">
                    <colgroup>
                        <col width="100">
                        <col width="600">
                        <col width="100">
                        <col width="100">
                    </colgroup>
                    <thead>
                    <tr>
                        <th v-for="col in title">{{col.cn}}</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(row,index) in list" :key="index">
                        <td v-for="col in title">
                            <template v-if="col.en==='img'">
                                <template v-for="img in row.img">
                                    <img class="img" :src="img" alt="">
                                </template>
                            </template>
                            <template v-else>
                                {{row[col.en]}}
                            </template>
                        </td>
                        <td>
                            <button class="btn btn-primary" @click="modify(row)">
                                修改
                            </button>
                            <button class="btn btn-danger" @click="delguide(row,index)">
                                删除
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="overlay container-fluid" v-show="isactive">
            <div class="con container-fluid">
                <h4>新增|修改</h4>
                <hr>
                <div class="row clear-fix">
                    <div class="form-group col-md-6">
                        <label>路径</label>
                        <input type="text"
                               v-model="newList.url"
                               class="form-control"
                               placeholder="格式为:pages/xxx/xxx"
                        >
                    </div>
                    <div class="form-group col-md-6">
                        <label>数量</label>
                        <input type="text"
                               v-model="newList.num"
                               class="form-control"
                        >
                    </div>
                    <div class="form-group m-auto col-md-12">
                        <h4 class="h3">图片</h4>
                        <img :src="uploadedImage" width="100"
                             style="min-width:100px;min-height:50px;max-width:100px; border:1px solid #ddd"
                             alt="预览图">
                        <label for="upload-img2" class=" btn btn-primary">选择图片</label>
                        <input id="upload-img2" type="file" style="display: none;">
                        <button class="btn btn-primary" @click="getfile('#upload-img2','this.uploadedImage')">上传并预览
                        </button>
                        <button class="btn btn-primary" @click="submitImg">添加图片</button>
                        <ul class="img-list">
                            <li v-for="(img,index) in imgs" class="banner-list" style="position:relative">
                                <span class="cancel" @click="delImg(index)">&times;</span>
                                <img :src="img" alt="" style="width:100%;">
                            </li>
                        </ul>
                    </div>
                    <div class=" col-md-3 pull-right ">
                        <button class="btn btn-danger" @click="cancel">取消</button>
                        <button class="btn btn-primary" @click="save">提交</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "guide",
        data() {
            return {
                isactive: false,
                title: [
                    {
                        cn: '路径',
                        en: 'url'
                    },
                    {
                        cn: '图片',
                        en: 'img'
                    },
                    {
                        cn: '次数',
                        en: 'num'
                    },
                ],
                list: [],
                newList: {},
                imgs: [],
                uploadedImage: '',

                ismodify: false
            }
        },
        created() {
            this.request()
        },
        methods: {
            request() {
                this.axios.post('https://xxx.xxx.xxx/xxx/index/guideList').then(res => {
                    console.log(res);
                    if (res.data.code === 1) {
                        this.list = res.data.data.list
                    }
                })
            },
            delguide(item, index) {
                $.ajax({
                    url: 'https://xxx.xxx.xxx/xxx/index/delGuide',
                    type: 'post',
                    data: {
                        url: item.url
                    }
                }).then(res => {
                    if (res.code === 1) {
                        this.list.splice(index, 1);
                    }
                    this.$message.info(res.msg);
                })
            },
            modify(item) {
                this.newList = item;
                this.imgs = item.img;
                this.isactive = true;
                this.ismodify = true
            },
            addnew() {
                this.isactive = true;
                this.ismodify = false
            },
            cancel() {
                this.isactive = false;
                this.newList = {};
                this.imgs = [];
            },
            save() {
                $.ajax({
                    url: 'https://xxx.xxx.xxx/xxx/index/createGuide',
                    type: 'post',
                    data: {
                        url: this.newList.url,
                        num: this.newList.num,
                        img: JSON.stringify(this.imgs)
                    }
                }).then(res => {
                    console.log(res);
                    if (res.code === 1) {
                        if (!this.ismodify) {
                            this.list.push({
                                url: this.newList.url,
                                num: this.newList.num,
                                img: this.imgs
                            });
                        }
                        this.isactive = false;

                        this.newList = {};
                        this.imgs = [];
                    }
                })
            },
            delImg(index) {
                this.imgs.splice(index, 1)
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
            submitImg() {
                this.imgs.push(this.uploadedImage)
            },
            getfile(el) {
                this.upload({
                    el: el,
                    callback: (responent, fileName, date) => {
                        this.uploadedImage = "https://cdn.vvc.tw/" + responent.dir + fileName + "_" + date + ".jpg";
                    }
                });
            },
        }
    }
</script>

<style scoped>
    .img {
        padding: 0 5px;
        height: 150px
    }

    .pd20 {
        padding: 20px 0;
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

    .img-list {
        display: flex;
    }

    .overlay td:first-child {
        width: 66px;
    }

    .overlay .con {
        position: absolute;
        width: 80%;
        min-height: 450px;
        background: #fff;
        padding: 15px;
        left: 15%;
        top: 10%;
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

    .banner-list {
        position: relative;
        width: 300px;
        padding: 30px;
        text-align: center;
        box-sizing: border-box;
    }

    .cancel {
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
</style>
