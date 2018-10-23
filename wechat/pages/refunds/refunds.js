// pages/refunds/refunds.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
      shopInfo:[],
      shop_id:2,
      select:true,
      tihuoWay: '门店自提',
      images:"",
      userinfo_add:[],
      isshow:false,
      one_address:null,
      ipt_ordernum:null,
      tear_value:null,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      if (app.globalData.model == 'iphonex') {
          this.setData({ iphonex: "padding-bottom:60rpx", icon: 'bottom:74rpx' });
      } else {
          this.setData({ iphonex: '' })
      }
      console.log("2222",app.globalData.userinfo);
      this.setData({ images: app.globalData.userinfo.img_url})
      app.request({
          url: "https://api.vvc.tw/dlxin/order/returnGoodsInfo",
          method: "POST",
          data: {
              id: options.id
          },
          success: (res) => {
              this.setData({ userinfo_add: res.data.data.address });
              console.log(this.data.userinfo_add);
              var obj = res.data.data.tuihuo
              obj.time = this.timestampToTime(res.data.data.tuihuo.time);
              this.setData({ shopInfo: obj });
          }
      })
  },

chioce_address(e){
    // if (this.data.shopInfo.address  == null){
        this.setData({ isshow: !this.data.isshow });
    // }
},
timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        return Y + M + D + h + m + s;
},
chioce(e){
    this.setData({ isshow: false });
    // console.log(e.currentTarget.dataset.index);
    this.setData({ one_address: this.data.userinfo_add[e.currentTarget.dataset.index]})
    console.log(this.data.one_address);
},
 bindShowMsg() { 
    this.setData({ select: !this.data.select })
},
// getLocalTime(nS) {
//     return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
// },
// 获取单号
    ipt_danhao(e){
        console.log(e);
        this.setData({ ipt_ordernum: e.detail.value})
    },


// 获取用户具体原因
    tear_val(e){
        this.setData({ tear_value: e.detail.value })
    },


//提交
    submit(e){
        // console.log(this.data.ipt_ordernum); //订单号
        console.log(this.data.tear_value); //多好文本输入框内容
        // console.log(this.data.shopInfo.id);//id
        // console.log(this.data.one_address.full_address)//地址

        if (this.data.tear_value != null  && this.data.shopInfo.id != null){
            var data= {
                id: this.data.shopInfo.id,
                bcyy: this.data.tear_value,     
            }
            console.log(this.data.ipt_ordernum);
            console.log(this.data.one_address);
            console.log(this.data.shopInfo.status);

            if (this.data.shopInfo.status == 2 ){
                if(this.data.one_address && this.data.ipt_ordernum){
                    data.thdz=this.data.one_address.id
                    data.danhao=this.data.ipt_ordernum
                }else{
                    wx:wx.showToast({
                        title: '请填留言或地址',
                        icon: 'none',
                        duration: 2000,
                    })
                }
        
            }
            app.request({
                url:"https://api.vvc.tw/dlxin/order/returnGoodsTrue",
                method:"POST",
                data:data,
                success:(res)=>{
                    console.log(res)
                    if(res.data.code == 1){
                        wx.showToast({
                            title: '留言成功',
                            duration: 2000
                        });
                        wx.navigateBack({});
                    }
                },
                fail:(res)=>{
                    wx.showToast({
                        title: res.msg,
                        icon:none,
                        duration: 2000
                    });
                }
            })
        }else{
            wx.showToast({
                title: '请填写留言',
                duration: 2000
            })
        }

    },


// 

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})