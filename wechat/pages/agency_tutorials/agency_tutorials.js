// pages/agency_tutorials/agency_tutorials.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
    onShow() {
        wx.showShareMenu({
            withShareTicket: true
        })

        app.data.webShowed = true;
    },
    onShareAppMessage() {
        return {
            title: '分享标题',
            path: '/pages/index/index' // 分享出去后打开的页面地址
        }
    },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

      wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: '#333',
          animation: {
              duration: 400,
              timingFunc: 'easeIn'
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
     
        //   var app = getApp();
        //   app.data.webShowed = true;//标记已经显示过web-view页了
      
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

})
