import Cookie from "js-cookie"
import { resetRouter } from "@/router"

export default {
    state: {
        isCollapse: false, // 控制菜单的展开和收起
        tabsList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
            }
        ], 
        menu: [] // 存储菜单栏的内容
    },
    mutations: {
        // 控制方法
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        // 添加标签页的方法(meiyoushiyong)
        selectMenu(state, val) {    
            state.tabsList.splice(val)
            const index = state.tabsList.findIndex(item => item.name === val.name)
            if (index === -1) {
                state.tabsList.push(val)
            }
        },
        // 动态注册menu路由
        activeMenu(state, router) {
            // 本地缓存无数据则无法进行注册
            if (!Cookie.get('menu')) return 
            resetRouter()
            const menu = JSON.parse(Cookie.get('menu'))
            // console.log(state.menu,'state.menu')
            state.menu = menu
            const menuArray = []
            menu.forEach(item => {
                // 有子菜单
                if (item.children) {
                    item.children = item.children.map(item => {
                        item.component = () => import(`../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                } else {
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            })
            // 添加路由
            menuArray.forEach(item => {
                router.addRoute('Main', item)
            })
        }

    }
}