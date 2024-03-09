import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
import NotFound from '../views/NotFound.vue'


Vue.use(VueRouter)
// 1.创建路由组件
// 2.将路由与组件进行映射
// 3.创建router实例

let createRouter = () => new VueRouter ({
    mode: 'history',
    routes : [
        {
            path: '/', 
            component: Main,
            name: 'Main',
            redirect: '/login',
            children: []
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/notfound',
            name: 'NotFound',
            component: NotFound,
            hidden: true
        }
    ]
})

// 避免重复点击相同路由产生错误
const originaPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originaPush.call(this, location).catch(err => err)
}

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // 重置路由
}

export default router
