import Vue from 'vue';
import router from './router';
import store from "./store";
import axios from 'axios'
import App from './app.vue';
import '../static/my-theme/index.less';

Vue.config.productionTip = false;
Vue.prototype.$ajax = axios;
new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});
//BASE_URL  -------------------> webpack.dev.conf.js 配置接口地址