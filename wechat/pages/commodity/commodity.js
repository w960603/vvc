
const app = getApp();
Page({
    data: {

        loadText: "MORE",
        sunscreen_num:6,
        sweat_num:6,
        sunscreen: [],
        sweat: [],
        // sunscreen_list: [],
        // sweat_list: [],

        //适应ipx
        h:'',
        fill:''
    },

    /**
     * 生命周期函数--监听页面加载
     */

    onLoad: function (res) {

        this.setData({
            route: this.route
        })
        wx.hideTabBar({
            success: function (res) {
                console.log(11111)
                console.log(res);
            },
            complete: function () {
                console.log(1123212)
            }
        })

        //适应ipx
        this.setData({h:'padding-top:'+app.globalData.statusBarHeight*2+"rpx"})
        this.setData({ fill: 'padding-top:' + parseInt(app.globalData.statusBarHeight * 2 + 88)+"rpx"})
        console.log(this.data.h)


        var that = this

        //内容
        app.request({
          url: 'https://api.vvc.tw/dlxin/shop/goodslist',

            method: "POST",
            success:  (res)=> {
                console.log(res);
                if(res.data.code==1){
                    var _sunscreen = [],
                        _sweat = [];
                    var datas = res.data.data.goods_list;
                    for (var i = 0, len = datas.length; i < len; i++) {
                        if (datas[i].style === 1) {
                            _sunscreen.push(datas[i])
                        } else {
                            _sweat.push(datas[i])
                        }
                    }

                    this.setData({ sunscreen: _sunscreen, sweat: _sweat });
                }else{
                    wx.showToast({
                        title: '数据加载失败请重试',
                        icon:'none',
                        duration:1500,
                    })
                }



            }
        })
    },
    jumpToDetail(e){

        wx.navigateTo({
            url: '../detail/detail?id='+e.currentTarget.dataset.id
        })
    },

//     set_data(e,list,parent){

//         var _num = (e.currentTarget ? this.data[e.currentTarget.dataset.num]:this.data[e])+6;
//         var _list = e.currentTarget ? this.data[e.currentTarget.dataset.list] : this.data[list];
//         var _parent = e.currentTarget ? this.data[e.currentTarget.dataset.parent] : this.data[parent];

//         var data_num = e.currentTarget?e.currentTarget.dataset.num:e;


// if(_num<_parent.length){

//     for (var i = 0; i < _num; i++) {

//         _list[i] = _parent[i];
//     }

// }else{
//     if(_num<_parent.length+6){
//         _num = _parent.length;
//         for (var i = 0; i < _num; i++) {
//             _list[i] = _parent[i];
//         }
//     }
// }

//         this.setData({[list]:_list});

//         this.setData({[data_num]:_num});

//         console.log(this.data.sunscreen_num);
//         console.log(this.data.sunscreen_list)
//         console.log(this.data.sunscreen)

//     },

    //加载更多
    more: function (e) {
        this.setData({ [e.currentTarget.dataset.num]: this.data[e.currentTarget.dataset.num]+6})
    },

    show: function () {

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
