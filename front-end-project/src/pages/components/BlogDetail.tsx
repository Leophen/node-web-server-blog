import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Breadcrumb, Divider, Typography, Message, Modal } from '@arco-design/web-react'
import { IconHome, IconEdit, IconDelete } from '@arco-design/web-react/icon'
import { getTime } from './BlogList'
import BlogEdit from './BlogEdit'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { LoginReducer } from '../pages'
import { getBlogDetail } from '../../http/api/blog'

const { Title, Paragraph } = Typography
const BreadcrumbItem = Breadcrumb.Item

const BlogDetail = () => {
  const loginStatus = useSelector<{
    loginReducer: LoginReducer
  }>((state) => state.loginReducer.status)
  const navigate = useNavigate()
  const params = useParams()

  const { blogId } = params
  const [blogData, setBlogData] = useState({
    title: '标题',
    content: '内容',
    createtime: 0,
    author: '作者',
    type: '标签',
  })

  useEffect(() => {
    getBlogDetail({ id: blogId }).then((res) => {
      if (res.data.data) {
        const { title, content, createtime, author, type } = res.data.data
        blogData.title = title
        blogData.content = content
        blogData.createtime = createtime
        blogData.author = author
        blogData.type = type ? JSON.parse(type) : []
        setBlogData({ ...blogData })
      } else {
        Message.error('博客不存在')
        navigate('/')
      }
    })
  }, [])

  const [editShow, setEditShow] = useState(false)
  const handleEdit = () => {
    if (loginStatus) {
      setEditShow(true)
    } else {
      Message.warning('您还未登录，请先登录')
    }
  }

  const handleEditSuccess = () => {
    console.log('edit success')
  }

  const handleDelete = () => {
    if (loginStatus) {
      Modal.confirm({
        title: '删除博客',
        content: `您确定要删除「${blogData.title}」这篇博客吗，删除后将无法恢复。`,
        okButtonProps: {
          status: 'danger',
        },
        onOk: () => {
          console.log('del')
        },
      })
    } else {
      Message.warning('您还未登录，请先登录')
    }
  }

  return (
    <div className="blog-detail-wrapper">
      <Breadcrumb>
        <BreadcrumbItem className="blog-back-home" onClick={() => navigate(`/`)}>
          <IconHome />
        </BreadcrumbItem>
        <BreadcrumbItem>博客详情</BreadcrumbItem>
      </Breadcrumb>

      <Typography>
        <Title heading={5}>{blogData.title}</Title>
        <Paragraph>{blogData.content}</Paragraph>
      </Typography>

      <footer className="blog-detail-footer">
        <section>
          <span className="blog-detail-author">{blogData.author}</span>
          <Divider type="vertical" />
          <span className="blog-detail-time">创建于 {getTime(blogData.createtime)}</span>
        </section>

        <section className="blog-detail-change">
          <span className="blog-detail-edit" onClick={handleEdit}>
            <IconEdit />
            编辑博客
          </span>
          <span className="blog-detail-delete" onClick={handleDelete}>
            <IconDelete />
            删除博客
          </span>
        </section>
      </footer>

      <BlogEdit mode="update" visible={editShow} title={blogData.title} content={blogData.content} onSuccess={handleEditSuccess} onClose={() => setEditShow(false)} />
    </div>
  )
}

export default BlogDetail
