const express = require('express');
const router = express.Router();
const {
  login,
  register
} = require('../controller/user')
const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel')

// 注册
router.post('/register', (req, res, next) => {
  const { username, password } = req.body
  const result = register(username, password)

  return result.then(data => {
    if (data === -2) {
      res.json(new SuccessModel('账号已存在'))
    }
    if (data === -1) {
      res.json(new ErrorModel('注册失败'))
    }
    res.json(new SuccessModel())
  })
});

// 登录
router.post('/login', (req, res, next) => {
  const { username, password } = req.body
  const result = login(username, password)

  return result.then(data => {
    if (data.username) {
      // 设置 Session
      req.session.username = data.username
      res.json(new SuccessModel({
        username: req.session.username
      }))
    } else {
      res.json(new ErrorModel('登录失败'))
    }
  })
});

// 退出登录
router.get('/logout', (req, res, next) => {
  if (req.session.username) {
    req.session.username = null
    res.json(new ErrorModel('退出登录成功'))
  } else {
    res.json(new ErrorModel('退出登录失败'))
  }
});

// 登陆验证的测试
router.get('/login-test', (req, res, next) => {
  if (req.session.username) {
    res.json(new SuccessModel({
      username: req.session.username
    }))
  } else {
    res.json(new ErrorModel('尚未登录'))
  }
});

module.exports = router;
