const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        address_lists: [],
        isshow: false,
        id: null,
        cartNum: null,
        isshow1: false,
        myid: null,

        //适应ipx
        h: '',
        fill: '',
        backable:null

    },
    navigateBack() {
        wx.navigateBack({
            delta: 1
        })
    },
    daili() {
        app.request({
            url: 'https://vapi.vvc.tw/dlxin/user/getSubAddress',
            success: (res) => {
                console.log(res)
            }
        })
    },

    //跳转添加地址
    goto(e) {

        var datas = e.currentTarget.dataset.info;

        var info = e.currentTarget.dataset.info ? (`?info=${JSON.stringify(datas)}&title=修改`) : '?title=添加'

        wx.navigateTo({
            url: '../add_address/add_address' + info,
        })
    },
    //设为默认
    set_default(e) {
        console.log(e.currentTarget.dataset.index);
        
        app.request({
            url: 'https://api.vvc.tw/dlxin/user/userupdateaddress',
            method: 'post',
            data: {
                id: this.data.address_lists[e.currentTarget.dataset.index].id,
                default: 1,
                form_type:1
            },
            success:(res)=>{
                this.request_address()
            }
        })
    },

    del(e) {
        let id = this.data.address_lists[e.currentTarget.dataset.index].id;
        console.log(id)
        var that = this;
        wx.showModal({
            title: '提示',
            content: '确定要删除吗？',
            success: (sm) => {
                if (sm.confirm) {
                    console.log(app)
                    app.request({
                        url: 'https://api.vvc.tw/dlxin/user/userDeleteAddress',
                        method: 'POST',
                        data: {
                            id: id
                        },
                        success: (res) => {
                            that.data.address_lists.splice(e.currentTarget.dataset.index, 1);
                            that.setData({
                                address_lists: that.data.address_lists
                            })
                        }
                    })

                } else if (sm.cancel) {
                    console.log('用户点击取消')
                }
            }
        })

    },
    proxy_address(e) {
        this.data.id = e.currentTarget.dataset.id
        this.setData({
            isshow1: !this.data.isshow1
        });
    },

    //请求收货地址
    request_address() {
        app.request({
            url: 'https://api.vvc.tw/dlxin/user/getUserAddress',
            method: 'post',
            success: (res) => {

                if (res.data.code) {
                    this.setData({
                        address_lists: res.data.data
                    });
                }
            }
        })
    },
    close(e) {

        this.data.myid = e.currentTarget.dataset.myid
        this.setData({
            isshow1: !this.data.isshow1
        })
    },
  navigateback1(){
    wx.navigateBack();
  },
 // 选择收货地址
    choiceaddress(e) {
        // console.log(11)
        // console.log(e.currentTarget.dataset.item);
        var Modifyaddress = e.currentTarget.dataset.item
        console.log(Modifyaddress);

        if (this.data.backable){
            this.navigateBack1
            var pages = getCurrentPages();
            var currPage = pages[pages.length - 1]; // 当前页面
            var prevPage = pages[pages.length - 2]; // 上一级页面

            // 直接调用上一级页面Page对象，存储数据到上一级页面中
            var str = Modifyaddress;


            prevPage.setData({
                'wfraddress': str,
            });
            this.navigateback1()
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        console.log(options.back)

        if (options.back){
            this.setData({ backable: options.back })
            console.log(this.data.backable)
        }

        //适应ipx
        this.setData({
            h: 'padding-top:' + app.globalData.statusBarHeight * 2+ "rpx"
        })
        this.setData({
            fill: 'padding-top:' + parseInt(app.globalData.statusBarHeight * 2 + 88) + "rpx"
        })

        this.request_address()
    }
})