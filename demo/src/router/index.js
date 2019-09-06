import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const router = new Router({
  routes: [
        {   //登录
            path: '/',
            name: 'login',
            component: resolve => require(['@/components/login'], resolve),
        },
        {
        	  path: '/index',
            name: 'index',
            component: resolve => require(['@/components/index'], resolve),
            redirect: {name: 'carousel'},
            children:[
            {
            	 path: '/home/carousel',
	             name: 'carousel',
	             component: resolve => require(['@/components/home/carousel'], resolve),
            },
            {
            	 path: '/home/travelNotes',
	             name: 'travelNotes',
	             component: resolve => require(['@/components/home/travelNotes'], resolve),
            },
             {
            	 path: '/home/platform',
	             name: 'platform',
	             component: resolve => require(['@/components/home/platform'], resolve),
            },
             {
            	 path: '/userManagement/userManagement',
	             name: 'userManagement',
	             component: resolve => require(['@/components/userManagement/userManagement'], resolve),
            },
            {
            	 path: '/examine',
	             name: 'examine',
	             component: resolve => require(['@/components/examine/examine'], resolve),
            },
            {
            	 path: '/city',
	             name: 'city',
	             component: resolve => require(['@/components/city/city'], resolve),
            },
             {
            	 path: '/flight',
	             name: 'flight',
	             component: resolve => require(['@/components/flight/flight'], resolve),
            },
             {
            	 path: '/business',
	             name: 'business',
	             component: resolve => require(['@/components/business/business'], resolve),
            },
             {
            	 path: '/route',
	             name: 'route',
	             component: resolve => require(['@/components/route/route'], resolve),
            },
             {
            	 path: '/orderManagement/orderManagement',
	             name: 'ordermanagement',
	             component: resolve => require(['@/components/orderManagement/orderManagement'], resolve),
            },
             {
            	 path: '/orderManagement/intervention',
	             name: 'intervention',
	             component: resolve => require(['@/components/orderManagement/intervention'], resolve),
            },
            //  {
            // 	 path: '/role/addrole',
	          //    name: 'addrole',
	          //    component: resolve => require(['@/components/role/addrole'], resolve),
            // },
             {
            	 path: '/role/auditor',
	             name: 'auditor',
	             component: resolve => require(['@/components/role/auditor'], resolve),
            },
             {
            	 path: '/role/service',
	             name: 'service',
	             component: resolve => require(['@/components/role/service'], resolve),
            },
              {
                path: '/price',
                name: 'price',
                component: resolve => require(['@/components/price/price'], resolve),
              }
              
            ]
        }
  ]
  
})

router.beforeEach((to, from, next) => {
	 
    // to: Route: 即将要进入的目标 路由对象
    // from: Route: 当前导航正要离开的路由
    // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。

    const nextRoute = ['carousel','travelNotes','platform','userManagement','examine','city','flight','business','route','ordermanagement',
    'intervention','auditor','service','price'];
    let isLogin = sessionStorage.getItem('id');  // 是否登录
   
    // console.log(isLogin)
    // console.log(nextRoute.indexOf(to.name))
    // 未登录状态；当路由到nextRoute指定页时，跳转至login
    if (nextRoute.indexOf(to.name) >= 0) {
        if (isLogin === null) {
            router.push({name: 'login'});
            return false;
        }
    }
    next();
});

 export default router;
