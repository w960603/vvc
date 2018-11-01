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

                <a-sub-menu :key="first.name" defaultOpenKeys>
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
                        <a-menu-item :key="second.name" v-else>
                            <router-link :to="second.url">{{second.name}}</router-link>
                        </a-menu-item>
                    </template>
                </a-sub-menu>

            </a-menu>
        </a-layout-sider>
        <a-layout-sider collapsible v-model="collapsed">

        </a-layout-sider>
        <a-layout>
            <a-layout-header
                style="background: #fff; padding: 0; position: fixed;top:0;width:100%; box-shadow:0 2px 5px #999;z-index: 10">
                <a-icon
                    class="trigger"
                    :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                    @click="()=> collapsed = !collapsed"
                ></a-icon>
            </a-layout-header>
            <a-layout-header style="background: #fff;  ">

            </a-layout-header>
            <a-layout-content :style="{ margin: ' 16px', background: '#fff', minHeight: '280px' }">
                <!--<keep-alive>-->
                <router-view></router-view>
                <!--</keep-alive>-->


            </a-layout-content>
            <a-layout-footer
                :style="{minHeight:'60px',maxHeight:'60px',lineHeight:'60px',padding:0, textAlign:'center', backgroundColor:'#fff'}">
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
                rootSubmenuKeys: ['订单', '仓库', '供应商列表', '售后管理', '电子面单', '系统管理','系统设置'],

                nav: [
                    {
                        name: "订单",
                        icon: 'solution',
                        key: 1,
                        children: [
                            {
                                name: '发货统计',
                                url: '/index/Statistics',
                                key: 1,
                            },
                            {
                                name: '已发货列表',
                                url: '/index/shippinglist',
                                key: 3,
                            },
                            {
                                name: '大货系统',
                                url: '/index/biggoods',
                                key: 4,
                            },
                            {
                                name: '订单搜索',
                                url: '/index/searchorder',
                                key: 5,
                            },
                            {
                                name: '天猫',
                                children: [
                                    {
                                        name: '天猫',
                                        url: '/index/modify_sku'
                                    },
                                    {
                                        name: '天猫商品',
                                        url: '/index/commodity'
                                    },
                                    {
                                        name: '天猫订单发货',
                                        url: '/index/tmallShip'
                                    },
                                    {
                                        name:"天猫修改短语",
                                        url:"/index/phrasetmall"
                                    }
                                ],
                                key: 5,
                            },
                            {
                                name: '京东',
                                children: [
                                    {
                                        name: '京东打印',
                                        url: '/index/jdorder',
                                        key: 1,
                                    },
                                    {
                                        name: "订单详情",
                                        url: "/index/orderdetail",
                                        key: 2,
                                    },
                                    {
                                        name: '京东商品',
                                        url: '/index/JDshop',
                                        key: 1,
                                    },
                                    {
                                        name: "京东订单搜索",
                                        url: "/index/jdsearch",
                                        key: 1
                                    }
                                ],
                                key: 5,
                            },
                            {
                                name: "小红书",
                                children: [
                                    {
                                        name: "小红书商品",
                                        url: "/index/red_book_goods",
                                        key: 1
                                    },
                                    {
                                        name: "小红书订单搜索",
                                        url: "/index/red_book_search",
                                        key: 1
                                    },
                                    {
                                        name: "修改短语",
                                        url: "/index/generativephrase",
                                        key: 1
                                    }
                                ],
                                key: 1
                            },
                        ]
                    },
                    {
                        name: "仓库",
                        icon: 'home',
                        key: 1,
                        children: [
                            {
                                name: '仓库总览',
                                url: '/index/commodity',
                                key: 2,
                            },
                            {
                                name: '添加修改sku',
                                url: '/index/modify_sku',
                                key: 1,
                            },
                            {
                                name: '轮播图',
                                url: "/index/banner",
                            },
                            {
                                name: '视频',
                                url: "/index/video",
                            },
                            {
                                name: '商品列表',
                                url: "/index/modify_sku",
                            },
                            {
                                name: 'sku',
                                url: '/index/modify_sku',
                            },
                        ]
                    },
                    {
                        name: "供应商列表",
                        icon: 'team',
                        children: [
                            {
                                name: '供应商入库出库',
                                url: '/index/semi_product',
                                key: 2,
                            },
                            {
                                name: '半成品',
                                url: '/index/semi_product',
                                key: 5,
                            },
                        ]
                    },
                    {
                        name: "售后管理",
                        icon: 'desktop',
                        key: 1,
                        children: [
                            {
                                name: '售后总览',
                                url: '/index/aftersalesurvey',
                                key: 2,
                            },
                            {
                                name: '退押金',
                                url: '/index/deposit',
                            },
                            {
                                name: '地址管理',
                                url: '/index/address',
                            },
                            {
                                name: '充值管理',
                                url: '/index/charge',
                            },
                        ]
                    },
                    {
                        name: "电子面单",
                        icon: 'profile',
                        key: 1,
                        children: [
                            {
                                name: '运费',
                                url: '/index/freight',
                            },
                            {
                                name: '天猫面单',
                                url: "/index/tmalllist",
                            },
                            {
                                name: '京东面单',
                                url: '/index/jdlist',
                            },
                        ]
                    },
                    {
                        name: "系统管理",
                        icon: 'setting',
                        key: 1,
                        children: [
                            {
                                name: '分组管理',
                                url: '/index/group_manage',
                            },
                            {
                                name: '用户登录日志',
                                url: '/index/userlog',
                            },
                            {
                                name: '管理员管理',
                                url: '/index/admin_manage',
                            },
                            {
                                name: '指引页',
                                url: '/index/guide',
                            },
                            {
                                name: '用户管理',
                                url: '/index/user_manage',
                            },
                            {
                                name: '角色管理',
                                url: "/index/role_manage",
                            },
                            {
                                name: '节点管理',
                                url: '/index/node_manage',
                            },
                            {
                                name: '操作日志',
                                url: '/index/operation_log',
                            },
                            {
                                name: '登录日志',
                                url: '/index/logon_log',
                            },
                        ]
                    },
                    {
                        name: "系统设置",
                        icon: 'profile',
                        key: 1,
                        children: [
                            {
                                name: '系统设置',
                                url: '/index/systemconfig',
                            },
                        ]
                    },
                ],
                openKeys: ['订单']
            }
        },
        mounted() {

        },
        watch: {},
        methods: {
            scroll(e) {
                e.preventDefault();
                e.stopPropagation()
            },
            onOpenChange(openKeys) {
                const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
                console.log(openKeys, lastestOpenKey);
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
    ul li{
        user-select: none;
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

    #components-layout-demo-custom-trigger .ant-layout-sider-collapsed .logo {
        font-size: 0;
        background: url('../assets/logo.svg') center / contain no-repeat;
    }

    #components-layout-demo-custom-trigger .ant-layout-sider-collapsed a {
        color: #fff;
    }

    .main-nav::-webkit-scrollbar {
        display: none;
    }
</style>
