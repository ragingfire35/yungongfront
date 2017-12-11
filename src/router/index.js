import Vue from 'vue'
import VueRouter from 'vue-router'

import iView from 'iview';


Vue.use(iView);
Vue.use(VueRouter);

// 路由配置
const routes = [
        {
          path: '/',
          name: 'Home',
          component: (resolve) => require(['@/components/Home/home.vue'], resolve),
          meta : {
            title : "Home"
          }
        },
        {
          path: '/Container',
          //name: 'Container',
           //因为当某个路由有子级路由的时候，这时候父级路由需要一个默认的路由，所以父级路由不能定义name属性
          component: (resolve) => require(['@/components/Container/Container.vue'], resolve),
          meta : {
            title : "Container"
          },
          children:[
            {
              path: '/Consultant',
              name: 'Consultant',
              component: (resolve) => require(['@/components/Consultant/Consultant.vue'], resolve),
              meta : {
                title : "Consultant"
              }
            },
            {
              path: '/Job',
              name: 'Job',
              component: (resolve) => require(['@/components/Job/Job.vue'], resolve),
              meta : {
                title : "Job"
              }
            },
            {
              path: '/PublicJob',
              name: 'PublicJob',
              component: (resolve) => require(['@/components/PublicJob/PublicJob.vue'], resolve),
              meta : {
                title : "PublicJob"
              }
            },
            {
              path: '/PersonalInfo',
              name: 'PersonalInfo',
              component: (resolve) => require(['@/components/PersonalInfo/PersonalInfo.vue'], resolve),
              meta : {
                title : "PersonalInfo"
              }
            }
          ]
        },       
]
const RouterConfig = {
    //mode: 'history',
    routes: routes
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    window.document.title = to.meta.title;
    next();
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

export default router;
