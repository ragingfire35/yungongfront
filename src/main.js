import Vue from 'vue';
import Vuex from 'vuex'
import router from './router';
import axios from 'axios'
import App from './app.vue';


import '../static/my-theme/index.less';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        show_loginInBox : false,//是否显示登录框
        show_loginUpBox : false,//是否显示注册框
        is_login : false,//是否已经登录
        userClassify : "",//用户属于企业还是个人 value--> "website" or "personal"
    }
})


Vue.config.productionTip = false;
Vue.prototype.$ajax = axios;

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});
//BASE_URL  -------------------> webpack.dev.conf.js 配置接口地址