var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: 668,
        movies: [],
        title: '载入中...',
        price: '0',
        uv: '',
        price_img: '',
        img_green: [],
        winHeight: "", //窗口高度
        currentTab: 0, //预设当前项的值
        scrollLeft: 0, //tab标题的滚动条位置
        parameterList: [
            ["", ""],
            ["", ""]
        ],

        material: {
            cloth: '韩国VVC 夏季防晒外套 材质UV UPF50＋ 有效抵挡99％的紫外线，时尚百搭。'
        },

        material_img: [{
            material_img: ''
        }],
        isshow2: false,
        wfrid: null,
        cartNum: null,

        //适应ipx
        h: '',
        fill: '',

        img_index: null,
        img_show: false,
        imgs_show: false
    },

    // 滚动切换标签样式
    switchTab: function(e) {
        this.setData({
            currentTab: e.detail.current
        });
        this.checkCor();
    },
    // 点击标题切换当前页时改变样式
    swichNav: function(e) {
        var cur = e.target.dataset.current;
        if (this.data.currentTaB == cur) {
            return false;
        } else {
            this.setData({
                currentTab: cur
            })
        }
    },
    //判断当前滚动超过一屏时，设置tab标题滚动条。
    checkCor: function() {
        if (this.data.currentTab > 3) {
            this.setData({
                scrollLeft: 50
            })
        } else {
            this.setData({
                scrollLeft: 0
            })
        }
    },
    show_imgs(e) {
        console.log(e)
    },
    show_save(e) {

        console.log(e);

        wx.getSetting({
            success(res) {
                if (!res.authSetting['scope.writePhotosAlbum']){
                    wx.authorize({
                        scope: 'scope.writePhotosAlbum',
                        success() {
                            console.log('授权成功')
                        }
                    })
                }
            }
        });
        this.setData({
            img_show: true
        });
        if (!!e.currentTarget.dataset.index) {
            this.setData({
                img_index: e.currentTarget.dataset.index
            });
        }
    },
    closemask() {
        this.setData({
            img_show: false
        })
    },
    save(url) {
        wx.downloadFile({
            url: url,
            success: (res) => {
                console.log(res);
                //保存文字到剪贴板
                wx.setClipboardData({
                    data: this.data.material.cloth,
                    success: (res) => {

                        console.log(res)
                        // wx.getClipboardData({
                        //     success:  (res)=> {
                        //         console.log(res) // data
                        //     }
                        // })
                    }
                })
                //图片保存到本地
                wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success: (data) => {

                        wx.showToast({
                            title: '保存成功',
                            icon: 'success',
                            duration: 2000
                        });
                        this.setData({
                            img_show: false
                        })
                    },
                    fail: (err) => {

                        wx.showToast({
                            title: '保存失败',
                            icon: 'none',
                            duration: 1500
                        })

                        this.setData({
                            img_show: false
                        })
                    }
                })
            }
        })
    },


    save_image(e) {
        console.log(e)
        if (this.data.img_index) {
            this.save(this.data.movies[this.data.img_index], 1)
        } else {
            console.log(2)
            for (var i = 0; i < this.data.movies.length; i++) {
                this.save(this.data.movies[i])
            }
        }

    },
    onLoad: function(option) {
        //适应ipx
        this.setData({
            h: 'padding-top:' + app.globalData.statusBarHeight * 2 + "rpx"
        })
        this.setData({
            fill: 'padding-top:' + parseInt(app.globalData.statusBarHeight * 2 + 88) + "rpx"
        })
        console.log(option)
        this.data.wfrid = option.id

        var that = this;
        that.setData({
            wfrid: option.id
        });

        wx.getSystemInfo({
            success: function(res) {
                var clientHeight = res.windowHeight,
                    clientWidth = res.windowWidth,
                    rpxR = 750 / clientWidth;
                var calc = clientHeight * rpxR - 180;
                console.log(calc)
                that.setData({
                    winHeight: calc
                });
            }
        });
        this.get_detail(this.data.wfrid, option.img);

        var ids = this.data.wfrid;


    },
    footerTap: app.footerTap,

    get_detail(id,img) {
        console.log(id,img);

        // this.setData({
        //     movies: {img}
        // });


        app.request({
            url: 'https://api.vvc.tw/dlxin/shop/goodsinfo/',
            data: {
                goodsid: id
            },
            success: (res) => {

                if (res.data.code) {
                    var price = 0;
                    this.setData({
                        cartNum: res.data.data.total_num
                    });

                    this.setData({
                        title: res.data.data.goods.title
                    });

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


                    this.setData({
                        price: price
                    });
                    this.setData({
                        movies: JSON.parse(res.data.data.goods.main_img)
                    });

                    app.request({
                        url: "https://api.vvc.tw/dlxin/shop/getdetail/",
                        data: {
                            id: id
                        },
                        success: (res) => {
                            //   if(res.data.code){
                            if ("data" in res.data) {
                                this.setData({
                                    parameterList: res.data.data.canshu
                                })
                                this.setData({
                                    price_img: res.data.data.priceimage
                                })
                            }

                            //   }

                        }
                    })

                }


            }
        })
    },

    // 返回上一页
    goback() {
        wx.navigateBack({
            navigateBack: function() {
                var self = this;
                var pages = getCurrentPages();
                if (pages.length == 1) {
                    if (self.data.circleId && self.data.circleId > 0) {
                        wx.redirectTo({
                            url: '../../circle/index/index?circleId=' + self.data.circleId +
                                '&circleName=' + (self.data.circleName || '')
                        });
                    } else {
                        wx.switchTab({
                            url: "../../home/home"
                        });
                    }
                } else {
                    wx.navigateBack({
                        changed: true
                    }); //返回上一页
                }
            }
        })
    },

    // 加购物车
    wfrskuDetail(e) {
        this.data.wfrid = e.currentTarget.dataset.wfrid
        this.setData({
            isshow2: !this.data.isshow2
        });
    },
    cartAdd(e) {
        console.log(e)
        this.setData({
            cartNum: e.detail
        });
    },
    ShoppingCart() {
        console.log(11)
        wx.switchTab({
            url: '../shop/shop',
        })
    }

})