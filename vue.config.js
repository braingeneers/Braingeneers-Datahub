const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "/datahub/"
//   assetsSubDirectory: 'your-subdirectoy-here/static',
//   baseUrl: "/braingeneers-hub/"
})

// module.exports = {
//     build: {
//         // Template for index.html
//         assetsPublicPath: '/',
//     }
// }