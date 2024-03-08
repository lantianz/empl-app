import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import store from "./store";
import router from "./router";

Vue.config.productionTip = false;

Vue.use(ElementUI);

// 全局前置路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (!token && to.name !== "login") {
    next({ name: "login" });
  } else if (token && to.name === "login") {
    next({ name: "home" });
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
  created() {
    store.commit("activeMenu", router);
  },
}).$mount("#app");
