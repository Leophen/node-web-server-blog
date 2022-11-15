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

module.exports = {
  getList,
  getDetail
}