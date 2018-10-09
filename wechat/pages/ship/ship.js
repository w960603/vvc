var app = getApp();
Page({

    data: {
        ship: [],
        array: ['电商', '网销', '零售', '批发'],
        arr1: '批发',
        user: '',

        isshow: false,
        isshow3: false,
        id: null,
        shipid: null,
        activeOpacity: false,
        // showView: (options.showView == "true" ? true : false),

        //适应ipx
        h: '',
        fill: '',
        qrcode: '',


    },
    bindPickerChange: function (e) {
        
        var data = this.data.array[e.detail.value];
        
        this.setData({
            arr1: this.data.array[e.detail.value]
        })
    },

    attached: function () {
        app.request({
            url: 'https://api.vvc.tw/dlxin/user/getSubAddress',
            methos: 'post',
            success: (res) => {

                if (res.data.code) {
                    this.setData({
                        user: res.data.data,
                    })
                }

            }

        })
    },

    goback: function () {
      wx.switchTab({
        url: "../my/my",
      })

    },
    ship_search(e) {

        // this.data.id = e.currentTarget.dataset.id
        this.setData({
            isshow3: true
        })

    },
    close(e) {
        console.log(1)
        this.data.shipid = e.currentTarget.dataset.shipid
        this.setData({
            isshow3: !this.data.isshow3
        })
    },
    adduser(e) {
        console.log(e)
        this.setData({ user: e.detail, isshow3: false })
        console.log(this.data.user)
    },

    onLoad: function (option) {
        
        //适应ipx
        this.setData({
            h: 'padding-top:' + app.globalData.statusBarHeight * 2 + "rpx"
        })
        this.setData({
            fill: 'padding-top:' + parseInt(app.globalData.statusBarHeight * 2 + 88) + "rpx"
        });

        app.request({
            url: 'https://api.vvc.tw/dlxin/user/hairlog',
            method: 'POST',
            success: (res) => {
                console.log(res.data)
                this.setData({
                    ["ship.log"]:res.data.data
                })
            }
        })
    },


    scan_click: function () {
        var that = this;
        var show;
        if (this.data.user){
            wx.scanCode({
                success: (res) => {


                    this.show = "--result:" + res.result + "--scanType:" + res.scanType + "--charSet:" + res.charSet + "--path:" + res.path;
                    this.setData({ qrcode: res.result.match(/(\d{8,13})/)[1] });



                    app.request({
                        url: 'https://api.vvc.tw/dlxin/user/hair',
                        data: {
                            img_url: this.data.user.img_url,
                            h_id: this.data.user.u_id,
                            nick_name: this.data.user.nick_name,
                            qr: this.data.qrcode
                        },
                        success: (res) => {

                            if (res.data.code) {
                                // this.setData({ ship: res.data.data })
                                this.setData({ ["ship.log"]: res.data.data.log, ["ship.goods"]: res.data.data.goods })
                                wx.showToast({
                                    title: res.data.msg,
                                    icon: 'success',
                                    duration: 2000
                                })
                                const innerAudioContext = wx.createInnerAudioContext()
                                innerAudioContext.autoplay = true
                                innerAudioContext.src = 'https://tsn.baidu.com/text2audio?tex=' + encodeURI(res.data.msg) + '&lan=zh&cuid=00%20-%20CF%20-%20E0%20-%204A-0F-19&ctp=1&vol=15&tok=24.6be9789b8520e2550ef52f03672dbd4c.2592000.1541409606.282335-14254401'
                                innerAudioContext.onPlay(() => {
                                    
                                })

                            } else {
                                console.log(res.data);
                                const innerAudioContext = wx.createInnerAudioContext()
                                innerAudioContext.autoplay = true
                                innerAudioContext.src = 'https://tsn.baidu.com/text2audio?tex=' + encodeURI(res.data.msg) + '&lan=zh&cuid=00%20-%20CF%20-%20E0%20-%204A-0F-19&vol=15&ctp=1&tok=24.6be9789b8520e2550ef52f03672dbd4c.2592000.1541409606.282335-14254401'
                                innerAudioContext.onPlay(() => {
                                })
                                wx.showToast({
                                    title: res.data.msg,
                                    icon: 'none',
                                    duration: 2000
                                })
                            }

                        }
                    })
                    // console.log(res)
                    that.setData({
                        show: this.show
                    })
                    wx.showToast({
                        title: '扫描成功',
                        icon: 'success',
                        duration: 1000
                    })

                },
                fail: (res) => {
                    wx.showToast({
                        title: '扫描失败',
                        icon: 'none',
                        duration: 2000
                    })
                    // wx.reLaunch({
                    //     url: '/pages/ship/ship',
                    // })
                }
            })
        }else{
            wx.showToast({
                title: '请先选择收货人',
                icon:'none',
                duration:4000
            })
        }
        


    }
})