import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/admin/home',
            component: resolve => require(['../components/admin/page/common/Home.vue'], resolve),
            children:[
                {
                    path: '',
                    component: resolve => require(['../components/admin/page/Index.vue'], resolve)
                },
                {
                    path: 'order/contract/info',
                    component: resolve => require(['../components/admin/page/order/contract/info.vue'], resolve)
                },
                {
                    path: 'order/customer',
                    component: resolve => require(['../components/admin/page/order/customer/list.vue'], resolve)
                },
                {
                    path: 'order/info',
                    component: resolve => require(['../components/admin/page/order/info.vue'], resolve)
                },
                {
                    path: 'customer',
                    component: resolve => require(['../components/admin/page/customer/list.vue'], resolve)
                },
                {
                    path: 'customer/add',
                    component: resolve => require(['../components/admin/page/customer/add.vue'], resolve)
                },
                {
                    path: 'account',
                    component: resolve => require(['../components/admin/page/user/Account.vue'], resolve)
                },
                {
                    path: 'admin',
                    component: resolve => require(['../components/admin/page/admin/list.vue'], resolve)
                },
                {
                    path: 'admin/add',
                    component: resolve => require(['../components/admin/page/admin/add.vue'], resolve)
                },
                {
                    path: 'system/defind',
                    component: resolve => require(['../components/admin/page/system/defind.vue'], resolve)
                },
                {
                    path: 'system/config',
                    component: resolve => require(['../components/admin/page/system/config.vue'], resolve)
                }
            ]
        },
        {
            path: '/customer/home',
            component: resolve => require(['../components/customer/page/common/Home.vue'], resolve),
            children:[
                {
                    path: '',
                    component: resolve => require(['../components/customer/page/Index.vue'], resolve)
                },
                {
                    path: 'driver',
                    component: resolve => require(['../components/customer/page/fleet/driver/list.vue'], resolve)
                },
                {
                    path: 'driver/add',
                    component: resolve => require(['../components/customer/page/fleet/driver/add.vue'], resolve)
                },
                {
                    path: 'car',
                    component: resolve => require(['../components/customer/page/fleet/car/list.vue'], resolve)
                },
                {
                    path: 'car/add',
                    component: resolve => require(['../components/customer/page/fleet/car/add.vue'], resolve)
                },
                {
                    path: 'order/contract',
                    component: resolve => require(['../components/customer/page/order/OrderContract.vue'], resolve)
                },
                {
                    path: 'order',
                    component: resolve => require(['../components/customer/page/order/list.vue'], resolve)
                },
                {
                    path: 'order/add',
                    component: resolve => require(['../components/customer/page/order/add.vue'], resolve)
                },
                {
                    path: 'order/info',
                    component: resolve => require(['../components/customer/page/order/info.vue'], resolve)
                },
                {
                    path: 'order/taking',
                    component: resolve => require(['../components/customer/page/order/taking/add.vue'], resolve)
                },
                {
                    path: 'profit',
                    component: resolve => require(['../components/customer/page/profit/list.vue'], resolve)
                },
                {
                    path: 'system/config',
                    component: resolve => require(['../components/customer/page/system/config.vue'], resolve)
                },
                {
                    path: 'account',
                    component: resolve => require(['../components/customer/page/user/Account.vue'], resolve)
                },
                {
                    path: 'recharge',
                    component: resolve => require(['../components/customer/page/user/RechargeList.vue'], resolve)
                },
                {
                    path: 'recharge/add',
                    component: resolve => require(['../components/customer/page/user/RechargeAdd.vue'], resolve)
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/Login.vue'], resolve)
        },
    ]
})
