const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // 关闭eslint校验
  devServer: {
    proxy: {  // 跨域代理
      '/api': {
        target: 'http://127.0.0.1:8888/', // 代理的域名
        changeOrigin: true, // 开启代理，本地创建虚拟服务端，发送or接收请求
        pathRewrite: {
          // 重写匹配字段，如果不需要在请求路径上，重写为""
          '^/api': '',
        }
      }
    }
  }
})
