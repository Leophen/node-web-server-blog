import { Input } from "@arco-design/web-react";
import { Button } from "@arco-design/web-react";
import { Message } from "@arco-design/web-react";
import { Tabs, Modal } from "@arco-design/web-react"
import { useFormik } from "formik";
import _ from "lodash";
import * as Yup from 'yup'

const TabPane = Tabs.TabPane;

interface LoginModal {
  visible: boolean
  onClose: () => void
}

interface InnerPageType {
  type: 'login' | 'logout'
}

const InnerPage = (props: InnerPageType) => {
  const {
    type = 'login'
  } = props

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(10, '用户名不得超过10个字符')
        .required('请输入用户名'),
      password: Yup.string()
        .max(25, '密码不得超过20个字符')
        .required('请输入密码')
    }),
    onSubmit: (values) => {
      console.log('submit', type, values)
    }
  })

  const { values, setFieldValue, errors, handleSubmit } = formik

  const handleLogin = () => {
    if (!_.isEmpty(errors)) {
      Message.error(errors?.username || errors?.password)
    } else {
      handleSubmit()
    }
  }

  return (
    <section className="login-page">
      <Input
        value={values.username}
        maxLength={10}
        showWordLimit={false}
        placeholder='请输入用户名'
        onChange={((val: string) => setFieldValue('username', val))}
      />
      <Input
        value={values.password}
        maxLength={25}
        showWordLimit={false}
        placeholder='请输入密码'
        onChange={((val: string) => setFieldValue('password', val))}
      />
      <Button
        type='primary'
        onClick={handleLogin}
      >
        {type === 'login' ? '登录' : '注册'}
      </Button>
    </section>
  )
}

const LoginModal = (props: LoginModal) => {
  const {
    visible = false,
    onClose
  } = props

  return (
    <Modal
      title={null}
      footer={null}
      visible={visible}
      className="login-modal"
      onCancel={() => onClose?.()}
    >
      <Tabs defaultActiveTab='login'>
        <TabPane key='login' title='登录'>
          <InnerPage type='login' />
        </TabPane>
        <TabPane key='logout' title='注册'>
          <InnerPage type='logout' />
        </TabPane>
      </Tabs>
    </Modal>
  )
}

export default LoginModal