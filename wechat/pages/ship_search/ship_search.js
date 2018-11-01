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
        log: [],
        activeOpacity: false,
        status: true,
    },
    attached: function() {
        app.request({
            url: 'https://xxx.xxx.xxx/user/search',
            methos: 'post',
            success: (res) => {
                console.log(res)
                this.setData({
                    user: res.data.data.user||null,
                    log: res.data.data.log||null
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
            var tapeduser = e.currentTarget.dataset.item;
            console.log(tapeduser)

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
                    url: "https://xxx.xxx.xxx/user/search",
                    method: "POST",
                    data: {
                        nickname: this.data.inputValue,
                    },
                    success: (res) => {

                        this.setData({
                            status: true
                        });
                        if (res.data.code == 1) {

                            this.setData({
                                user: res.data.data.user||null,
                                log: res.data.data.log||null
                            })

                        }

                    }
                });

            }
        },


    },

})