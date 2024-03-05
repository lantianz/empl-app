<template>
  <el-menu default-active="2" 
  class="el-menu-vertical-demo" 
  @open="handleOpen" 
  @close="handleClose"
  :collapse="isCollapse"  
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#409EFF"
  >
    <h3>{{isCollapse ? '管理':'就业信息管理系统'}}</h3>
    <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.name">
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>

    <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
        <el-menu-item @click="clickMenu(subItem)" :index="subItem.path">{{ subItem.label }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      menuData: [
        {
          path: "/",
          name: "home",
          label: "首页",
          icon: "s-home",
          url: "Home/Home"
        },
        {
          path: "/baseinfo",
          name: "baseinfo",
          label: "毕业生基本信息",
          icon: "s-custom",
          url: "BaseInfo/BaseInfo"
        },
        {
          path: "/emplinfo",
          name: "emplinfo",
          label: "毕业生就业信息",
          icon: "s-promotion",
          url: "EmplInfo/EmplInfo"
        },
        {
          path: "/accountallocation",
          name: "accountallocation",
          label: "初始账号分配",
          icon: "s-order",
          url: "AccountAllocation/AccountAllocation"
        },
        {
          path: "/informationpush",
          name: "informationpush",
          label: "就业相关资讯推送",
          icon: "s-comment",
          url: "InformationPush/InformationPush"
        },
        {
          path: "/check",
          name: "check",
          label: "就业信息审核",
          icon: "s-release",
          url: "Check/Check"
        },
        {
          path: "/total",
          name: "total",
          label: "汇总与统计",
          icon: "s-grid",
          url: "Total/Total"
        },
        {
          label: "其他",
          icon: "more",
          children: [
            {
              path: "/user",
              name: "user",
              label: "个人中心",
              url: "Other/User"
            },
            {
              path: "/setting",
              name: "setting",
              label: "系统设置",
              url: "Other/Setting"
            },
            {
              path: "/changepwd",
              name: "changepwd",
              label: "修改密码",
              url: "Other/ChangePwd"
            },
            {
              path: "/logout",
              name: "logout",
              label: "退出登录",
              url: "Other/Logout"
            }
          ]
        }
      ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 点击菜单
    clickMenu(item) {
      //当前页面与跳转页面不一致则允许跳转
      if (this.$route.path !== item.path && !(this.$route.path === "/home" && (item.path === "/" || item.path === "/home"))) {
        this.$router.push(item.path);
      }
      this.$store.commit("selectMenu", item);
    }
  },
  computed: {
    // 没有子菜单
    noChildren() {
      return this.menuData.filter(item => !item.children);
    },
    // 有
    hasChildren() {
      return this.menuData.filter(item => item.children);
    },
    // 是否折叠
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    }
  }
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  border-right: none;
  height: 100vh;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
    font-size: 16px;
    font-weight: 400;
  }
}
</style>