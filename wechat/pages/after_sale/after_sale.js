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
        // idx:0,
        user: {
            img: '../../image/img.jpg',
            title: 'VVC冰丝袖套',
            price: '58',
            buy_num: '3',
            apply_num: '3'
        },
        array: [{
            value: "商品破损",
            checked: true
        },
        {
            value: "换货",
            checked: false
        },
        {
            value: "格式错误",
            checked: false
        },
        {
            value: "其他",
            checked: false
        }
        ],
        isshow: false,
        str: '',
        evaContent: '',
        shop_type:[
            { name: "VVC防晒短裤", sku: "蓝色", num: 10, img:"../../image/type_chengh.svg"},
            { name: "VVC夏季女神帽", sku: "霓虹色", num: 10, img: "../../image/type_chengh.svg"},
            { name: "VVC防晒衣", sku: "红色", num: 10, img: "../../image/type_chengh.svg"},
        ]

    },
    switchTab: function (e) {

        this.setData({
            currentTab: e.detail.current
        });
        // this.setData({
        //     idx: e.detail.current
        // });
        console.log(this.data.currentTab);
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

        app.request({
            url: 'https://api.vvc.tw/dlxin/order/returnGooodsList',
            method: 'POST',
            success: (res) => {
                console.log(res.data.data.list)
                for (var i = 0; i < res.data.data.list.length; i++) {
                    var img = res.data.data.list[i];
                    img.goods_img = /http/.test(img.goods_img) ? img.goods_img : '../../image/icon/no_product.svg'
                }
                this.setData({
                    orderCont: res.data.data.list
                })
                this.setData({
                    goods_list: res.data.data.list.goods_list
                })
            }
        })
    },
    footerTap: app.footerTap,
    //显示详情
    show(e) {
        console.log(1)
        this.setData({
            status: true
        })
    },

    //关闭详情
    close() {
        this.setData({
            status: false
        })
    },
    //返回上一页
    goback() {
        wx.navigateBack({
            delta: 1,
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
        this.setData({
            isshow: !this.data.isshow

        })
    },
    close1() {
        this.setData({
            isshow: !this.data.isshow
        })
    },

    // radio待选状态
    radioChange(e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value)

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
        console.log(this.data.array[index].checked)
    },
    confirm() {
        this.setData({
            isshow: !this.data.isshow
        })
    },

    textareaInput(e) {
        if (e.detail.value.length > 0) {
            if (e.detail.value.length < 5 || e.detail.value.length > 140) {
                wx.showToast({
                    title: '内容在5-140个字之间',
                    icon: 'loading',
                    duration: 1200,
                })

            } else {
                this.setData({
                    evaContent: e.detail.value
                })
                console.log(108, e.detail.value)
            }
        } else {
            this.setData({
                evaContent: ''
            })
            this.data.evaContent = '';
            wx.showToast({
                title: '请输入退换货理由',
                icon: 'loading',
                duration: 1200,
            })
        }
    },

    comfirmRefer() {
        var that = this;
        app.request({
            url: '',
            method: 'POST',
            data: {
                key: this.data.str,
                key: this.data.evaContent
            },
            success: (res) => {
                console.log(this.data.evaContent)
                this.setData({
                    isshow: !this.data.isshow
                })
            }
        })

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
