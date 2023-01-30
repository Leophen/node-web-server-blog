const fs = require('fs')
const path = require('path')
const readline = require('readline')

// 文件名
const fileName = path.join(__dirname, '../', '../', 'logs', 'access.log')

// 读取日志
const readStream = fs.createReadStream(fileName)

// 创建 readline 对象
const rl = readline.createInterface({
  input: readStream
})

let sum = 0       // 总访问次数
let chromeNum = 0 // 使用 Chrome 访问次数

// 逐行读取
rl.on('line', lineData => {
  if (!lineData) {
    return
  }
  // 记录总访问次数
  sum++

  const arr = lineData.split(' -- ')
  if (arr[2] && arr[2].indexOf('Chrome') > 0) {
    // 累加 Chrome 访问次数
    chromeNum++
  }
})

// 监听读取完成
rl.on('close', () => {
  console.log('Chrome 占比：' + chromeNum / sum)
})