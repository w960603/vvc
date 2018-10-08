// pages/ship_detail/ship_detail.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        //适应ipx
        h: '',
        fill: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    cancel1(){
    console.log(getCurrentPages())
              wx.navigateBack({
        delta: -1
    })
    },
    onLoad: function(options) {
        //适应ipx
        this.setData({
            h: 'padding-top:' + app.globalData.statusBarHeight * 2 + "rpx"
        })
        this.setData({
            fill: 'padding-top:' + parseInt(app.globalData.statusBarHeight * 2 + 88) + "rpx"
        })

        app.request({
            url: 'https://api.vvc.tw/dlxin/order/orderSendList',
            success: (res) => {
                console.log(res)
                if (res.data.code) {
                    var datas = res.data.data.sends_list
                    for (var i = 0; i < res.data.data.sends_list.length; i++) {
                        res.data.data.sends_list[i].goods_img = res.data.data.sends_list[i].goods_img ? res.data.data.sends_list[i].goods_img : '../../image/icon/no_product.svg'


                        switch(datas[i].order_status){
                            case -1 : datas[i].order_status = '订单取消';break;
                            case 1 : datas[i].order_status = '等待付款';break;
                            case 2 : datas[i].order_status = '仓库确认中';break;
                            case 3 : datas[i].order_status = '部分已发货';break;
                            case 4 : datas[i].order_status = '发货完成';break;
                            case 5 : datas[i].order_status = '订单完成';break;
                            default:break;
                        }
                        this.setData({
                            list: res.data.data.sends_list
                        })
                    }
                }

            }
        })

    },
    goback() {
        wx.navigateBack({})
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },


})
