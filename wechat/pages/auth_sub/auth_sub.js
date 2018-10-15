// pages/auth_manage/auth_manage.js
const app = getApp();
Page({
    data: {
        //适应ipx
        h: '',
        fill: '',
        info:{},
        titles:"我的授权",
        hidden:true,
        reg_code:'',
        img:''
    },
    goback() {
        wx.navigateBack();
    },
    
    // inputed(e) {
    //     this.data.info[e.currentTarget.dataset.info] = e.detail.value
    //     this.setData({ info: this.data.info });
    //     console.log(this.data.info)
    // },

    orderMeeting(e) {
        app.request({
            url: 'https://api.vvc.tw/dlxin/user/updateauthinfo',
            method:'post',
            success:(res)=>{
                console.log(res,95)
                var msg;
                if (res.data.code == 1){
                    msg = 'OK，等待审核'
                    wx.showToast({
                        title: msg,
                        icon: 'success',
                        image: '',
                        duration: 2000,
                        mask: true,
                    })
                }else{
                    msg = '提交失败T_T'
                    wx.showToast({
                        title: msg,
                        icon: 'loading',
                        image: '',
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
            url: 'https://api.vvc.tw/dlxin/user/authImg',
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
        //适应ipx
        this.setData({ h: 'padding-top:' + app.globalData.statusBarHeight * 2 + "rpx" })
        this.setData({ fill: 'padding-top:' + parseInt(app.globalData.statusBarHeight * 2 + 88) + "rpx" });

        if (app.globalData.model == 'iphonex') {
            this.setData({
                margin: 'margin-bottom:188rpx',
                bottom: 'bottom:188rpx'
            })
        } else {
            this.setData({
                margin: 'margin-bottom:118rpx',
                bottom: 'bottom:118rpx'
            })
        }


        app.request({
            url:'https://api.vvc.tw/dlxin/user/authinfo',
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
