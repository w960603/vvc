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
      money:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options);
    //   this.data.money = options.money
      this.setData({ money: options.money});
      //适应ipx
      this.setData({ h: 'padding-top:' + app.globalData.statusBarHeight * 2 + "rpx" })
      this.setData({ fill: 'padding-top:' + parseInt(app.globalData.statusBarHeight * 2 + 88) + "rpx" })

      app.request({
        url: 'https://api.vvc.tw/dlxin/shop/goodslist',
          method: "POST",
          success: (res) => {
              console.log(res);
              if(res.data.code){
                  this.setData({
                      oytarr: res.data.data.goods_list
                  })

              }
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
