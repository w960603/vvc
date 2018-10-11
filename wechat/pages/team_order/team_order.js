
const app = getApp();
Page({

    data: {
        order_num: [
            // { time: '1769334720', state: '交易成功' }
        ],
        orderCont: [],
        winHeight: "", //窗口高度
        currentTab: 0, //预设当前项的值
        scrollLeft: 0, //tab标题的滚动条位置
        Traces: [],
        AcceptTime: '8-25',
        //适应ipx
        h: '',
        fill: '',
        margin: null,
        custom_id:1,
    },
    // 滚动切换标签样式
    switchTab: function (e) {
        console.log(e, e.detail.current);
        // var attr = e.detail.current
        this.setData({currentTab: e.detail.current});
        this.checkCor();
        this.getorder(e.detail.current)
    },
    // 点击标题切换当前页时改变样式
    swichNav: function (e) {
        var cur = e.target.dataset.current;
        console.log(e,cur);
        if (this.data.currentTaB == cur) { return false; }
        else {
            this.setData({
                currentTab: cur
            })
        };
        this.getorder(e.detail.cur);
    },
    
    //判断当前滚动超过一屏时，设置tab标题滚动条。
    checkCor: function () {
        if (this.data.currentTab > 4) {
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

    footerTap: app.footerTap,

    onLoad: function (res) {

        if (app.globalData.model == 'iphonex') {
            this.setData({
                margin: 'margin-bottom:188rpx'
            })
        } else {
            this.setData({
                margin: 'margin-bottom:118rpx'
            })
        }

        //适应ipx
        this.setData({ h: 'padding-top:' + app.globalData.statusBarHeight * 2 + "rpx" })
        this.setData({ fill: 'padding-top:' + parseInt(app.globalData.statusBarHeight * 2 + 88) + "rpx" })

        var that = this;
        // 高度自适应
        wx.getSystemInfo({
            success: function (res) {
                var clientHeight = res.windowHeight,
                    clientWidth = res.windowWidth,
                    rpxR = 750 / clientWidth;
                var calc = clientHeight * rpxR - 180;

                that.setData({
                    winHeight: calc
                });
            }
        });

        this.getorder(0)
    },
    onShow: function () {

    },
    getorder(attr) {
        
        app.request({
            url: 'https://api.vvc.tw/dlxin/order/teamOrderList',
            method: 'POST',
            data:{
                status: attr
            },
            success: (res) => {
                if(res.data.code == 1){
                    console.log(123,res.data.data)
                    this.setData({ orderCont: [] })
                    for (var i = 0; i < res.data.data.length; i++) {
                        if (!/http/.test(res.data.data[i].goods_img)) {
                            res.data.data[i].goods_img = '../../image/icon/no_product.svg'

                        } else {
                            res.data.data[i].goods_img = res.data.data[i].goods_img + '?x-oss-process=image/resize,w_160'
                        }
                        if (i < 10) {
                            // console.log()
                            this.setData({ ["orderCont[" + i + "]"]: res.data.data[i] })
                        }
                    }
                    // var team_order = [];
                    setTimeout(() => {
                        // for(var i = 0;i<res.data.data.length;i++){
                        //     if (res.data.data[i].good_title != "VVC代理押金"){
                                    
                        //     }
                        // }
                        this.setData({ ["orderCont"]: res.data.data })
                    }, 2000)
                    
                }
                    console.log(res.data.data);
                }
        })
       
       
    },
    order(e) {
        console.log(e)
        wx.navigateTo({
            url: '../order_detail/order_detail?id=' + e.currentTarget.dataset.id,
        })
    },
})
