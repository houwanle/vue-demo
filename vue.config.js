module.exports = {
  devServer: {
    open: true,  // 运行时，自动打开浏览器
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: { colors: true },
    port:8080, //前台代理端口
    proxy: {
      // 匹配代理的url
      '/api': {
        target: 'http://192.166.62.154:91/',
        //路径重写
        pathRewrite: {'/api' : '/api'},
        changeOrigin: true
      }
    }
  }
}