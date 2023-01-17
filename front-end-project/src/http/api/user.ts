import serviceAxios from '../index'

export const loginBlog = (data?) => {
  return serviceAxios({
    url: '/api/user/login',
    method: 'post',
    data
  })
}

export const logoutBlog = (data?) => {
  return serviceAxios({
    url: '/api/user/logout',
    method: 'post',
    data
  })
}
