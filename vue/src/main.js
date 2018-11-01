import Vue from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import App from './App.vue'
import router from './router'


import axios from 'axios'
import VueAxios from 'vue-axios'

let instance = axios.create({
    headers:{
        "Content-type":"application/x-www-form-urlencoded"
    }
});

Vue.use(VueAxios, instance);
Vue.config.productionTip = false;

Vue.use(Antd);


new Vue({
    router,

    render: h => h(App)
}).$mount('#app')

