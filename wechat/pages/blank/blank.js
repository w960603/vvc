const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        btn_show: true,
        k: null,

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function(options) {

        wx.login({
            success: (res) => {
                if (!!res.code) {
                    //发起网络请求
                    wx.request({
                        url: 'https://api.vvc.tw/dlxin/index/wxcode',
                        method:"POST",
                        data: {
                            code: res.code
                        },
                        success: (res) => {

                            if (res.data.code == 2) {
                                wx.redirectTo({
                                    url: '../login/login',

                                });
                            } else if (res.data.code == 3) {
                                wx.redirectTo({
                                    url: '../security/security',
                                });
                            } else if (res.data.code == 1){
                                this.setData({
                                    k: res.data.data.k
                                });
                                this.getSetting();
                            }else{
                                wx.redirectTo({
                                    url: '../security/security',
                                });
                            }
                            return;
                        },
                        fail:(err)=>{
                            console.log(err)
                            this.getSetting();
                            wx.redirectTo({
                                url: '../login/login',
                            });
                        }
                    })
                }
            }
        });
    },
    getuserinfo(e) {
        console.log(e)
        if (e.detail.userInfo) {
            // wx.showToast({
            //     title: '登录成功',
            //     duration: 2000
            // })
            this.setData({
                we_userinfo: e.detail.userInfo,
                btn_show: false
            })
            this.getSetting()
        } else {
            console.log(222)
            wx.showToast({
                title: '获取用户失败,请允许授权!',
                icon: "none",
                duration: 5000
            })
        }
    },

    getSetting() {
        wx.getSetting({
            success: (res) => {
                console.log(res)
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                        success: (res) => {
                            // wx.hideToast()
                            wx.request({
                                url: 'https://api.vvc.tw/dlxin/index/wxcode',
                                method: 'POST',
                                data: {
                                    k: this.data.k,
                                    encryptedData: res.encryptedData,
                                    iv: res.iv,
                                },
                                success: (res) => {

                                    this.setData({
                                        btn_show: false
                                    })
                                    if (res.data.code == 1) {

                                        wx.redirectTo({
                                            url: '../login/login',

                                        })

                                    } else {
                                        wx.redirectTo({
                                            url: '/pages/security/security',
                                        })
                                    }
                                }
                            })
                        }
                    })
                } else {
                    this.setData({
                        btn_show: true
                    })
                    wx.showToast({
                        title: "请点击屏幕登录",
                        icon: 'none',
                        duration: 5000
                    })
                }
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },


    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {
        console.log('页面隐藏')
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
        console.log('页面卸载')

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