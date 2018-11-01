// pages/top_up/top_up.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //适应ipx
        h: '',
        fill: '',
        earth: {
            img: '../../image/false.png',
            name: 'Ertha',
            money: '￥11000.00',
            income: '+￥13,400,00',
            out: '￥3,400,44',
        },
        billList: [],
        infos: {},
        charged: 0,
        color:'#999',
        hidden: true,
        route: '',
        value: "¥0.00"

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            route: this.route
        })
        //适应ipx
        this.setData({
            h: 'padding-top:' + app.globalData.statusBarHeight * 2 + "rpx"
        })
        this.setData({
            fill: 'padding-top:' + parseInt(app.globalData.statusBarHeight * 2 + 88) + "rpx"
        });

        this.setData({
            infos: JSON.parse(options.infos)
        })

        this.request()
    },
    request() {
        app.request({
            url: 'https://api.vvc.tw/dlxin/user/rechargelog',
            data: {
                id: this.data.infos.id
            },
            success: res => {
                if (res.data.code == 1) {
                    let charged = 0;
                    let billList = res.data.data.rows;
                    

                    console.log(billList)
                    for (let i = 0; i < billList.length; i++) {
                        console.log(billList[i].attribute_columns[3][1])
                        charged += billList[i].attribute_columns[3][1] * 1
                    }

                    this.setData({
                        billList: billList
                    })
                    this.setData({
                        charged: charged
                    })
                }
                console.log(res)
            }
        })
    },
    money(e) {
        console.log(e)
        let value = e.detail.value;

        this.setData({

            money: e.detail.value

        })
    },

    topUp(e){
        
        this.setData({
            color:"black",
           hidden:false
        })
       
    },
    selectimg() {
        if (this.data.money !== '¥0.00') {
            wx.chooseImage({
                count: 1,
                sizeType: ['original'],
                sourceType: ['album'],
                success: (res) => {
                    // tempFilePath可以作为img标签的src属性显示图片
                    const tempFilePaths = res.tempFilePaths[0];

                    this.uploadFile(tempFilePaths),
                        wx.showLoading({
                            title: '充值中',
                        })
                }
            })
        } else {
            wx.showToast({
                title: '请先输入充值金额',
                icon: 'none',
                duration: 2000
            })
        }
    },
    uploadFile(img) {
        var bianliang = this.obj.dir + new Date().getTime() + ".jpg";
        wx.uploadFile({
            url: 'https://oss1.vvc.tw/',
            filePath: img,
            name: 'file',
            type: 3,
            formData: {
                name: img,
                key: bianliang,
                policy: this.obj.policy,
                OSSAccessKeyId: this.obj.accessid,
                success_action_status: "200",
                signature: this.obj.signature,
            },
            success: (res) => {
                console.log(res);
                let datas = {
                    id: this.data.infos.id,
                    img: 'https://oss1.vvc.tw/' + bianliang,
                    money: this.data.money
                }
                app.request({
                    url: 'https://api.vvc.tw/dlxin/user/recharge',
                    methods: 'POST',
                    data: datas,
                    success: (res) => {
                        console.log(res)
                        wx.hideLoading()
                        // if(res.data.code){
                        wx.showToast({
                            title: res.data.msg,
                            icon: 'none',
                            duration: 3000
                        })
                        this.setData({
                            money: 0
                        });
                        this.request()
                        // }
                    }
                })
            },
            fail: (err) => {
                console.log(err)
                wx.showToast({
                    title: '上传图片失败,请重试',
                    icon: 'none',
                    duration: 5000
                })
            },
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */

    onReady: function() {
        wx.request({
            url: 'https://api.vvc.tw/dlxin/index/getoss',
            method: "GET",
            data: {
                type: 3
            },
            success: (res) => {
                this.obj = res.data.data;
                console.log(this.obj);
            }
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

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

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})