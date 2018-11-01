var app = getApp();
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        recent_user: '最近用户',
        user:[
            // avatar: '../../image/proxy.png',
            // theme: 'alex',
            // department: '乐范售后部 ',
            // tel: '0592-3663863',
            // address: '福建省厦门市思明区前埔路168号',
        ],
        
        activeOpacity: false,
        // showView: (options.showView == "true" ? true : false),
    },
    attached:function(){
        app.request({
          url: 'https://xxx.xxx.xxx/user/getSubAddress',
            methos: 'post',
            success: (res) => {
                if(res.data.code==1){
                    
                    this.setData({
                        user: res.data.data
                    })
                    
                }
               
            }

        })
    },
    /**
     * 组件的方法列表
     */
    methods: {
        changecolor(e) {
            // console.log(this.data.activeOpacity);
            this.setData({
                activeOpacity: true
            })
            // console.log(this.data.activeOpacity);
        },
        cancel() {

            this.triggerEvent('closed')
        },
        closemask(){
          console.log(32322)
            this.triggerEvent('closed')
        },
        search_data(e){
            this.setData({
                inputValue:e.detail.value
            })
            // console.log(this.data.inputValue);
            app.request({
              url:"https://xxx.xxx.xxx/user/getSubAddress",
                method:"POST",
                data:{
                    name: this.data.inputValue,
                },
                success:(res)=>{
                    if(res.data.code==1){
                        this.setData({
                            user: res.data.data
                        })
                    }
                    
                }
            });
            

        },
        // setSearchStorage(e){
        //     console.log(e)
        //     // let data;
        //     // let localStogeValue:[];
        //     // if(this.data.inputValue != "") {
        //     //     var searchData = wx.getStorageSync('searchData') || []
        //     //     searchData.push(this.data.inputValue)
        //     //     wx.setStorageSync('searchData', searchData)
        //     // }
        // }
        agent_address(e){
            //  console.log(e.currentTarget.dataset.item);
            
            wx.navigateBack();
            // url: '../settlement/settlement?address=' + JSON.stringify(Modifyaddress)
            var Modifyaddress = e.currentTarget.dataset.item
            var pages = getCurrentPages();
            var currPage = pages[pages.length - 1]; // 当前页面
            var prevPage = pages[pages.length - 2]; // 上一级页面

            // 直接调用上一级页面Page对象，存储数据到上一级页面中
            var str = Modifyaddress;
            prevPage.setData({
                'wfraddress': str,
            });
        }
    },

})