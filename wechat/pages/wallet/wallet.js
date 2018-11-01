// pages/wallet/wallet.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
    date1:null,
      order_list: [],
      route: '',

      //适应ipx
      h: '',
      fill: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function (options) {
        this.setData({
            route: this.route
        })

      //适应ipx
      this.setData({ h: 'padding-top:' + app.globalData.statusBarHeight * 2 + "rpx" })
      this.setData({ fill: 'padding-top:' + parseInt(app.globalData.statusBarHeight * 2 + 88) + "rpx" })

    Date.prototype.Format = function (fmt) { //author: meizz
      var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    };
    var time = new Date().Format("yyyy-MM-dd")
    this.setData({date1:time});

    app.request({
        url: 'https://xxx.xxx.xxx/user/wallet',
      method: "POST",
      success:(res)=>{
          console.log(res)
        //   if (res.code) {
              this.setData({ userinfo: res.data.data.user });
              this.setData({ order_list: res.data.data.order_list })

        //   }

      }
    })

  },

  goback:function(){
      wx.navigateBack({
      })
  },
    top_up(){
        wx.navigateTo({
            url:'../top_up/top_up',
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
  goback1: function () {
    console.log("我走啦");
    wx.navigateBack({

    })
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
