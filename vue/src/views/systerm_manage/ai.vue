<template>
    <div class="container box" style="padding:20px">
        <div class="row">
            <div class="title h2 col-md-7 text-center">人脸注册</div>
            <form action="http://api.vvc.tw/bil/ai.html" class="form col-md-12">
                <div class="form-group username col-md-12">
                    <label class="col-md-1">用户名：</label>
                    <div class="col-md-6">
                        <input type="text" id="name" class="form-control" v-model="nick_name" @input="search">
                    </div>

                </div>
                <div class="col-md-12 list" v-if="search_list.length">
                    <ul id="ul" class="list-group col-md-6 col-md-offset-1" style="background-color: #fff;">
                        <li v-for="item in search_list" @click="dealclick(item)" class="list-group-item" v-if="!!item">
                            nick_name: {{item.nick_name||'wu'}}
                            -- username: {{item.username||'wu'}} -- phone: {{item.phone||'wu'}}
                        </li>
                    </ul>
                </div>
                <div class="form-group col-md-12">
                    <label class="col-md-1">手机号：</label>
                    <div class="col-md-6">
                        <input type="text" id="phone" class="form-control" v-model="phone">
                    </div>

                </div>
                <div class="form-group col-md-12">

                    <label class="col-md-1">图片: </label>
                    <div class="col-md-6">
                        <input type="text" id="img" class="form-control" name="image" v-model="img">
                    </div>
                </div>
                <div class="form-group">

                    <input id="file" type="file" name="file">
                </div>
            </form>
            <div class="btn-group col-md-12   ">
                <button id="button" class="btn btn-primary">上传</button>

                <button class="btn btn-primary" id="save" @click="save">保存手机号</button>
                <button class="btn btn-primary" id="save2" @click="save2">注册人脸头像</button>
            </div>

        </div>

    </div>

</template>

<script>
    export default {
        name: "ai",
        data() {
            return {
                nick_name: '',
                username: '',
                phone: '',
                search_list: [],
                id: '',

                img: ''
            }
        },
        mounted() {

        },
        methods: {
            upload: function (option) {
                var getUrl = option.getUrl ? option.getUrl : "https://api.vvc.tw/dlxin/index/getoss";
                var postUrl = option.postUrl ? option.postUrl : "https://cdn.vvc.tw";

                var fileName = option.fileType ? option.fileType : 'vvc';
                $.ajax({
                    url: getUrl,
                    type: "get",
                    success: (res) => {
                        console.log(res);
                        var responent = JSON.parse(res);
                        var file = option.el ? $(option.el)[0].files[0] : option.imagePath;
                        var date = new Date().getTime();
                        var datas = new FormData();
                        datas.set('policy', responent.policy);
                        datas.set('OSSAccessKeyId', responent.accessid);
                        datas.set('Signature', responent.signature);
                        datas.set('key', responent.dir + fileName + "_" + date + "_" + responent.timestamp + ".jpg");
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
                            success: function () {
                                console.log("https://cdn.vvc.tw/" + responent.dir + fileName + "_" + date + '_' + responent.timestamp + ".jpg");
                                this.img = "https://cdn.vvc.tw/" + responent.dir + fileName + "_" + date + '_' + responent.timestamp + ".jpg";

                            }
                        })
                    }
                });
            },
            search() {
                if (!this.nick_name) {
                    return this.search_list = []
                }
                $.ajax({
                    url: 'https://api.vvc.tw/dlxin/Userloginshezhiedit/userinfo',
                    type: 'get',
                    data: {name: this.nick_name},
                    dataType: 'json',
                    success: (data) => {
                        this.search_list = [];
                        if (data.code === 1 && data.data.length) {
                            console.log(data);

                            for (let i = 0; i < 10; i++) {
                                this.search_list.push(data.data[i])
                            }
                        }
                    }
                })
            },
            dealclick(item) {
                this.phone = item.phone || '';
                this.nick_name = item.nick_name || '';
                this.username = item.username || '';
                this.id = item.id || '';
                this.search_list = [] || '';
            },
            save() {
                var id = this.id;
                var phone = this.phone;
                $.ajax({
                    url: '/dlxin/Userloginshezhiedit/useredit',
                    data: {id: id, phone: phone},
                    type: 'post',
                    dataType: "json",
                    success: function (data) {
                        alert(data.msg)
                    }
                })
            },
            save2() {
                var id = this.id;
                var img = this.img;
                $.ajax({
                    url: '/dlxin/Userloginshezhiedit/userai',
                    data: {id: id, image: img},
                    type: 'post',
                    dataType: "json",
                    success: function (data) {
                        alert(data.msg)
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .username {
        position: relative;
    }

    .list {
        position: relative;
        z-index: 10;
    }

    .list ul {
        position: absolute;
    }
    .box{
        min-height:500px;
    }
</style>
