const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: null,
        username: '',
        phone: '',
        address: '',
        detail_address: '',
        tag: '0',
        isdefault: false,
        note: '',
        sanduan: '',
        jibaodi: '',

        addnew: false,

        edit_info: {},
        route: '',

        checked: true,
        textfield: '',
        add_address: '',
        address_list: [],
        isshow: false,
        tags: [{
                tag: '仓库',
                checked: true
            },
            {
                tag: '家',
                checked: false
            },
            {
                tag: '公司',
                checked: false
            },
        ],
        region: ['省', '市', '区'],
        customItem: '全部',

        //适应ipx
        h: '',
        fill: '',

        title:'',

    },
    navigateBack() {
        wx.navigateBack({
            delta: 1
        })
    },
    /**
         * 生命周期函数--监听页面加载
         */
    onLoad: function (options) {

        this.setData({
            route: this.route
        })
var region1 = 'region[' + 0 + ']',
    region2 = 'region[' + 1 + ']',
    region3 = 'region[' + 2 + ']';


        console.log(options);
        if (options.info) {


            var info = JSON.parse(options.info);

            this.setData({
                [region1]: info.province,
                [region2]: info.area,
                [region3]: info.city,
                isdefault: info.default ? true : false,
                tag: info.type,
                username: info.name,
                id: info.id,
                phone: info.phone,
                detail_address:info.address,
                addnew: false,
            })
        } else {
            this.setData({
                addnew: true,
                title: options.title})
        }
            console.log(this.data.addnew)
        //适应ipx
        this.setData({
            h: 'padding-top:' + app.globalData.statusBarHeight * 2 + "rpx"
        })
        this.setData({
            fill: 'padding-top:' + parseInt(app.globalData.statusBarHeight * 2 + 88) + "rpx"
        })
    },


    //关闭地址列表
    changeshow() {
        var that = this;

        setTimeout(function() {
            that.setData({
                isshow: false
            })
            console.log(2)
        }, 251)

    },

    bindRegionChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            region: e.detail.value
        })
    },


    //显示地址列表
    changeshow2(e) {
        this.setData({
            isshow: true
        });
        this.input(e)
    },

    //改变详细信息
    input(e) {
        var data = e.currentTarget.dataset.name;
        this.setData({
            [data]: e.detail.value
        })
        console.log(this.data[data])
    },
    //请求所在地址
    show(e) {

        // console.log(e)
        app.request({
            url: 'https://xxx.xxx.xxx/user/getRelAddress',
            data: {
                keywords: e.detail.value
            },
            success: (res) => {
                console.log(res)
                if (res.data.code==1) {
                    this.setData({
                        address_list: res.data.data
                    })

                    this.setData({
                        isshow: true
                    })
                }
            }
        })

        // console.log(this.data[e.currentTarget.dataset.name])
    },

    //选择请求来的地址
    select(e) {
        //获取当前点击的地址信息
        var address = this.data.address_list[e.currentTarget.dataset.index];

        console.log(address.pname + address.cityname + address.adname + address.name)
        console.log(this.data.address_list[e.currentTarget.dataset.index])
        this.setData({
            address: address.pname + ' ' + address.cityname + ' ' + address.adname + ' ' + address.name,
            province: address.pname,
            city: address.cityname,
            area: address.adname
        });
        this.setData({
            address_list: ''
        })

    },

    change_status() {
        this.setData({
            isdefault: !this.data.isdefault
        })
        console.log(this.data.isdefault)
    },
    //改变标签
    changechecked(e) {
        console.log(e)

        this.setData({
            tag: e.currentTarget.dataset.index
        });
        console.log(this.data.tag)
        for (var i = 0; i < this.data.tags.length; i++) {
            if (i == e.currentTarget.dataset.index) {
                this.setData({
                    [`tags[${i}].checked`]: !this.data.tags[i].checked
                });
            } else {
                this.setData({
                    [`tags[${i}].checked`]: false
                });
            }
        }

    },

    copytext(e) {

var datas = e.detail.value;
        // console.log(datas.match(/[\u4e00-\u9fa5\w]{1,4}/)[0],11)



        app.request({
            url:'https://xxx.xxx.xxx/user/getRelAddress',
            data:{
                keywords: datas
            },
            success:(res)=>{

                // console.log(res.data.code)
                if(res.data.code&&res.data.data.length){

                    console.log(datas.match(/([\u4e00-\u9fa5\w]{2,6})[\s ,]*([\d-]{10,13})|([\d- ]{10,13})[\s ,]*([\u4e00-\u9fa5\w]{2,6})/))

                    this.setData({
                        username: datas.match(/([\u4e00-\u9fa5\w]{2,6})[\s ,]*([\d-]{10,13})|([\d- ]{10,13})[\s ,]*([\u4e00-\u9fa5\w]{2,6})/)
                        != null ? datas.match(/([\u4e00-\u9fa5\w]{2,6})[\s ,]*([\d-]{10,13})|([\d- ]{10,13})[\s ,]*([\u4e00-\u9fa5\w]{2,6})/)[1] : '',
                      phone: datas.match(/([\u4e00-\u9fa5\w]{2,6})[\s ,]*([\d-]{10,13})|([\d- ]{10,13})[\s ,]*([\u4e00-\u9fa5\w]{2,6})/) != null? datas.match(/([\u4e00-\u9fa5\w]{2,6})[\s ,]*([\d-]{10,13})|([\d- ]{10,13})[\s ,]*([\u4e00-\u9fa5\w]{2,6})/)[2] : '',
                        region: [res.data.data[0].pname,
                         res.data.data[0].cityname,
                         res.data.data[0].adname],
                        // detail_address: res.data.data[0].name
                })
                }else{
                    wx.showToast({
                        title: '填写失败请重试',
                        icon:'none',
                        duration:1500
                    })
                }

            }
        })
            // console.log(JSON.parse(options.info));




    },

    //点击保存按钮
    save: function() {

        var province = this.data.region[0],
            city = this.data.region[1],
            area = this.data.region[2];

        if (this.data.addnew) {
            console.log(22);
            app.request({
                url: 'https://xxx.xxx.xxx/user/userCreateAdderss',
                method: 'post',
                data: {
                    address: this.data.detail_address,
                    default: this.data.isdefault ? 1 : 0,
                    type: this.data.tag,
                    province,
                    city,
                    area,
                    form_type:2,
                    note: this.data.note,
                    sanduan: this.data.sanduan,
                    jibaodi: this.data.jibaodi,
                    phone: this.data.phone,
                    name: this.data.username,
                    full_address: province + city + area + this.data.detail_address,
                },
                success: (res) => {
                    console.log(res);
                    if (res.data.code==1) {
                        wx.showToast({
                            title: '添加成功!',
                            icon: 'success',
                            duration: 1500,
                            success: (res) => {
                                setTimeout(function() {
                                    wx.navigateBack({
                                        delta: 1,
                                    })
                                }, 600)

                            }
                        } )

                    }else{
                        wx.showToast({
                            title: res.data.msg,
                            icon:'none'
                        })
                    }
                }
            })
        }else{
            app.request({
                url: 'https://xxx.xxx.xxx/user/userUpdateAddress',
                method: 'POST',
                data: {
                    address: this.data.detail_address,
                    default: this.data.isdefault ? 1 : 0,
                    type: this.data.tag,
                    province,
                    city,
                    area,
                    id:this.data.id,
                    form_type: 2,
                    phone: this.data.phone,
                    name: this.data.username,
                    full_address: province + city + area + this.data.detail_address
                },
                success: (res) => {
                    console.log(res);
                    if (res.data.code==1) {
                        wx.showToast({
                            title: '保存成功!',
                            icon: 'success',
                            duration: 1500,
                            success: (res) => {
                                setTimeout(function () {
                                    wx.navigateBack({
                                        delta: 1,
                                    })
                                }, 600)

                            }
                        }, )

                    }
                }
            })
        }

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
