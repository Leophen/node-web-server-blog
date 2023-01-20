const {
  exec
} = require('../db/mysql')

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
    console.log(id, rows, 'jjj')
    return rows[0]
  })
}

const newBlog = (blogData = {}) => {
  const {
    title,
    content,
    author,
    tag
  } = blogData
  const createTime = Date.now()

  const sql = `
    insert into blogs (title, content, createtime, author, tag) values ('${title}', '${content}', ${createTime}, '${author}', '${tag}')
  `

  return exec(sql).then(insertData => {
    return {
      id: insertData.insertId
    }
  })
}

/**
 * 更新博客
 * @param {*} blogData 更新的博客数据
 * @returns 是否更新成功
 */
const updateBlog = (blogData = {}) => {
  const {
    id,
    title,
    content,
    author,
    tag
  } = blogData
  console.log(id, 'idaaa')
  const sql = `
    update blogs set title = '${title}', content = '${content}', author = '${author}', tag = '${tag}'
    where id = ${id}
  `

  return exec(sql).then(updateData => {
    if (updateData.affectedRows > 0) {
      return true
    }
    return false
  })
}

/**
 * 删除博客
 * @param {*} id 要删除的博客 id
 * @param {*} author 删除人
 * @returns 是否删除成功
 */
const delBlog = (id, author) => {
  const sql = `delete from blogs where id = '${id}' and author='${author}'`

  return exec(sql).then(delData => {
    if (delData.affectedRows > 0) {
      return true
    }
    return false
  })
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}