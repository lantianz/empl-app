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
import Cookie from 'js-cookie';

export default {
  data() {
    return {
      
    };
  },
  methods: {
    handleOpen(key) {
      // console.log(key, 'open');
    },
    handleClose(key) {
      // console.log(key, 'close');
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
    menuData() {
      return this.$store.state.tab.menu || JSON.parse(Cookie.get('menu'));
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