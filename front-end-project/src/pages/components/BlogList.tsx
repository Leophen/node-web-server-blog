import { Divider, Tag, Pagination } from '@arco-design/web-react';
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs';

const temp = [
  {
    id: 1,
    title: '标题 A',
    content: '内容 A',
    createTime: 1669359152188,
    author: '作者 A',
    type: '类型 A'
  },
  {
    id: 2,
    title: '标题 B',
    content: '内容 B',
    createTime: 1669359152288,
    author: '作者 B',
    type: '类型 B'
  },
  {
    id: 3,
    title: '标题 C',
    content: '内容 C',
    createTime: 1669359152388,
    author: '作者 C',
    type: '类型 C'
  },
  {
    id: 4,
    title: '标题 C',
    content: '内容 C',
    createTime: 1669359152388,
    author: '作者 C',
    type: '类型 C'
  },
  {
    id: 5,
    title: '标题 C',
    content: '内容 C',
    createTime: 1669359152388,
    author: '作者 C',
    type: '类型 C'
  },
  {
    id: 6,
    title: '标题 C',
    content: '内容 C',
    createTime: 1669359152388,
    author: '作者 C',
    type: '类型 C'
  },
  {
    id: 7,
    title: '标题 C',
    content: '内容 C',
    createTime: 1669359152388,
    author: '作者 C',
    type: '类型 C'
  },
  {
    id: 8,
    title: '标题 C',
    content: '内容 C',
    createTime: 1669359152388,
    author: '作者 C',
    type: '类型 C'
  },
  {
    id: 9,
    title: '标题 C',
    content: '内容 C',
    createTime: 1669359152388,
    author: '作者 C',
    type: '类型 C'
  },
  {
    id: 10,
    title: '标题 C',
    content: '内容 C',
    createTime: 1669359152388,
    author: '作者 C',
    type: '类型 C'
  },
  {
    id: 11,
    title: '标题 C',
    content: '内容 C',
    createTime: 1669359152388,
    author: '作者 C',
    type: '类型 C'
  },
  {
    id: 12,
    title: '标题 C',
    content: '内容 C',
    createTime: 1669359152388,
    author: '作者 C',
    type: '类型 C'
  },
  {
    id: 13,
    title: '标题 C',
    content: '内容 C',
    createTime: 1669359152388,
    author: '作者 C',
    type: '类型 C'
  },
  {
    id: 14,
    title: '标题 C',
    content: '内容 C',
    createTime: 1669359152388,
    author: '作者 C',
    type: '类型 C'
  },
  {
    id: 15,
    title: '标题 C',
    content: '内容 C',
    createTime: 1669359152388,
    author: '作者 C',
    type: '类型 C'
  },
  {
    id: 16,
    title: '标题 C',
    content: '内容 C',
    createTime: 1669359152388,
    author: '作者 C',
    type: '类型 C'
  },
  {
    id: 17,
    title: '标题 D',
    content: '内容 D',
    createTime: 1669359152388,
    author: '作者 D',
    type: '类型 D'
  },
  {
    id: 18,
    title: '标题 D',
    content: '内容 D',
    createTime: 1669359152388,
    author: '作者 D',
    type: '类型 D'
  }
]

export const getTime = (time: number) => dayjs(time).format('YYYY年MM月DD日 HH:mm:ss')

const BlogList = () => {
  const navigate = useNavigate()

  const handlePageChange = (pageNumber: number, pageSize: number) => {
    console.log(pageNumber, pageSize)
  }

  return (
    <div className="blog-list-wrapper">
      {temp.map((item, index) => (
        <section
          className="blog-list-item"
          key={`${item.id}${index}`}
        >
          <div
            className="blog-item-header"
            onClick={() => navigate(`/detail/${item.id}`)}
          >
            {item.title}
          </div>

          <article className="blog-item-content">
            {item.content}
          </article>

          <footer className="blog-item-footer">
            <section className="blog-item-type">
              <Tag color='arcoblue' bordered>
                {item.type}
              </Tag>
            </section>
            <div className="blog-item-info">
              <span className="blog-item-author">
                {item.author}
              </span>
              <Divider type='vertical' />
              <span className="blog-item-time">
                修改于 {getTime(item.createTime)}
              </span>
            </div>
          </footer>
        </section>
      ))}
      <footer className="blog-list-footer">
        <Pagination
          showTotal
          total={temp.length}
          showJumper
          sizeCanChange
          onChange={handlePageChange}
        />
      </footer>
    </div>
  )
}

export default BlogList
