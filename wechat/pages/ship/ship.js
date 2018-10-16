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
        

        //适应ipx
        h: '',
        fill: '',
        qrcode: '',
        express: '',

        isRetail: false,
        scaned:false,
        focus

    },
    bindPickerChange: function(e) {

        var data = this.data.array[e.detail.value];

        this.setData({
            arr1: this.data.array[e.detail.value]
        })
    },
    submit(e){
        console.log(e)
    },
    blur(e){
        console.log(e)
        
    },
    attached: function() {
        app.request({
            url: 'https://api.vvc.tw/dlxin/user/getSubAddress',
            methos: 'post',
            success: (res) => {

                if (res.data.code == 1) {
                    this.setData({
                        user: res.data.data,
                    })
                }

            }

        })
    },

    goback: function() {
        wx.switchTab({
            url: "../my/my",
        })
    },
    ship_search(e) {
        if (this.data.arr1 === '零售') {
            this.setData({
                isRetail: true,
                isshow3: false
            })
        } else {
            this.setData({
                isRetail: false,
                isshow3: true
            });
        }
    },
    close(e) {
        this.data.shipid = e.currentTarget.dataset.shipid
        this.setData({
            isshow3: !this.data.isshow3
        })
    },
    adduser(e) {
        this.setData({
            user: e.detail,
            isshow3: false
        })
    },

    onLoad: function(option) {

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
                this.setData({
                    ["ship.log"]: res.data.data
                })
            }
        })
    },
    input_number: function(e) {
        this.setData({
            express: e.detail.value
        });
    },
    search() {

        wx.showToast({
            title: '请扫描防伪码',
        })
    },

    request_record(data, callback) {
        app.request({
            url: 'https://api.vvc.tw/dlxin/user/hair',
            data: data,
            success: (res) => {
                if (res.data.code == 1) {
                    // this.setData({ ship: res.data.data })

                    callback && callback(res);

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

                } else if(res.data.code==0){
                    const innerAudioContext = wx.createInnerAudioContext()
                    innerAudioContext.autoplay = true
                    innerAudioContext.src = 'https://tsn.baidu.com/text2audio?tex=' + encodeURI(res.data.msg) + '&lan=zh&cuid=00%20-%20CF%20-%20E0%20-%204A-0F-19&vol=15&ctp=1&tok=24.6be9789b8520e2550ef52f03672dbd4c.2592000.1541409606.282335-14254401'
                    innerAudioContext.onPlay(() => {})
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 3000
                    })
                }

            }
        })
    },
    scan_click: function() {
        var that = this;
        var show;
        
        if (this.data.user || this.data.express) {
            wx.scanCode({
                success: (res) => {
                    this.show = "--result:" + res.result + "--scanType:" + res.scanType + "--charSet:" + res.charSet + "--path:" + res.path;
                    this.setData({
                        qrcode: res.result.match(/(\d{8,13})/)[1]
                    });
                    let datas = null;
                    
                    if (this.data.isRetail) {
                        // console.log('选了零售')
                        datas = {
                            nick_name: this.data.express,
                            qr: this.data.qrcode,
                            type: 2
                        }
                    } else {
                        // console.log("没选零售");
                        datas = {
                            img_url: this.data.user.img_url,
                            h_id: this.data.user.id,
                            nick_name: this.data.user.nick_name,
                            qr: this.data.qrcode
                        }
                    }

                    this.request_record(
                        datas,
                        (res)=> {
                            
                            this.setData({
                                ["ship.log"]: res.data.data.log,
                                ["ship.goods"]: res.data.data.goods,
                                express:''
                            })
                            
                                
                        }

                    )

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
                }
            })
        } else {
            wx.showToast({
                title: '请先选择收货人',
                icon: 'none',
                duration: 4000
            })
        }

    }
})