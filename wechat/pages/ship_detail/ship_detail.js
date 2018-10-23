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
        fill: '',

        currentTab:0,
        scrollLeft:'',

        orderCont: [],
        express_detail: [],

        ceiling:''
    },

    // 滚动切换标签样式
    switchTab: function (e) {
        this.setData({
            currentTab: e.detail.current
        });
        this.checkCor();
    },
    imgload: function () {
        this.setData({
            loaded: true
        })
    },
    // 点击标题切换当前页时改变样式
    swichNav: function (e) {
        var cur = e.target.dataset.current;
        if (this.data.currentTaB == cur) {
            return false;
        } else {
            this.setData({
                currentTab: cur
            })
        }
    },
    //判断当前滚动超过一屏时，设置tab标题滚动条。
    checkCor: function () {
        if (this.data.currentTab > 3) {
            this.setData({
                scrollLeft: 50
            })
        } else {
            this.setData({
                scrollLeft: 0
            })
        }
    },
    
    onLoad: function(options) {
        
        this.setData({
            ceiling:app.globalData.userinfo.ceiling
        })

        app.request({
            url: 'https://api.vvc.tw/dlxin/order/orderSendList',
            success: (res) => {
                console.log(res)
                if (res.data.code == 1) {
                    var datas = res.data.data.sends_list
                    for (var i = 0; i < res.data.data.sends_list.length; i++) {
            
                        switch (datas[i].order_status) {
                            case -1:
                                datas[i].order_status = '订单取消';
                                break;
                            case 1:
                                datas[i].order_status = '等待付款';
                                break;
                            case 2:
                                datas[i].order_status = '仓库确认中';
                                break;
                            case 3:
                                datas[i].order_status = '部分已发货';
                                break;
                            case 4:
                                datas[i].order_status = '发货完成';
                                break;
                            case 5:
                                datas[i].order_status = '订单完成';
                                break;
                            default:
                                break;
                        }
                        this.setData({
                            list: res.data.data.sends_list
                        })
                    }
                }

            }
        })
        
        app.request({
            url: 'https://api.vvc.tw/dlxin/order/logisticsList',
            success: (res) => {
                console.log(res)
                if (res.data.code == 1) {
                    let datas = res.data.data;
                    for (var i = 0; i < datas.length;i++){
                        datas[i].send_text = datas[i].send_text.replace(/(\n+)/g,'\n');
                        
                    }

                    this.setData({
                        orderCont:datas
                    })
                    
                }

            }
        })


    },

    show(e) {
        // this.setData({
        //     status: true
        // })
    },
    //关闭详情
    close() {
        this.setData({
            status: false
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