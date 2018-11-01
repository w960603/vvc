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

        // 展示物流信息，数组长度
        len:null,
        idx:0,
      lens: null,
      route: '',
  },
    navigateBack() {
        wx.navigateBack({ delta: 1 })
    },
  /**
   * 生命周期函数--监听页面加载
   */
    fond_logisti(e){
        var idxs = e.currentTarget.dataset.index 
        this.setData({ len:this.data.list.sends[idxs].wuliu});

        this.setData({ isshow: !this.data.isshow });
       if (this.data.len.length>0){
           this.setData({idx:0})
        this.qingqiu();
       }

    },

    // 请求物流信息
    qingqiu(){
        // console.log('我走啦');
        app.request({
            url: "https://xxx.xxx.xxx/kdbird/getlogistic",
            data: {
                nu: this.data.len[this.data.idx].nu,
                company: this.data.len[this.data.idx].company
            },
            success: (res) => {
                console.log(res, 46)
                if (res.data.code == 1) {
                    var arr = res.data.data;
                    if (arr == "") {
                        wx.showToast({
                            title: '快递正在运输中...',
                            icon: 'loading',
                            duration: 1200,
                        })
                    } else {
                        console.log(arr);
                        arr.Traces.reverse(function (a, b) {
                            return a - b;
                        });
                        this.setData({ objs: arr });
                    }
                }
            }
        })
    },


    // 上一页
    pre_page(e){
        // console.log(666,this.data.lens);
        // if(this.data.lens >0){
        //     this.setData({ lens: this.data.lens-1});
        //     this.setData({idx:this.data.idx -1});
        //     console.log(777,this.data.lens);
        //     this.qingqiu(this.data.lens);
        // }
   this.setData({"idx":this.data.idx -1});
    this.qingqiu()

    },
    // 下一页
    next_page(e){

        this.setData({ "idx": this.data.idx + 1 });
        this.qingqiu()
        // console.log(this.data.lens);
        // console.log(this.data.len);
        // if (this.data.lens < this.data.len && this.data.lens>=0) {

        //     this.setData({ lens: this.data.lens+1 });
        //     this.setData({ idx: this.data.idx + 1 });
        //     console.log(777, this.data.lens);
        //     this.qingqiu(this.data.lens);
        // }
    },
  onLoad: function (options) {

      this.setData({
          route: this.route
      })

      wx.showLoading({title: '加载中'})
      this.setData({ id: options.id })
      console.log(this.data.id)
      //适应ipx
      this.setData({ h: 'padding-top:' + app.globalData.statusBarHeight * 2 + "rpx" })
      this.setData({ fill: 'padding-top:' + parseInt(app.globalData.statusBarHeight * 2 + 88) + "rpx" })
      app.request({
          url:'https://xxx.xxx.xxx/order/orderinfo',
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
