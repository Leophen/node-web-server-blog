const {
  exec,
  escape
} = require('../db/mysql')

const getTotal = async () => {
  const sql = `select count(*) from blogs`

  return await exec(sql).then(res => {
    const result = res[0]
    return result['count(*)']
  })
}

const getList = async (page_num, page_size) => {
  let sql = `select * from blogs order by updatetime desc`
  if (page_num && page_size) {
    sql += ` limit ${(parseInt(page_num) - 1) * parseInt(page_size)},${parseInt(page_size)}`
  }

  // 返回 promise
  return await exec(sql)
}

const getDetail = async (id) => {
  const sql = `select * from blogs where id = '${id}'`
  return await exec(sql).then(rows => {
    return rows[0]
  })
}

const newBlog = async (blogData = {}, author) => {
  let {
    title,
    content,
    tag
  } = blogData
  title = escape(title)
  content = escape(content)
  tag = escape(tag)
  const createTime = Date.now()

  const sql = `
    insert into blogs (title, content, updatetime, author, tag) values (${title}, ${content}, ${createTime}, '${author}', ${tag})
  `

  return await exec(sql).then(insertData => {
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
const updateBlog = async (blogData = {}, sessionAuthor) => {
  let {
    id,
    title,
    content,
    author,
    tag
  } = blogData
  title = escape(title)
  content = escape(content)
  tag = escape(tag)
  const updateTime = Date.now()

  const sql = `
    update blogs set title = ${title}, content = ${content}, updatetime = ${updateTime}, author = '${author}', tag = ${tag}
    where id = ${id}
  `

  return await exec(sql).then(updateData => {
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
const delBlog = async (id, sessionAuthor) => {
  const checkSql = `SELECT * FROM blogs WHERE id = '${id}'`;
  const delSql = `delete from blogs where id = '${id}' and author='${sessionAuthor}'`

  return await exec(checkSql).then(rows => {
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
  getTotal,
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}