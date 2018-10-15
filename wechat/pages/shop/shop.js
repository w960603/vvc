var app = getApp();
Page({
    data: {
        list: {},
        number2: 0,
        kaiguan: false,
        totalPrice: 0,
        num: 0,
        allnum: 0,
        code: null,

        //适应ipx
        h: '',
        fill: '',

        margin: null,
        bottom: null

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if (app.globalData.model == 'iphonex') {
            this.setData({
                margin: 'margin-bottom:188rpx',
                bottom: 'bottom:188rpx'
            })
        } else {
            this.setData({
                margin: 'margin-bottom:118rpx',
                bottom: 'bottom:118rpx'
            })
        }

        wx.hideTabBar()

        this.computePrice();
    },
    wfrradio(e) {
        this.data.list.cart[e.currentTarget.dataset.goods].isshow = !this.data.list.cart[e.currentTarget.dataset.goods].isshow;
        this.setData({
            'list.cart': this.data.list.cart
        })
        for (var i in this.data.list.cart) {
            if (!this.data.list.cart[i].isshow) {
                this.setData({
                    kaiguan: false
                });
                this.computePrice();
                return
            } else {
                this.data.kaiguan = true;
            }
            this.setData({
                kaiguan: this.data.kaiguan
            })
        }

        this.computePrice();
    },


    // 全选商品按钮
    allRideo(e) {
        this.setData({
            kaiguan: !this.data.kaiguan
        });
        // console.log(this.data.kaiguan)
        for (var i in this.data.list.goods) {
            this.data.list.cart[i].isshow = this.data.kaiguan;
            // this.data.list.cart[i].isshow = !this.data.list.cart[i].isshow;
        }
        this.setData({
            'list.cart': this.data.list.cart
        })
        this.computePrice()
    },

    //按减少按钮
    reduce(e) {
        var num = (Math.floor(e.currentTarget.dataset.num / parseInt(this.data.list.goods[e.currentTarget.dataset.goods].spec)) - 1) * parseInt(this.data.list.goods[e.currentTarget.dataset.goods].spec);
        // console.log(this.data.list.cart[e.currentTarget.dataset.goods].child[e.currentTarget.dataset.index])
        if (num > 0) {
            this.data.list.cart[e.currentTarget.dataset.goods].child[e.currentTarget.dataset.index].num = num;
            this.setData({
                list: this.data.list
            })
        }
        this.computePrice();

       

    },


    //按增加按钮
    plus(e) {


        var num = (Math.floor(e.currentTarget.dataset.num / parseInt(this.data.list.goods[e.currentTarget.dataset.goods].spec)) + 1) * parseInt(this.data.list.goods[e.currentTarget.dataset.goods].spec);

        // if (num >= 0) {
        this.data.list.cart[e.currentTarget.dataset.goods].child[e.currentTarget.dataset.index].num = num;

        this.setData({
            list: this.data.list
        })
        // }
        this.computePrice()

        // 获取增加事件所需要的参数
        // 父亲的id
        // console.log(e.currentTarget.dataset.goods);

        // // chlidID
        // console.log(e.currentTarget.dataset.id);

        // // 商品的数量
        // console.log(num);

    },

    //input输入设置数量
    setnum(e) {
        var num = parseInt(e.detail.value);
        //   console.log(this.data.list.cart[e.currentTarget.dataset.goods].child[e.currentTarget.dataset.index])

        this.data.list.cart[e.currentTarget.dataset.goods].child[e.currentTarget.dataset.index].num = num;
        this.setData({
            list: this.data.list
        })
        this.computePrice()
    },


    //计算总价
    computePrice(index) {
        var totalPrice = 0; //总价
        var num = 0; //件数
        for (var i in this.data.list.cart) {
            if (this.data.list.cart[i].isshow) {
                for (let j = 0; j < this.data.list.cart[i].child.length; j++) {
                    totalPrice += this.data.list.cart[i].child[j].price * this.data.list.cart[i].child[j].num
                    this.setData({
                        allnum: parseInt(this.data.list.cart[i].child[j].num)
                    })
                    num = parseInt(num) + Math.ceil(parseInt(this.data.list.cart[i].child[j].num) / parseInt(this.data.list.goods[i].spec));
                }
            }
        }
        this.setData({
            totalPrice: totalPrice
        });
        this.setData({
            num: num
        })
    },


    // 結算
    jiesuan(e) {
        //   console.log(this.data.code);
        // if(this.code.code == 0){
        //     wx.showToast({
        //         title: this.code.msg,
        //         duration: 500
        //     })
        // }
        var str = '';
        var goods_list = []
        var isselected = false;
        for (var i in this.data.list.cart) {
            if (this.data.list.cart[i].isshow) {
                isselected = true;
                goods_list.push(this.data.list.cart[i].child)
                //str = str + shop_id + "," + shopNum + "," + one_id + "," + two_id + "|";
            }
        }
        console.log(goods_list);


        if (isselected) {
            wx.navigateTo({
                url: "../settlement/settlement?data=" + JSON.stringify(goods_list)
            })
        } else {
            //错误
            wx.showToast({
                icon: "none",
                title: "请选择商品",
                duration: 1500
            })
        }

    },


    // 删除商品的单个sku
    deleteitem(e) {
        var data = {
            goods_id: e.currentTarget.dataset.goods,
            cate_one: e.currentTarget.dataset.cateone,
            num: 0,
        };
        if (e.currentTarget.dataset.catetwo != null) {
            data.cate_two = e.currentTarget.dataset.catetwo;
        }
        app.request({
            url: "https://api.vvc.tw/dlxin/shop/goodsCartIncDec",
            method: "POST",
            data: data,
            success: (res) => {
                //  console.log(res);
                if (res.data.code == 1) {

                    var show_old = [];
console.log(this.data)
                    for (var i in this.data.list.cart) {
                        show_old[i] = this.data.list.cart[i].isshow
                    }

                    if (res.data.data != null) {

                        for (var c in res.data.data.cart) {

                            res.data.data.cart[c].isshow = show_old[c]

                        }
                    }


                    this.setData({
                        list: res.data.data
                    })
                    this.computePrice();
                }

            }
        });

    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

        //适应ipx
        this.setData({
            h: 'padding-top:' + app.globalData.statusBarHeight * 2 + "rpx"
        })
        this.setData({
            fill: 'padding-top:' + parseInt(app.globalData.statusBarHeight * 2 + 88) + "rpx"
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        
        this.setData({
            kaiguan: false
        });
        
        app.request({
            url: 'https://api.vvc.tw/dlxin/shop/CartList',
            method: "POST",
            success: (res) => {
                if (res.data.code == 1) {
                    this.setData({
                        list: res.data.data
                    })
                    
                    if (res.data.data) {
                        this.computePrice()
                    }
                }
            }
        })
    },
})