const {
  login,
  register
} = require('../controller/user')
const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel')
const {
  set
} = require('../db/redis')

const handleUserRouter = (req, res) => {
  const method = req.method

  // 注册
  if (method === 'POST' && req.path === '/api/user/register') {
    const {
      username,
      password
    } = req.body
    const result = register(username, password)

    return result.then(data => {
      if (data === -2) {
        return new ErrorModel('账号已存在')
      }
      if (data === -1) {
        return new ErrorModel('注册失败')
      }
      return new SuccessModel()
    })
  }

  // 登录
  if (method === 'POST' && req.path === '/api/user/login') {
    const {
      username,
      password
    } = req.body
    const result = login(username, password)

    return result.then(data => {
      if (data.username) {
        // 设置 Session
        req.session.username = data.username
        // 同步到 redis
        set(req.sessionId, req.session)
        return new SuccessModel({
          username: req.session.username
        })
      }
      return new ErrorModel('登录失败')
    })
  }

  // 退出登录
  if (method === 'GET' && req.path === '/api/user/logout') {
    if (req.session.username) {
      res.setHeader('Set-Cookie', `userid=; path=/; HttpOnly`)
      return Promise.resolve(new SuccessModel('退出登录成功'))
    }
    return Promise.resolve(new ErrorModel('退出登录失败'))
  }

  // 登陆验证的测试
  if (method === 'GET' && req.path === '/api/user/login-test') {
    if (req.session.username) {
      return Promise.resolve(new SuccessModel({
        username: req.session.username
      }))
    }
    return Promise.resolve(new ErrorModel('尚未登录'))
  }
}

module.exports = handleUserRouter