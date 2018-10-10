const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        movies: [{
            url: 'https://vvc-res.oss-cn-hangzhou.aliyuncs.com/changku/image/vvc_1538101887603.jpg'
            },
            {
                url: 'https://wangfurui.oss-cn-hangzhou.aliyuncs.com/image/vvc_1535528888601.jpg'
            },
            {
                url: 'https://wangfurui.oss-cn-hangzhou.aliyuncs.com/image/vvc_1535531251446.jpg'
            },
            {
                url: 'https://wangfurui.oss-cn-hangzhou.aliyuncs.com/image/vvc_1535531265304.jpg'
            }
        ],
        img_big: {},
        oytarr: [],
        clientHeight: 0,
        arr: [],
        arrHight: [],
        scroll: "scroll-y",
        userinfo: app.globalData.userinfo,

        loaded: false,
        margin: null
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function() {
        if (app.globalData.model == 'iphonex') {
            this.setData({
                margin: 'margin-bottom:178rpx'
            })
        } else {
            this.setData({
                margin: 'margin-bottom:118rpx'
            })
        }
        wx.hideTabBar({
            success: function(res) {

            },
            complete: function() {
                console.log(1123212)
            }
        })

        // if (!!app.globalData.goodslist) {
        //     this.setData({
        //         oytarr: app.globalData.goodslist
        //     })
        // } else {
            app.request({
                url: 'https://api.vvc.tw/dlxin/shop/goodslist',
                method: "POST",
                success: (res) => {
                    if (res.data.code == 1) {
                        this.setData({
                            oytarr: res.data.data.goods_list
                        })
                    } else {
                        wx.showToast({
                            title: res.data.msg,
                            icon: 'none',
                            duration: 1500
                        })
                    }
                },
            })
        // }
        this.setData({
            userinfo: app.globalData.userinfo
        })

        // app.globel.data.sence += 1;
        setTimeout(function() {
            wx.hideToast()
        }, 2500)
    },
    imgload() {
        this.setData({
            loaded: true
        })
        console.log(this.data.loaded)
    },
    imgList(e) {
        console.log(e,"调到详情")
        wx.navigateTo({
            url: '../detail/detail?id=' + e.currentTarget.dataset.id 
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        // function countIndex(offetHight, scrollTop, height, colunm) {
        //     // 单例获取屏幕宽度比
        //     if (!countIndex.pix) {
        //         try {
        //             let res = wx.getSystemInfoSync()
        //             countIndex.pix = res.windowWidth / 375
        //         } catch (e) {
        //             countIndex.pix = 1
        //         }
        //     }
        //     let scroll = scrollTop - offetHight * countIndex.pix
        //     let hei = height * countIndex.pix
        //     return scroll > 0 ? Math.floor(scroll / hei) * colunm : 0
        // }
    },

    /**
     * 生命周期函数--监听页面显示
     */
    // onShow: function() {
    //     // app.globel.data.sence += 1
    //     setTimeout(function() {
    //         wx.hideToast()
    //     }, 2500)
    // },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

        // if (global.data.sence == 1) {
        //     app.globel.data.sence = 0
        //     this.setData({ info: null })
        // }

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
        // app.globel.data.sence -=1
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },


})