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
        scaned: false,
        focus: true,

        route: '',
        connected: false,
        discoveryStarted: false,

    },
    bindPickerChange: function(e) {

        var data = this.data.array[e.detail.value];

        this.setData({
            arr1: this.data.array[e.detail.value]
        })
    },
    submit(e) {
        console.log(e)

        let datas;
        if (e.detail.value.length == 8) {
            if (this.data.arr == '零售') {
                datas = {
                    nick_name: this.data.express,
                    qr: this.data.qrcode,
                    type: 2
                };
                this.request_record(
                    datas,
                    (res) => {
                        if (res.data.code === 1) {
                            this.setData({
                                ["ship.log"]: res.data.data.log,
                                ["ship.goods"]: res.data.data.goods,
                                ['user.nick_name']: e.detail.value,
                                arr1: '零售',
                            });
                        }
                    }
                )
            } else {
                datas = {
                    img_url: this.data.user.img_url,
                    h_id: this.data.user.id,
                    nick_name: this.data.user.nick_name,
                    qr: e.detail.value
                };
                this.request_record(
                    datas,
                    (res) => {
                        if (res.data.code == 1) {
                            this.setData({
                                ["ship.log"]: res.data.data.log,
                                ["ship.goods"]: res.data.data.goods,
                                isRetail: false
                            })
                        }
                    }
                )
            }
        } else if (e.detail.value.length === 12 || e.detail.value.length === 16) {
            this.setData({
                express: e.detail.value,
                isRetail: true,
                ['user.nick_name']: e.detail.value,
                arr1: '零售'
            })
        }
    },
    blur(e) {
        // console.log(this.data.focus)

    },
    attached: function() {
        app.request({
            url: 'https://xxx.xxx.xxx/user/getSubAddress',
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
        this.setData({
            isshow3: true
        });
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

    openBle() {
        let that = this;
        wx.showLoading()
        wx.openBluetoothAdapter({
            success: function(res) {

                that.startBleSearch()

            },
            fail: function(res) {
                that.setData({
                    connected: false
                })
                wx.showToast({
                    title: '请确认您的设备支持蓝牙,并已开启蓝牙功能',
                    icon: 'none',
                    duration: 5000
                })
            },
            complete: function(res) {
                wx.hideLoading()
            },
        })
    },
    
    startBleSearch() {

        if (this.discoveryStarted) {
            return
        }
        this.discoveryStarted = true
        wx.startBluetoothDevicesDiscovery({
            allowDuplicatesKey: true,
            success: (res) => {
                console.log('startBluetoothDevicesDiscovery success', res)

                this.onBluetoothDeviceFound()
            },
            complete(res) {
                console.log(res)
            }
        })
    },
    onBluetoothDeviceFound() {
        wx.onBluetoothDeviceFound((res) => {
            // console.log(res)
            this.setData({
                list: res.devices
            })
            res.devices.forEach(device => {
                if (!device.name && !device.localName) {
                    return
                }
                if (device.name.indexOf("HPRT-") != -1) {
                    //找到汗印
                    this.setData({
                        deviceId: device.deviceId,
                        motto: device.name
                    })
                    this.createBLEConnection(device.deviceId)
                    wx.stopBluetoothDevicesDiscovery({
                        complete: () => {
                            this.discoveryStarted = false
                        }
                    })
                    return
                }
            })
        })
    },

    createBLEConnection(ds) {
        const deviceId = ds //  MAC
        // const name = ds.name      //  蓝牙名称
        
        wx.createBLEConnection({
            deviceId,
            success: () => {
                console.log("蓝牙连接成功")
                this.initBluetoothDevices(deviceId)
                this.setData({
                    connected:true
                })
            },
            fail: (res) => {
                if (res.errCode == -1) {
                    console.log("蓝牙已经被连接")
                    this.initBluetoothDevices(deviceId)
                }
                console.log("蓝牙失败", res)
            },
            complete() {
                
            }
        })

    },
    initBluetoothDevices(deviceId) {
        console.log(deviceId)
        // 遍历所有服务，和子服务        。安卓直接 UUID连接。。苹果需要遍历
        wx.getBLEDeviceServices({
            deviceId: deviceId,
            // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
            success(res) {
                console.log('device getBLEDeviceCharacteristics:', res)
                for (let i = 0; i < res.services.length; i++) {
                    if (res.services[i].isPrimary) {
                        wx.getBLEDeviceCharacteristics({
                            deviceId: deviceId,
                            serviceId: res.services[i].uuid,
                            success: (res1) => {
                                for (let ii = 0; ii < res1.characteristics.length; ii++) {
                                    const item = res1.characteristics[ii]
                                    if (item.properties.notify || item.properties.indicate) { // 订阅权限
                                        //一个个的注册 订阅服务  //仅限苹果
                                        wx.notifyBLECharacteristicValueChange({
                                            deviceId: deviceId,
                                            serviceId: res.services[i].uuid,
                                            characteristicId: item.uuid,
                                            state: true,
                                            success(res) {

                                            },
                                            fail(res) {
                                                console.log(res)
                                            }
                                        })
                                    }
                                }
                            },
                            fail(res) {
                                console.log(res, res.services[i].uuid)
                            }
                        })

                    }
                }
            },
            fail(res) {
                console.log(res)
            }
        })

        // 向蓝牙设备发送       设备震动
        var buffer = new Uint8Array([0x05, 0x01, 0x06, 0x0c]).buffer
        wx.writeBLECharacteristicValue({
            deviceId: this.data.deviceId,
            serviceId: "0000FF00-0000-1000-8000-00805F9B34FB",
            characteristicId: "0000FF02-0000-1000-8000-00805F9B34FB", // 服务的 订阅 ID  00FF01
            value: buffer,
        })
        // 向蓝牙设备发送       响
        var buffer = new Uint8Array([0x04, 0x02, 0x01, 0x03, 0x0a]).buffer
        wx.writeBLECharacteristicValue({
            deviceId: this.data.deviceId,
            serviceId: "0000FF00-0000-1000-8000-00805F9B34FB",
            characteristicId: "0000FF02-0000-1000-8000-00805F9B34FB", // 服务的 订阅 ID  00FF01
            value: buffer,
        })

        //注册事件监听回调
        wx.onBLECharacteristicValueChange((res) => {
            if (res.value.byteLength > 8) {
                var int8View = new Int8Array(res.value);
                if (int8View[0] == -63) {
                    //如果为 数据协议
                    var str = int8View.slice(2, 1 + int8View[1])
                    var scan = ""
                    for (var i = 0; i < str.length; i++) {
                        if (str[i] > 47 && str[i] < 58) {
                            scan += (str[i] - 48).toString(16)
                        }
                    }
                    console.log(this)
                    console.log(scan) // 这里为 扫描到的，数字条码
                    this.setData({
                        arr1 : '零售'
                    })

                    if(scan.length==8){
                        this.setData({
                            qrcode: scan
                        })
                        var datas = {
                            nick_name: this.data.express,
                            qr: scan,
                            type: 2
                        }
                        this.request_record(
                            datas,
                            (res) => {
                                if (res.data.code === 1) {
                                    this.setData({
                                        ["ship.log"]: res.data.data.log,
                                        ["ship.goods"]: res.data.data.goods,
                                    });

                                }

                            }
                        )

                    }else if(scan.length===12||scan.length===14||scan.length===16){
                        this.setData({
                            express:scan
                        })
                    }


                } else if (true) {
                    //为其他协议广播时
                }
            }

        })
    },
    onLoad: function (option) {
        this.setData({
            route: this.route
        })
        if (!app.globalData.tok)
            app.getToken();
        //适应ipx
        this.setData({
            h: 'padding-top:' + app.globalData.statusBarHeight * 2 + "rpx"
        })
        this.setData({
            fill: 'padding-top:' + parseInt(app.globalData.statusBarHeight * 2 + 88) + "rpx"
        });

        app.request({
            url: 'https://xxx.xxx.xxx/user/hairlog',
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
            url: 'https://xxx.xxx.xxx/user/hair',
            data: data,
            success: (res) => {
                if (res.data.code == 1) {
                    // this.setData({ ship: res.data.data })

                    callback && callback(res);

                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 3000
                    })

                    const innerAudioContext = wx.createInnerAudioContext()
                    innerAudioContext.autoplay = true
                    innerAudioContext.src = 'https://tsn.baidu.com/text2audio?tex=' + encodeURI(res.data.msg) + '&lan=zh&cuid=00%20-%20CF%20-%20E0%20-%204A-0F-19&ctp=1&vol=15&tok=' + app.globalData.tok
                    innerAudioContext.onPlay(() => { });

                } else if (res.data.code == 0) {
                    const innerAudioContext = wx.createInnerAudioContext()
                    innerAudioContext.autoplay = true
                    innerAudioContext.src = 'https://tsn.baidu.com/text2audio?tex=' + encodeURI(res.data.msg) + '&lan=zh&cuid=00%20-%20CF%20-%20E0%20-%204A-0F-19&vol=15&ctp=1&tok=' + app.globalData.tok
                    innerAudioContext.onPlay(() => { });
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
        
        wx.scanCode({
            success: (su) => {

                let datas = null;

                if (!/http/.test(su.result)) {
                    console.log('选了零售')

                    this.setData({
                        express: su.result,
                        isRetail: true,
                        ['user.nick_name']: su.result,
                        arr1: '零售'
                    })

                } else {
                    this.setData({
                        qrcode: su.result.match(/(\d{8,13})/)[1]
                    });
                    if (this.data.isRetail) {
                        datas = {
                            nick_name: this.data.express,
                            qr: this.data.qrcode,
                            type: 2
                        }
                        this.request_record(
                            datas,
                            (res) => {
                                if (res.data.code === 1) {
                                    this.setData({
                                        ["ship.log"]: res.data.data.log,
                                        ["ship.goods"]: res.data.data.goods,
                                        ['user.nick_name']: su.result,
                                        arr1: '零售',
                                    });
                                }
                            }
                        )
                    } else {
                        console.log("没选零售");
                        this.show = "--result:" + su.result + "--scanType:" + su.scanType + "--charSet:" + su.charSet + "--path:" + su.path;

                        datas = {
                            img_url: this.data.user.img_url,
                            h_id: this.data.user.id,
                            nick_name: this.data.user.nick_name,
                            qr: this.data.qrcode
                        };
                        this.request_record(
                            datas,
                            (res) => {
                                if (res.data.code == 1) {
                                    this.setData({
                                        ["ship.log"]: res.data.data.log,
                                        ["ship.goods"]: res.data.data.goods,
                                        isRetail: false
                                    })

                                }

                            }
                        )
                    }

                }

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

    }
})