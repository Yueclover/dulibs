const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    open:true,
    host: '0.0.0.0',
    port: 8080,
    client: {
      webSocketURL: 'ws://0.0.0.0:8080/ws',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {   //服务器代理
      '/api': {
        target: "http://localhost:8081",   // 实际跨域请求的API地址
        secure: false,   // https请求则使用true
        ws: true,
        changeOrigin: true,  // 跨域
        pathRewrite: {
          '^/api': '',
        }

      },
    },
  }
})
