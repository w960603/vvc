// pages/my/my.js
const app = getApp();
Page({
    data: {

        userInfo: {
            // avatarUrl: '../../image/logo.jpg', nike_name:'alex'
        },

        orderList: [
            { list: "../../image/icon/team_order.svg", name: '团队订单' },
            { list: "../../image/icon/shipping_details.svg", name: '发货详情' },
            { list: "../../image/icon/scan.svg", name: '扫码发货', },
            { list: "../../image/icon/ordersort.svg", name: '排单顺序' },
            { list: "../../image/icon/after_sale.svg", name: '售后', id: 5 }
        ],
        myList: [
            { my_img: "../../image/icon/one.svg", my_text: "我的钱包" },
            { my_img: "../../image/icon/two.svg", my_text: "我的推广码" },
            { my_img: "../../image/icon/three.svg", my_text: "团队管理" },
            { my_img: "../../image/icon/four.svg", my_text: "地址管理" },
            { my_img: "../../image/icon/five.svg", my_text: "授权查询" },
            { my_img: "../../image/icon/six.svg", my_text: "防伪查询" },
            { my_img: "../../image/icon/seven.svg", my_text: "代理教程" },
            { my_img: "../../image/icon/eight.svg", my_text: "退出登录", id: 8 }
        ]

    },
    onLoad: function () {

        wx.hideTabBar({
            success: function (res) {
                console.log(11111)
                console.log(res);
            },
            complete: function () {
                console.log(1123212)
            }
        })
        
        app.request({
            url: 'https://api.vvc.tw/dlxin/user/userinfo',
            // header: { 'Content-Type': 'application/x-www-form-urlencoded' },
            method: "POST",
            success: (res) => {
                if(res.data.code){
                    this.setData({ userInfo: res.data.data })
                    
                    this.setData({ userInfo1: res.data.data })

                    // console.log(this.data.userInfo)
                }

            },
        })
    },
    /**
     * 组件的方法列表
     */
    indexclick(e) {
        var that = this;
        var idx = e.currentTarget.dataset.index;
        // console.log(e)
        // if (idx == 0) {
        //     wx.navigateTo({
        //         url: '../wallet/wallet'
        //     })
        // } else if (idx == 3) {
        //   wx.navigateTo({
        //     url: '../address/address'
        //   })
        // }else if{

        // }
          
      switch (idx){
          case 0:
          wx.navigateTo({
            url: '../wallet/wallet'
          })
          break;

          case 1:
          wx.navigateTo({
              url: '../extension/extension'
          })
          break;
          case 3:
            wx.navigateTo({
            url: '../address/address'
          })
          break;
          case 4:
            wx.navigateTo({
                url: '../authorization/authorization'
            })
          break;
          case 5:
            wx.navigateTo({
                url: '../security/security'
            });
          break;

          case 6:
          wx.navigateTo({
              url: '../agency_tutorials/agency_tutorials'
          });
          break;
          
          case 7:
          app.request({
            url:"https://api.vvc.tw/dlxin/index/logout",
            method:"POST",
            success:(res)=>{
                if (res.data.code == 1) {
                    app.globalData.flag = true;
                wx.reLaunch({

                  url: '../login/login'
                });
              }
            }
          }) 
            
          break;
        }
    },
    currentIndex(e) {
        let that = this;
        let index = e.currentTarget.dataset.index;
        if (index == 1) {
            console.log(123)
            wx.navigateTo({
                url: '../ship_detail/ship_detail'
            })
        }
        if (index == 2) {
            wx.navigateTo({
                url: '../scan/scan'
            })
        }
        if (index == 4) {
            var num = 3
            wx.navigateTo({
                url: '../after_sale/after_sale?index='+num
            })
        }
     
    },
    
})
