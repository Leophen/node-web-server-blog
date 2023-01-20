import { Routes, Route, useLocation } from 'react-router-dom'
import { Avatar, Dropdown, Menu, Button, Message } from '@arco-design/web-react'
import { IconUser, IconPlus } from '@arco-design/web-react/icon'
import BlogDetail from './components/BlogDetail'
import BlogList from './components/BlogList'
import ErrorPage from './components/ErrorPage'
import './pages.scss'
import LoginModal from './components/LoginModal'
import { useState, useEffect } from 'react'
import BlogEdit from './components/BlogEdit'
import { useDispatch, useSelector } from 'react-redux'
import { loginTest, logoutBlog } from '../http/api/user'

export interface LoginReducer {
  status: boolean
}

const Pages = () => {
  const loginStatus = useSelector<{
    loginReducer: LoginReducer
  }>((state) => state.loginReducer.status)
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    loginTest().then((res) => {
      if (res.data.errno !== -1) {
        dispatch.loginReducer.login()
      }
    })
  }, [])

  const getPageName = () => {
    const { pathname } = location
    if (pathname.search('detail') !== -1) {
      return '博客详情'
    }
    return '博客列表'
  }

  const handleAddBlog = () => {
    setEditShow(true)
  }

  const handleLogout = (key: string) => {
    if (key === 'logout') {
      logoutBlog().then(() => {
        dispatch.loginReducer.logout()
        Message.success('已退出登录')
      })
    }
  }

  const [editShow, setEditShow] = useState(false)
  const [loginShow, setLoginShow] = useState(false)

  const handleAddSuccess = () => {
    const addTime = new Date().getTime()
    setUpdateListVal(addTime)
  }
  const [updateListVal, setUpdateListVal] = useState(0)

  return (
    <div className="blog-wrapper">
      <header className="blog-header">
        <div className="blog-header-txt">
          <span>{getPageName()}</span>
          <section className="blog-header-user">
            {loginStatus && (
              <>
                <Button shape="round" type="primary" icon={<IconPlus />} onClick={handleAddBlog}>
                  新建博客
                </Button>
                <BlogEdit mode="new" visible={editShow} onSuccess={handleAddSuccess} onClose={() => setEditShow(false)} />
              </>
            )}

            {loginStatus ? (
              <Dropdown
                droplist={
                  <Menu onClickMenuItem={handleLogout}>
                    <Menu.Item key="logout">退出登录</Menu.Item>
                  </Menu>
                }
                trigger="click"
                position="bottom"
              >
                <Avatar size={28}>
                  <IconUser />
                </Avatar>
              </Dropdown>
            ) : (
              <Button shape="round" type="primary" onClick={() => setLoginShow(true)}>
                登录
              </Button>
            )}
          </section>
          <LoginModal visible={loginShow} onClose={() => setLoginShow(false)} />
        </div>
      </header>
      <article className="blog-content">
        <Routes>
          <Route path="/" element={<BlogList key={updateListVal} />} />
          <Route path="detail/:blogId" element={<BlogDetail />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </article>
    </div>
  )
}

export default Pages
