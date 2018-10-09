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

        orderCont: [
            {
                img: '../../image/icon/no_product.svg',
                title: 'VVC冰丝袖套',
                order_num: '2018082213103923',
                address: '福建省厦门市思明区前埔路168号',
                order_time: '2018-08-22 09:48:45',
                order_status: 1
            },
            {
                img: '../../image/icon/no_product.svg',
                title: 'VVC冰丝袖套',
                order_num: '2018082213103923',
                address: '福建省厦门市思明区前埔路168号',
                order_time: '2018-08-22 09:48:45',
                order_status: 2
            },
            {
                img: '../../image/icon/no_product.svg',
                title: 'VVC冰丝袖套',
                order_num: '2018082213103923',
                address: '福建省厦门市思明区前埔路168号',
                order_time: '2018-08-22 09:48:45',
                order_status: 0
            },
            {
                img: '../../image/icon/no_product.svg',
                title: 'VVC冰丝袖套',
                order_num: '2018082213103923',
                address: '福建省厦门市思明区前埔路168号',
                order_time: '2018-08-22 09:48:45',
                order_status: 1
            },
        ],


        express_detail: [{
                state: '福建省厦门市思明区前埔路168号乐凡销售部',
                time: '2018-08-22 09:48:45'
            },
            {
                state: '福建省厦门市思明区前埔路168号乐凡销售部',
                time: '2018-08-22 09:48:45'
            },
            {
                state: '福建省厦门市思明区前埔路168号乐凡销售部',
                time: '2018-08-22 09:48:45'
            },
            {
                state: '厦门市派件员王铁柱正在派送',
                time: '2018-08-22 09:48:45'
            },
            {
                state: '浙江杭州正在进行装袋扫描',
                time: '2018-08-22 09:48:45'
            },
            {
                state: '浙江杭州正在进行装袋扫描',
                time: '2018-08-22 09:48:45'
            },
            {
                state: '浙江杭州正在进行装袋扫描',
                time: '2018-08-22 09:48:45'
            },
        ],

        //适应ipx
        h: '',
        fill: ''
    },
    switchTab: function(e) {
        this.setData({
            currentTab: e.detail.current
        });
        this.checkCor();
    },
    // 点击标题切换当前页时改变样式
    swichNav: function(e) {
        var cur = e.target.dataset.current;
        if (this.data.currentTab == cur) {
            return false;
        } else {
            this.setData({
                currentTab: cur
            })
        }
    },
    //判断当前滚动超过一屏时，设置tab标题滚动条。
    checkCor: function() {
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
    onLoad: function() {

        app.request({
            url: 'https://api.vvc.tw/dlxin/order/orderSendinfo',
            data: {
                order_id: "20160429162352"
            },
            success: (res) => {
                console.log(res)
            }
        })

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
            success: function(res) {
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
    }
})