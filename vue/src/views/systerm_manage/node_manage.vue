<template>
    <div>
    <a-button :style="{color:'blue'}" >添加</a-button>
    <a-button  :style="{color:'red'}">禁用</a-button>
    <a-button  :style="{color:'green'}">恢复</a-button>
    <a-button  :style="{color:'orange'}">删除</a-button>
    <a-button  :style="{color:'black'}">回收站</a-button>
    <a-tree
        showLine
        showIcon
        @expand="onExpand"
        :expandedKeys="expandedKeys"
        :autoExpandParent="autoExpandParent"
        v-model="checkedKeys"
        @select="onSelect"
        :selectedKeys="selectedKeys"
        :treeNodes="treeData"
        checkable
    />

        <!--:loadData="onLoadData"-->
        <a-icon slots="title" type="title" />
    </div>
</template>
<script>
    const treeData = [
    //     {
    //     title: '0-0',
    //     key: '0-0',
    //     slots:{icon:'file'},
    //     children: [{
    //         title: '0-0-0',
    //         key: '0-0-0',
    //         icon:'file',
    //         children: [
    //             { title: '0-0-0-0', key: '0-0-0-0',icon:'file' },
    //             {title: '0-0-0-1', key: '0-0-0-1',icon:'file'},
    //             { title: '0-0-0-2', key: '0-0-0-2',icon:'file'},
    //         ],
    //     }, {
    //         title: '0-0-1',
    //         key: '0-0-1',
    //         // icon:'file',
    //         children: [
    //             {
    //                 title: '0-0-1-0',
    //                 key: '0-0-1-0',
    //                 // icon:'file'
    //             },
    //             {
    //                 title: '0-0-1-1',
    //                 key: '0-0-1-1',
    //                 // icon:'file'
    //             },
    //             {
    //                 title: '0-0-1-2',
    //                 key: '0-0-1-2',
    //                 icon:'file'
    //             },
    //         ],
    //     }, {
    //         title: '0-0-2',
    //         key: '0-0-2',
    //         // icon:'file',
    //     }],
    // },
    //     {
    //     title: '0-1',
    //     key: '0-1',
    //     // slots:{icon:'file'},
    //     children: [
    //         {
    //             title: '0-1-0-0',
    //             key: '0-1-0-0' ,
    //             // slots:{icon:'file'}
    //             },
    //         {
    //             title: '0-1-0-1',
    //             key: '0-1-0-1',
    //             // slots:{icon:'file'}
    //             },
    //         {
    //             title: '0-1-0-2',
    //             key: '0-1-0-2' ,
    //             // slots:{icon:'file'}
    //             },
    //     ],
    // },
    //     {
    //     title: '0-2',
    //     key: '0-2',
    //     // slots:{icon:'file'}
    // }
    ]
    export default {
        data () {
            return {
                // expandedKeys: ['0-0-0', '0-0-1'],
                expandedKeys: ['后台管理', '前台管理'],
                autoExpandParent: true,
                selectedKeys: [],
                checked:[],
                checkedKeys: [],
                treeData,
            }
        },
        watch: {
            checkedKeys(a,info){
                console.log('onCheck',a);

                for (var i =0;i<a.length;i++){
                    console.log(a[i]);
                    if (a[i].length < 2){
                        var idx = a[i].substring(2,3);
                        console.log(idx);
                        console.log(this.treeData[idx]);
                    }else{
                        console.log(a[i])
                    }
                }
            }
        },
        created(){
          this.qingqiu();
        },
        methods: {
            strsub(str){
                if (str.length > 2){

                }
            },

            qingqiu(){
                var url = "https://xxx.xxx.xxx/xxx/node/nodeList";
              this.axios.post(url).then((res)=>{
                  this.trees(res.data.data)
                  // console.log();
                  this.treeData = res.data.data;
                  // console.log(this.treeData );
              })
            },
            //递归函数
            trees(list){
                var keyMap = {
                    // title: null,
                    nodename : "title",
                    icon:"none",
                    child:"children",
                    key:"title",
                };

                for (var i = 0;i<list.length;i++){
                    for(var key in list[i]){
                        var newKey = keyMap[key];
                        if(newKey){
                            list[i][newKey] = list[i][key];
                            delete list[i][key];
                        }
                    }
                }
                for (var i = 0;i<list.length;i++){
                    if (list[i].children != "undefined" && list[i].children.length>0){
                        this.trees(list[i].children);
                    }
                }
                return list;
            },


            onExpand (expandedKeys) {
                console.log('onExpand', arguments)
                // if not set autoExpandParent to false, if children expanded, parent can not collapse.
                // or, you can remove all expanded children keys.
                this.expandedKeys = expandedKeys
                this.autoExpandParent = false
            },
            onCheck (checkedKeys) {
                console.log('onCheck',checkedKeys);
                this.checkedKeys = checkedKeys;

            },
            onSelect (selectedKeys, info) {
                console.log(selectedKeys);
                console.log(info);
                console.log("我走啦");
                // console.log('onSelect', info)
                // this.selectedKeys = selectedKeys
            },

        //     onLoadData (treeNode) {
        //         return new Promise((resolve) => {
        //             if (treeNode.dataRef.children) {
        //                 resolve()
        //                 return
        //             }
        //             setTimeout(() => {
        //                 treeNode.dataRef.children = [
        //                     { title: 'Child Node', key: `${treeNode.eventKey}-0` },
        //                     { title: 'Child Node', key: `${treeNode.eventKey}-1` },
        //                 ]
        //                 this.treeData = [...this.treeData]
        //                 resolve()
        //             }, 1000)
        //         })
        //     },
        // },
        },
    }

</script>
