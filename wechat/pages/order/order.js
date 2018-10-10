
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
        AcceptTime:'8-25',
        //适应ipx
        h: '',
        fill: '',
        margin:null
    },
    
    // 滚动切换标签样式
    switchTab: function (e) {
        this.setData({
            currentTab: e.detail.current
        });
        this.checkCor();
    },
    // 点击标题切换当前页时改变样式
    swichNav: function (e) {
        var cur = e.target.dataset.current;
        if (this.data.currentTaB == cur) { return false; }
        else {
            this.setData({
                currentTab: cur
            })
        }
    },
    cancel_order(e){
        console.log(e)
        app.request({
            url:'https://api.vvc.tw/dlxin/order/delorder',
            data:{
                id:e.currentTarget.dataset.order.id
            },
            success:(res)=>{
                console.log(res)
                if (res.data.code) {
                  wx.showToast({
                    title: "删除订单成功",
                    
                  })
                    this.getorder()
                    
                }else{
                    wx.showToast({
                        title: res.data.msg,
                        icon:'none'
                    })
                }
            },
            fail:()=>{
                wx.showToast({
                    title: "发生错误,请刷新重试!",
                })
                this.getorder()
            }
        })

        
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

        wx.hideTabBar({
            success: function (res) {
                console.log(11111)
                console.log(res);
            },
            complete: function () {
                console.log(1123212)
            }
        })

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

      this.getorder()   
    },
    onShow:function(){
      console.log("show")
      this.getorder()
    },
    
    getorder(attr){
        app.request({
            url: 'https://api.vvc.tw/dlxin/order/orderlist',
            method: 'POST',
            success: (res) => {
                if (res.data.code) {
                    console.log(res)
                    this.setData({ orderCont:[] })
                    for (var i = 0; i < res.data.data.length; i++) {
                        if (!/http/.test(res.data.data[i].goods_img)) {
                            res.data.data[i].goods_img = '../../image/icon/no_product.svg'

                        }else{
                            res.data.data[i].goods_img = res.data.data[i].goods_img +'?x-oss-process=image/resize,w_160'
                        }
                        if(i<10){
                         this.setData({ ["orderCont["+i+"]"]: res.data.data[i] })
                        }
                    }
                    setTimeout(()=>{ this.setData({ ["orderCont"]: res.data.data})},2000)
                    //this.setData({ order_num: res.data.data })
                }

            },
        })
        // 物流信息
            // app.request({
            //     url: 'https://api.vvc.tw/dlxin/kdbird/getwuliu',
            //     method: 'POST',
            //     data: {
            //         order_id: 2147483647,
            //     },
            //     success:(res)=> {
            //         console.log(res,161)
                    // for (var i = 0; i < res.data.data.Traces.length;i++ ){
                    //     i = res.data.data.Traces.length
                    //     console.log(i,168)
                    //     this.setData({
                    //         Traces: res.data.data.Traces[i]
                    //     })
                    // }
                    // if(res.data.code==1){
                    //     this.setData({
                    //         Traces: res.data.data.Traces
                    //     })
                    // }
                    
                    
                    // this.setData({
                    //     AcceptTime: res.data.data.Traces.AcceptTime
                    // })
                    
            //     }
            // })
    },

    order(e){
         console.log(e)
        wx.navigateTo({
            url: '../order_detail/order_detail?id='+e.currentTarget.dataset.id,
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
