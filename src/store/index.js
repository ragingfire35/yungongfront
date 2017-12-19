import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        show_loginInBox : false,//是否显示登录框
        show_loginUpBox : false,//是否显示注册框
        is_login : true,//是否已经登录
        userClassify : "",//用户属于企业还是个人 value--> "website" or "personal"
    }
});
export default store;