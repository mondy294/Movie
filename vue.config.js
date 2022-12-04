// const { defineConfig } = require('@vue/cli-service')
module.exports = ({
  lintOnSave: false,
  transpileDependencies: true,

  //配置代理跨域

  devServer: {
    proxy: {
      '/douban': {
        target: 'https://movie.douban.com',
        changeOrigin: true,
        // 无论如何一定要重写!!!!
        pathRewrite: {
          '^/douban': ''
        }
      },
      '/search': {
        target: 'https://search.douban.com',
        changeOrigin: true,
        // 无论如何一定要重写!!!!
        pathRewrite: {
          '^/search': ''
        }
      }
    }
  }

})
