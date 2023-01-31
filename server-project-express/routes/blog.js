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

module.exports = router;
