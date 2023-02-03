const router = require('koa-router')()

router.prefix('/api/user')

// 登录
router.get('/login', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

module.exports = router
