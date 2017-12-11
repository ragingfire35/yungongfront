import Vue from 'vue';
import router from './router';
import Vuex from 'vuex';
import axios from 'axios'
import App from './app.vue';

import '../static/my-theme/index.less';

Vue.use(Vuex);
Vue.config.productionTip = false;
Vue.prototype.$ajax = axios;

const store = new Vuex.Store({
    state: {

    },
    getters: {

    },
    mutations: {

    },
    actions: {

    }
});


new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});
//BASE_URL  -------------------> webpack.dev.conf.js 配置接口地址