<template>
    <div class="overlay " v-show="isactive">
        <div class="con container-fluid">

            <h4>修改</h4>
            <hr>
            <div class="row clear-fix">
                <div class="form-group col-md-6"><label>商品名字</label><input type="text" v-model="modifylist.title"
                                                                           class="form-control"></div>
                <div class="form-group col-md-6"><label>商品排序</label><input type="text" v-model="modifylist.displayorder"
                                                                           class="form-control"></div>

                <div class="form-group col-md-6"><label>董事价格</label><input type="text" v-model="modifylist.mon1"
                                                                           class="form-control"></div>
                <div class="form-group col-md-6"><label>女神价格</label><input type="text" v-model="modifylist.mon2"
                                                                           class="form-control"></div>
                <div class="form-group col-md-6"><label>仙女价格</label><input type="text" v-model="modifylist.mon3"
                                                                           class="form-control"></div>
                <div class="form-group col-md-6"><label>天使价格</label><input type="text" v-model="modifylist.mon4"
                                                                           class="form-control"></div>
                <div class="form-group m-auto col-md-12">
                    <img style="width: 50px;height: 50px;" :src="modifylist.image_url" alt="" class="img-thumbnail ">
                    <label class="add-img btn btn-primary" for="img">
                        添加文件
                    </label>
                    <input id="img" type="file" @change="wfrfile()" style="display:none">
                </div>
                <div class=" col-md-3 pull-right ">
                    <button class="btn btn-danger" @click="cancel">取消</button>
                    <button class="btn btn-primary" @click="save">提交</button>
                </div>
            </div>


        </div>
    </div>
</template>

<script>
    export default {
        name: "model",
        props: ['list', 'isactive', "upload"],
        computed: {
            modifylist() {
                return this.list;
            }
        },
        mounted() {
            console.log(this.list)
        },
        methods: {
            cancel() {
                this.$emit('cancel');
            },
            save() {
                this.$emit('save', this.modifylist);
            },
            wfrfile() {
                var aa = {
                    el: '#img'
                };
                this.upload(aa, this.modifylist);
            },
        }
    }
</script>

<style scoped>
    .center-block {
        display: block;
        margin: auto;
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
        width: 650px;
        min-height: 450px;
        background: #fff;
        padding: 15px;
        left: 29%;
        top: 15%;
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
</style>
