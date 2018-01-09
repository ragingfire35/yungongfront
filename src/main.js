import Vue from 'vue';
import router from './router';
import store from "./store";
import axios from 'axios'
import App from './app.vue';
import '../static/my-theme/index.less';

import commonJs from './components/common/commonJs/common.js';
Vue.use(commonJs);

import cityJson from './components/common/commonJs/city.js';
Vue.prototype.cityJson = cityJson;

Vue.config.productionTip = false;
Vue.prototype.$ajax = axios;
new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});
//BASE_URL  -------------------> webpack.dev.conf.js 配置接口地址