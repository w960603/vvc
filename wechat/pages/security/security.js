const app = getApp();
const innerAudioContext = wx.createInnerAudioContext()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        object1: {
            img: "../../image/WechatIMG.jpg",
            name: "",
            phone: "",
            time: "2018-08-22 09:48:45",
            msg: "",
            owner: "",
        },
        // object1:{},
        chaNumber: 0,
        isshow: false,
        qrcode: "",
        //适应ipx
        h: '',
        fill: '',
        user: {},
        btn_show: true,
        we_userinfo: null,
        showback: false,
        newly: [],

        status:true
        
    },
    onShow: function() {

    },
    getuserinfo(e) {
        
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
    },
    // 时间
    getDate(time) {
        var newDate = new Date();
        var timeStamp = newDate.getTime(); //获取时间戳
        var year = newDate.getFullYear();
        var month = newDate.getMonth() + 1;
        var day = newDate.getDate();
        var h = newDate.getHours();
        var m = newDate.getMinutes();
        var s = newDate.getSeconds();
        if (month < 10) {
            month = '0' + month;
        };
        if (day < 10) {
            day = '0' + day;
        };
        if (h < 10) {
            h = '0' + h;
        };
        if (m < 10) {
            m = '0' + m;
        };
        if (s < 10) {
            s = '0' + s;
        };
        var time1 = year + "-" + month + "-" + day + " " + h + ":" + m + ":" + s;
        this.setData({
            [time]: time1
        })
    },
    onLoad: function(options) {


        /************用户验证*************/
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

        this.setData({
            user: app.globalData.userinfo
        })
        //适应ipx
        this.setData({
            h: 'padding-top:' + app.globalData.statusBarHeight * 2 + "rpx"
        })
        this.setData({
            fill: 'padding-top:' + parseInt(app.globalData.statusBarHeight * 2 + 88) + "rpx"
        })
        if ("q" in options) {
            var url = decodeURIComponent(options.q);
            var reg2 = /([\d]{8,12})/;
            var result = url.match(reg2);
            this.setData({
                qrcode: result[0]
            })
        }

        if (!!app.globalData.userinfo) {
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
                                this.setData({
                                    we_userinfo: res.userInfo,
                                    btn_show: false
                                })
                            },
                            fail: (err) => {
                                this.setData({
                                    btn_show: true
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
        }
    },
    goback() {
        wx.switchTab({
            url: '../my/my',
        });
    },
    tosecurity() {
        wx.redirectTo({
            url: '../authorization/authorization',
        })
        wx.showToast({
            title: '请稍后',
            icon: "loading",
            duration: 500
        })
    },
    // input的值
    chaxuninput(e) {
        this.setData({
            qrcode: e.detail.value,

        });
    },
    // 查询防伪号

    chaxun(e) {

        if (this.data.qrcode.length != 12) {
            wx.showToast({
                title: '请输入正确的位数',
                icon: 'none',
                duration: 2000
            });
        } else {
            this.setData({
                isshow: true
            })
            this.data.object1.phone = this.data.qrcode

            this.getDate('object1.time')
        }

        var data = {};
        if (app.globalData.userinfo) {
            data = {
                qrcode: this.data.qrcode,
            }
        } else {
            data = {
                qrcode: this.data.qrcode,
                name: this.data.we_userinfo.nickName,
                img: this.data.we_userinfo.avatarUrl
            }
        }

        
        app.request({
            url: 'https://api.vvc.tw/dlxin/user/qrcode',
            method: 'post',
            data: data,
            success: (res) => {

                if (res.data.code == 9527) {
                    wx.reLaunch({
                        url: '../login/login',
                    })
                } else if (res.data.code == 1) {
                    this.data.object1.msg = res.data.msg;
                    this.data.object1.owner = res.data.data.owner;
                    this.data.object1.nick_name = res.data.data.nick_name;

                    this.data.object1.img_url = res.data.data.img_url;
                    this.setData({
                        object1: this.data.object1,
                    });

                    if (res.data.data.log) {
                        this.setData({
                            newly: res.data.data.log
                        })
                    } else {
                        this.setData({
                            newly: null
                        })
                    }
                    
                    innerAudioContext.autoplay = true
                    innerAudioContext.src = 'https://tsn.baidu.com/text2audio?tex=' + encodeURI(res.data.msg) + '&lan=zh&cuid=00%20-%20CF%20-%20E0%20-%204A-0F-19&ctp=1&vol=15&tok=24.6be9789b8520e2550ef52f03672dbd4c.2592000.1541409606.282335-14254401';
                    
                    innerAudioContext.onPlay(() => {});
                }
            }


        })
    },
    // 调用二维码
    QR_code(e) {
        wx.scanCode({
            onlyFromCamera: true,
            success: (res) => {
                console.log(res)
                if(res.result&&/vvc/i.test(res.result)){
                    var reg2 = /([\d]{8,12})/;
                    var str2 = res.result;
                    var result = str2.match(reg2);
                    this.setData({
                        qrcode: result[0]
                    })
                    this.chaxun();
                }
                
            }
        });
    },

})