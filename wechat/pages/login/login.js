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
      
        canIUse: wx.canIUse('cover-view')

    },

    set_log(e) {
        console.log(e)
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
    auth(){

        // console.log("这是需要授权的按钮")
        if (!wx.canIUse("openSetting")){
            this.setData({
                btn_show:false
            })
        }
        
        this.setData({
            canIUse: wx.canIUse("openSetting")
        })
        

    },
    get_location() {
        wx.getSetting({
            success: (res) => {
                console.log(res)
                if (res.authSetting['scope.userLocation']) {
                    
                    console.log(this.data.btn_show, 32)
                    wx.getLocation({
                        type: 'wgs84',
                        success: (res) => {
                            console.log(res);
                            this.setData({
                                btn_show: false
                            })
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
       console.log('login页面')

        if (!wx.canIUse('cover-view')) {

            console.log('no')
            wx.redirectTo({
                url: '../accountnumber/accountnumber?id=1',
            })

        }else{

            console.log('yes')
            wx.cloud.callFunction({
                // 云函数名称
                name: 'getuserinfo',
                // 传给云函数的参数
                data: {
                    cmd: "get"
                },
                success: function (res) {
                    console.log(res)
                    if (res.result.token) {
                        console.log(res.result.token)
                        app.globalData.token = res.result.token;
                        wx.switchTab({
                            url: '../my/my',
                        })
                    }
                },
                fail: console.error
            })
        }

        

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
                // wx.showToast({
                //     title: '初始化失败,请确认是否开启所需权限',
                //     icon: 'none',
                //     duration: 5000
                // })
                this.get_location()
            }
        })

    },


    bindGetUserInfo: function(e) {
        console.log(e.detail.userInfo)
    },

    //跳转页面

    wfrAccount() {
        wx.navigateTo({
            url: '../accountnumber/accountnumber?id=1',
            complete:function(com){
                console.log(com)
            }
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
