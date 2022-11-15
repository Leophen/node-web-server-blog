/**
 * 登录接口
 * @param {*} username 用户名
 * @param {*} password 密码
 * @returns 登录是否成功
 */
const loginCheck = (username, password) => {
  // 暂时使用假数据
  if (username === 'leophen' && password === '123456') {
    return true
  } else {
    return false
  }
}

module.exports = {
  loginCheck
}