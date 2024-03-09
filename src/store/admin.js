export default {
    state: {
        info: [] // 存储菜单栏的内容
    },
    mutations: {
        adminInfo(state, info) {
            state.info = info;
        }
    }
}