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

module.exports = router;
