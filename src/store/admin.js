import {check} from "../api"

export default {
    state: {
        info: [] 
    },
    mutations: {
        checkCondition() {
            if (!localStorage.getItem('info')) return 
            check().then(res => {
              if (res.data.code === 20000) {
                return
              } else {
                localStorage.clear()
                location.reload()
              }
            })
        },
        adminInfo(state, adminInfo) {
            state.info = adminInfo
            if (!localStorage.getItem('info')) return 
            state.info = ''
            const info = JSON.parse(localStorage.getItem('info'))
            state.info = info;
        }
    }
}