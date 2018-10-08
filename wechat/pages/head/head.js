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