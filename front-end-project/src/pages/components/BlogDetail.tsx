import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Breadcrumb, Divider, Typography, Message, Modal } from '@arco-design/web-react'
import { IconHome, IconEdit, IconDelete } from '@arco-design/web-react/icon'
import { getTime } from './BlogList'
import BlogEdit from './BlogEdit'
import { useNavigate } from 'react-router-dom'

const { Title, Paragraph } = Typography
const BreadcrumbItem = Breadcrumb.Item

const temp = {
  id: 1,
  title: '标题 A',
  content: '内容 A',
  createTime: 1669359152188,
  author: '作者 A',
  type: '类型 A',
}

const temp_ifLogin = true

const BlogDetail = () => {
  const navigate = useNavigate()
  const params = useParams()
  console.log('params is ', params)

  const [editShow, setEditShow] = useState(false)
  const handleEdit = () => {
    if (temp_ifLogin) {
      setEditShow(true)
    } else {
      Message.warning('您还未登录，请先登录')
    }
  }

  const handleDelete = () => {
    if (temp_ifLogin) {
      Modal.confirm({
        title: '删除博客',
        content: `您确定要删除「${temp.title}」这篇博客吗，删除后将无法恢复。`,
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
        <Title heading={5}>{temp.title}</Title>
        <Paragraph>{temp.content}</Paragraph>
      </Typography>

      <footer className="blog-detail-footer">
        <section>
          <span className="blog-detail-author">{temp.author}</span>
          <Divider type="vertical" />
          <span className="blog-detail-time">创建于 {getTime(temp.createTime)}</span>
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

      <BlogEdit mode="update" visible={editShow} title={temp.title} content={temp.content} onClose={() => setEditShow(false)} />
    </div>
  )
}

export default BlogDetail
