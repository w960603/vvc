// pages/auth_manage/auth_manage.js
const app = getApp();
Page({
  data: {
      //适应ipx
      h: '',
      fill: ''
  },
//   input数据双向绑定
    nicknameInput(e){
        this.setData({
            nickname:e.detail.value
        })
    },
   accountInput(e){
        this.setData({
            account:e.detail.value
        })
    },
    passwordInput(e) {
        this.setData({
            password: e.detail.value
        })
    },
    passtrueInput(e) {
        this.setData({
            passtrue: e.detail.value
        })
    },
    invationInput(e) {
        this.setData({
            invation: e.detail.value
        })
    },
    alipayInput(e) {
        this.setData({
            alipay: e.detail.value
        })
    },
    nameInput(e) {
        this.setData({
            name: e.detail.value
        })
    },
    phoneInput(e){
        this.setData({
            phone:e.detail.value
        })
    },
    orderMeeting(e){
        var nickname = this.data.nickname
        console.log(nickname,123)
        var account = this.data.account
        console.log(account,555)
        var password = this.data.password
        var passtrue = this.data.passtrue
        var invation = this.data.invation
        var alipay = this.data.alipay
        var name = this.data.name
        console.log(name,145)
        var phone = this.data.phone
        console.log(phone,115)
    },

    onLoad: function (options) {
        this.setData({
            route: this.route
        })
      //适应ipx
      this.setData({ h: 'padding-top:' + app.globalData.statusBarHeight * 2 + "rpx" })
      this.setData({ fill: 'padding-top:' + parseInt(app.globalData.statusBarHeight * 2 + 88) + "rpx" })
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
