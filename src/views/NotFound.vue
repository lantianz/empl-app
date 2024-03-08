<template>
  <div class="not">
    <h1>404 Not Found</h1>
    <p>页面找不到，请检查路径是否正确。</p>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style lang="less" scoped>
.not {
  margin: 100px;
  h1 {
    color: red;
  }
  p {
    color: #999999 
  }
}
</style>