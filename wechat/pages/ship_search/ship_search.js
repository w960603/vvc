var app = getApp();
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        isshow: {
            type: Boolean,
            value: null
        },

    },

    /**
     * 组件的初始数据
     */
    data: {
        recent_user: '最近用户',
        user: [],

        activeOpacity: false,
        status: true,
    },
    attached: function () {
        app.request({
            url: 'https://api.vvc.tw/dlxin/user/search',
            methos: 'post',
            success: (res) => {
                console.log(res)
                this.setData({
                    user: res.data.data.user
                })
            }
        })

    },
    /**
     * 组件的方法列表
     */
    methods: {
        changeColor(e) {

            this.setData({
                activeOpacity: true
            })

        },
        adduser(e) {
            console.log(e)
            var tapeduser = this.data.user[e.currentTarget.dataset.index];

            this.triggerEvent('adduser', tapeduser)
        },
        cancel() {

            this.triggerEvent('closed')
        },
        closeMask() {
            this.triggerEvent('closed')
        },
        search_data(e) {
            this.setData({
                inputValue: e.detail.value
            })

            if (this.data.status) {

                this.setData({
                    status: false
                });

                app.request({
                    url: "https://api.vvc.tw/dlxin/user/search",
                    method: "POST",
                    data: {
                        nickName: this.data.inputValue,
                    },
                    success: (res) => {

                        this.setData({
                            status: true
                        });
                        if (res.data.code) {

                            this.setData({
                                user: res.data.data.user
                            })


                        }

                    }
                });

            }
        },


    },

})