const router = require('koa-router')()
const {
  getTotal,
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.prefix('/api/blog')

// 获取博客列表总数
router.get('/count', async function (ctx, next) {
  const result = await getTotal()

  ctx.body = new SuccessModel(result)
})

// 获取博客列表
router.post('/list', async (ctx, next) => {
  const { page_num, page_size } = ctx.request.body
  const result = await getList(page_num, page_size)

  ctx.body = new SuccessModel(result)
});

// 获取博客详情
router.post('/detail', async (ctx, next) => {
  const { id } = ctx.request.body
  const result = await getDetail(id)

  ctx.body = new SuccessModel(result)
});

module.exports = router
