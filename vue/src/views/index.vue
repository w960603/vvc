<template>

    <a-layout id="components-layout-demo-custom-trigger">

        <a-layout-sider
                :trigger="null"
                collapsible
                mode="inline"
                v-model="collapsed"
                :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 ,zIndex:11 , }"
                @openChange="onOpenChange"
                class="main-nav"
                id="main-nav"
                :openKeys="openKeys"
                @scroll="scroll"

        >
            <div class="logo">VVC后台管理系统</div>
            <a-menu theme="dark" mode="inline"
                    :defaultSelectedKeys="['发货统计']"
                    :defaultOpenKeys="['订单']"
                     v-for="(first,index) in nav"
                    :key="index"
            >

                <a-sub-menu  :key="first.name" defaultOpenKeys>
                    <span slot="title">
                        <a-icon :type="first.icon"></a-icon>
                        <span>{{first.name}}</span>
                    </span>
                    <template v-for="second in first.children">
                        <a-sub-menu v-if="second.children" :title="second.name" :key="second.name">
                            <a-menu-item v-for="third in second.children" :key="third.name">
                                <router-link :to="third.url">{{third.name}}</router-link>
                            </a-menu-item>
                        </a-sub-menu>
                        <a-menu-item :key="second.name" v-else >
                            <router-link :to="second.url">{{second.name}}</router-link>
                        </a-menu-item>
                    </template>
                </a-sub-menu>

            </a-menu>
        </a-layout-sider>
        <a-layout-sider collapsible v-model="collapsed" >

        </a-layout-sider>
        <a-layout >
            <a-layout-header style="background: #fff; padding: 0; position: fixed;top:0;width:100%; box-shadow:0 2px 5px #999;z-index: 10">
                <a-icon
                        class="trigger"
                        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                        @click="()=> collapsed = !collapsed"
                ></a-icon>
            </a-layout-header>
            <a-layout-header style="background: #fff;  ">

            </a-layout-header>
            <a-layout-content :style="{ margin: ' 16px', background: '#fff', minHeight: '280px' }">

                <router-view></router-view>

            </a-layout-content>
            <a-layout-footer :style="{minHeight:'60px',maxHeight:'60px',lineHeight:'60px',padding:0, textAlign:'center', backgroundColor:'#fff'}">
            <span>Produced by VVC</span>
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>

<script>
    export default {

        data() {
            return {
                collapsed: false,
                rootSubmenuKeys: ['订单', '仓库', '供应商列表', '售后管理', '电子面单', '系统管理',],
                nav:[
                    {
                        name:"订单",
                        icon:'solution',
                         key:1,
                        children:[
                            {
                                name: '发货统计',
                                url:'/Statistics',
                                key:1,
                            },
                            {
                                name:'智能排单表',
                                url:'/commodity',
                                key:2,
                            },
                            {
                                name:'已发货列表',
                                url:'/shippinglist',
                                key:3,
                            },
                            {
                                name:'大货系统',
                                url:'/biggoods',
                                key:4,
                            },
                            {
                                name:'订单搜索',
                                url:'/searchorder',
                                key:5,
                            },
                            {
                                name:'天猫',
                                children:[
                                    {
                                        name: '天猫',
                                        url:'/modify_sku'
                                    },
                                    {
                                        name: '天猫商品',
                                        url:'/commodity'
                                    },
                                    {
                                        name: '天猫订单发货',
                                        url:'/tmallShip'
                                    },
                                ],
                                key:5,
                            },
                            {
                                name:'京东',
                                children:[
                                    {
                                        name: '京东打印',
                                        url:'/jdorder',
                                        key:1,
                                    },
                                    {
                                        name:"订单详情",
                                        url:"/orderdetail",
                                        key:2,
                                    },
                                    {
                                        name: '京东商品',
                                        url:'/JDshop',
                                        key:1,
                                    },
                                    {
                                        name:"京东订单搜索",
                                        url:"/jdsearch",
                                        key:1
                                    }
                                ],
                                key:5,
                            },
                            {
                              name:"小红书",
                                children:[
                                    {
                                        name:"小红书商品",
                                        url:"/red_book_goods",
                                        key:1
                                    },
                                    {
                                        name:"小红书订单搜索",
                                        url:"/red_book_search",
                                        key:1
                                    },
                                    {
                                        name:"修改短语",
                                        url:"/generativephrase",
                                        key:1
                                    }
                                ],
                                key:1
                            },
                            {
                                name: '拼团',
                                url:'/modify_sku',
                                key:1,
                            },
                            {
                                name: '添加修改sku',
                                url:'/modify_sku',
                                key:1,
                            },
                            {
                                name: '自定义',
                                url:'/commodity',
                                key:1,
                            },
                        ]
                    },
                    {
                        name:"仓库",
                        icon:'home',
                        key:1,
                        children:[
                            {
                                name:'仓库总览',
                                url:'/commodity',
                                key:2,
                            },
                            {
                                name:'库存类目',
                                url:'/modify_sku',
                                key:3,
                            },
                            {
                                name:'商品列表',
                                url:"/modify_sku" ,
                                key:4,
                            },
                            {
                                name:'sku',
                                url:'/modify_sku',
                                key:5,
                            },
                            {
                                name:'地址管理',
                                url:'/address',
                                key:5,
                            },
                        ]
                    },
                    {
                        name:"供应商列表",
                        icon:'team',
                        key:1,
                        children:[
                            {
                                name:'供应商入库出库',
                                url:'/commodity',
                                key:2,
                            },
                            // {
                            //     name:'供应商分类',
                            //     url:'/modify_sku',
                            //     key:3,
                            // },
                            // {
                            //     name:'供应商添加删除',
                            //     url:"/modify_sku" ,
                            //     key:4,
                            // },
                            // {
                            //     name:'供应商半成品入库',
                            //     url:'/modify_sku',
                            //     key:5,
                            // },
                            {
                                name:'半成品实时监控',
                                url:'/commodity',
                                key:5,
                            },
                        ]
                    },
                    {
                        name:"售后管理",
                        icon:'desktop',
                        key:1,
                        children:[
                            {
                                name:'售后总览',
                                url:'/aftersalesurvey',
                                key:2,
                            },
                            {
                                name:'退押金',
                                url:'/deposit',
                                key:3,
                            },
                            {
                                name:'电商售后',
                                url:"/modify_sku" ,
                                key:4,
                            },
                            {
                                name:'在途监控',
                                url:'/modify_sku',
                                key:5,
                            },
                            {
                                name:'售后报表',
                                url:'/commodity',
                                key:5,
                            },
                        ]
                    },
                    {
                        name:"电子面单",
                        icon:'profile',
                        key:1,
                        children:[
                            {
                                name:'电子面单',
                                url:'/commodity',
                                key:2,
                            },
                            {
                                name:'用量监控',
                                url:'/modify_sku',
                                key:3,
                            },
                            {
                                name: '运费',
                                url:'/freight',
                                key:1,
                            },
                            {
                                name:'天猫面单',
                                url:"/tmalllist" ,
                                key:4,
                            },
                            {
                                name:'京东面单',
                                url:'/jdlist',
                                key:5,
                            },
                            {
                                name:'面单模板',
                                url:'/commodity',
                                key:6,
                            },
                        ]
                    },
                    {
                        name:"系统管理",
                        icon:'setting',
                        key:1,
                        children:[
                            {
                                name:'分组管理',
                                url:'/group_manage',
                                key:2,
                            },
                            {
                                name:'查看日志',
                                url:'/logs',
                                key:2,
                            },
                            {
                                name:'人脸注册',
                                url:'/ai',
                                key:2,
                            },
                            {
                                name:'用户登录日志',
                                url:'/userlog',
                                key:2,
                            },
                            {
                                name:'用户管理',
                                url:'/user_manage',
                                key:3,
                            },
                            {
                                name:'角色管理',
                                url:"/role_manage" ,
                                key:4,
                            },
                            {
                                name:'节点管理',
                                url:'/node_manage',
                                key:5,
                            },
                            {
                                name:'节点图',
                                url:'/node_graph',
                                key:6,
                            },
                            {
                                name:'操作日志',
                                url:'/operation_log',
                                key:7,
                            },
                            {
                                name:'登录日志',
                                url:'/logon_log',
                                key:8,
                            },
                        ]
                    },
                ],
                openKeys:['订单']
            }
        },
        mounted() {

        },
        watch: {

        },
        methods: {
            scroll(e){
                e.preventDefault();
                e.stopPropagation()
            },
            onOpenChange (openKeys) {
                const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
                console.log(openKeys,lastestOpenKey);
                if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
                    this.openKeys = openKeys
                } else {
                    this.openKeys = latestOpenKey ? [latestOpenKey] : []
                }
            },
        }
    }
</script>

<style scoped>

    #components-layout-demo-custom-trigger .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color .3s;
    }

    #components-layout-demo-custom-trigger .trigger:hover {
        color: #1890ff;
    }

    #components-layout-demo-custom-trigger .logo {
        overflow: hidden;
        height: 32px;
        /*background: rgba(255, 255, 255, .2);*/
        margin: 16px;
        text-align: center;
        color: #efefef;
        font-size: 18px;

    }
    #components-layout-demo-custom-trigger .ant-layout-sider-collapsed .logo{
        font-size: 0;
        background: url('../assets/logo.svg') center / contain no-repeat;
    }
    #components-layout-demo-custom-trigger .ant-layout-sider-collapsed a{
        color: #fff;
    }
    .main-nav::-webkit-scrollbar{
        display: none;
    }
</style>
