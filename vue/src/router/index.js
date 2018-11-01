import Vue from 'vue'
import Router from 'vue-router'
import vuelogin from "../views/vuelogin"
import index from '../views/index'

/***登录组件**/ //
// 手机号登录
import phoneLogin from "../views/phone_login"
//二维码登录
import scanLogin from "../views/scan_login"
//人脸登录
import faceLogin from "../views/face_login"

/***ElectronicSurface页面组件**/

import jdlist from '../views/ElectronicSurface/jdlist'
import tmalllist from '../views/ElectronicSurface/tmalllist'
import freight from '../views/ElectronicSurface/freight'
/***warehouse页面组件**/
import commodity from '../views/warehouse/commodity'
import diyige from '../views/warehouse/diyige'
import banner from '../views/warehouse/banner'
/***Administration页面组件**/

import aftersalesurvey from '../views/Administration/aftersalesurvey'
import deposit from '../views/Administration/deposit'
import address from '../views/Administration/address'


//获取打印机
import setprint from "../views/home/setprint"

/***home组件**/
//京东模块
import jdorder from "../views/home/jdorder"
import jd_order from "../views/home/jd_order"
import JDshop from "../views/home/JDshop"
import jdsearch from "../views/home/jdsearch"
import orderdetail from "../views/home/orderdetail"

// red_book_printing
//小红书模块
import red_book_goods from "../views/home/red_book/red_book_goods"
import red_book_search from "../views/home/red_book/red_book_search"
import generativephrase from "../views/home/red_book/generativephrase"

import modify_sku from "../views/warehouse/modify_sku"
import searchorder from "../views/home/searchorder"
import statistics from "../views/home/statistics"
import shippinglist from "../views/home/shippinglist"
import biggoods from "../views/home/biggoods"
import tmallShip from "../views/home/tianmao/tmallShip"


//supplier
import semi_product from '../views/SupplierManagement/semi_product'

/***systerm_manage页面组件**/
import node_manage from '../views/systerm_manage/node_manage'
import operation_log from '../views/systerm_manage/operation_log'
import role_manage from '../views/systerm_manage/role_manage'
import user_manage from '../views/systerm_manage/user_manage'
import group_manage from '../views/systerm_manage/group_manage'
import logon_log from '../views/systerm_manage/logon_log'
import logs from '../views/systerm_manage/logs'
import userlog from '../views/systerm_manage/userlog'
import userinfo from '../views/systerm_manage/userinfo'
/**
    import diyige from '../views/warehouse/diyige'
    import ordertype from '../views/warehouse/ordertype'
    import package from '../views/warehouse/package'
**/
Vue.use(Router);
   export default new Router({
       routes : [
           {
               path: '/',
               component: vuelogin,
               name:'vuelogin',
           },
           {
               path:'/phoneLogin',
               component:phoneLogin,
               name:"phoneLogin",
           },
           {
             path:"/scanLogin",
             component:scanLogin,
             name:"scanLogin"
           },
           {
               path:"/faceLogin",
               component:faceLogin,
               name:"faceLogin"
           },
           {
               path: '/index',
               component: index,
               name:'index',
               children: [
                   /***home页面组件**/
                   {
                     path:"statistics",
                     component:statistics,
                     name:"statistics",
                   },
                   {
                       path:"shippinglist",
                       component:shippinglist,
                       name:"shippinglist",
                   },
                   {
                       path:'biggoods',
                       component:biggoods,
                       name:"biggoods",
                   },

                   /***京东模块**/
                   {
                       path:'jdorder',
                       component:jdorder,
                       name:'jdorder'
                   },
                   {
                       path:'jd_order',
                       component:jd_order,
                       name:'jd_order'
                   },
                   {
                       path:'JDshop',
                       component:JDshop,
                       name:'JDshop'
                   },
                   {
                       path:"orderdetail",
                       component:orderdetail,
                       name:"orderdetail"
                   },
                   {
                       path:'jdsearch',
                       component:jdsearch,
                       name:"jdsearch"
                   },
                   {
                     path:"setprint",
                       component:setprint,
                     name:"setprint"
                   },
                   /***小红书模块**/
                   {
                       path:"red_book_goods",
                       component:red_book_goods,
                       name:"red_book_goods"
                   },
                   {
                       path:"red_book_search",
                       component:red_book_search,
                       name:"red_book_search"
                   },
                   {
                       path:"generativephrase",
                       component:generativephrase,
                       name:"generativephrase"
                   },
                   {
                       path:'modify_sku',
                       component:modify_sku,
                       name:'modify_sku'
                   },
                   {
                       path:'searchorder',
                       component:searchorder,
                       name:'searchorder'
                   },
                   {
                       path: 'tmallShip',
                       component: tmallShip,
                       name:'tmallShip'
                   },

                   /***warehouse页面组件**/

                   {
                       path: 'commodity',
                       component: commodity,
                       name:'commodity'
                   },
                   {
                       path: 'diyige',
                       component: diyige,
                       name:'diyige'
                   },
                   {
                       path: 'banner',
                       component: banner,
                       name:'banner'
                   },

                   /***ElectronicSurface页面组件**/
                   {
                       path: 'jdlist',
                       component: jdlist,
                       name:'jdlist'
                   },
                   {
                       path: 'tmalllist',
                       component: tmalllist,
                       name:'tmalllist'
                   },
                   {
                       path: 'freight',
                       component: freight,
                       name:'freight'
                   },

                   /***Administration页面组件**/
                   {
                       path: 'aftersalesurvey',
                       component: aftersalesurvey,
                       name:'aftersalesurvey'
                   },
                   {
                       path: 'deposit',
                       component: deposit,
                       name:'deposit'
                   },
                   {
                       path: 'address',
                       component: address,
                       name:'address'
                   },


                   //Supplier

                   {
                       path: 'semi_product',
                       component: semi_product,
                       name:'semi_product'
                   },



                   /***systerm_manage页面组件**/
                   {
                       path: 'user_manage',
                       component: user_manage,
                       name:'user_manage',
                       children:[

                       ]
                   },
                   {
                       path: 'userinfo',
                       component: userinfo,
                       name:'userinfo',
                       props:true
                   },
                   {
                       path:'node_manage',
                       component:node_manage,
                       name:'node_manage'
                   },
                   {
                       path:'operation_log',
                       component:operation_log,
                       name:'operation_log'
                   },
                   {
                       path:'logs',
                       component:logs,
                       name:'logs'
                   },
                   {
                       path:'role_manage',
                       component:role_manage,
                       name:'role_manage'
                   },
                   {
                       path:"group_manage",
                       component:group_manage,
                       name:"group_manage"
                   },
                   {
                       path:"logon_log",
                       component:logon_log,
                       name:"logon_log"
                   },
                   {
                       path: 'userlog',
                       component: userlog,
                       name:'userlog'
                   },
                ]
           }
       ]
   })

