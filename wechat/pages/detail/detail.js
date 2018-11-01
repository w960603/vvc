var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: 668,
        movies: [],
        content: [],
        title: '',
        price: '0',
        desc: 'UV UPF50＋ 有效抵挡99％的紫外线',
        ratio:'',
        is_onorder:'',
        price_img: '',
        img_green: [],
        winHeight: "", //窗口高度
        currentTab: 0, //预设当前项的值
        scrollLeft: 0, //tab标题的滚动条位置
        parameterList: [],
        loaded: false,
        material: {
            cloth: '韩国VVC 夏季防晒外套 材质UV UPF50＋ 有效抵挡99％的紫外线，时尚百搭。'
        },

        material_img: [{
            material_img: ''
        }],
        isshow2: false,
        isshow3:true,
        // hidden:false,
        wfrid: null,
        cartNum: null,

        status:true,
        //适应ipx
        h: '',
        fill: '',
        img_index: null,
        img_show: false,
        imgs_show: false,
        iphonex: false,
        isshow4:true,
        // 圆形进度条
        // progress_txt: '60.0%',
        count: 0, // 设置 计数器 初始为0
        countTimer: null // 设置 定时器 初始为null
    },

    // 滚动切换标签样式
    switchTab: function(e) {
        this.setData({
            currentTab: e.detail.current
        });
        this.checkCor();
    },
    imgload: function() {
        console.log("imgloaded")
        this.setData({
            loaded: true
        })
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
    show_save(e) {

        wx.getSetting({
            success(res) {
                if (!res.authSetting['scope.writePhotosAlbum']) {
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
                
                //保存文字到剪贴板
                wx.setClipboardData({
                    data: this.data.material.cloth,
                    success: (res) => {
                        console.log(res)
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
                    },
                    complete:()=>{
                        wx.hideLoading()
                    }
                })
            }
        })
    },

    save_image(e) {
        wx.showLoading({
            title: '保存中',
        })
        if (this.data.img_index) {
            this.save(this.data.movies[this.data.img_index], 1)
        } else {
            for (var i = 0; i < this.data.movies.length; i++) {
                this.save(this.data.movies[i])
            }
        }

    },
    onLoad: function (option) {
        this.setData({
            route: this.route
        })
        //适应ipx
        this.setData({
            h: 'padding-top:' + app.globalData.statusBarHeight * 2 + "rpx"
        })
        this.setData({
            fill: 'padding-top:' + parseInt(app.globalData.statusBarHeight * 2 + 88) + "rpx"
        })
        this.attached();

        if (app.globalData.goodslist) {
            var price = 0;

            switch (app.globalData.userinfo.level) {
                case 1:
                    price = app.globalData.goodslist[option.id].mon4;
                    break;
                case 2:
                    price = app.globalData.goodslist[option.id].mon3;
                    break;
                case 3:
                    price = app.globalData.goodslist[option.id].mon2;
                    break;
                case 10:
                    price = app.globalData.goodslist[option.id].mon1;
                    break;
                default:
                    price = app.globalData.goodslist[option.id].mon4;
                    break;
            }

            this.setData({
                movies: !!app.globalData.goodslist[option.id].main_img && JSON.parse(app.globalData.goodslist[option.id].main_img) || app.globalData.goodslist[option.id].main_img,
                price: price,
                content: !!app.globalData.goodslist[option.id].content&& JSON.parse(app.globalData.goodslist[option.id].content),
                desc: app.globalData.goodslist[option.id].description
            })
        }

        wx.setStorageSync('goods_id', option.id)

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

                that.setData({
                    winHeight: calc
                });
            }
        });

    },
    onShow: function() {

        this.get_detail();
        // console.log("我走啦", this.data.isshow2)

    },
    // 苹果×的底部监听
    attached() {

        if (app.globalData.model == 'iphonex') {
            this.setData({
                iphonex: true,
                icon: 'bottom:74rpx',
                bottom: 'padding-bottom:166rpx'
            })
        } else {
            this.setData({
                iphonex: false,
                bottom: 'padding-bottom:98rpx'
            })
        }
    },
    footerTap: app.footerTap,

    get_detail() {

        // let id = wx.getStorageSync('goods_id');

        app.request({
            url: 'https://api.vvc.tw/dlxin/shop/goodsinfo/',
            data: {
                goodsid: this.data.wfrid
            },
            success: (res) => {

                if (res.data.code == 1) {

                    var price = 0;
                    this.setData({
                        cartNum: res.data.data.total_num,
                        ratio:res.data.data.ratio,
                        is_onorder: res.data.data.is_onorder
                    });
                  
                    this.setData({
                        title: res.data.data.goods.title
                    });
                    console.log("我走啦",res.data.data.ratio);

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
                        price: price,
                        movies: (!!res.data.data.goods.main_img && JSON.parse(res.data.data.goods.main_img)) || [res.data.data.goods.img],
                        content: !!res.data.data.goods.content&&JSON.parse(res.data.data.goods.content),
                        desc: res.data.data.goods.description
                    });
                    this.drawCircle(this.data.ratio * 2 / 100);
                    this.countInterval()
                    
                    //获取参数
                    app.request({
                        url: "https://api.vvc.tw/dlxin/shop/getdetail/",
                        data: {
                            id: this.data.wfrid
                        },
                        success: (res) => {

                            if (res.data.code == 1) {
                                this.setData({
                                    parameterList: res.data.data.canshu,
                                    price_img: res.data.data.priceimage
                                })
                            }
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
        // console.log("123456");
        // this.setData({isshow4:!this.data.isshow4});
        
        // console.log("123456",this.data.isshow4);
        this.data.wfrid = e.currentTarget.dataset.wfrid
        if (this.data.is_onorder==1){
            this.setData({
                isshow2: !this.data.isshow2,
                // hidden:true
            });
            console.log(this.data.ratio)
            this.drawCircle(this.data.ratio*2/100);
         
           
        } else {
            wx.showToast({
                title: '扫码率低于50%',
                icon: 'none',
                image: '',
                duration: 1000,
                mask:true
           
            })
        }
       
        // console.log(11);
    },
    cartAdd(e) {
        this.setData({
            cartNum: e.detail
        });
    },
    ShoppingCart() {
        wx.switchTab({
            url: '../shop/shop',
        })
    },
    // 商品扫码率
    drawCircle: function (step) {

        var context = wx.createCanvasContext('canvasProgress');
        context.setLineWidth(6);
        context.setStrokeStyle('lightgray');
        context.setLineCap('round')
        context.beginPath();
        context.arc(52, 50, 25, 0, 2 * Math.PI, false);
        context.stroke();

        context.setLineWidth(6);
        context.setStrokeStyle('#5188FF');
        context.setLineCap('round')
        context.beginPath();
        context.arc(52, 50, 25, -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
        
        context.stroke();
        context.draw();
    },

    countInterval: function(){

        // console.log("kkkkk",this.data.ratio）

        let per = this.data.ratio/100;
        // 设置倒计时 定时器 每100毫秒执行一次，计数器count+1 ,耗时6秒绘一圈
        this.countTimer = setInterval(() => {
            if (this.data.count <= 10) {
                this.drawCircle(this.data.count / (10 / (per * 2)))
                this.data.count++;
            } else {
                setTimeout(()=>{
                    this.setData({
                        ratio: this.data.ratio
                    })
                },500)
                clearInterval(this.countTimer);
            }
        }, 100)
    },
  
    onReady: function () {
        // this.countInterval()
     
        
        // this.countInterval()
    },

})
