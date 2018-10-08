// pages/assembly/assembly.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
        propMenu:{
            type:Object,
          },
    propIsshow:{
      type:Boolean,
    },
    //         {
    //     title: "配送类型",
    //     menu: [{
    //         value: "中通",
    //         id: 2
    //     }],
    //     checked: 0
    // }
  },
    attached: function () {
      this.setData({propIsshow:false});
      // console.log(this.data.propIsshow2);
        // console.log("我走啦",this.data.propMenu);
        // console.log(typeof this.data.propMenu.checked)
    },
  methods: {
      wfrcancel(option) {

          this.triggerEvent('closed')
      },
      radioChange(e) {

          this.setData({ ["propMenu.checked"]: e.currentTarget.dataset.index });
          
      },
      confirm(e) {
          console.log(1111)
          this.triggerEvent('closed', this.data.propMenu.checked);
          // this.setData({ propIsshow2: false })
      },
    }
})
