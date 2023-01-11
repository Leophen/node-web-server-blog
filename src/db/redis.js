const redis = require('redis')
const { REDIS_CONFIG } = require('../config/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host);

!(async function () {
  await redisClient.connect()
    .then(() => console.log('Redis connect success.'))
    .catch(console.error)
})()

async function set(key, val) {
  const objVal = typeof val === 'object' ? JSON.stringify(val) : val
  await redisClient.set(key, objVal)
}

async function get(key) {
  const result = JSON.parse(await redisClient.get(key))
  return result
}

module.exports = {
  set,
  get
}