// In test and prod change 6969 to 8765
module.exports = {
    devServer: {
      proxy: {
        '/search': {
          target: 'http://localhost:6969',
          ws: true,
          changeOrigin: true
        },
        '/getTableFields': {
          target: 'http://localhost:6969',
          ws: true,
          changeOrigin: true
        },
        '/fullSubjectTree': {
          target: 'http://localhost:6969',
          ws: true,
          changeOrigin: true
        }
      }
    },
    configureWebpack: {
      devtool: 'source-map'
    }
  }