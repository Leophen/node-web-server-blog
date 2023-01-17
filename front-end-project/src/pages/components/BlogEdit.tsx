import { Drawer, Input, Message } from '@arco-design/web-react';
import { useFormik } from 'formik'
import _ from 'lodash';
import { useEffect } from 'react';
import * as Yup from 'yup'

interface BlogDetailType {
  mode: 'new' | 'update'
  visible: boolean
  title?: string
  content?: string
  onClose: () => void
}

const BlogEdit = (props: BlogDetailType) => {
  const {
    mode = 'new',
    visible = false,
    title = '',
    content = '',
    onClose
  } = props

  const isNewMode = mode === 'new'

  const formik = useFormik({
    initialValues: {
      title,
      content
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(50, '博客标题不得超过50个字')
        .required('请输入博客标题'),
      content: Yup.string()
        .max(500, '博客内容不得超过500个字')
        .required('请输入博客内容')
    }),
    onSubmit: (values) => {
      if (isNewMode) {
        console.log('submit new', values)
      } else {
        console.log('submit update', values)
      }
    }
  })

  const { values, setFieldValue, handleSubmit, errors } = formik

  useEffect(() => {
    if (visible) {
      setFieldValue('title', title)
      setFieldValue('content', content)
    }
  }, [visible])

  const handleConfirm = () => {
    if (!_.isEmpty(errors)) {
      Message.error(errors?.title || errors?.content)
    } else {
      handleSubmit()
    }
  }

  return (
    <Drawer
      width={500}
      title={<span>{`${isNewMode ? '新建' : '编辑'}博客`}</span>}
      visible={visible}
      placement={isNewMode ? 'left' : 'right'}
      onOk={handleConfirm}
      onCancel={() => onClose?.()}
    >
      <section className="blog-edit-item">
        <div className="blog-edit-item-title">
          博客标题
        </div>
        <Input
          value={values.title}
          maxLength={50}
          showWordLimit
          placeholder='请输入博客标题'
          onChange={((val: string) => setFieldValue('title', val))}
        />
      </section>
      <section className="blog-edit-item">
        <div className="blog-edit-item-title">
          博客内容
        </div>
        <Input.TextArea
          value={values.content}
          maxLength={500}
          showWordLimit
          placeholder='请输入博客内容'
          autoSize
          onChange={((val: string) => setFieldValue('content', val))}
        />
      </section>
    </Drawer>
  )
}

export default BlogEdit