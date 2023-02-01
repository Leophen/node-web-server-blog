const { createClient } = require('redis')
const { REDIS_CONFIG } = require('../config/db')

// 创建客户端
const redisClient = createClient({
  url: `redis://${REDIS_CONFIG.host}:${REDIS_CONFIG.port}`,
  legacyMode: true
});

// 连接
redisClient.connect()
  .then(() => console.log('Redis connect success.'))
  .catch(console.error)

module.exports = redisClient