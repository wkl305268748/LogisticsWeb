import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';    // 默认主题
import "babel-polyfill";

Vue.use(ElementUI);
Vue.prototype.$axios = axios;

//路由钩子
router.beforeEach((to, from, next) => {
    //记录上一个地址
    localStorage.setItem('url_from',from.path);
    next();
});

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
