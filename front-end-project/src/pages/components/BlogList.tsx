import { Divider, Tag, Pagination } from '@arco-design/web-react'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import { getBlogList } from '../../http/api/blog'
import { useState } from 'react'
import { useEffect } from 'react'

export const getTime = (time: number) => dayjs(time).format('YYYY年MM月DD日 HH:mm:ss')

const BlogList = () => {
  const navigate = useNavigate()

  const handlePageChange = (pageNumber: number, pageSize: number) => {
    console.log(pageNumber, pageSize)
  }

  const [blogList, setBlogList] = useState([])
  const updateBlogList = () => {
    getBlogList()
      .then((res) => {
        setBlogList(res.data.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }
  useEffect(() => {
    updateBlogList()
  }, [])

  return (
    <div className="blog-list-wrapper">
      {blogList.map((item, index) => (
        <section className="blog-list-item" key={`${item.id}${index}`}>
          <div className="blog-item-header" onClick={() => navigate(`/detail/${item.id}`)}>
            {item.title}
          </div>

          <article className="blog-item-content">{item.content}</article>

          <footer className="blog-item-footer">
            <section className="blog-item-type">
              {item.tag &&
                JSON.parse(item.tag).map((item, index) => (
                  <Tag key={index} color="arcoblue" bordered>
                    {item}
                  </Tag>
                ))}
            </section>
            <div className="blog-item-info">
              <span className="blog-item-author">{item.author}</span>
              <Divider type="vertical" />
              <span className="blog-item-time">修改于 {getTime(item.updatetime)}</span>
            </div>
          </footer>
        </section>
      ))}
      <footer className="blog-list-footer">
        <Pagination showTotal total={blogList.length} showJumper sizeCanChange onChange={handlePageChange} />
      </footer>
    </div>
  )
}

export default BlogList
