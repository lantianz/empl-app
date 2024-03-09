<template>
  <div class="not">
    <h1>404 Not Found</h1>
    <p>页面找不到，请检查路径是否正确。</p>
    <span>或者点击</span>
    <el-button @click="clearReLogin" type="text">此处</el-button>
    <span>清除缓存后重新登陆。</span>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  methods: {
    clearReLogin() {
      localStorage.clear();
      location.reload();
    }
  }
};
</script>

<style lang="less" scoped>
.not {
  margin: 100px;
  h1 {
    color: red;
  }
  p,span {
    color: #999999 
  }
}
</style>