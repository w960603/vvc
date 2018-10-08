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
                this.globalData.statusBarHeight = res.statusBarHeight;
            }
        })
    },


    globalData: {
        userInfo: null,
        token: null,
        statusBarHeight: '',
        userinfo: null,
        latitude: null,
        longitude: null,
        speed: null,
        accuracy: null,

        goodslist: null,

        login_access: null,

        author:false,


    },
    // onLoad: function() {
    //     wx.setTabBarItem({
    //         index: 1,
    //         text: 'text',
    //         iconPath: '/path/to/iconPath',
    //         selectedIconPath: '/path/to/selectedIconPath'
    //     })
    // },

    has_token() {
        if(!this.globalData.token){
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

        
        // var token = this.globalData.token ? this.globalData.token : 'a0be9f07dbdd1546a8ca12ab62ed5de7';

        // if (!token) {
        //     console.log("没有token")
        //     wx.reLaunch({
        //         url: '/pages/login/login',
        //     })
        // }

        if (option.data) {
            for (let key in option.data) {

                arr.push(key + option.data[key])
            }
        }
        //console.log(token + inset.concat(arr).sort().join(''), encodeURIComponent(token + inset.concat(arr).sort().join('')))
        let md5str = md5('dl' + md5(encodeURIComponent(token + inset.concat(arr).sort().join('')))).substr(4, 16);

        // console.log(md5str)
        requestTask = wx.request({
            url: option.url,
            method: option.method ? option.method : 'post',
            data: option.data,
            header: {
                token: token,
                sign: md5str,
                timestamp: time,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            success: (res)=>{
                if(res.data.code==9527){
                    wx.reLaunch({
                        url: '/pages/login/login',
                    })
                    wx.showToast({
                        title: '登录失败,请重新登录',
                        icon:'none',
                        duration:3000
                    })
                    return 
                }

                option.success(res)
                }
        })
    },
})