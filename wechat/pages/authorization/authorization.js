
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        obj: {},
        chaNumber: 0,
        isshow: false,
        msg:'',
        //适应ipx
        h: '',
        fill: '',
        active:true,
        user:{},
        showback: false,
        btn_show: true,
        we_userinfo: null,
    },
    /**
     * 生命周期函数--监听页面加载
     */
    getDate(time) {
        var newDate = new Date();
        var timeStamp = newDate.getTime(); //获取时间戳
        var year = newDate.getFullYear();
        var month = newDate.getMonth() + 1;
        var day = newDate.getDate();
        if (month < 10) {
            month = '0' + month;
        };
        if (day < 10) {
            day = '0' + day;
        };
        var time1 = year + "-" + month + "-" + day;
        this.setData({
            [time]: time1
        })
    },
    onLoad: function (options) {
        //是否显示返回按钮
        if (app.globalData.userinfo) {
            this.setData({ showback: true })
        } else {
            this.setData({ showback: false })
        }

        // 登陆过就不用获取微信
        if (app.globalData.userinfo) {
            this.setData({
                showback: true
            })
        } else {
            this.setData({
                showback: false
            })
        }
        //没登录传默认token
        if (!app.globalData.token) {
            app.globalData.token = "789456123"
        }

        if (!!app.globalData.userinfo) {
            console.log(!!app.globalData.userinfo)
            this.setData({
                btn_show: false,
            })

        } else {
            wx.getSetting({
                success: (res) => {
                    if (res.authSetting['scope.userInfo']) {
                        // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                        wx.getUserInfo({
                            success: (res) => {
                                console.log(res.userInfo)
                                this.setData({
                                    we_userinfo: res.userInfo,
                                    btn_show: false
                                })
                            },
                            fail: (err) => {
                                console.log(err)
                                 this.setData({
                                    btn_show: true
                                })
                            }
                        })
                    }
                },
                fail(err) {
                    this.setData({
                        btn_show: false
                    })
                }
            })
        }
    //   console.log(this.data.we_userinfo)
    //   console.log(this.data.btn_show)

        this.setData({ user:app.globalData.userinfo})
        //适应ipx
        this.setData({ h: 'padding-top:' + app.globalData.statusBarHeight * 2 + "rpx" })
        this.setData({ fill: 'padding-top:' + parseInt(app.globalData.statusBarHeight * 2 + 88) + "rpx" })

    },
    getuserinfo(e) {
        console.log(e)
        if (e.detail.userInfo) {
            wx.showToast({
                title: '登录成功',
                duration: 2000
            })
            this.setData({
                we_userinfo: e.detail.userInfo,
                btn_show: false
            })
        } else {
            console.log(222)
            wx.showToast({
                title: '登录失败,请登录后重试',
                icon: "none",
                duration: 5000
            })
        }

        console.log(this.data.we_userinfo)
    },

    //返回上一级
    goback() {
        wx.switchTab({
            url: '../my/my',
        })
    },

    tosecurity() {
        wx.redirectTo({
            url: '../security/security',
        })
        wx.showToast({
            title: '请稍后',
            icon: "loading",
            duration: 500
        })
    },

    chaxuninput(e) {
        this.setData({ chaNumber: e.detail.value });
    },

    chaxun(e) {

        if (this.data.chaNumber == "") {
            wx.showToast({
                title: '请输入查询账号',
                icon: 'none',
                duration: 2000
            });
        } else {
            this.setData({ isshow: true })
            this.getDate('obj.time')
        }

        var data = {};
        if (app.globalData.userinfo) {
            data = {
                bm: this.data.chaNumber,
            }

        } else {
            data = {
                bm: this.data.chaNumber,
                name: this.data.we_userinfo.nickName,
                img: this.data.we_userinfo.avatarUrl
            }
        }
        console.log(this.data.we_userinfo)


        app.request({
          url: 'https://api.vvc.tw/dlxin/user/authSearch',
          method: 'post',
          data:data,
            success: (res) => {
                console.log(res.data.data)
                if (res.data.code) {
                    this.setData({
                      obj: res.data.data
                    });
                    this.setData({
                        active:true
                    })
                } 
                else {
                    this.setData({
                        msg:res.data.msg,
                        obj:{},
                    })
                    this.setData({
                        active: false
                    })
                }
            }
        })
    },
    QR_code(e) {
        wx.scanCode({
            onlyFromCamera: true,
            success: (res) => {
                console.log(res)
            }
        });
    }
})
