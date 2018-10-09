  <template>
    <div id="app">
        <div class="jdsearch_heard">
            <div class="jdorder_title">京东订单搜索</div>
            <div class="search_tpye">
                <div style="flex: 3.5;">
                    <label for="" style="margin-right: 5px">订单号</label>
                    <input class="search_order_ipt"  v-model="val_ipt" type="text" placeholder="请输入订单号">
                    <button class="time_btn" @click="ordernum_serach">确认</button>
                </div>
            </div>
            <div class="search_tpye">
                <div>
                    <label for="" style="margin-right: 5px">选择时间</label>
                    <a-range-picker
                        :ranges="{ Today: [moment(), moment()] }"
                        @change="onChange"
                    />
                </div>
                <div style="margin-left: 20px">
                    <a-button type="primary" @click="ordertype_serach(3)">已发货</a-button>
                    <!--<button class="btn btn-success" @click="ordertype_serach(3)"></button>-->
                    <button class="btn btn-primary" @click="ordertype_serach(1)">未发货</button>
                    <button class="btn btn-danger" @click="ordertype_serach(2)">在途中</button>
                </div>
            </div>
        </div>
        <div class="jdsearch_table">
            <!--v-if="ordre_data != object"-->
            <table v-if="isshow">
                <colgroup>
                    <col width="150">
                    <col width="120">
                    <col width="120">
                    <col width="300">
                    <col width="300">
                    <col width="120">
                    <col width="150">
                    <col width="100">
                    <col width="100">
                    <col width="200">
                </colgroup>
                <thead>
                    <tr class="jdorder_heard">
                        <th v-for="item in order_title">{{item.name}}</th>
                    </tr>
                </thead>
                <tr class="jdorder_tr">
                    <td>{{ordre_data.orderId}}</td>
                    <td>{{ordre_data.consigneeInfo.fullname}}</td>
                    <td>{{ordre_data.consigneeInfo.mobile}}</td>
                    <td>{{ordre_data.consigneeInfo.fullAddress}}</td>
                    <td>{{ordre_data.itemInfoList[0].skuName}}</td>
                    <td>{{ordre_data.orderTotalPrice}}</td>
                    <td>{{ordre_data.modified}}</td>
                    <td>{{ordre_data.storeOrder}}</td>
                    <td></td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
    import moment from 'moment';
    import 'moment/locale/zh-cn';
    export default {
        name: "jdsearch",
        data(){
            return{
                orderlist:[],
                order_title:[
                    // {ordernum:"订单号"},
                    // {username:"用户名"},
                    // {phone:"手机号"},
                    // {address:"地址"},
                    // {ordersku:"商品sku"},
                    // {orderTotalPrice:"价格"},
                    // {time:"时间"},
                    // {remarks:"备注"},
                    {name:"订单号"},
                    {name:"用户名"},
                    {name:"手机号"},
                    {name:"地址"},
                    {name:"商品sku"},
                    {name:"价格"},
                    {name:"时间"},
                    {name:"发货位置"},
                    {name:"备注"},
                ],
                dateFormat: 'YYYY/MM/DD',
                monthFormat: 'YYYY/MM',
                start_time:"",
                end_time:"",
                val_ipt:null,
                ordre_data:{},
                isshow:false,
            }
        },
        created(){
        },
        methods: {
            moment,
            onChange(dates, dateStrings) {
                console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
                this.start_time = dateStrings[0];
                this.end_time = dateStrings[1];
            },
            //订单号搜索
            ordernum_serach(){
                console.log(this.val_ipt);
                var datas = {
                    id:this.val_ipt
                }
                this.jdorder_serach(datas);
            },
            //订单类型
            ordertype_serach(num){
                if (this.start_time != ""&&this.end_time != ""){
                    console.log(this.start_time,this.end_time);
                    var datas = {
                        type:num,
                        start_time:this.start_time+" 00:00:00",
                        end_time:this.end_time+" 00:00:00"
                    }
                    this.jdorder_serach(datas);
                }else{
                    this.$message.info('请输入时间');
                }
            },
            jdorder_serach(datas){
                // console.log(datas.hasOwnProperty('id'));
                if (datas.hasOwnProperty('id')){
                    $.ajax({
                                type:"post",
                        url:"https://jd.vvc.tw/index/search/searchorder",
                        data:datas,
                        success:(resp)=>{
                            if (resp.code == 1){
                                this.ordre_data = resp.res
                                this.isshow = true;
                                console.log(this.ordre_data);
                            }
                        }
                    })
                }else if (datas.hasOwnProperty('type')) {
                        $.ajax({
                            type:"post",
                            url:"https://jd.vvc.tw/index/search/searchorder",
                            data:datas,
                            success:(resp)=>{
                                console.log(resp);
                                if (resp.code == 1){
                                    // console.log(resp);
                                    // this.ordre_data = resp.res
                                    // this.isshow = true;
                                    // console.log(this.ordre_data);
                                }
                            }
                        })
                }
            }
        }
    }
</script>

<style scoped>
    #app{
        width: 100%;
        min-height:100%;
        padding: 20px;
    }
    .jdsearch_heard{
        width: 1000px;
        margin: 0 auto;
        /*background: #00F7DE;*/
        border: 1px solid #c2c2c2;
        padding: 20px;
        border-radius:4px;
    }
    .jdorder_title{
        text-align: center;
        font-size: 26px;
        height: 40px;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 500;
        margin-bottom: 20px;
    }
    .search_tpye{
        width: 100%;
        height: 50px;
        display: flex;
        /*justify-content: space-around;*/
        align-items: center;
        margin-bottom: 20px;
        flex-direction: row
    }
    .search_order_ipt{
        width: 250px;
        border: 1px solid #c2c2c2;
        color: #000;
        line-height: 30px;
        padding-left: 5px;
    }
    .time_btn{
        background:rgb(0,158,252);
        border: none;
        color:white;
        font-size: 14px;
        width: 50px;
        line-height: 30px;
        border-radius: 4px;
    }
    /*搜索数据表格*/
    .jdsearch_table{
        width: 90%;
        margin: 20px auto;
    }
    .jdorder_heard th{
        height: 50px;
        border:1px solid #e6e6e6;
        text-align: center;
    }
    .jdorder_tr td{
        vertical-align: middle;
        border:1px solid #e6e6e6;
        padding:8px 5px;
    }
</style>
