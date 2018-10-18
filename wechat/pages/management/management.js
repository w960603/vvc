const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {

        //适应ipx
        h: '',
        fill: '',

        info: '',

        infoList: {
            join_code: '',
            username: '',
            password: '',
            nick_name: '',
            alipay: '',
            wechat: '',
            truename: '',
            phone: '',
            password1: '',
        },

        status: true,
        backable: false,

        k: null,

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        if (!!app.globalData.token) {
            this.setData({
                backable: true
            })
        } else {
            this.setData({
                backable: false
            })
        }

        this.setData({
            ['infoList.join_code']: options.info
        })


        //适应ipx
        this.setData({
            h: 'padding-top:' + app.globalData.statusBarHeight * 2 + "rpx"
        })
        this.setData({
            fill: 'padding-top:' + parseInt(app.globalData.statusBarHeight * 2 + 138) + "rpx"
        });

        wx.login({
            success: (res) => {
                if (!!res.code) {
                    //发起网络请求
                    wx.request({
                        url: 'https://api.vvc.tw/dlxin/index/wxcode',
                        method: "POST",
                        data: {
                            type: 2,
                            code: res.code
                        },
                        success: (res) => {

                            if (res.data.code == 1) {
                                this.setData({
                                    k: res.data.data.k
                                });

                            }
                            return;
                        },

                    })
                }
            }
        });
    },
    confirm: function() {

        app.request({
            url: 'https://api.vvc.tw/dlxin/index/registerCode',
            method: 'post',
            data: this.data.infoList,
            success: (res) => {
                if (res.data.code == 1) {
                    setTimeout(() => {
                        wx.hideLoading()
                        if (app.globalData.token) {
                            wx.redirectTo({
                                url: "../extension/extension"
                            })
                        } else {
                            wx.redirectTo({
                                url: '../login/login',
                            })
                        }
                    }, 1500)

                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 3000
                    })
                } else {

                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    })
                }

            }
        })
    },
    inputed(e) {
        this.data.infoList[e.currentTarget.dataset.info] = e.detail.value
        this.setData({
            infoList: this.data.infoList
        });
    },

    checkpwd(e) {
        if (e.detail.value == this.data.infoList.password) {
            this.setData({
                status: true
            })
        } else {
            this.setData({
                status: false
            })
        }
    },
    goback() {
        wx.navigateBack();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },
    getuserinfo(e) {
        wx.showLoading()
        if (e.detail.userInfo) {
            this.setData({
                we_userinfo: e.detail.userInfo,
            })
            this.getSetting()
        } else {

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
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                        success: (res) => {
                            console.log(res)
                            wx.request({
                                url: 'https://api.vvc.tw/dlxin/index/wxcode',
                                method: 'POST',
                                data: {
                                    type: 2,
                                    k: this.data.k,
                                    encryptedData: res.encryptedData,
                                    iv: res.iv,
                                    img_url: res.userInfo.avatarUrl
                                },
                                success: (res) => {

                                    console.log(res)
                                    if (res.data.code == 1) {
                                        this.data.infoList.unionid = res.data.data.unionId;
                                        this.data.infoList.img_url = res.data.data.avatarUrl;

                                        this.confirm()

                                    } else {

                                    }
                                }
                            })
                        }
                    })
                } else {
                    wx.showToast({
                        title: "请点击确认按钮登录",
                        icon: 'none',
                        duration: 5000
                    })
                }
            }
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},

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

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },
    onShareAppMessage() {

    }
})