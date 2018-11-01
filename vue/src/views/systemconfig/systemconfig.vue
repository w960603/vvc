<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <div class="col-md-12 pd15">
                    <p class="col-md-1">ip地址白名单:
                    </p>
                    <a-switch checkedChildren="开" unCheckedChildren="关" v-model="ipIsStatus" @change="changeStatus('ipIsStatus',$event)"></a-switch>
                </div>
                <div class="col-md-12 pd15">
                    <p class="col-md-1">商品发货下单比例:
                    </p>
                    <a-switch checkedChildren="开" unCheckedChildren="关"  v-model="isGoodsRatioStatus" @change="changeStatus('isGoodsRatioStatus',$event)"></a-switch>
                </div>
                <div class="col-md-12 pd15">
                    <p class="col-md-1">授权地址验证:
                    </p>
                    <a-switch checkedChildren="开" unCheckedChildren="关"  v-model="isOrderStatus" @change="changeStatus('isOrderStatus',$event)"></a-switch>
                </div>
                <!--<div class="col-md-10">-->
                    <!--<ul>-->
                        <!--<li>-->
                            <!--<p class="col-md-2 col-md-offset-1"></p>-->
                            <!--<div class="col-md-6">-->
                                <!--<a-switch checkedChildren="开" unCheckedChildren="关" defaultChecked ></a-switch>-->
                            <!--</div>-->
                        <!--</li>-->
                    <!--</ul>-->
                <!--</div>-->
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "systemconfig",
        data(){
            return{
                ipIsStatus:false,
                isGoodsRatioStatus:false,
                isOrderStatus:false
            }
        },
        created(){
            this.getStatus('ipIsStatus');
            this.getStatus('isGoodsRatioStatus');
            this.getStatus('isOrderStatus');
        },
        methods:{
            getStatus(status){
                $.ajax({
                    url:'https://xxx.xxx.xxx/xxx/system/'+status,
                    type:'post',
                }).then(res=>{
                    this[status]=res.data
                })
            },
            changeStatus(e,v){
                console.log(e,v);
                $.ajax({
                    url:'https://xxx.xxx.xxx/xxx/system/'+e,
                    type:'post',
                    data:{
                        type:v?1:2
                    }
                }).then(res=>{
                    this.$message.info(res.msg)
                })
            },

        }
    }
</script>

<style scoped>

</style>
