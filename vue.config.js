const { defineConfig } = require('@vue/cli-service')
const BASE_URL = process.env.NODE_ENV === 'production' ? '/xyxwz/' : './'
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  publicPath: BASE_URL
})
