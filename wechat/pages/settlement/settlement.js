
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
      shop_list:{},
      wfrobj:{},
      shopsku:[],
      wfraddress:{},
      num1:0,
      allprice:0,
      oneshop_price:0,
      form_token1:[],
    //   addItemContent:{}



      //适应ipx
      h: '',
      fill: '',
      isshow: false,
      isshow2:true,
      idx1:null,
      express:
                {
                    title:"配送类型",

              checked: 2,
                    menu: {
                            [0]:{
                                name: "自提",
                                id: 0},
                            [1]:{
                                name: "物流",
                                id: 1},
                            [2]:{
                                name: "中通",
                                id: 2}
                            }
                },

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

      wx.showLoading({
          title:'加载中',
          mask:'true',
      })
      //适应ipx
      this.setData({ h: 'padding-top:' + app.globalData.statusBarHeight * 2 + "rpx" })
      this.setData({ fill: 'padding-top:' + parseInt(app.globalData.statusBarHeight * 2 + 88) + "rpx" })

    app.request({
    url: "https://api.vvc.tw/dlxin/shop/buy" ,
      method: "POST",
      data: {
        data: options.data
      },
      success:(res)=>{

        if (res.data.code){
            // console.log(res);
            this.setData({ form_token1: res.data.data.form_token })

            this.setData({ wfrobj: res.data.data });
            var num = 0;
            var price = 0;
            var oneshop = 0;
            this.setData({ wfraddress: res.data.data.address });
            this.setData({ num1: num });
            this.setData({ allprice: price });

        setTimeout(function(){

            wx.hideLoading();

        },500)

        }else{
            wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration:2000
            })

            setTimeout(function(){
                wx.navigateBack({

                })
            },1000)

        }

      }
    })

  },
  goback(){
    console.log(111);
    wx.navigateBack({
    });
  },
  goto() {
    if (this.data.wfraddress == null){
        wx.navigateTo({
          url: '../add_address/add_address?back=true',
        })

      }else{
        wx.navigateTo({
            url: '../address/address?back=true',
        })
    }
  },
    express_type(e){

        this.setData({ isshow: !this.data.isshow});

        if (typeof e.detail=="number"){
            this.setData({ ["express.checked"]: parseInt(e.detail) });
        }

        // this.setData({ cartNum: e.detail });
    },
  purchase() {
      app.request({
          url:"https://api.vvc.tw/dlxin/order/onOrder",
        mothod:"POST",
        data:{
          form_token: this.data.form_token1,
          address: this.data.wfraddress.id,
        },
        success:function(res){
            console.log(res);
            if(res.data.code == 1){
                wx.reLaunch({
                  url: '../success_pay/success_pay?money='+res.data.data.money,
                })
            }
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1000
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
      wx.hideToast()
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
