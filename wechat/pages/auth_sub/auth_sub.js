// pages/auth_manage/auth_manage.js
const app = getApp();
Page({
    data: {
        //适应ipx
        h: '',
        fill: '',
        info: {
            truename: '',
            phone: '',
            wechat: '',
            passport: '',
            manage_tel: '',
            dianpu: '',
            alibaba: '',
            wechat_pay: '',
            bank_name: '',
            card_name: '',
            card_num: '',
            manager:'',
            nick_name:'',
            level:'',
            },
        titles:"我的授权",
        hidden:true,
        reg_code:'',
        img:'',
        iphonex: '',
    },
    goback() {
        wx.navigateBack();
    },
    
    inputed(e) {
        console.log(e)
        this.data.info[e.currentTarget.dataset.data] = e.detail.value
        this.setData({ info: this.data.info });
        console.log(this.data.info)
    },
    save_auth(e) {
        wx.downloadFile({
            url: "https://xxx.xxx.xxx/user/authImg?reg_code=" + this.data.info.reg_code,
            success: (res) => {
                //图片保存到本地
                wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success: (data) => {

                        wx.showToast({
                            title: '保存成功',
                            icon: 'success',
                            duration: 2000
                        });

                        this.setData({
                            img_show: false
                        })
                    },
                    fail: (err) => {

                        wx.showToast({
                            title: '保存失败',
                            icon: 'none',
                            duration: 1500
                        })

                        this.setData({
                            img_show: false
                        })
                    },
                    complete: () => {
                        wx.hideLoading()
                        this.close();
                    }
                })
            }
        })
    },
    orderMeeting(e) {
        app.request({
            url: 'https://xxx.xxx.xxx/user/updateauthinfo',
            method:'post',
            data: this.data.info,
            success:(res)=>{
                console.log(res,95)
                var msg;
                if (res.data.code == 1){
                    
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 2000,
                        mask: true,
                    })
                }else{
                    
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 2000,
                        mask: true,
                    })
                }
               
            }
        })
    },
    showAlbum(){
        this.setData({
            hidden:!this.data.hidden
        })
        app.request({
            url: 'https://xxx.xxx.xxx/user/authImg',
            method:'GET',
            data: {
                reg_code: this.data.info.reg_code
            },
            success:(res)=>{
                console.log(res)
                this.setData({
                    reg_code:res.data
                })
            }

        })
    },
    close(){
        this.setData({
            hidden: true
        })
    },

    onLoad: function (options) {
        this.setData({
            route: this.route
        })
        //适应ipx
        this.setData({ h: 'padding-top:' + app.globalData.statusBarHeight * 2 + "rpx" })
        this.setData({ fill: 'padding-top:' + parseInt(app.globalData.statusBarHeight * 2 + 88) + "rpx" });

        if (app.globalData.model == 'iphonex') {
            this.setData({ iphonex: "padding-bottom:60rpx", icon: 'bottom:74rpx' });
        } else {
            this.setData({ iphonex: '' })
        }


        app.request({
            url:'https://xxx.xxx.xxx/user/authinfo',
            method:'post',
            success:(res)=>{
                console.log(res)
                this.setData({
                    info: res.data.data
                })
            }
        })
        
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

})
