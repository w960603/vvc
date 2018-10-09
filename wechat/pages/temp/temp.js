// pages/temp/temp.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      selected:{
          value:null,
          type:null
      }
  },


  /**
   * 组件的初始数据
   */
  data: {
      image:[
          {
              img:'../../image/tabbar/first.svg',
              img_active:'../../image/tabbar/firstactive.svg',
              title:'首页',
              url:"../home/home"
          },
          {
              img: '../../image/tabbar/order.svg',
              img_active: '../../image/tabbar/orderactive.svg',
              title: '订单列表',
              url: "../order/order"
          },
          {
              img: '../../image/tabbar/scan.svg',
              img_active: '../../image/tabbar/scanactive.svg',
              title: '',
            url: "../ship/ship"
          },
          {
              img: '../../image/tabbar/shopping.svg',
              img_active: '../../image/tabbar/shoppingactive.svg',
              title: '购物车',
              url: "../shop/shop"
          },
          {
              img: '../../image/tabbar/my.svg',
              img_active: '../../image/tabbar/myactive.svg',
              title: '我的',
              url: "/pages/my/my"
          },
      ],
      select:0,
      iphonex:null,
      icon:null
  },
    attached(){
        
        if(app.globalData.model=='iphonex'){
            this.setData({iphonex:"padding-bottom:60rpx",icon:'bottom:74rpx'})
        }else{
            this.setData({ iphonex: '' })
        }
        console.log(this.data.iphonex,234234234)
    },
  /**
   * 组件的方法列表
   */
  methods: {
      click: function (e) {
          
        this.setData({ "select":e.currentTarget.dataset.index})
            wx.switchTab({
                url: this.data.image[this.data.select].url,
            })
            
    },
   

    
  }
})
