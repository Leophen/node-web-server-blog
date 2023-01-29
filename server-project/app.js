const querystring = require('node:querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const {
  get,
  set
} = require('./src/db/redis')

// 用于处理 post data
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(
        JSON.parse(postData)
      )
    })
  })
  return promise
}

const serverHandle = (req, res) => {
  // 设置返回格式 JSON
  res.setHeader('Content-type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8001');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader("Access-Control-Allow-Credentials", true);  // 允许后端跨域传递 Cookie

  if (req.method === 'OPTIONS') {
    return res.end();
  }

  // 统一处理 path
  const url = req.url
  req.path = url.split('?')[0]

  // 统一解析 query
  req.query = querystring.parse(url.split('?')[1])

  // 统一解析 Cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || '' // k1=v1;k2=v2
  cookieStr.split(';').forEach(item => {
    if (!item) return
    const itemArr = item.split('=')
    const itemKey = itemArr[0].trim()
    const itemVal = itemArr[1].trim()
    req.cookie[itemKey] = itemVal
  });

  // 使用 Redis 统一解析 Session
  let userId = req.cookie.userid
  let isNeedSetCookie = false // 是否需要设置 Session

  if (!userId) {
    isNeedSetCookie = true
    userId = `${Date.now()}_${Math.random()}` // 生成一个随机的 userId
    // 初始化 Redis 中的 Session 值
    set(userId, {})
  }
  req.sessionId = userId
  // 获取 Session
  get(req.sessionId).then(sessionData => {
    if (sessionData === null) {
      // 初始化 Redis 中的 Session 值
      set(req.sessionId, {})
      req.session = {}
    } else {
      req.session = sessionData
    }

    // 处理 post data
    return getPostData(req)
  }).then(postData => {
    req.body = postData

    // 处理 blog 路由
    const blogResult = handleBlogRouter(req, res)
    if (blogResult) {
      blogResult.then(blogData => {
        if (isNeedSetCookie) {
          res.setHeader('Set-Cookie', `userid=${userId}; path=/; HttpOnly`)
        }
        res.end(
          JSON.stringify(blogData)
        )
      })
      return
    }

    // 处理 user 路由
    const userResult = handleUserRouter(req, res)
    if (userResult) {
      userResult.then(userData => {
        if (isNeedSetCookie) {
          res.setHeader('Set-Cookie', `userid=${userId}; path=/; HttpOnly`)
        }
        res.end(
          JSON.stringify(userData)
        )
      })
      return
    }

    // 未命中路由，返回 404
    res.writeHead(404, {
      "Content-type": "text/plain"
    })
    res.write("404 not Found\n")
    res.end()
  })
}

module.exports = serverHandle