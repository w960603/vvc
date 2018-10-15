const app = getApp();

Page({
  data: {
    proList: [
      {
        proTitle: "2222",
        proDec: "女神",
        style: "nvshen",
        img: "../../image/team/goddess.svg", 
      },
      {
        proTitle: "3333",
        proDec: "仙女",
        style: "xiannv",
          img: "../../image/team/fairy.svg",
      },{
        proTitle: "1111",
        proDec:"天使",
        style: "tianshi",
        proPrice: "50",
        img: "../../image/team/angel.svg", 
          
      },{
        proTitle: "1111",
          proDec: "董事",
        style: "dongshi",
        proPrice: "50",
        img: "../../image/team/director1.svg",
        }
    ],
    idx:0,
    h: '',
    fill: '',
    user:{},
    ka_obj:{},
    str:"",

    note:"",
    reg_code:''
  },
  onLoad: function () {
      this.setData({ h: 'padding-top:' + app.globalData.statusBarHeight * 2 + "rpx" })
      this.setData({ fill: 'padding-top:' + parseInt(app.globalData.statusBarHeight * 2 + 88) + "rpx" })
     
     
      this.setData({user:app.globalData.userinfo})
    // console.log(app.globalData.userinfo)
  },
  onShow:function(){
      this.qingqiu()
  },
qingqiu(){
    app.request({
        url: "https://api.vvc.tw/dlxin/user/regCode",
        method: "get",
        success: (res) => {
            console.log(res);
            if (res.data.code == 1) {
                this.setData({ ka_obj: res.data.data });
                var str1 = ""
                str1 = res.data.data.ka;
                this.setData({
                    ["str"]: str1.split(""),
                    reg_code: str1
                });
                console.log(this.data.str);
            }
        }
    });
},
  kaika(){
      app.request({
          url:'https://api.vvc.tw/dlxin/user/addCode',
          data:{
              reg_code:this.data.reg_code,
              note:this.data.note
          },
          success:(res)=>{
              if(res.data.code==1){
                  this.qingqiu()
                  wx.showToast({
                      title: res.data.msg,
                      duration: 2000
                  })
              }else{
                  wx.showToast({
                      title: res.data.msg,
                      icon: 'none',
                      duration: 5000
                  })
              }
              
          }
      })
  },
    goback() {
        wx.navigateBack();
    },
    set_note(e){
        this.setData({
            note:e.detail.value
        })
    },
    copy(e){
        console.log(e)
        wx.setClipboardData({
            data: e.currentTarget.dataset.item.regcode,
            success(){
                wx.showToast({
                    title: '链接已复制,可粘贴到浏览器打开',
                    icon:'none',
                    duration:5000
                })
            }
        })
    },
    goto1(e){
       
        
        console.log(getCurrentPages()[getCurrentPages().length-1].route)
        wx.showLoading({
            title: '跳转中',
        })
        
        wx.navigateTo({
          
            url: '../management/management?info=' + e.currentTarget.dataset.info,
            success:()=>{
                wx.hideLoading()
            }
        })
    },
    goto2(e) {
        let infos = e.currentTarget.dataset.info;
        let info = {
            joincode: infos.joincode,
            nick_name: infos.nick_name,
            level: infos.level,
            money: infos.money,
            lvl: infos.lvl,
            shouquan : infos.shouquan,
            id:infos.id
        }

        wx.navigateTo({
            url: '../management-child1/management-child1?info='+JSON.stringify(info),
        })
    },
  move: function (e) {
    console.log(e)
  },
  start: function (e) {
    console.log(e)
  },
  scroll: function (e) {
    this.setData({ idx: e.detail.current });
  }
})
