//app.js

import md5 from 'utils/md5.js';
wx.cloud.init();
var requestTask;
App({
    onLaunch: function() {

        //获取地理位置

        // 展示本地存储能力
        const updateManager = wx.getUpdateManager()

        updateManager.onCheckForUpdate((res) => {
            //   console.log(res.hasUpdate)
        })

        updateManager.onUpdateReady(() => {
            wx.showModal({
                title: '更新提示',
                content: '新版本已经准备好，是否重启应用？',
                success: (res) => {
                    if (res.confirm) {
                        updateManager.applyUpdate()
                    }
                },

            })
        }), updateManager.onUpdateFailed(() => {
            wx.showModal({
                title: '更新提示',
                content: '新版本下载失败',
                showCancel: false
            })
        });

        wx.getSystemInfo({
            success: (res) => {
                
                let model = res.model.toLowerCase().replace(/\s/g, '')
                if (model.indexOf('iphonex') > -1) {
                    this.globalData.model = 'iphonex'
                }

                this.globalData.statusBarHeight = res.statusBarHeight;
                
            }
        })
    },


    globalData: {
        userInfo: null,
        token: null,
        statusBarHeight: null,
        userinfo: null,
        latitude: null,
        longitude: null,
        speed: null,
        accuracy: null,
        goodslist: null,

        login_access: null,

        author: false,

        model: null,
        margin: null,
        padding: null,
        bottom: null,
        iphonex:''
    },

    has_token() {
        if (!this.globalData.token) {
            wx.reLaunch({
                url: '/pages/blank/blank',
            })
        }
    },
    request(option) {

        let arr = [];
        let time = new Date().getTime();
        const inset = [
            'formatjson',
            'sign_methodmd5',
            'v1.0',
            'timestamp' + time
        ];


        var token = this.globalData.token;

        if (option.data) {
            for (let key in option.data) {

                arr.push(key + option.data[key])
            }
        }

        let md5str = md5('dl' + md5(encodeURIComponent(token + inset.concat(arr).sort().join('')))).substr(4, 16);

        wx.request({
            url: option.url,
            method: option.method ? option.method : 'POST',
            data: option.data,
            header: {
                token: token,
                sign: md5str,
                timestamp: time,
            },
            success: (res) => {
                if (res.data.code == 9527) {
                    
                    wx.reLaunch({
                        url: '/pages/login/login',
                    });
                    wx.showToast({
                        title: '登录超时,请重新登录',
                        icon: 'none',
                        duration: 3000
                    })
                    wx.cloud.callFunction({
                        // 云函数名称
                        name: 'getuserinfo',
                        // 传给云函数的参数
                        data: {
                            cmd: "del"
                        },
                    })
                    
                    return
                }

                option.success(res)
            } ,
            fail:(err)=>{
                
            },
        })

    },
})