// pages/AccountNumber/accountnumber.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        num: null,
        userName: "",
        password: "",
        show: true,
        data1: 60,
        Phone1: "",
        password1: "",

        first: true,
        active: true,

        status: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var username = wx.getStorageSync('username');

        if (!username) {
            this.setData({
                first: true
            })
        } else {
            this.setData({
                userName: username,
                first: false
            })
        }

        this.setData({
            num: options.id
        })
        // this.setData({ num:2 })
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
    getPhone: function(e) {
        this.setData({
            userName: e.detail.value
        });
    },
    getpossword: function(e) {
        this.setData({
            password: e.detail.value
        });
    },

    getPhone1: function(e) {
        this.setData({
            Phone1: e.detail.value
        });
    },
    getpossword1: function(e) {
        this.setData({
            password1: e.detail.value
        });
    },

    backpage: function() {
        wx.navigateBack()
    },
    // 账号登录
    tijiao: function() {
        console.log(this.data.userName);
        if (this.data.status) {
            this.data.status = false
            wx.showToast({
                title: '登陆中',
                icon: 'loading',
                duration: 5000
            });
            wx.request({
                method: "POST",
                url: 'https://api.vvc.tw/dlxin/index/login',
                data: {
                    username: this.data.userName,
                    password: this.data.password,
                    y: app.globalData.latitude,
                    x: app.globalData.longitude,
                    phoneInfo: JSON.stringify(app.globalData.systemInfo),

                    // y: 50,
                    // x: 30
                },
                success: (res) => {
                    this.data.status = true
                    if (res.data.code == 1) {
                        app.globalData.userinfo = res.data.data.userinfo;
                        app.globalData.token = res.data.data.token;

                        app.globalData.goodslist = res.data.data.goods;

                        wx.hideToast();
                        wx.setStorage({
                            key: 'count',
                            data: res.data.data.count,
                        })

                        app.globalData.has_show = false;

                        wx.switchTab({
                            url: '../home/home',
                        })
                        // wx.redirectTo({
                        //     url: '../express/express',
                        // })
                        wx.cloud.callFunction({
                            // 云函数名称
                            name: 'getuserinfo',
                            // 传给云函数的参数
                            data: {
                                cmd: "put",
                                token: res.data.data.token
                            },
                        })

                        wx.showToast({
                            title: res.data.msg,
                            icon: 'none',
                            duration: 5000
                        })

                        wx.setStorage({
                            key: 'username',
                            data: this.data.userName,
                        })
                        return
                    } else {
                        wx.showToast({
                            title: res.data.msg,
                            icon: 'none',
                            duration: 5000
                        })
                    }

                },
            })
        }
    },

    // 获取验证码
    Obtain: function(e) {
        console.log(this.data.Phone1);
        this.setData({
            show: false
        });
        wx.request({
            url: "https://api.vvc.tw/dlxin/index/sendsms",
            method: "POST",
            data: {
                mobile: this.data.Phone1,
                type: 2,
            },
            success: (res) => {
                console.log(res)
                if (res.data.code == 0) {
                    this.setData({
                        show: true
                    });
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    })
                } else {
                    this.data.number1 = 60;
                    this.setData({
                        data1: this.data.number1
                    })
                    var timer = setInterval(() => {
                        this.data.number1--;
                        this.setData({
                            data1: this.data.number1
                        })
                        if (this.data.number1 <= 0) {
                            this.setData({
                                show: true
                            });
                            clearInterval(timer);
                        }
                    }, 1000)
                }
            }
        })
        // e.currentTarget.ta
        // this.data.show = false;
    },
    phonelogin: function() {
        console.log(this.data.Phone1);
        wx.request({
            method: "POST",
            url: 'https://api.vvc.tw/dlxin/index/login',
            data: {
                phone: this.data.Phone1,
                code: this.data.password1,
                phoneInfo: JSON.stringify(app.globalData.systemInfo),
                type: 2,
            },
            success: function(res) {

                if (res.data.code == 1) {
                    wx.switchTab({
                        url: '../home/home',
                    })
                    app.globalData.userinfo = res.data.data.userinfo;
                    app.globalData.token = res.data.data.token;
                    wx.cloud.callFunction({
                        // 云函数名称
                        name: 'getuserinfo',
                        // 传给云函数的参数
                        data: {
                            cmd: "put",
                            token: res.data.data.token
                        },
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

    /**
     *
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {},

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