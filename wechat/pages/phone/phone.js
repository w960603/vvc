var app = getApp();
var img=null;
Page({
    data: {
        url: '',
        base64: '',
        value: '',
        obj: {},
        accessid: "",
        signature: "",
        policy: "",
        keyname: "",
        num: 1,
        oyt: "",
        status: false,
        timer: null
    },
    onLoad: function() {
        this.ctx = wx.createCameraContext('myCamera');
    },
    error(e) {
        console.log(e)
    },
    stop(e) {
        console.log(e)
    },
    takePhoto: function() {
        // console.log(this.ctx, '拍照了')
        this.ctx.takePhoto({
            quality: "low",
            complete: (res) => {
                console.log(this,23428934);
                this.setData({
                    status: true
                })
                // clearInterval(this.timer)
                this.num1 = this.num1 + 1

                var timestamp1 = Date.parse(new Date());

                this.data.num++;

                var bianliang = this.obj.dir + timestamp1 + "_" + this.data.num + '_' + this.obj.timestamp + ".jpg";
                var oyt = "";
                wx.uploadFile({
                    url: 'https://oss1.vvc.tw/',
                    filePath: res.tempImagePath,
                    name: 'file',
                    type: 3,
                    formData: {
                        name: res.tempImagePath,
                        key: bianliang,
                        policy: this.obj.policy,
                        OSSAccessKeyId: this.obj.accessid,
                        success_action_status: "200",
                        signature: this.obj.signature,
                    },
                    success: (res) => {
                        console.log(res);
                        wx.request({
                            url: 'https://api.vvc.tw/dlxin/index/login',
                            method: "POST",
                            data: {
                                type: 3,
                                t: this.obj.t,
                                image: "https://oss1.vvc.tw/" + bianliang,
                            },
                            success: (res) => {
                                console.log(res);

                                if (res.data.code == 1) {
                                    wx.hideToast()

                                    app.globalData.userinfo = res.data.data.userinfo;
                                    app.globalData.token = res.data.data.token;

                                    console.log("t", this.t)
                                    clearTimeout(this.t);

                                    wx.switchTab({
                                        url: '/pages/home/home'　　 // 页面 A
                                    })
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
                                        title: "登录成功",
                                        icon: "success",
                                        duration: 1000
                                    })
                                    return
                                } else if (this.num1 > 10) {
                                    wx.hideToast()
                                    wx.navigateBack()
                                    wx.showToast({
                                        title: "验证失败",
                                        icon: "none",
                                        duration: 1000
                                    })

                                } else if (res.data.code == 2) {
                                    console.log(res.data)
                                    wx.showToast({
                                        title: res.data.msg,
                                        icon: 'none',
                                        
                                    })
                                    this.takePhoto()
                                } else {

                                    this.takePhoto()
                                }

                            }
                        })
                    },
                    fail: (err) => {
                        console.log(err)
                        // console.log('upladImage fail, errMsg is: ', errMsg)
                        // wx.showToast({
                        //   title: "上传失败",
                        //   duration: 1000
                        // })
                    },
                });
            },
            fail: (err) => {
                console.log("拍照失败");
                console.log(err)
            },

        })
    },
    onReady: function() {
        // app.globalData.success = false
        wx.getSystemInfo({
            success: (res)=> {
                this.w = res.screenWidth;
                this.h = res.screenHeight;
                console.log(this.w,this.h,'getsysteminfo')
            },
        })
        
        

        wx.request({
            url: 'https://api.vvc.tw/dlxin/index/getoss',
            method: "GET",
            success: (res) => {
                this.obj = res.data.data;

                console.log(this.obj);

                this.num1 = 0;
                setTimeout(() => {
                    this.takePhoto()
                    wx.showToast({
                        title: "正在人脸识别",
                        icon: 'loading',
                        duration: 10000
                    })

                }, 1000)

                // this.timer = setInterval(()=> {
                //     console.log(this.data.status)
                //     if (!this.data.status) {
                //         this.takePhoto()
                //     }
                // })
            }
        })

        this.t = setTimeout(
            () => {
                wx.hideToast()
                wx.redirectTo({
                    url: '../login/login',
                });
                // clearInterval(this.timer)
                wx.showToast({
                    title: '人脸登录失败',
                    icon: "none",
                    duration: 3000
                })
            }, 10000)
            
    },
    onUnload: function() {
        clearTimeout(this.t ? this.t : '')
        // clearInterval(this.timer)
        wx.hideLoading()
    }
})