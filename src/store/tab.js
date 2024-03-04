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
        ] // 用于存储标签页(面包屑)的内容
    },
    mutations: {
        // 控制方法
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        // 添加标签页的方法
        selectMenu(state, val) {    
            state.tabsList.splice(val)
            const index = state.tabsList.findIndex(item => item.name === val.name)
            if (index === -1) {
                state.tabsList.push(val)
            }
        }
    }
}