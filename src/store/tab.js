
export default {
    state: {
        isCollapse: false, // 控制菜单的展开和收起
        tabsList: [], 
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
            if (!localStorage.getItem('menu')) return 
            const menu = JSON.parse(localStorage.getItem('menu'))
            const page404 = [
                {
                    path: '*',
                    redirect: '/notfound',
                    hidden: true
                }
            ]
            state.menu = menu
            const menuArray = []
            menu.forEach(item => {
                // 有无子菜单
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
            page404.forEach(item => {
                router.addRoute(item)
            })
        }

    }
}