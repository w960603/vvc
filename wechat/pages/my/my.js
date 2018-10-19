// pages/my/my.js
const app = getApp();
Page({
    data: {

        userInfo: {
            // avatarUrl: '../../image/logo.jpg', nike_name:'alex'
        },

        orderList: [{
                list: "../../image/icon/team_order.svg",
                name: '团队订单'
            },
            {
                list: "../../image/icon/shipping_details.svg",
                name: '发货详情'
            },
            {
                list: "../../image/icon/scan.svg",
                name: '扫码发货',
            },
            {
                list: "../../image/icon/ordersort.svg",
                name: '排单顺序'
            },
            {
                list: "../../image/icon/after_sale.svg",
                name: '售后',
                id: 5
            }
        ],
        myList: [{
                my_img: "../../image/icon/one.svg",
                my_text: "我的钱包",
                url: '../wallet/wallet'
            },
            {
                my_img: "../../image/icon/ten.svg",
                my_text: "我的授权",
                url: '../auth_sub/auth_sub'
            },
            {
                my_img: "../../image/icon/two.svg",
                my_text: "我的推广码",
                url: '../extension/extension'
            },
            {
                my_img: "../../image/icon/three.svg",
                my_text: "团队管理",
                url:'my'
            },
            {
                my_img: "../../image/icon/four.svg",
                my_text: "地址管理",
                url: '../address/address'
            },
            {
                my_img: "../../image/icon/five.svg",
                my_text: "授权查询",
                url: '../authorization/authorization'
            },
            {
                my_img: "../../image/icon/six.svg",
                my_text: "防伪查询",
                url: '../security/security'
            },
            {
                my_img: "../../image/icon/seven.svg",
                my_text: "问题反馈",
                url: 'my',
                bool: true
            },
            {
                my_img: "../../image/icon/nine.svg",
                my_text: "代理培训",
                url: '../agency_tutorials/agency_tutorials'
            },
            {
                my_img: "../../image/icon/eight.svg",
                my_text: "退出登录",
                url: '../login/login',
            },
            
        ],
        user:null,
        team:null,
        hair_log:null

    },
    onLoad: function() {

        wx.hideTabBar({
            success: function(res) {
            },
            complete: function() {
            }
        })

        

        app.request({
            url: 'https://api.vvc.tw/dlxin/user/userinfo',
            
            method: "POST",
            success: (res) => {
                if (res.data.code==1) {

                    app.globalData.userinfo = res.data.data;
                    this.setData({
                        userInfo: res.data.data
                    })
                    this.setData({
                        userInfo1: res.data.data
                    })
                }
            },
        })
    },
    onShow:function(){
        app.request({
            url: 'https://api.vvc.tw/dlxin/user/hairInfo',
            method: 'POST',
            success: (res) => {
                if (res.data.data && res.data.code == 1) {
                    this.setData({ user: res.data.data.user })
                    this.setData({ team: res.data.data.team })
                    this.setData({ hair_log: res.data.data.hair_log })
                }
            }
        })
    },
    /**
     * 组件的方法列表
     */
    indexclick(e) {
        var that = this;
        var item = e.currentTarget.dataset.item;
        
        if(item.my_text==='退出登录'){
            wx.reLaunch({
                url: '../login/login'
            });

            wx.cloud.callFunction({
                // 云函数名称
                name: 'getuserinfo',
                // 传给云函数的参数
                data: {
                    cmd: "del"
                },
            })
            app.request({
                url: "https://api.vvc.tw/dlxin/index/logout",
                method: "POST",
                success: (res) => {
                    if (res.data.code == 1) {

                        app.globalData.flag = true;
                    
                        wx.reLaunch({
                            url: '/pages/login/login',
                        })
                    }
                }
            })
               
        } else{
            wx.navigateTo({
                url: item.url,
            })
        }
    },
    currentIndex(e) {
        let that = this;
        let index = e.currentTarget.dataset.index;
        if (index == 0) {
            wx.navigateTo({
                url: '../team_order/team_order'
            })
        }
        if (index == 1) {
            console.log(123)
            wx.navigateTo({
                url: '../ship_detail/ship_detail'
            })

            // wx.showToast({
            //     title: '暂未开放',
            //     icon:'none',
            //     duration:3000
            // })
        }
        if (index == 2) {
            wx.navigateTo({
                url: '../scan/scan'
            })
        }
        if (index == 3) {
            wx.showToast({
                title: '无需排单',
                icon: 'none',
                duration: 2000
            })
        }
        if (index == 4) {
            var num = 3
            wx.navigateTo({
                url: '../after_sale/after_sale?index=' + num
            })
        }
    },
})