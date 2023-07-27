import Vue from 'vue'
// 引入路由
import Router from 'vue-router' // Router 可以自己命名
Vue.use(Router);

// 引入elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// import { Message } from 'element-ui';
// Vue.prototype.$message = Message;

// 引入路由对应的组件
import homePage from './view/homePage'
import login from './view/Login.vue'
import productsList from './view/products-list.vue'
import electronicProducts from './view/electronic-products.vue'
import books from './view/books.vue'
import sportGoods from './view/sport-goods.vue'
import goodsDetail from './view/Goods-detail.vue'
import userCenter from './view/user-center.vue'
import lostThingsDisplay from './view/Lost-things-display.vue'
import adminOperation from './view/Admin-operation.vue'
import displaySearchResult from './view/Display-search-result.vue'

import releaseGoods from './view/Use-center-inner-component/Release-goods.vue'
import lostReport from './view/Use-center-inner-component/Lost-property-report.vue'
import displayReleaseGoodsInfo from './view/Use-center-inner-component/Display-release-goods-info.vue'
import changeUserName from './view/Use-center-inner-component/Change-user-name.vue'
import changeUserPwd from './view/Use-center-inner-component/Change-user-pwd.vue'

// 创建路由实例 router，并且传入路由映射配置
const router = new Router({
    // mode 设置为history，这个用于线上部署项目时去掉地址栏上的 # 号，若想本地打开打包后的项目index.html文件，需要注释掉这个模式
    mode: "history",
    // 路径 routes
    routes: [{
            path: '/', //设置路由的默认路径
            redirect: '/login' //这样设置之后，就将默认的路由路径设置为/homePage,即App.vue 的 router-view 默认显示homePage组件
        },
        {
            path: '/homePage',
            name: 'homepage',
            component: homePage,
            meta: {
                title: '主页',
                requireAuth: true //该路由是否需要检查，表示首页需要先登录才能访问
            },
            children: [{ //嵌套路由，children属性里的组件会显示在父组件homePage的<router-view>中
                    path: 'electronicProducts',
                    component: electronicProducts,
                    meta: {
                        title: '电子产品',
                        requireAuth: true
                    },
                },
                {
                    path: 'books', // 调用时还是要写完整的路径
                    component: books,
                    meta: {
                        title: '书籍教材',
                        requireAuth: true
                    },
                },
                {
                    path: 'sportGoods',
                    component: sportGoods,
                    meta: {
                        title: '体育用品',
                        requireAuth: true
                    },
                },
                {
                    path: 'lostThingsDisplay',
                    component: lostThingsDisplay,
                    meta: {
                        title: '招领启事',
                        requireAuth: true
                    },
                },

                {
                    path: 'displaySearchResult',
                    component: displaySearchResult,
                    meta: {
                        title: '搜索页面',
                        requireAuth: true
                    },
                },
                // 空的嵌套路由默认显示嵌套路由的子组件，嵌套路由是要提供二级路由才能显示对应的子组件，刚进入页面时是没有指定二级路由的，
                // 所以页面就不能显示组件，但这样很不美观，需要默认显示一个子组件
                {
                    path: '',
                    component: productsList,
                    meta: {
                        title: '所有商品',
                        requireAuth: true
                    },
                }, //默认显示嵌套路由的productsList组件方法1。这里也要写meta，这样默认显示嵌套路由才能显示页面title

            ],
            //默认显示嵌套路由的productsList组件方法2：
            //redirect: '/homePage/productsList',
        },

        { //数组里的每个对象就是一个route，它们的集合就是路由数组 routes，这个变量是规定下来的
            path: '/login',
            name: 'login',
            component: login,
            meta: {
                title: '用户登录'
            },
            // props: true,
        },

        // 管理员界面
        {
            path: '/adminOperation',
            name: 'adminOperation',
            component: adminOperation,
            meta: {
                title: '管理员',
                requireAuth: true
            }

        },
        { //商品详情页面
            path: '/goodsDetail',
            name: 'goodsDetail',
            component: goodsDetail,
            meta: {
                title: '商品详情',
                requireAuth: true
            }
        },
        { //用户中心页面
            path: '/userCenter',
            name: 'userCenter',
            component: userCenter,
            meta: {
                title: '用户中心',
                requireAuth: true
            },
            children: [{
                    path: '',
                    component: releaseGoods,
                    meta: {
                        title: '发布闲置物品',
                        // requireAuth: true
                    },
                },
                {
                    path: 'lostReport',
                    component: lostReport,
                    meta: {
                        title: '发布招领启事',
                        // requireAuth: true
                    },
                },
                {
                    path: 'displayReleaseGoodsInfo',
                    component: displayReleaseGoodsInfo,
                    meta: {
                        title: '已发布的闲置',
                        // requireAuth: true
                    },
                },
                {
                    path: 'changeUserName',
                    component: changeUserName,
                    meta: {
                        title: '修改用户名',
                        // requireAuth: true
                    },
                },
                {
                    path: 'changeUserPwd',
                    component: changeUserPwd,
                    meta: {
                        title: '修改密码',
                        // requireAuth: true
                    },
                }
            ]
        },
    ]
})

// 路由守卫写法1：每个路由设置meta.requireAuth 来决定自己需不需要登录才能访问，不需要token，只需要登录成功后设置一个标记。实际业务会用写法2，即token验证的方式
// router.beforeEach((to, from, next) => {
//     document.title = to.meta.title; // 显示要去的页面标题
//     // console.log('已登录，可跳转')
//     if (to.meta.requireAuth) { // 要跳转的路由需要登录权限，if（）判断中，只要表达式的值不是true，其他的类型 判断结果都是false
//         if (sessionStorage.getItem('isLogin') === 'true') { //这是通过在登录成功后设置标记“isLogin” 的方法来判断用户是否登录
//             next()
//         } else {
//             // 未登录，跳转到登录页面
//             next('/login')
//         }
//     } else { //要跳转的路由不需要登录权限
//         next()
//     }
// })

// 路由守卫写法2
// 路由守卫是当你第一次跳转，第一次进入网站就开始工作了。浏览器的刷新按钮被点击后，当前页面会重新发送请求。
// 使用 router.beforeEach 注册一个全局前置守卫（这个写法即除了登录页面，其他所有路由跳转前都要验证token），判断用户是否已经登陆

router.beforeEach((to, from, next) => {
    // to 将要访问的路径
    // from 从哪里跳转来
    // next 放行
    //跳转到登录页面直接放行，比如第一次登陆
    console.log("全局路由守卫工作了");
    // 路由跳转时修改标签栏的title
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    if (to.path === '/login') {
        next();
    } else {
        // 获取token,看是否有token,有token放行，当关闭页面后，整个sessionStorage没有了，token 也就没有了
        // 所以复制主页url后关掉页面，再粘贴主页url到地址栏，会跳转到登录页面
        const token = sessionStorage.getItem("token");
        if (!token) { // 没有 token，跳到登录页面,没有token时，token的值是undefined，if（）判断的时候会将token转换为false，取非后表达式为true，于是跳转到登录页面
            next('/login');
            return;
        } else { // 有 token
            next(); //放行
        }

    }
});

export default router // 导出默认值 router ，这样可以在别的文件中导入这个值，然后使用