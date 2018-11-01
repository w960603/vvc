const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        movies: [
            {
                id:'642',
                img: 'https://vvc-res.oss-cn-hangzhou.aliyuncs.com/changku/image/vvc_1538101887603.jpg',
                title:'1',
            },
            {
                id: '642',
                img: 'https://wangfurui.oss-cn-hangzhou.aliyuncs.com/image/vvc_1535528888601.jpg',
                title: '1',
            },
            {
                id: '642',
                img: 'https://wangfurui.oss-cn-hangzhou.aliyuncs.com/image/vvc_1535531251446.jpg',
                title: '1',
            },
            {
                id: '642',
                img: 'https://wangfurui.oss-cn-hangzhou.aliyuncs.com/image/vvc_1535531265304.jpg',
                title: '1',
            },
        ],
        oytarr: [],
        clientHeight: 0,
        arr: [],
        arrHight: [],
        scroll: "scroll-y",
        userinfo: app.globalData.userinfo,

        loaded: false,
        margin: null,

        route:'',

    },
    
    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function() {
        if (app.globalData.model == 'iphonex') {
            this.setData({
                margin: 'margin-bottom:178rpx'
            })
        } else {
            this.setData({
                margin: 'margin-bottom:118rpx'
            })
        }
        wx.hideTabBar({
            success: function(res) {

            },
            complete: function() {
                console.log(1123212)
            }
        })

        // if (!!app.globalData.goodslist) {
        //     this.setData({
        //         oytarr: app.globalData.goodslist
        //     })
        // } else {
        app.request({
            url: 'https://xxx.xxx.xxx/shop/goodslist',
            method: "POST",
            success: (res) => {
                if (res.data.code == 1) {
                    this.setData({
                        oytarr: res.data.data.goods_list
                    })
                } else {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 1500
                    })
                }
            },
        })
        // }
        this.setData({
            userinfo: app.globalData.userinfo
        })

        // app.globel.data.sence += 1;
        setTimeout(function() {
            wx.hideToast()
        }, 2500)

    },
    imgload() {
        this.setData({
            loaded: true
        })
        console.log(this.data.loaded)
    },
    imgList(e) {
        console.log(e, "调到详情")
        wx.navigateTo({
            url: '../detail/detail?id=' + e.currentTarget.dataset.id
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
  
    },

    goto_detail(e){

        wx.navigateTo({
            url: '../detail/detail?id='+e.currentTarget.dataset.id,
        })

    },
    /**
     * 生命周期函数--监听页面显示
     */
    onLoad: function(option) {
        
        this.setData({
            route:this.route
        })
  
        setTimeout(function() {
            wx.hideToast()
        }, 2500)

        app.request({
            url:'https://xxx.xxx.xxx/shop/bannerList',
            methods:'POST',
            success:res=>{
                if(res.data.code===1&&res.data.data){
                    this.setData({
                        // movies:res.data.data
                    })
                }
            }
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
        // app.globel.data.sence -=1
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },


})