// pages/team/team.js

const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //适应ipx
        h: '',
        fill: '',

        response:{},
        img:'',

        num: 0,
        route: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            route: this.route
        })
        //适应ipx
        this.setData({
            h: 'padding-top:' + app.globalData.statusBarHeight * 2 + "rpx"
        })
        this.setData({
            fill: 'padding-top:' + parseInt(app.globalData.statusBarHeight * 2 + 88) + "rpx"
        })
    this.setData({
        img : app.globalData.userinfo.img_url
    })
    
        this.request()
    },
    goback() {

        wx.navigateBack()
    },

    search(e){
        let id = e.currentTarget.dataset.id;
        
        this.request({
            id:id,
            num:this.data.num++
        })
    },
    request(data){
        app.request({
            url:'https://xxx.xxx.xxx/user/groups',
            methods:'POST',
            data:data,
            success:res=>{
                console.log(res.data.data,this)
                if(res.data.code==1){
                    this.setData({
                        response:res.data.data
                    })
                }
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