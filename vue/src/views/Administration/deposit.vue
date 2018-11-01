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
                        <tr v-for="(list,index) in delList">
                            <td v-for="col in title">
                                {{list[col.en]}}
                            </td>
                            <td>
                                <a-button type="primary" @click="showModal(list.id,index)">同意</a-button>

                                <a-button type="danger">拒绝</a-button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <a-modal
                        title="Title"
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
                        cn: 'id',
                        en: 'id',
                    },
                    {
                        cn: '昵称',
                        en: 'knick_name',
                    },
                    {
                        cn: '用户名',
                        en: 'kusername',
                    },
                    {
                        cn: '上级代理',
                        en: 'nick_name',
                    },
                    {
                        cn: '开卡时间',
                        en: 'time',
                    },
                    {
                        cn: '提交时间',
                        en: 'deltime',
                    },
                ],
                delList: [],
                ModalText: '请确认是否同意退还押金',
                visible: false,
                confirmLoading: false,

                id: null,
                index: null,
            }
        },
        created() {
            this.request()
        },
        methods: {
            request() {

                $.ajax({
                    url: 'https://api.vvc.tw/suc/order/delCodeList',
                    type: 'post',
                    success: res => {
                        console.log(res);
                        this.delList = res.data;
                    }
                })
            },
            agree(data, callback) {
                $.ajax({
                    url: 'https://api.vvc.tw/suc/order/delCode',
                    type: 'post',
                    data: data,
                    success: res => {
                        console.log(res);
                        if (res.code == 1) {

                            this.delList.splice(this.index, 1);
                        }
                        callback && callback(res)
                    }
                })
            },
            showModal(id, index) {
                this.visible = true;
                this.id = id;
                this.index = index;
                console.log(this.id);
            },
            handleOk() {
                console.log(this.id);
                this.confirmLoading = true;
                this.visible = false;

                this.agree({id: this.id}, (res) => {

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
