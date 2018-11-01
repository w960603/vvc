// pages/ble/ble.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        connected: {
            value: false,
            type: Boolean
        },
        discoveryStarted: {
            value: false,
            type: Boolean
        },
        showBle:{
            value:false,
            type:Boolean
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        deviceId:"",
        motto:'',
        list:[],
    },
    ready(){
        console.log(2222222)
        this.startBleSearch();
    },

    /**
     * 组件的方法列表
     */
    methods: {
        
    }
})