import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import Cookies from 'js-cookie';
Vue.use(Vuex);

const store = new Vuex.Store({
    state :{
        count:1,
        show_loginInBox : false,//是否显示登录框
        show_loginUpBox : false,//是否显示注册框
        is_login : true,//是否已经登录
        userClassify : "",//用户属于企业还是个人 value--> "website" or "personal"
    },
    mutations: {
      increment: state => state.count++,
      decrement: state => state.count--
    },
    plugins: [createPersistedState({
        storage: {
          getItem: key => Cookies.get(key),
          setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true }),
          removeItem: key => Cookies.remove(key)
        }
    })],

});

export default store;