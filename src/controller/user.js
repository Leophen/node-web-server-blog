const { exec } = require('../db/mysql')

/**
 * 登录接口
 * @param {*} username 用户名
 * @param {*} password 密码
 * @returns 登录是否成功
 */
const loginCheck = (username, password) => {
  const sql = `
    select username from users where username = '${username}' and password = '${password}'
  `

  return exec(sql).then(rows => {
    return rows[0] || {}
  })
}

module.exports = {
  loginCheck
}