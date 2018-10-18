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

        itemList2: [],
        upgradeLevel: null,
        infos: {},

        selected: true,

        num: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // console.log(JSON.parse(options.info));
        this.setData({
            infos: JSON.parse(options.info)
        })

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
                this.setData({
                    item: this.data.itemList[res.tapIndex],
                    ['infos.lvl']: res.tapIndex + 1

                });
                // console.log(this.data.infos)
            },
            fail: function(res) {
                // console.log(res.errMsg)
            }
        })
    },
    upgrade() {
        wx.showToast({
            title: '请选择要升级的级别',
            icon: 'none',
            duration: 1000000
        });
        if (this.data.infos.level === '天使') {
            this.data.itemList2 = ['仙女', '女神']
        } else if (this.data.infos.level === '仙女') {
            this.data.itemList2 = ['女神']
        } else {
            this.data.itemList2 = []
        };
        if (this.data.itemList2.length) {
            wx.showActionSheet({
                itemList: this.data.itemList2,
                success: (res) => {
                    this.data.upgradeLevel = this.data.itemList2[res.tapIndex];

                    if (this.data.upgradeLevel === '仙女') {
                        this.data.level = 2
                    } else if (this.data.upgradeLevel === '女神') {
                        this.data.level = 3
                    }

                    if (this.data.infos.level === '天使' && this.data.upgradeLevel === '女神') {

                        this.data.chajia = 400

                    } else {
                        this.data.chajia = 200
                    }
                    wx.showModal({
                        title: '升级到 ' + this.data.upgradeLevel + ' 级别,还需交押金' + this.data.chajia + '元',
                        content: '你确定要升级到 ' + this.data.upgradeLevel + ' 级别吗',
                        success:(res)=>{
                            app.request({
                                url:'https://api.vvc.tw/dlxin/user/codeUpgrade',
                                data:{
                                    id: this.data.infos.id,
                                    level:this.data.level   
                                },
                                 success:res=>{
                                    //  console.log(res)
                                    if(res.data.code==1){
                                        wx.showToast({
                                            title: '升级成功',
                                            duration:2000,
                                        })
                                        setTimeout(()=>{
                                            wx.navigateBack({

                                            })
                                        },1500)
                                        
                                    }
                                    
                                 }
                            })
                        }
                    })
                },
                fail: function(res) {
                    // console.log(res.errMsg)
                },
                complete: function() {
                    wx.hideToast()
                }
            })
        }


    },

    submit() {

        if (this.data.infos.lvl) {
            this.setData({
                selected: true
            })
            app.request({
                url: 'https://api.vvc.tw/dlxin/user/buyCode',
                methods: 'POST',
                data: {
                    reg_code: this.data.infos.joincode,
                    level: this.data.infos.lvl
                },
                success: (res) => {

                    if (res.data.code == 1) {
                        wx.redirectTo({
                            url: '../extension/extension',

                        });
                        wx.showToast({
                            title: res.data.msg,
                            duration: 3000
                        })
                    } else {
                        wx.showToast({
                            title: res.data.msg,
                            icon: 'none',
                            duration: 3000
                        })
                    }

                }
            })
        } else {
            this.setData({
                selected: false
            })
            wx.showToast({
                title: "请先选择级别",
                icon: 'none',
                duration: 6000
            })
        }

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

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})