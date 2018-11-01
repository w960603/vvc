const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

      oytarr: [],

      //适应ipx
      h: '',
      fill: '',
      money: 0,
      route: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function (options) {
        this.setData({
            route: this.route
        })
      wx.showToast({
          title: options.info,
          icon: 'none',
          duration: 3000
      })
      console.log(options);
    //   this.data.money = options.money
      this.setData({ money: options.money});
      //适应ipx
      this.setData({ h: 'padding-top:' + app.globalData.statusBarHeight * 2 + "rpx" })
      this.setData({ fill: 'padding-top:' + parseInt(app.globalData.statusBarHeight * 2 + 88) + "rpx" })

    wx.getStorage({
        key: 'log',
        success: (res) =>{
            console.log(res.data)
            this.setData({
                oytarr: res.data
            })
            
        },
    })
                  

       
  },
    go_home(){
        console.log(2)
        wx.switchTab({
            url: '../home/home',
        })
    },
    looklist(){
        wx.switchTab({
            url: '../order/order',
        })
    },
    jumpToDetail(e) {
        wx.navigateTo({
            url: '../detail/detail?id=' + e.currentTarget.dataset.id
        })
    },
    navigateBack() {
        wx.navigateBack()
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
