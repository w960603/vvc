const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        btn_show: true,
        k: null,
        // playable: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        wx.login({
            success: (res) => {
                console.log(res)
                if (res.code) {
                    //   console.log(res)
                    //   wx.redirectTo({
                    //       url: '/pages/login/login',
                    //   })
                    //发起网络请求
                    wx.request({
                        url: 'https://api.vvc.tw/dlxin/index/wxcode',
                        data: {
                            code: res.code
                        },

                        success: (res) => {
                            console.log(res,33)
                            app.globalData.login_access = res;


                            if (res.data.code == 2) {

                                wx.redirectTo({
                                    url: '../login/login',

                                });

                            } else if (res.data.code == 3){
                                wx.redirectTo({
                                    url: '/pages/security/security',
                                });
                            }else{

                                this.setData({
                                    k: res.data.data.k
                                });
                                this.getSetting();
                            }

                            return;

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

        console.log(this.data.we_userinfo)
        console.time(1);
    },

    getSetting() {
        wx.getSetting({
            success: (res) => {
                console.log(res)
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                        success: (res) => {
                            console.log(res)
                            wx.hideToast()
                            wx.request({
                                url: 'https://api.vvc.tw/dlxin/index/wxcode',
                                method: 'POST',
                                data: {
                                    k: this.data.k,
                                    encryptedData: res.encryptedData,
                                    iv: res.iv,
                                },
                                success: (res)=> {
                                    console.log(res,44)
                                    this.setData({
                                        btn_show: false
                                    })

                                        // wx.redirectTo({
                                        //     url: '../login/login',
                                        //     success: function (res) { console.timeEnd(1) },
                                        //     fail: function (res) { },
                                        //     complete: function (res) { console.timeEnd(2) },
                                        // })

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
    // goto1() {
    //     // console.log(32324)
    //     // if(app.globalData.login_access.data.code){
    //     console.time(1)
    //     console.time(2)
    //     wx.redirectTo({
    //         url: '../login/login',
    //         success: function (res) { console.timeEnd(1) },
    //         fail: function (res) { },
    //         complete: function (res) { console.timeEnd(2) },
    //     })
        // }else{
        //     wx.redirectTo({
        //         url: '../security/security',
        //         success: function (res) { },
        //         fail: function (res) { },
        //         complete: function (res) { },
        //     })
        // }

    // },
    // playing(e) {
    //     this.setData({
    //         playable: true
    //     })

    //     if (!this.data.btn_show) {
    //         wx.navigateTo({
    //             url: '../login/login',
    //         })

    //     }

    // },
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
        console.log('页面隐藏')
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
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
