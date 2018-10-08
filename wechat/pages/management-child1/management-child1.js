const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {

        //适应ipx
        h: '',
        fill: '',

        item: '',
        
        itemList: ['天使', '仙女', '女神'],

        infos:{},

        selected:true,

        num:null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(JSON.parse(options.info));
        this.setData({infos: JSON.parse(options.info)})

        //适应ipx
        this.setData({
            h: 'padding-top:' + app.globalData.statusBarHeight * 2 + "rpx"
        })
        this.setData({
            fill: 'padding-top:' + parseInt(app.globalData.statusBarHeight * 2 + 188) + "rpx"
        })
    },
    goback() {
        wx.navigateBack();
    },
    show_list() {
        wx.showActionSheet({
            itemList: this.data.itemList,
            success: (res) => {
                console.log(res)
                console.log(this.data.infos)
                this.setData({
                    item: this.data.itemList[res.tapIndex],
                    ['infos.lvl']:res.tapIndex+1

                });
                console.log(this.data.infos)
            },
            fail: function (res) {
                console.log(res.errMsg)
            }
        })
    },

    submit(){

        if(this.data.infos.lvl){
            this.setData({ selected: true })
            app.request({
                url: 'https://api.vvc.tw/dlxin/user/buyCode',
                methods: 'POST',
                data: {
                    reg_code: this.data.infos.joincode,
                    level: this.data.infos.lvl
                },
                success: (res) => {

                    if(res.data.code==1){
                        wx.redirectTo({
                            url: '../extension/extension',
                           
                        }) ;
                        wx.showToast({
                            title: res.data.msg,
                            duration: 3000
                        })
                    }else{
                        wx.showToast({
                            title: res.data.msg,
                            icon: 'none',
                            duration: 3000
                        })
                    }
                    
                }
            })
        }else{
            this.setData({selected:false})
            wx.showToast({
                title: "请先选择级别",
                icon:'none',
                duration:6000
            })
        }
        
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})