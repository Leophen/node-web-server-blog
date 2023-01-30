const fs = require('fs')
const path = require('path');

// 写日志通用函数
const writeLog = (writeStream, log) => {
  writeStream.write(log + '\n')
}

// 生成 writeStream 函数
const createWriteStream = (file) => {
  const fullFileName = path.join(__dirname, '../', '../', 'logs', file)
  const writeStream = fs.createWriteStream(fullFileName, {
    flags: 'a'
  })
  return writeStream
}

// 写访问日志
const accessWriteStream = createWriteStream('access.log')
const access = (log) => {
  writeLog(accessWriteStream, log)
}

module.exports = {
  access
}