<template>
    <div id="app">
        <div class="container">
            <div class="row m-15">
                <div class="col-md-4">
                    <h4 class="bold ">{{items.title}}</h4>
                    <img :src="items.img" alt="商品图" width="200">
                </div>
                <div class="col-md-6">
                    <h5 class="h4 bold">价格表</h5>
                    <div class="img-thumbnail">
                        <img :src="items.priceimage" width="300" class="" style="min-width:300px;min-height:200px;"
                             alt="价格表">
                    </div>
                </div>
            </div>
            <div class="row">
                <form class="form col-md-6 bd">
                    <h5 class="h4 bold">商品参数</h5>
                    <div class="form-group" style="padding-bottom:10px">
                        <label class="col-md-2 h5">商品编码:</label>
                        <div class="col-md-10">
                            <select class="form-control" @change="getinfo($event)">
                                <option selected v-for="item in couponList" :value="item.id">{{item.title}}{{item.id}}
                                </option>
                            </select>
                        </div>
                    </div>
                    <ul class="form-group" style="padding-top:20px ; list-style: none">
                        <li style=" box-sizing:border-box ; display: flex " v-for="item in items.canshu">
                            <input type="text" class="input " v-model="item[0]">
                            <input type="text" class="input " v-model="item[1]">
                        </li>
                    </ul>
                    <div>
                        <button @click="addNewTodo" class="btn btn-info">增加</button>
                    </div>
                    <div class="img-thumbnail m-15">
                        <img :src="items.priceimage?items.priceimage:''" style="min-width:300px;min-height:200px"
                             width="300" height="200" alt="价格表">
                    </div>
                    <div>
                        <label for="upload-file" class=" btn btn-primary">选择图片</label>
                        <input id="upload-file" type="file" style="display: none;">
                        <button class="btn btn-primary" @click="getPrice('#upload-file')">上传并预览</button>
                    </div>
                    <a-button type="primary" class="center-block m-15" @click="post">提交保存</a-button>
                </form>
                <div class="col-md-6 bd ">
                    <h5 class="h4 bold">商品详情</h5>
                    <div>
                        <img :src="uploadedImage" width="50" height="50"
                             style="min-width:50px;min-height:50px ;max-width:50px;max-height:50px; border:1px solid #ddd"
                             alt="预览图">
                        <label for="upload-img2" class=" btn btn-primary">选择图片</label>
                        <input id="upload-img2" type="file" style="display: none;">
                        <button class="btn btn-primary" @click="getfile('#upload-img2','uploadedImage')">上传并预览
                        </button>
                        <button class="btn btn-primary" @click="addImg('imgs','uploadedImage')">添加到下面</button>
                    </div>
                    <div class="col-md-12 m-15" style="background-color: #eee;">

                        <ul style="max-height:800px;min-height:400px;overflow: auto;width:100%;">
                            <li class="drag" style="height:300px; font-size: 0;" v-for="(arr,index) in dragImg"
                                :key="index">
                                <img draggable="true"
                                     @dragstart.stop="drag(arr,index)"
                                     :data-img="arr"
                                     class="draged-img"
                                     @dragover="allowDrop"
                                     @drop="drop(arr,index)"
                                     style="height: 100%" :src="arr" alt=""
                                     :index="arr.index">
                            </li>
                        </ul>
                    </div>

                    <!--<button >提交保存</button>-->
                    <a-button type="primary" class="center-block m-15" @click="submitImg('updateImg','imgs')">提交保存
                    </a-button>
                </div>


            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "modify_sku",
        data() {
            return {
                parentMessage: 'Parent',
                couponList: [],
                couponSelected: "",
                isshow: false,
                uploadedImage: 111,

                items: {
                    goodid: 642,
                    title: '',
                    img: null,
                    canshu: [
                        ["商品编号",],
                        ["", ""],
                        ["", ""],
                        ["", ""],
                        ["", ""]
                    ],
                    "priceimage": null,
                },
                itemss: {
                    canshu: [
                        ["商品编号", ' '],
                        ["", ' '],
                        ["", ' '],
                        ["", ''],
                        ["", '']
                    ],
                },
                ids: 642,
                priceimage: null,
                imgs: [],
                draged: {
                    item: null,
                    index: null
                },
                droped: {
                    item: null,
                    index: null
                }
            }
        },
        created() {
            this.myclick();
            this.getinfo(642);
        },

        computed: {
            dragImg() {
                return this.imgs
            },
        },
        methods: {
            addImg(dad, son) {
                this[dad].push(this[son])
            },
            drag(arr, index) {
                this.draged.item = arr;
                this.draged.index = index
            },
            drop(arr, index) {
                this.droped.item = arr;
                this.droped.index = index;

                this.imgs[this.droped.index] = this.draged.item;
                this.imgs[this.draged.index] = this.droped.item;
                this.$forceUpdate()
            },
            allowDrop(ev) {
                ev.preventDefault();
            },

            dis_none() {
                this.isshow = false;
            },
            myclick() {
                $.ajax({
                    type: "post",
                    url: "https://api.vvc.tw/suc/goods/goodsDetail",
                    success: (res) => {
                        this.couponList = res.data;
                    }
                });
            },
            addNewTodo: function () {
                this.items.canshu.push(["", ""])
            },
            post: function () {
                $.ajax({
                    url: 'https://api.vvc.tw/suc/goods/orderDetail/?id=' + this.items.goodid,
                    type: 'post',
                    data: {
                        data: JSON.stringify(this.items)
                    },
                    success: (res) => {
                        if (res.code === 1) {
                            this.$message.info("更新成功");
                        } else {
                            this.$mssage.info('更新失败')
                        }
                    }
                })
            },
            submitImg(url, arr) {
                $.ajax({
                    url: 'https://api.vvc.tw/suc/goods/' + url,
                    type: 'post',
                    data: {
                        id: this.ids,
                        data: JSON.stringify(this[arr])
                    },
                    success: (res) => {
                        // if (res.code==1){
                        this.$message.info(res.msg);
                        // }
                    }
                })
            },
            getinfo(e) {
                this.ids = e.path ? e.path[0].value : e;
                this.items.goodid = this.ids;
                $.ajax({
                    type: "post",
                    url: 'https://api.vvc.tw/suc/goods/getDetail/?id=' + this.ids,
                    success: (resp) => {
                        if (resp.code === 0) {
                            this.items.canshu = this.itemss.canshu;
                            this.items.priceimage = null;
                            this.isshow = true;
                        } else {
                            this.items = resp.data;
                            this.isshow = false;
                        }
                        $.ajax({
                            type: "post",
                            url: "https://api.vvc.tw/suc/goods/good",
                            data: {
                                id: this.ids,
                            },
                            success: (res) => {
                                if (res.code === 1) {
                                    this.items.img = res.data[0].img ? res.data[0].img : null;
                                    this.items.title = res.data[0].title ? res.data[0].title : null;

                                    const content = res.data[0].content;

                                    this.imgs = [];

                                    this.imgs = res.data[0].content ? res.data[0].content : []
                                } else {
                                    this.items.img = null;
                                    this.items.title = null;
                                    this.imgs = []
                                }
                            }
                        })
                    }
                });

            },
            change: function (e) {
                Vue.set(this.items.canshu[0], 1, this.items.goodid);
            },
            getPrice(el) {
                this.upload(
                    {
                        el: el,
                        callback: (responent, fileName, date) => {
                            this.items.priceimage = "https://cdn.vvc.tw/" + responent.dir + fileName + "_" + date + ".jpg";
                        }
                    });
            },
            getfile(el, target) {
                this.upload(
                    {
                        el: el,
                        callback: (responent, fileName, date) => {
                            this[target] = "https://cdn.vvc.tw/" + responent.dir + fileName + "_" + date + ".jpg";
                        }
                    });
            },
            upload(option) {
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
                                // this.items.priceimage = "https://cdn.vvc.tw/" + responent.dir + fileName + "_" + date + ".jpg";

                            }
                        })
                    }
                });

            }
        }
    }
</script>

<style scoped>
    html {
        height: 92.5%;
    }

    body {
        height: 100%;
    }

    .bold {
        font-weight: bold;
    }

    .m-15 {
        margin: 15px auto
    }

    .bd {
        border: 1px solid #ddd;
    }

    .center-block {
        display: block;
        margin-left: auto;
        margin-right: auto;
    }

    #app {
        width: 93%;
        min-height: 100%;
        background: white;
        padding: 0 30px;

        /*align-items: center;*/
    }

    .input {

        line-height: 30px;
        padding-left: 1em;
        width: 50%;
        border-radius: 2px;
        border: 1px solid #ddd;
        box-sizing: border-box;
    }

    .list_ordername label {
        color: #2e2d3c;
        line-height: 30px;
        font-size: 16px;
        margin-right: 10px;
        /*position: relative;*/
    }

    .list_ordername input {
        width: 300px;
        line-height: 28px;
        border: 1px #c2c2c2 solid;
        border-radius: 2px;
        padding-left: 10px;
    }

    .list_ordername button {
        width: 60px;
        line-height: 30px;
        border: none;
        background: #0092fb;
        color: white;
        font-size: 14px;
        vertical-align: middle;
    }

    .box ul {
        list-style: none;
        overflow: hidden;

        padding: 0;
        margin: 0;
    }

    .drag {
        /*border: #A8A8A8 solid 0.5px;*/
        border-width: 0 0 1px 0;
        text-align: center;
    }

    .box ul li a {
        display: block;
        text-decoration: none;
        padding: 10px 25px;
    }

    .drag-dash {
        position: absolute;
        width: 100%;
        /*border: #000 solid 1px;*/
        background: #ececec;
        text-align: center;
    }

    .dash {
        width: 100%;
        border: 1px solid transparent;
    }
</style>
