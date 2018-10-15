// pages/temp/temp.js

const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title: {
            value: "我的售后",
            type: null
        },
        color:{
            value:'#f6f6f6',
            type:null
        },
        custom_id: {
            type: Number, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
            value: '' // 属性初始值（可选），如果未指定则会根据类型选择一个
        },
        titles:{
            type:String,
            value:""
        },
        shop_id:{
            type:Number,
            value:""
        }
    },

    //适应ipx
    h: '',
    fill: '',
    /**
     * 组件的初始数据
     */
    data: {

    },
    attached() {
        console.log(111);
        console.log("这是一个自定义", this.data.shop_id);
        //适应ipx
        this.setData({
            h: 'padding-top:' + app.globalData.statusBarHeight * 2 + "rpx"
        })
        this.setData({
            fill: 'padding-top:' + parseInt(app.globalData.statusBarHeight * 2 + 88) + "rpx"
        })
    },

    /**
     * 组件的方法列表
     */
    methods: {
        goback() {
            
            wx.navigateBack()
        },


    }
})