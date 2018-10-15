// pages/apply_sale/apply_sale.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //适应ipx
        h: '',
        fill: '',
        user: {
            img: '../../image/img.jpg',
            title: 'VVC冰丝袖套',
            price: '58',
            buy_num: '3',
            apply_num: '3'
        },
        array: [{
                value: "商品破损",
                checked: true
            },
            {
                value: "换货",
                checked: false
            },
            {
                value: "格式错误",
                checked: false
            },
            {
                value: "其他",
                checked: false
            }
        ],
        isshow: false,
        str: '',
        evaContent: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        //适应ipx
        this.setData({
            h: 'padding-top:' + app.globalData.statusBarHeight * 2 + "rpx"
        })
        this.setData({
            fill: 'padding-top:' + parseInt(app.globalData.statusBarHeight * 2 + 88) + "rpx"
        });
    },
    //返回上一页
    goback(){
        wx.navigateBack({
            delta: 1
        })

    },
    choseReason() {
        this.setData({
            isshow: !this.data.isshow

        })
    },
    close() {
        this.setData({
            isshow: !this.data.isshow
        })
    },

    // radio待选状态
    radioChange(e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value)

        var index = e.currentTarget.dataset.index;

        for (var i = 0; i < this.data.array.length; i++) {
            if (i == index) {
                this.data.array[i].checked = !this.data.array[i].checked;
            } else {
                this.data.array[i].checked = false;
            }
        }

        this.setData({
            array: this.data.array,
            str: index
        })
        console.log(this.data.array[index].checked)
    },
    confirm() {
        this.setData({
            isshow: !this.data.isshow
        })
    },

    textareaInput(e) {
        if (e.detail.value.length > 0) {
            if (e.detail.value.length < 5 || e.detail.value.length > 140) {
                wx.showToast({
                    title: '内容在5-140个字之间',
                    icon: 'loading',
                    duration: 1200,
                })

            } else {
                this.setData({
                    evaContent: e.detail.value
                })
                console.log(108,e.detail.value)
            }
        } else {
            this.setData({
                evaContent: ''
            })
            this.data.evaContent = '';
            wx.showToast({
                title: '请输入退换货理由',
                icon: 'loading',
                duration: 1200,
            })
        }
    },

    comfirmRefer() {
        var that = this;
        app.request({
            url: '',
            method: 'POST',
            data: {
                key: this.data.str,
                key: this.data.evaContent
            },
            success: (res) => {
                console.log(this.data.evaContent)
                this.setData({
                    isshow: !this.data.isshow
                })
            }
        })

    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
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

})
