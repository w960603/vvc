import Vue from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import App from './App.vue'


import router from './router'


import axios from 'axios'
import VueAxios from 'vue-axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

Vue.use(Antd);


new Vue({
    router,

    render: h => h(App)
}).$mount('#app')

