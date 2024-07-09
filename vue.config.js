const { defineConfig } = require('@vue/cli-service')
const BASE_URL = process.env.NODE_ENV === 'production' ? '.' : './'
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  publicPath: BASE_URL,
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all',
        maxSize: 244 * 1024
      },
      usedExports: true
    }
  }
})
