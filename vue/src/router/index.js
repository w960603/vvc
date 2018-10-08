import Vue from 'vue'
import Router from 'vue-router'
import index from '../views/index'
import com1 from '../views/component1'
import com2 from '../views/component2'
import com3 from '../views/component3'
import com4 from '../views/component4'

/***ElectronicSurface页面组件**/

import jdlist from '../views/ElectronicSurface/jdlist'
import tmalllist from '../views/ElectronicSurface/tmalllist'
/***warehouse页面组件**/
import commodity from '../views/warehouse/commodity'
/***Administration页面组件**/
import aftersalesurvey from '../views/Administration/aftersalesurvey'


/***home组件**/
import jdorder from "../views/home/jdorder"
import JDshop from "../views/home/JDshop"
import  modify_sku from "../views/home/modify_sku"
import searchorder from "../views/home/searchorder"
// import



/***systerm_manage页面组件**/
import node_manage from '../views/systerm_manage/node_manage'
import operation_log from '../views/systerm_manage/operation_log'
import role_manage from '../views/systerm_manage/role_manage'
// import roles from '../views/systerm_manage/role/role'
import user_manage from '../views/systerm_manage/user_manage'
import group_manage from '../views/systerm_manage/group_manage'
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
               component: index,
               name:'index',
               children: [
                   {
                       path: '/com2',
                       component: com2,
                       name:'com2'
                   },
                   {
                       path: '/com3',
                       component: com3,
                       name:'com3'
                   },
                   {
                       path: '/com4',
                       component: com4,
                       name:'com4'
                   },

                   /***warehouse页面组件**/
                   {
                       path: '/com1',
                       component: commodity,
                       name:'com1'
                   },

                   /***ElectronicSurface页面组件**/
                   {
                       path: '/jdlist',
                       component: jdlist,
                       name:'jdlist'
                   },
                   {
                       path: '/tmalllist',
                       component: tmalllist,
                       name:'tmalllist'
                   },

                   /***Administration页面组件**/
                   {
                       path: '/aftersalesurvey',
                       component: aftersalesurvey,
                       name:'aftersalesurvey'
                   },
                   /***systerm_manage页面组件**/
                   {
                       path:'/node_manage',
                       component:node_manage,
                       name:'node_manage'
                   },
                   {
                       path:'/operation_log',
                       component:operation_log,
                       name:'operation_log'
                   },
                   {
                       path:'/role_manage',
                       component:role_manage,
                       name:'role_manage'
                   },
                   {
                       path:"/user_manage",
                       component:user_manage,
                       name:"user_manage"
                   },
                   {
                       path:"/group_manage",
                       component:group_manage,
                       name:"group_manage"
                   },
                   {
                       path:'/jdorder',
                       component:jdorder,
                       name:'jdorder'
                   },
                   {
                       path:'/JDshop',
                       component:JDshop,
                       name:'JDshop'
                   },

                   {
                       path:'/modify_sku',
                       component:modify_sku,
                       name:'modify_sku'
                   },
                   {
                       path:'/searchorder',
                       component:searchorder,
                       name:'searchorder'
                   }
                ]
           }
       ]
   })

