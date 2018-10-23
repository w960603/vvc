import Vue from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import App from './App.vue'


import router from './router'


import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

Vue.config.productionTip = false;


//使用antd和jq
Vue.use(Antd);


new Vue({
    router,

    render: h => h(App)
}).$mount('#app')

