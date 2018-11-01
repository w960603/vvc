<template>
    <div class="container-fluid box" style="padding:20px">
        <div class="row">
            <div class="title h2 col-md-7 text-center">人脸注册</div>
            <form action="http://xxx.xxx.xxx/xxx/ai.html" class="form col-md-12">

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
                    <img class="ai_img" :src="img" alt="">
                </div>
            </form>
            <div class="btn-group col-md-12   ">
                <button id="button" class="btn btn-primary" @click='upload({el:"#file"})'>上传</button>

                <button class="btn btn-primary" id="save" @click="save">保存手机号</button>
                <button class="btn btn-primary" id="save2" @click="save2">注册人脸头像</button>
            </div>

        </div>

    </div>

</template>

<script>
    export default {
        name: "ai",
        props: ['id'],
        data() {
            return {
                nick_name: '',
                username: '',
                phone: '',
                search_list: [],

                img: ''
            }
        },
        mounted() {

        },
        methods: {
            upload: function (option) {
                var getUrl = option.getUrl ? option.getUrl : "https://xxx.xxx.xxx/xxx/index/getoss";
                var postUrl = option.postUrl ? option.postUrl : "https://oss1.vvc.tw";

                var fileName = option.fileType ? option.fileType : 'vvc';
                $.ajax({
                    url: getUrl,
                    type: "get",
                    success: (res) => {
                        console.log(res);
                        var responent = res.data;
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
                            success: () => {
                                this.img = "https://cdn.vvc.tw/" + responent.dir + fileName + "_" + date + '_' + responent.timestamp + ".jpg";
                                console.log(this.img)
                            }
                        })
                    }
                });
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
                    url: 'https://xxx.xxx.xxx/xxx/Userloginshezhiedit/useredit',
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
                    url: 'https://xxx.xxx.xxx/xxx/Userloginshezhiedit/userai',
                    data: {id: id, image: img},
                    type: 'post',
                    dataType: "json",
                    success: (data) => {
                        this.$message.info(data.msg);
                        if (data.code === 1) {
                            this.$emit('ai_register')
                        }
                    }
                })
            }
        }
    }
</script>

<style scoped>

    .list ul {
        position: absolute;
    }

    .box {
        min-height: 350px;
    }
    .ai_img{
        width:300px;
    }
</style>
