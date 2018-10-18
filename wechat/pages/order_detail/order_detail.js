const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
      list:{},
      //适应ipx
      h: '',
      fill: '',
      id:null,
    //   objs:{
    //       status:"已签收",
    //       ordernum:"20180822131303923",
    //       datas:[
    //           {address:"福建省厦门市思明区前埔路168号乐范售后部",time:"2018-08-22 09:48:45"},
    //           { address: "福建省厦门市思明区前埔路168号乐范售后部", time: "2018-08-22 09:48:45" },
    //           { address: "【厦门市】王铁柱公司派件员正在为您派件", time: "2018-08-22 09:48:45" },
    //           { address: "【浙江杭州】正在进行装袋扫描", time: "2018-08-22 09:48:45" },
    //           { address: "【浙江杭州】正在进行装袋扫描", time: "2018-08-22 09:48:45" },
    //         ]
    //     },
        objs:{},
        isshow:false,
  },
    navigateBack() {
        wx.navigateBack({ delta: 1 })
    },
  /**
   * 生命周期函数--监听页面加载
   */
    fond_logisti(e){
        // console.log(e.currentTarget.dataset.index);
        console.log(this.data.list.sends[e.currentTarget.dataset.index].nu.length);
        if(this.data.list.sends[e.currentTarget.dataset.index].nu.length > 11){
            this.setData({ isshow: !this.data.isshow });
            app.request({
                url: "https://api.vvc.tw/dlxin/kdbird/getlogistic",
                data: {
                    nu: this.data.list.sends[e.currentTarget.dataset.index].nu,
                    company: this.data.list.sends[e.currentTarget.dataset.index].company
                },
                success: (res) => {
                    // console.log(res)
                    if (res.data.code == 1) {
                        console.log(res.data);
                        var arr = res.data.data;
                        arr.Traces.reverse(function (a, b) {
                            return a - b;
                        });
                         console.log(arr);
                        this.setData({ objs: arr });
                    }
                }
            })
        }
    },
  onLoad: function (options) {
      wx.showLoading({
          title: '加载中',
      })
      this.setData({ id: options.id })
      console.log(this.data.id)
      //适应ipx
      this.setData({ h: 'padding-top:' + app.globalData.statusBarHeight * 2 + "rpx" })
      this.setData({ fill: 'padding-top:' + parseInt(app.globalData.statusBarHeight * 2 + 88) + "rpx" })
      app.request({
          url:'https://api.vvc.tw/dlxin/order/orderinfo',
          data:{
              id: this.data.id
          },
          success:(res)=>{
              console.log("我走啦",res);

              if(res.data.code==1){
                //   console.log(res)
                  this.setData({list:res.data.data});
              }
          }
      });
      
    //请求出货记录
  },
    quxiao(){
        this.setData({ isshow: false});
    },
    max_quxiao(){
        this.setData({ isshow: false });
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
      wx.hideLoading()
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
