<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-10 pd20 col-md-offset-1">
                <button class="btn btn-primary" @click="addnew">
                    添加
                </button>
            </div>
            <div class="col-md-10 col-md-offset-1">
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th v-for="col in title">
                            {{col.cn}}
                        </th>
                        <th>
                            操作
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(row,index) in list">
                        <td v-for="col in title">
                            <template v-if="col.en==='img_url'">
                                <img class="img" :src="row.img_url" alt="">
                            </template>
                            <template v-else-if="col.en==='status'">
                                {{row.status==='1'?"正常":"停用"}}
                            </template>
                            <template v-else>
                                {{row[col.en]}}
                            </template>
                        </td>
                        <td>
                            <button class="btn btn-primary " @click="modify(row,index)">
                                编辑
                            </button>
                            <button class="btn btn-danger" @click="del(row.id,index)">
                                删除
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="overlay container-fluid" v-show="isactive">
                <div class="col-md-4 col-md-offset-4 con">
                    <h4>添加|修改</h4>
                    <hr>
                    <div class="row clear-fix">
                        <div class="form-group col-md-8 col-md-offset-2">
                            <div>头像</div>
                            <img :src="newAdmin.img_url" width="100"
                                 style="min-width:100px;min-height:50px;max-width:100px; border:1px solid #ddd"
                                 alt="预览图">
                            <label for="upload-img2" class=" btn btn-primary">选择图片</label>
                            <input id="upload-img2" type="file" @change="uploadImg" style="display: none;">
                        </div>
                        <div class="form-group col-md-8 col-md-offset-2">
                            <label>用户名</label>
                            <input type="text"
                                   v-model="newAdmin.username"
                                   class="form-control"
                            >
                        </div>
                        <div class="form-group col-md-8 col-md-offset-2">
                            <label>密码</label>
                            <input type="text"
                                   v-model="newAdmin.password"
                                   class="form-control"
                            >
                        </div>
                        <div class="form-group col-md-8 col-md-offset-2">
                            <label>手机号</label>
                            <input type="text"
                                   v-model="newAdmin.phone"
                                   class="form-control"
                            >
                        </div>
                        <div class="form-group col-md-8 col-md-offset-2">
                            <label>状态</label>
                            <a-switch checkedChildren="开" unCheckedChildren="关" v-model="defaultChecked"
                                      @change="change"></a-switch>
                        </div>
                        <div class=" col-md-3 pull-right ">
                            <button class="btn btn-danger" @click="cancel">取消</button>
                            <button class="btn btn-primary" @click="submit()">提交</button>
                        </div>
                    </div>
                </div>
            </div>
            <a-modal
                title="删除管理员"
                :visible="visible"
                @ok="operate"
                @cancel="cancel"
            >
                <p>你确定删除该管理员吗?</p>
            </a-modal>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title: [
                    {
                        cn: '头像',
                        en: 'img_url'
                    },
                    {
                        cn: '用户名',
                        en: 'username'
                    },
                    {
                        cn: '密码',
                        en: 'password'
                    },
                    {
                        cn: '手机号',
                        en: 'phone'
                    },
                    {
                        cn: '状态',
                        en: 'status'
                    },
                    {
                        cn: '创建时间',
                        en: 'create_time'
                    },
                ],
                list: [],
                isactive: false,
                ismodify: false,
                uploadedImage: '',
                visible: false,

                index: 0,
                newAdmin: {
                    img_url: '',
                },

                defaultChecked: false,

                id: null,
            }
        },
        created() {
            this.getList();
        },
        methods: {
            uploadImg(e) {
                let File = e.target.files[0];
                this.newAdmin.img_url = URL.createObjectURL(File)
            },
            getList() {
                $.ajax({
                    url: 'https://api.vvc.tw/suc/admin/adminList',
                    type: 'post',
                }).then(res => {
                    if (res.code === 1)
                        this.list = res.data.list;
                })
            },
            change(e) {
                console.log(e);
                if (e) {
                    this.newAdmin.status = '1'
                } else {
                    this.newAdmin.status = '0'
                }
            },
            del(id, index) {
                this.id = id;
                this.index = index;
                this.visible = true
            },
            operate() {
                $.ajax({
                    url: 'https://api.vvc.tw/suc/admin/delAdmin',
                    type: 'post',
                    data: {
                        id: this.id
                    }
                }).then(res => {
                    if (res.code === 1) {
                        this.list.splice(this.index, 1)
                    }
                    this.visible = false;
                    this.$message.info(res.msg)
                })
            },
            addnew() {
                this.isactive = true;
                this.ismodify = false
            },
            modify(item, index) {
                console.log({...item}, item);
                this.newAdmin = {...item};
                this.defaultChecked = this.newAdmin.status === '1';
                this.index = index;
                this.isactive = true;
                this.ismodify = true
            },

            cancel() {
                this.visible = false;
                this.isactive = false;
                this.newAdmin = {
                    img_url: '',
                };
            },
            submit() {
                let url;
                if (this.ismodify) {
                    url = 'updateAdmin'
                } else {
                    url = 'createAdmin'
                }
                $.ajax({
                    url: 'https://api.vvc.tw/suc/admin/' + url,
                    type: 'post',
                    data: this.newAdmin
                }).then(res => {
                    if (res.code === 1) {
                        if (this.ismodify) {
                            this.list[this.index] = this.newAdmin
                        } else {
                            this.getList()
                        }
                        this.$message.info(res.msg)
                        this.cancel()
                    }
                })
            },
        },
    }
</script>

<style scoped>
    .img {
        width: 50px;
    }
.pd20{
    padding-top:20px;
    padding-bottom:20px;
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

    .overlay td:first-child {
        width: 66px;
    }

    .overlay .con {
        position: absolute;
        top: 25%;
        min-height: 450px;
        background: #fff;
        padding: 15px;
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
