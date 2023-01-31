const express = require('express');
const router = express.Router();
const {
  getTotal,
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog')
const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel')

// 统一的登录验证函数
const isLogin = (req) => {
  if (!req.session.username) {
    return false
  }
  return true
}

// 获取博客列表总数
router.get('/count', (req, res, next) => {
  const result = getTotal()

  return result.then(count => {
    res.json(new SuccessModel(count))
  })
});

// 获取博客列表
router.post('/list', (req, res, next) => {
  const { page_num, page_size } = req.body
  const result = getList(page_num, page_size)

  return result.then(listData => {
    res.json(new SuccessModel(listData))
  })
});

// 获取博客详情
router.post('/detail', (req, res, next) => {
  const { id } = req.body
  const result = getDetail(id)

  return result.then(data => {
    res.json(new SuccessModel(data))
  })
});

// 新建一篇博客
router.post('/new', (req, res, next) => {
  if (!isLogin(req)) {
    res.json(new ErrorModel('尚未登录'))
  } else {
    const result = newBlog(req.body, req.session.username)
    return result.then(data => {
      res.json(new SuccessModel(data))
    })
  }
});

// 更新一篇博客
router.post('/update', (req, res, next) => {
  if (!isLogin(req)) {
    res.json(new ErrorModel('尚未登录'))
  } else {
    const result = updateBlog(req.body, req.session.username)
    return result.then(val => {
      if (val === 0) {
        res.json(new SuccessModel('编辑成功'))
      } else if (val === -1) {
        res.json(new ErrorModel('不能编辑他人的博客'))
      } else {
        res.json(new ErrorModel('编辑失败'))
      }
    })
  }
});

// 删除一篇博客
router.post('/del', (req, res, next) => {
  if (!isLogin(req)) {
    res.json(new ErrorModel('尚未登录'))
  } else {
    const { id } = req.body
    const result = delBlog(id, req.session.username)
    return result.then(val => {
      if (val === 0) {
        res.json(new SuccessModel('删除成功'))
      } else if (val === -1) {
        res.json(new ErrorModel('不能删除他人的博客'))
      } else {
        res.json(new ErrorModel('删除失败'))
      }
    })
  }
});

module.exports = router;
