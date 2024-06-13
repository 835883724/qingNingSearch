const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: '0.0.0.0',
    port: 8080,  // 启动端口号
    proxy: {
      '/asrTest': {
        target: 'https://150.223.245.42',
        ws: true,
        changeOrigin: true,
        secure: false, // 解决代理https报错
        pathRewrite: {
          '^/asrTest': '',
        },
      },
    },
  },
})
