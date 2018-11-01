// pages/guide/guide.js
const app = getApp();
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        route: {
            value: '',
            type: String
        }
    },

    /**
     * 组件的初始数据
     */
    ready() {

        this.getguide()

    },

    data: {
        showguide: false,
        guide_imglist: []
    },

    /**
     * 组件的方法列表
     */
    methods: {
        hideguide() {

            this.setData({
                showguide: false
            })

        },
        getguide(callback) {

            app.request({
                url: 'https://api.vvc.tw/dlxin/user/guide',
                data: {
                    url: this.data.route
                },

                success: res => {
                    if (res.data.code === 1) {
                        let list = res.data.data;
                        this.setData({
                            guide_imglist: list.img
                        })
                        if(list.num>list.user_num){
                            this.setData({
                                showguide:true
                            })
                        }
                    }
                }
                
            })

        },
    }
})