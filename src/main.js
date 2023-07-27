import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from './router'
// 引入字体图标
import 'font-awesome/css/font-awesome.min.css';
import Axios from 'axios'
// Vue.prototype.$axios = Axios 
//全局注册，使用方法为:this.$axios
Vue.prototype.$http = Axios //Axios挂载到vue实例的原型上，$http 是vue实例的全局属性，这样在每个.vuea文件里都能使用axios了

import { apis } from './config'
Vue.prototype.apis = apis //把封装的api对象挂载到vue的原型上，这样Vue new出来的实例（就是每个组件）身上都带有api对象了

Vue.config.productionTip = false


//网站中，登录页是首页，登录时发起第一次请求，但登录请求不应该该拦截，登录请求也不需要带有token，这才符合逻辑
// 进到路由才能发起请求，所以是路由守卫先工作，然后请求拦截才工作
//请求拦截，发起请求前拦截检查，主要目的是为了把token放在请求头发送
Axios.interceptors.request.use(
    config => {
        /*8080/#/*/
        //基础头url
        //只有在有token时，才在请求中添加token，登录请求发送时还没有token，所以不添加token
        if (sessionStorage.getItem("token")) { // 请求拦截对登录请求豁免（不在登录请求头加token），因为发送登录请求时，token 还没有被赋值，所以if 里的语句不执行

            // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL
            // config.baseURL = 'http://47.106.64.140:8007'
            let token = sessionStorage.getItem("token")
            let userId = sessionStorage.getItem("userId")
            console.log("****************token********************")
            console.log(token);
            console.log("****************userId********************")
            console.log(userId);
            console.log("************************************")
                // 如果当前存有token，把token 加在请求头中
            if (token) {
                config.headers.token = token
            }
            if (userId) {
                config.headers.userId = userId;
            }
        }
        return config; //发送请求
    },
    error => {
        return Promise.reject(error);
    }
)


//响应拦截：主要目的是对响应中的信息进行检查，如果不符合登录条件（如token过期），就跳转到登录页面
Axios.interceptors.response.use(
    response => { //对响应数据做点什么
        console.log("响应拦截启动了");
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                // 根据status的值来做出回应
                case 401: //token 验证失败如token 过期的情况，就返回 401 清除token信息并跳转到登录页面，让用户重新登录
                    // window.sessionStorage.clear();
                    sessionStorage.removeItem('token');
                    this.$router.push({ path: '/login' })
                    break;
            }
        }
        return Promise.reject(error.response.data);
    }
)



new Vue({
    // 在Vue实例中挂载创建的路由实例，router就成为vue实例的全局属性，这样在每个.vue 组件即每个vue实例中都能使用 this.$router
    router,
    render: h => h(App), //App.vue是new vue根实例（也是根组件）的一个子组件，在index.html 中的div 中显示，并作为内容容器
}).$mount('#app')