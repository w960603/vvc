const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

      //适应ipx
      h: '',
      fill: '',

      info:'',

      infoList:{
          join_code:'',
          username:'',
          password:'',
          nick_name:'',
          alipay:'',
          wechat:'',
          truename:'',
          phone:'',
          password1:'',
      },

      status: true,
      backable:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
if(!!app.globalData.token){
    this.setData({ backable: true })
}else{
    this.setData({backable:false})
}
          

      this.setData({ ['infoList.join_code']: options.info})


      //适应ipx
      this.setData({
          h: 'padding-top:' + app.globalData.statusBarHeight * 2 + "rpx"
      })
      this.setData({
          fill: 'padding-top:' + parseInt(app.globalData.statusBarHeight * 2 + 138) + "rpx"
      })
  },
    confirm: function () {

        app.request({
            url: 'https://api.vvc.tw/dlxin/index/registerCode',
            method: 'post',
            data:this.data.infoList,
            success:(res)=>{
                if(res.data.code==1){
                    wx.redirectTo({
                        url:"../extension/extension"
                    })
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration:3000
                    })
                }else{
                    console.log(res.msg)
                    wx.showToast({
                        title: res.data.msg,
                        icon:'none'
                    })
                }
                console.log(res)
            }
      })
    },
    inputed(e){
        this.data.infoList[e.currentTarget.dataset.info] = e.detail.value
        this.setData({infoList:this.data.infoList});
        
    },

    checkpwd(e){
        if(e.detail.value==this.data.infoList.password){
            this.setData({status:true})
        }else{
            this.setData({ status: false })
        }
    },
    goback() {
        wx.navigateBack();
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
onShareAppMessage(){

}
})
