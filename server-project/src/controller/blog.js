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
 * @param {*} sessionAuthor 编辑人
 * @returns
 * 0 编辑成功
 * -1 不能编辑他人的博客
 * -2 未知错误
 */
const updateBlog = (blogData = {}, sessionAuthor) => {
  const {
    id,
    title,
    content,
    author,
    tag
  } = blogData
  const sql = `
    update blogs set title = '${title}', content = '${content}', author = '${author}', tag = '${tag}'
    where id = ${id}
  `

  return exec(sql).then(updateData => {
    if (author !== sessionAuthor) {
      return -1
    }
    if (updateData.affectedRows > 0) {
      return 0
    }
    return -2
  })
}

/**
 * 删除博客
 * @param {*} id 要删除的博客 ID
 * @param {*} sessionAuthor 删除人
 * @returns
 * 0 删除成功
 * -1 不能删除他人的博客
 * -2 未知错误
 */
const delBlog = (id, sessionAuthor) => {
  const checkSql = `SELECT * FROM blogs WHERE id = '${id}'`;
  const delSql = `delete from blogs where id = '${id}' and author='${sessionAuthor}'`

  return exec(checkSql).then(rows => {
    return rows[0].author
  }).then((author) => {
    if (author === sessionAuthor) {
      return exec(delSql).then(delData => {
        if (delData.affectedRows > 0) {
          return 0
        }
        return -2
      })
    } else {
      return -1
    }
  })
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}