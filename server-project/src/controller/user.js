const { exec } = require('../db/mysql')

/**
 * 登录接口
 * @param {*} username 用户名
 * @param {*} password 密码
 * @returns 登录是否成功
 */
const login = (username, password) => {
  const sql = `
    select username from users where username = '${username}' and password = '${password}'
  `

  return exec(sql).then(rows => {
    return rows[0] || {}
  })
}

/**
 * 注册接口
 * @param {*} username 用户名
 * @param {*} password 密码
 * @returns 注册是否成功
 */
const logout = (username, password) => {
  const querySql = `SELECT * FROM users
  WHERE username = '${username}'`;
  const insertSql = `INSERT INTO users (username, password)
  VALUES ('${username}', '${password}')`;

  return exec(querySql).then(res => {
    if (res.length > 0) {
      return -2
    }
  }).then((res) => {
    if (res === -2) {
      return -2
    } else {
      return exec(insertSql).then(rows => {
        return rows.insertId || -1
      })
    }
  })
}

module.exports = {
  login,
  logout
}