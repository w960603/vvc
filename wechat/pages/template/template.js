var app = getApp();
Component({
    properties: {
        propWfrid: {
            type: Number, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
            value: '' // 属性初始值（可选），如果未指定则会根据类型选择一个
        },
        isshow: {
            type: Boolean,
            value: null,
        },

    },
    data: {
        shoplist: {},
        cate: {},
        goods: {},
        show: false,
        size: {},
        selected: 0,
        selected1: 0,
        num: 0,
        sku_id: null,
        array: [],
        allnum: 0,
        iphonex: "",
        bottom: null,
    },
    // 页面渲染完成
    attached: function() {
        app.request({
            url: 'https://api.vvc.tw/dlxin/shop/goodsinfo',
            method: "POST",
            data: {
                goodsid: this.data.propWfrid
            },
            success: (res) => {

                console.log(res.data)
                if (res.data.code == 1) {

                    let price = 99999;
                    switch (app.globalData.userinfo.level) {
                        case 1:
                            price = res.data.data.goods.mon4;
                            break;
                        case 2:
                            price = res.data.data.goods.mon3;
                            break;
                        case 3:
                            price = res.data.data.goods.mon2;
                            break;
                        case 10:
                            price = res.data.data.goods.mon1;
                            break;
                        default:
                            price = res.data.data.goods.mon4;
                            break;
                    }

                    // this.data.goods = res.data.data.goods;
                    this.setData({
                        goods: res.data.data.goods
                    });
                    this.data.cate = res.data.data.cate;
                    this.setData({
                        num: this.data.goods.spec
                    })

                    for (var i in this.data.cate) {
                        this.data.size = {
                            name: this.data.cate[i]['title'],
                            id: this.data.cate[i]['id']
                        }
                        this.setData({
                            selected: i
                        })
                        break;
                    }

                    console.log(price, 44)

                    this.setData({
                        shoplist: {
                            img: this.data.goods.img,
                            pice: price,
                            kucun: "9999",
                            name: this.data.goods.title,
                            sku: this.data.cate,
                            size: this.data.size,
                            num: 1,
                        }
                    })
                }
            }
        });



        if (app.globalData.model == 'iphonex') {
            this.setData({
                iphonex: "padding-bottom:80rpx",
                icon: 'bottom:74rpx'
            })
            this.setData({
                pdb: "padding-bottom:200rpx"
            })
        } else {
            this.setData({
                iphonex: '',
                pdb: ''
            })
        }


    },
    methods: {
        wfrcancel(option) {
            this.triggerEvent('closed')
        },
        wfrclicksku(e) {
            this.setData({
                sku_id: e.currentTarget.dataset.id
            });

            if (e.currentTarget.dataset.img && e.currentTarget.dataset.img != "") {

                this.setData({
                    ['shoplist.img']: (/http/.test(e.currentTarget.dataset.img)) ? e.target.dataset.img : this.data.goods.img,
                })
            } else {
                this.setData({
                    ['shoplist.img']: this.data.goods.img,
                })
            };
            if (this.data.cate[e.currentTarget.dataset.id].price > 0) {
                this.setData({
                    ['shoplist.pice']: this.data.cate[e.currentTarget.dataset.id].price,
                })
            };
            this.setData({
                selected: Number(e.target.dataset.id)
            });
            this.setData({
                selected1: null
            });
        },
        // 切换sku
        chageimg(e) {

            var index = this.data.selected;
            if (e.currentTarget.dataset.img && e.currentTarget.dataset.img != "") {

                this.setData({
                    ['shoplist.img']: (/http/.test(e.currentTarget.dataset.img)) ? e.target.dataset.img : (this.data.cate[index].thumb ? this.data.cate[index].thumb : this.data.goods.img),
                })
            } else {
                this.setData({
                    ['shoplist.img']: (this.data.cate[index].thumb ? this.data.cate[index].thumb : this.data.goods.img),
                })
            };

            this.setData({
                ['shoplist.pice']: this.data.goods.mon1,
            })



            for (var i in this.data.cate) {

                if ("child" in this.data.cate[i]) {

                    for (var b in this.data.cate[i].child) {

                        if (e.currentTarget.dataset.id == b && this.data.cate[i].child[b].delete == 0) {
                            this.setData({
                                selected1: e.currentTarget.dataset.id
                            });
                            return;
                        }
                    }

                }


            }

        },
        // 减少数量
        reduce(e) {

            this.setData({
                num: (Math.ceil(Math.abs(this.data.num / this.data.goods.spec - 1.12))) * this.data.goods.spec
            })


        },
        // 输入数量
        wfrnumipt(e) {
            this.setData({
                num: e.detail.value
            })

            if (e.detail.value % this.data.goods.spec == 0) {
                //整箱

            } else {
                //不是整箱，提示
                wx.showToast({
                    title: "不是整箱",
                    icon: 'none',
                    duration: 500
                })
            }
        },

        // 增加数量
        increase(e) {
            this.setData({
                num: (Math.ceil(this.data.num / this.data.goods.spec) + 1) * this.data.goods.spec
            })
        },
        add_Shopping_Cart() {
            var data = {
                goods_id: this.data.goods.id,
                cate_one: this.data.selected,
                num: this.data.num,
            }
            if (this.data.selected1 > 1) {
                data.cate_two = parseInt(this.data.selected1);
            } else {

                if ("child" in this.data.cate[this.data.selected] > 0 && this.data.selected1 < 1) {
                    wx.showToast({
                        title: "请选择分类",
                        icon: 'none',
                        duration: 1500
                    });
                    return;
                }
            }
            app.request({
                url: "https://api.vvc.tw/dlxin/shop/goodsCartAdd",
                data: data,
                success: (res) => {
                    console.log(res);
                    if (res.data.code == 1) {
                        this.triggerEvent('over', res.data.data.total_num)
                        this.triggerEvent('closed')
                    }
                }
            })
        },
        GoPurchase() {

            if (this.data.selected1 == null) {

                wx.showToast({
                    title: "输入子分类",
                    icon: 'none',
                    duration: 1500
                })
            }

            console.log(this.data.num)
            var obj = {
                goods_id: this.data.goods.id,
                cate_one: this.data.selected,
                cate_two: this.data.selected1,
                num: this.data.num,
            }

            var arr = [];
            arr.push(obj)
            this.data.array.push(arr);

            // JSON.stringify(this.data.array); 
            // app.request({
            //     url:"https://api.vvc.tw/dlxin/shop/buy",
            //     method:"POST",
            //     data:{
            //         data: JSON.stringify(this.data.array)
            //     },
            //     success:(res)=>{
            //         if(res.data.code == 1){
            //             console.log(res)
            wx.navigateTo({
                url: '../settlement/settlement?data=' + JSON.stringify(this.data.array),
            })
            this.triggerEvent('closed')
            //         }else{
            //             wx.showToast({
            //                 title: res.data.msg,
            //                 icon:'none',
            //                 duration: 1500
            //             })
            //         }
            //         console.log(res);
            //     }
            // })
        }
    },
    ready: function() {

    }
})