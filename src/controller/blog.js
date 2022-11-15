const getList = (author, keyword) => {
  // 暂时返回正确格式的假数据
  return [
    {
      id: 1,
      title: '标题 A',
      content: '内容 A',
      createTime: 1668496456053,
      author: 'leophen'
    },
    {
      id: 2,
      title: '标题 B',
      content: '内容 B',
      createTime: 1668496503387,
      author: 'dorki'
    }
  ]
}

const getDetail = (id) => {
  // 暂时返回正确格式的假数据
  return {
    id: 1,
    title: '标题 A',
    content: '内容 A',
    createTime: 1668496456053,
    author: 'leophen'
  }
}

const newBlog = (blogData = {}) => {
  // blogData 是个博客对象，包含 title、content 属性
  return {
    id: 3
  }
}

/**
 * 更新博客
 * @param {*} id 要更新的博客 id
 * @param {*} blogData 更新的博客对象，包含 title、content 属性
 * @returns 是否更新成功
 */
const updateBlog = (id, blogData = {}) => {
  // 假设已经更新成功
  return true
}

/**
 * 删除博客
 * @param {*} id 要删除的博客 id
 * @returns 是否删除成功
 */
const delBlog = (id) => {
  // 假设已经删除成功
  return true
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}