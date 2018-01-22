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
              component: (resolve) => require(['@/components/website/Consultant/Consultant.vue'], resolve),
              meta : {
                title : "Consultant"
              }
            },
            {
              path: '/ConsultantDetail',
              name: 'ConsultantDetail',
              component: (resolve) => require(['@/components/website/Consultant/ConsultantDetail.vue'], resolve),
              meta : {
                title : "ConsultantDetail"
              }
            },
            {
              path: '/GetTalent',
              name: 'GetTalent',
              component: (resolve) => require(['@/components/website/Consultant/GetTalent.vue'], resolve),
              meta : {
                title : "GetTalent"
              }
            },
            {
              path: '/Job',
              name: 'Job',
              component: (resolve) => require(['@/components/personal/Job/Job.vue'], resolve),
              meta : {
                title : "Job"
              }
            },
            {
              path: '/JobDetail',
              name: 'JobDetail',
              component: (resolve) => require(['@/components/personal/Job/JobDetail.vue'], resolve),
              meta : {
                title : "JobDetail"
              }
            },
            {
              path: '/PublicJob',
              name: 'PublicJob',
              component: (resolve) => require(['@/components/website/PublicJob/PublicJob.vue'], resolve),
              meta : {
                title : "PublicJob"
              }
            },
            {
              path: '/PartTime',
              name: 'PartTime',
              component: (resolve) => require(['@/components/personal/PartTime/PartTime.vue'], resolve),
              meta : {
                title : "PartTime"
              }
            },
            {
              path: '/PersonalHome',
              name: 'PersonalHome',
              component: (resolve) => require(['@/components/personal/PersonalHome/PersonalHome.vue'], resolve),
              meta : {
                title : "PersonalHome"
              }
            },
            {
              path: '/WebsiteHome',
              name: 'WebsiteHome',
              component: (resolve) => require(['@/components/website/WebsiteHome/WebsiteHome.vue'], resolve),
              meta : {
                title : "WebsiteHome"
              }
            },
            {
              path: '/Pay',
              name: 'Pay',
              component: (resolve) => require(['@/components/Pay/Pay.vue'], resolve),
              meta : {
                title : "Pay"
              }
            },
            {
              path: '/DanBao',
              name: 'DanBao',
              component: (resolve) => require(['@/components/danbao/danbao.vue'], resolve),
              meta : {
                title : "DanBao"
              }
            },
            {
              path: '/DBsteps',
              name: 'DBsteps',
              component: (resolve) => require(['@/components/danbao/danbaoSteps.vue'], resolve),
              meta : {
                title : "DBsteps"
              }
            },
            {
              path: '/Comment',
              name: 'Comment',
              component: (resolve) => require(['@/components/common/Comments/Comments.vue'], resolve),
              meta : {
                title : "Comment"
              }
            },
            {
              path: '/StandardService',
              name: 'StandardService',
              component: (resolve) => require(['@/components/StandardService/StandardService.vue'], resolve),
              meta : {
                title : "StandardService"
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
