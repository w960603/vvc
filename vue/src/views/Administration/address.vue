<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class=" col-md-10 col-md-offset-1">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th v-for="col in title">{{col.cn}}</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(list,index) in datas">
                            <td v-for="col in title">
                                {{list[col.en]}}
                            </td>
                            <td>
                                <a-button type="primary" @click="showModal(list.id,index,1)">同意</a-button>

                                <a-button type="danger" @click="showModal(list.id,index,2)">拒绝</a-button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <a-modal
                        title="地址认证"
                        :visible="visible"
                        @ok="handleOk"
                        :confirmLoading="confirmLoading"
                        @cancel="handleCancel"
                    >
                        <p>{{ModalText}}</p>
                    </a-modal>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "deposit",
        data() {
            return {
                title: [
                    {
                        cn: '用户名',
                        en: 'username',
                    },
                    {
                        cn: '收件人',
                        en: 'name',
                    },
                    {
                        cn: '地址',
                        en: 'full_address',
                    },
                    {
                        cn: '手机号',
                        en: 'phone',
                    },
                    {
                        cn: '提交时间',
                        en: 'time',
                    },
                ],
                datas: [],
                ModalText: '请确认是否认证该地址',
                visible: false,
                confirmLoading: false,

                id: null,
                index: null,
                status:null
            }
        },
        created() {
            this.request()
        },
        methods: {
            request() {

                $.ajax({
                    url: 'https://api.vvc.tw/suc/user/userAddressCode',
                    type: 'post',
                    success: res => {
                        console.log(res);
                        this.datas = res.data;
                    }
                })
            },
            agree(data, callback) {

                $.ajax({
                    url: 'https://api.vvc.tw/suc/user/addressCode',
                    type: 'post',
                    data: data,
                    success: res => {
                        console.log(res);
                        if (res.code == 1) {

                            this.datas.splice(this.index, 1);
                        }
                        callback && callback(res)
                    }
                })
            },
            showModal(id, index,status) {
                this.visible = true;
                this.id = id;
                this.index = index;
                this.status = status;
                console.log(this.id);
            },
            handleOk() {
                console.log(this.id);
                this.confirmLoading = true;
                this.visible = false;

                this.agree({id: this.id,status:this.status}, (res) => {

                    this.confirmLoading = false;
                    this.$message.info(res.msg, 5);
                })

            },
            handleCancel(e) {
                console.log('Clicked cancel button');
                this.visible = false
            },
        }
    }
</script>

<style scoped>
    .table th,.table td{
    text-align: center;
    vertical-align: middle;
    }
</style>
