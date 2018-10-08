// pages/login/login.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        indexImg: "../../image/login/login.jpg",
        transformY: 1,
        transformX: 1,
        userInfo: {},
        btn_show: true,



        canIUse: wx.canIUse('button.open-type.getUserInfo')

    },

    set_log(e) {
        console.log(e);
        if (e.detail.authSetting['scope.userLocation'] == true) {
            this.get_location()
        } else {
            app.globalData.latitude = null;
            app.globalData.longitude = null;
            wx.showToast({
                title: '申请权限失败',
                icon: 'none',
                duration: 3000
            })
        }
    },

    get_location() {
        wx.getSetting({
            success: (res) => {
                console.log(res)
                if (res.authSetting['scope.userLocation']) {
                    this.setData({
                        btn_show: false
                    })
                    console.log(this.data.btn_show, 32)
                    wx.getLocation({
                        type: 'wgs84',
                        success: (res) => {
                            console.log(res)
                            app.globalData.latitude = res.latitude;
                            app.globalData.longitude = res.longitude;

                            app.globalData.accuracy = res.accuracy;

                        },
                        fail: (err) => {
                            console.log(err);

                            wx.showToast({
                                title: '初始化失败,请确认是否开启所需权限',
                                icon: 'none',
                                duration: 5000
                            })
                        }

                    })
                }
            },
            fail(err) {
                console.log('设置')
                this.setData({
                    btn_show: true
                })

            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
       

        wx.cloud.callFunction({
            // 云函数名称
            name: 'test',
            // 传给云函数的参数
            data: {
                a: 1,
                b: 2,
            },
            success: function (res) {
                console.log(res.result) // 3
            },
            fail: console.error
        })



        wx.getLocation({
            type: 'wgs84',
            success: (res) => {
                console.log(res)
                app.globalData.latitude = res.latitude;
                app.globalData.longitude = res.longitude;
                app.globalData.accuracy = res.accuracy;

                this.setData({
                    btn_show: false
                })
            },
            fail: (err) => {
                console.log(err);
                wx.showToast({
                    title: '初始化失败',
                    icon: 'none',
                    duration: 5000
                })
            }
        })

        this.get_location()

        // setTimeout(() => {
        //     this.setData({
        //         btn_show: false
        //     })
        // }, 5000)

    },


    bindGetUserInfo: function(e) {
        console.log(e.detail.userInfo)
    },

    //跳转页面

    wfrAccount() {
        wx.navigateTo({
            url: '../accountnumber/accountnumber?id=1',
        })
    },
    phonelogin() {
        wx.navigateTo({
            url: '../accountnumber/accountnumber?id=2',
        })
    },
    cancelListen() {
        wx.navigateTo({
            url: '../phone/phone',
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

        console.log("login:ready")

    },
    /**
     * 生命周期函数--监听页面显示
     */
    onshow: function() {
        console.log("我走啦", 2)

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {
        wx.stopAccelerometer();
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
        wx.stopAccelerometer();
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
