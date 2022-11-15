const handleUserRouter = (req, res) => {
  const method = req.method

  // 登陆
  if (method === 'POST' && req.path === '/api/user/login') {
    return {
      msg: '用户登陆的接口'
    }
  }
}

module.exports = handleUserRouter