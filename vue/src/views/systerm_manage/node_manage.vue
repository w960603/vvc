<template>
    <div>
    <a-button :style="{color:'blue'}" >添加</a-button>
    <a-button  :style="{color:'red'}">禁用</a-button>
    <a-button  :style="{color:'green'}">恢复</a-button>
    <a-button  :style="{color:'orange'}">删除</a-button>
    <a-button  :style="{color:'black'}">回收站</a-button>
    <a-tree
        checkable
        showLine
        showIcon
        @expand="onExpand"
        :expandedKeys="expandedKeys"
        :autoExpandParent="autoExpandParent"
        v-model="checkedKeys"
        @select="onSelect"
        :selectedKeys="selectedKeys"
        :loadData="onLoadData"
        :treeNodes="treeData"

    />
        <a-icon slots="title" type="title" />
    </div>
</template>
<script>
    const treeData = [{
        title: '0-0',
        key: '0-0',
        slots:{icon:'file'},
        children: [{
            title: '0-0-0',
            key: '0-0-0',
            slots:{icon:'file'},
            children: [
                { title: '0-0-0-0', key: '0-0-0-0',slots:{icon:'file'} },
                {title: '0-0-0-1', key: '0-0-0-1',slots:{icon:'file'} },
                { title: '0-0-0-2', key: '0-0-0-2',slots:{icon:'file'} },
            ],
        }, {
            title: '0-0-1',
            key: '0-0-1',
            slots:{icon:'file'},
            children: [
                { title: '0-0-1-0', key: '0-0-1-0',slots:{icon:'file'} },
                { title: '0-0-1-1', key: '0-0-1-1',slots:{icon:'file'} },
                { title: '0-0-1-2', key: '0-0-1-2',slots:{icon:'file'} },
            ],
        }, {
            title: '0-0-2',
            key: '0-0-2',
            slots:{icon:'file'}
        }],
    }, {
        title: '0-1',
        key: '0-1',
        slots:{icon:'file'},
        children: [
            { title: '0-1-0-0', key: '0-1-0-0' ,slots:{icon:'file'}},
            { title: '0-1-0-1', key: '0-1-0-1',slots:{icon:'file'} },
            { title: '0-1-0-2', key: '0-1-0-2' ,slots:{icon:'file'}},
        ],
    }, {
        title: '0-2',
        key: '0-2',
        slots:{icon:'file'}
    }]
    // const treeData = []
    export default {
        data () {
            return {
                expandedKeys: ['后台管理', '前台管理'],
                autoExpandParent: true,
                checkedKeys: ['0-0-0'],
                selectedKeys: [],
                treeData,
            }
        },
        watch: {
            checkedKeys(val) {
                console.log('onCheck', val)
            }
        },
        methods: {
            onExpand (expandedKeys) {
                console.log('onExpand', arguments)
                // if not set autoExpandParent to false, if children expanded, parent can not collapse.
                // or, you can remove all expanded children keys.
                this.expandedKeys = expandedKeys
                this.autoExpandParent = false
            },
            onCheck (checkedKeys) {
                console.log('onCheck', checkedKeys)
                this.checkedKeys = checkedKeys
            },
            onSelect (selectedKeys, info) {
                console.log('onSelect', info)
                this.selectedKeys = selectedKeys
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
