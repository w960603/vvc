const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //适应ipx
        h: '',
        fill: '',
        user: {
            // img: '../../image/false.png',
            // name: '王铁柱',
            // num: '79',
            // num1: 10,
            // num2: 50
        },

         team: [
        //  }
        //     img_url: '../../image/false.png',
        //     num3: 65,
        //     name2: '王翠花'
        // }, {
        //     img_url: '../../image/false.png',
        //     num3: 55,
        //     name2: '王翠花'
        // }, {
        //     img_url: '../../image/false.png',
        //     num3: 75,
        //     name2: '王翠花'
        // }
        ],
        hair_log: [
        //     {
        //     goods_title: 'Earth',
        //     username: '王大拿',
        //     time: '2018-08-22 09:45:24',
        //     status: 0,
        //     nick_name: '王翠花',
        //     num4: 600
        // }, {
        //     goods_title: 'Earth',
        //     username: '王大拿',
        //     time: '2018-08-22 09:45:24',
        //     nick_name: '王翠花',
        //     status: 1,
        //     num4: 600
        // }, {
        //     goods_title: 'Earth',
        //     username: '王大拿',
        //     time: '2018-08-22 09:45:24',
        //     status:1,
        //     nick_name: '王翠花',
        //     num4: 600
        // }
        ]
    },
    goback(){
        wx.navigateBack({
            delta:1
        })
    },
    scan_click(){
        wx.switchTab({
            url: '../ship/ship',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        //适应iPhoneX
        this.setData({
            h: 'padding-top:' + app.globalData.statusBarHeight * 2 + 'rpx'
        })
        this.setData({
            fill: 'padding-top:' + parseInt(app.globalData.statusBarHeight * 2 + 88) + 'rpx'
        })

        app.request({
            url: 'https://api.vvc.tw/dlxin/user/hairInfo',
            method:'POST',

            success:(res)=>{
                console.log(res.data.data)
                this.setData({user:res.data.data.user})
                this.setData({ team: res.data.data.team })
                this.setData({ hair_log: res.data.data.hair_log })
            }
        })
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

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
