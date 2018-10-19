const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        winHeight: "", //窗口高度
        currentTab: 0, //预设当前项的值
        scrollLeft: 0, //tab标题的滚动条位置
        status: false,
        orderCont: [],
        goods_list: {},
        img_url: '',
        //适应ipx
        h: '',
        fill: '',
        num:0,
        user: {
            img: '../../image/img.jpg',
            title: 'VVC冰丝袖套',
            price: '58',
            buy_num: '3',
            apply_num: '3'
        },
        itemList: [],
        array: [
            {value: "商品破损",checked: true,idx:1},
            { value: "换货", checked: false, idx: 2},
            { value: "格式错误", checked: false, idx: 3},
            { value: "其他", checked: false,idx: 4}
        ],
        return_goods:null,
        isshow: false,
        str: '',
        evaContent: '',
        allorder_shop:{},
        shop_type:[],
        infos:[],
        idx:null,
        // 售后完成
        server_finish:[],
        // 处理中
        processing:[],

    },
    switchTab: function (e) {
        this.setData({
            currentTab: e.detail.current
        });
        this.checkCor();
    },
    // 点击标题切换当前页时改变样式
    swichNav: function (e) {
        console.log(e);
        var cur = e.target.dataset.current;
        // this.setData({ idx: e.target.dataset.current});
        if (this.data.currentTab == cur) {
            return false;
        } else {
            this.setData({
                currentTab: cur
            })
        }
    },
    //判断当前滚动超过一屏时，设置tab标题滚动条。
    checkCor: function () {
        if (this.data.currentTab > 2) {
            this.setData({
                scrollLeft: 300
            })
        } else {
            this.setData({
                scrollLeft: 0
            })
        }
    },
    searchInput(e){
        if (e.detail.value){
            console.log(e.detail.value);
            // arr.indexOf(find, start);
            // console.log(this.data.processing);//显示的处理中的数组
            // var order_str = this.data.processing.indexOf(e.detail.value,0);
            var arrs = []
            for (var i = 0; i < this.data.processing.length;i++ ){
                // if (this.data.processing[i])
                // if (this.data.processing[i].goods_list.indexOf(e.detail.value) != -1 ){
                //     console.log("我走啦",)
                // }
                    
                for (var j = 0; j < this.data.processing[i].goods_list.length;j++){
                    if (e.detail.value == this.data.processing[i].goods_list[j]){
                        arrs.push(this.data.processing[i]);
                    }
                }
            }
            console.log("我走啦",arrs);

        }else{
            wx.showToast({
                title: '请输入内容',
                icon:"none",
                duration:2000,
            })
        }
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (option) {
        this.setData({ num:option.index})
        // console.log(option.index);
        //适应ipx
        this.setData({
            h: 'padding-top:' + app.globalData.statusBarHeight * 2 + "rpx"
        })
        this.setData({
            fill: 'padding-top:' + parseInt(app.globalData.statusBarHeight * 2 + 88) + "rpx"
        })
        if (app.globalData.model == 'iphonex') {
            this.setData({ iphonex: "padding-bottom:60rpx", icon: 'bottom:74rpx' });
            this.setData({ bottom: "margin-bottom:170rpx", icon: 'bottom:74rpx' })
        } else {
            this.setData({ bottom: "margin-bottom:98rpx", icon: 'bottom:74rpx' })
            this.setData({ iphonex:''})
        }
        var that = this;
        // 高度自适应
        wx.getSystemInfo({
            success: function (res) {
                var clientHeight = res.windowHeight,
                    clientWidth = res.windowWidth,
                    rpxR = 750 / clientWidth;
                var calc = clientHeight * rpxR - 180;
                console.log(calc)
                that.setData({
                    winHeight: calc
                });
            }
        });

    },
  
    footerTap: app.footerTap,
    //显示详情
    show(e) {
        this.setData({
            status: true
        })
    },

    bindPickerChange(e) {
        var nums = this.data.allorder_shop[e.detail.value];
        nums.max = nums.num
        nums.num = 1;
        this.data.infos.push(nums);

        console.log(this.data.infos,e.detail.value);
        this.setData({ ["shop_type"]: this.data.infos });
    },
    // 获取商品数量
    order_num(e){
        console.log(e.detail.value>this.data.shop_type[e.currentTarget.dataset.index].max);//数组下标
        if (Number(e.detail.value) > this.data.shop_type[e.currentTarget.dataset.index].max){
            wx.showToast({
                title: '数量过多',
                duration: 1200
            })
            this.data.shop_type[e.currentTarget.dataset.index].num = this.data.shop_type[e.currentTarget.dataset.index].max;
        } else if (e.detail.value > 0){
            this.data.shop_type[e.currentTarget.dataset.index].num = e.detail.value
        
        }else{
            this.data.shop_type[e.currentTarget.dataset.index].num = 1
        }
        this.setData({ shop_type: this.data.shop_type });
    },
    // 删除商品
    deletelist(e){
        // console.log(e.currentTarget.dataset.index);
        var arr = this.data.shop_type;
        arr.splice(e.currentTarget.dataset.index,1);
        this.setData({ shop_type: arr});
    },    
    //关闭详情
    close() {
        this.setData({status: false});
    },
    //返回上一页
    goback() {
        wx.navigateBack({
            delta: 1,
        })
    },
    // 售后完成
    after_sale(e) {
        console.log(e.currentTarget.dataset.index);
        console.log(this.data.processing[e.currentTarget.dataset.index].id);
        wx.navigateTo({
            url: "../refunds/refunds?id=" + this.data.processing[e.currentTarget.dataset.index].id,
        })
    },

    apply_sale() {
        wx.navigateTo({
            url: '../apply_sale/apply_sale',
        })
        wx.showToast({
            title: '请稍后',
            icon: 'loading',
            duration: 1200
        })
    },
    choseReason() {
        this.setData({isshow: !this.data.isshow});
    },
    close1() {
        this.setData({
            isshow: !this.data.isshow
        })
    },

    // radio待选状态
    radioChange(e) {
        console.log(e);
        // console.log('radio发生change事件，携带value值为：', e)
        var index = e.currentTarget.dataset.index;
        for (var i = 0; i < this.data.array.length; i++) {
            if (i == index) {
                this.data.array[i].checked = !this.data.array[i].checked;
            } else {
                this.data.array[i].checked = false;
            }
        }
        this.setData({
            array: this.data.array,
            str: index
        })
        // console.log(this.data.array[index].checked);
        // console.log(this.data.array[index].value);
        this.setData({return_goods: this.data.array[index].value})
        this.setData({ idx: this.data.array[index].idx }) 
    },
    confirm() {
        if (this.data.return_goods == null && this.data.idx == null){
            this.setData({ return_goods: this.data.array[0].value })
            this.setData({ idx: this.data.array[0].idx }) 
        }
        this.setData({
            isshow: !this.data.isshow
        })
    },

    textareaInput(e) {
        // console.log(e);
        if (e.detail.value.length > 0) {
                this.setData({
                    evaContent: e.detail.value
                })
                // console.log(108, e.detail.value)
        } else {
            this.setData({evaContent: '' })
            this.data.evaContent = '';
        }
    },

    comfirmRefer() {
        // console.log(this.data.evaContent != "", this.data.shop_type.length >0, this.data.idx != null);
        if (this.data.shop_type.length > 0 && this.data.idx != null && this.data.evaContent != ""){
            console.log(this.data.shop_type);//tuihuo 清单
            console.log(this.data.idx);//yy 原因
            console.log(this.data.evaContent);//ly 理由
            app.request({
                url:"https://api.vvc.tw/dlxin/order/doReturnGoods",
                method:"POST",
                data:{
                    ly: this.data.evaContent ,
                    yy: this.data.idx,
                    tuihuo:JSON.stringify(this.data.shop_type), 
                },
                success:(res)=>{
                    console.log(res);
                    if(res.data.code == 1){
                        this.data.shop_type.splice(0, this.data.shop_type.length);
                        this.setData({evaContent:""});
                        this.setData({ "shop_type": this.data.shop_type});
                        this.setData({ idx: null });
                        wx.showToast({
                            title: '申请成功',
                            duration: 1200
                        })


                        // console.log(this.data.evaContent, this.data.shop_type, this.data.idx);
                    }
                }
            })

        }else{
            wx.showToast({
                // title: '请输入商品或者原因以及理由',
                title:"请输入完整信息",
                duration: 1200,
            })
        }
        //退货的商品
        
        // var that = this;
        // app.request({
        //     url: '',
        //     method: 'POST',
        //     data: {
        //         key: this.data.str,
        //         key: this.data.evaContent
        //     },
        //     success: (res) => {
        //         console.log(this.data.evaContent)
        //         this.setData({
        //             isshow: !this.data.isshow
        //         })
        //     }
        // })

    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        app.request({
            url: 'https://api.vvc.tw/dlxin/order/returnGoodsList',
            method: 'POST',
            success: (res) => {
                // console.log(res)
                if (res.data.data.list) {

                    var arr =[]
                    var arr1 = []
                    for (var i = 0; i < res.data.data.list.length; i++) {
                        if (res.data.data.list[i].status < 5 && res.data.data.list[i].status > 0){
                            arr.push(res.data.data.list[i]);
                            // console.log(res.data.data.list[i])
                        } else if (res.data.data.list[i].status > 4 || res.data.data.list[i].status == -2){
                            arr1.push(res.data.data.list[i]);                            
                        }
                    }
                    this.setData({
                        processing: arr
                    })
                    console.log(this.data.processing);

                    this.setData({
                        server_finish:arr1
                    })
                    // console.log(res.data.data.list.goods_list)
                    // this.setData({
                    //     goods_list: res.data.data.list.goods_list
                    // })
                }
            }
        });
        app.request({
            url: "https://api.vvc.tw/dlxin/order/returnGoodsView",
            method: "POST",
            success: (res) => {
                // console.log("asdasd", res.data.data)
                // 售后未完成的数据
                var arr = [];
                var arrs = [];

                // 售后完成时的数据finish
                var finish = []
                for (var i in res.data.data) {
                    
                    if (res.data.data[i].name != "VVC代理押金" && i != "option") {
                        var obj = res.data.data[i].name + "[" + res.data.data[i].color + "]"
                        arr.push(obj);
                        arrs.push(res.data.data[i]);
                    } 

                };
                // console.log("我走啦", finish)
                
                this.setData({ itemList: arr });
                this.setData({ "allorder_shop": arrs });


                // console.log(this.data.allorder_shop);
            }
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

})
