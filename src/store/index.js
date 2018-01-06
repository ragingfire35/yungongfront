import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({
    state :{
        count:0,
        show_loginInBox : false,//是否显示登录框
        show_loginUpBox : false,//是否显示注册框
        is_login :sessionStorage.is_login || "false",//是否已经登录
        userClassify :
                      JSON.parse(sessionStorage.getItem('userClassify') || '[]') || {
                          "userClass" : "",
                          "type" : "",
                          "text" : "",
                          "text1" : ""
                      },//用户属于企业还是个人 value--> "{}"
        LoginedUser: {
          username: sessionStorage.username || '',
          userhead :  sessionStorage.userhead || ''
        }
    },

    mutations: {
    	  LOGIN (state){
            state.is_login = sessionStorage.is_login = "true";
        },
        LOGOUT (state){
            state.is_login = sessionStorage.is_login = "false";
            state.LoginedUser.name  = '';
            sessionStorage.clear();
            window.location.href = "/";
        },
        USERNAME(state){
            let username = sessionStorage.getItem('username');
            state.LoginedUser.username = username;
        },
        USERHEAD(state){
            let userhead = sessionStorage.getItem('userhead');
            state.LoginedUser.userhead = userhead;
        },
        USERCLASSIFY(state){
            let userClassify = JSON.parse(sessionStorage.getItem('userClassify'));
            state.userClassify = userClassify;
        },
    },
    actions:{
        login ({commit}, userinfo) {
          this.dispatch('username', userinfo.username);
          this.dispatch('userhead', userinfo.userhead);
          commit('LOGIN');
        },
        logout ({commit}) {
          commit('LOGOUT');
        },
        username ({commit}, username) {
          sessionStorage.setItem("username",username);
          commit('USERNAME');
        },
        userhead ({commit}, userhead) {
          sessionStorage.setItem("userhead", userhead == false ? "./src/components/personal/Job/image/user.png" : userhead);
          commit('USERHEAD');
        },
        userClassify ({commit},  userClassify) {
          let website = {
            "userClass" : "website",
            "type" : "success",
            "text" : "进入个人版",
            "text1" : "当前版本：企业版"
          };
          let personal = {
            "userClass" : "personal",
            "type" : "primary",
            "text" : "进入企业版",
            "text1" : "当前版本：个人版"
          };
          sessionStorage.setItem("userClassify",JSON.stringify(userClassify == 'website' ? website : personal));
          commit('USERCLASSIFY');
        },
    }
});

export default store;