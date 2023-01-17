// 使用 Nginx 反向代理后，根据当前的请求地址调用接口
// 例如访问 http://localhost:7878 代理到 8001 的前端页面
// 调用 7878 的接口则代理到 7676 的 Server
const baseURL = window.location.origin

const serverConfig = {
  baseURL, // 请求基础地址,可根据环境自定义
  useTokenAuthorization: true // 是否开启 token 认证
}

export default serverConfig
