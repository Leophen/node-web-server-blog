const { exec } = require('../db/mysql')

const getList = (author, type) => {
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author = '${author}'`
  }
  if (type) {
    sql += `and type = '${type}'`
  }
  sql += `order by createtime desc`

  // 返回 promise
  return exec(sql)
}

const getDetail = (id) => {
  const sql = `select * from blogs where id = '${id}'`
  return exec(sql).then(rows => {
    return rows[0]
  })
}

const newBlog = (blogData = {}) => {
  const { title, content, author, tag } = blogData
  const createTime = Date.now()

  const sql = `
    insert into blogs (title, content, createtime, author, tag)
    values ('${title}', '${content}', ${createTime}, '${author}', '${tag}')
  `

  return exec(sql).then(insertData => {
    return {
      id: insertData.insertId
    }
  })
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