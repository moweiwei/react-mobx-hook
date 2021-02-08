const proxys = {
  // 接口代理1
  '/api/': {
    target: 'http://198.168.111.111:3001',
    changeOrigin: true,
  },
  // .....
}

module.exports = proxys
