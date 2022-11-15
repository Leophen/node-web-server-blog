const serverHandle = (req, res) => {
  // 设置返回格式 JSON
  res.setHeader('Content-type', 'application/json')

  const resData = {
    name: 'leophen',
    env: process.env.NODE_ENV
  }

  res.end(
    JSON.stringify(resData)
  )
}

module.exports = serverHandle