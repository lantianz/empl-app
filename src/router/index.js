import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import BaseInfo from '../views/BaseInfo.vue'
import EmplInfo from '../views/EmplInfo.vue'
import AccountAllocation from '../views/AccountAllocation.vue'
import InformationPush from '../views/InformationPush.vue'
import Check from '../views/Check.vue'
import Total from '../views/Total.vue'
import User from '../views/User.vue'
import Setting from '../views/Setting.vue'
import ChangePwd from '../views/ChangePwd.vue'
import Main from '../views/Main.vue'
Vue.use(VueRouter)
// 1.创建路由组件
// 2.将路由与组件进行映射
// 3.创建router实例

const routes = [
    {
        path: '/', 
        component: Main,
        redirect: '/home',
        children: [
            //子路由
            { path: '/home', component: Home },
            { path: '/baseinfo', component: BaseInfo },
            { path: '/emplinfo', component: EmplInfo },
            { path: '/accountallocation', component: AccountAllocation },
            { path: '/informationpush', component: InformationPush },
            { path: '/check', component: Check },
            { path: '/total', component: Total },
            { path: '/user', component: User },
            { path: '/setting', component: Setting },
            { path: '/changepwd', component: ChangePwd }
        ]
    }
]

// 避免重复点击相同路由产生错误
const originaPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originaPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})
export default router
