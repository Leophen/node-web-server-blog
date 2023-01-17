import { Routes, Route, useLocation } from 'react-router-dom'
import { Avatar } from '@arco-design/web-react';
import { IconUser } from '@arco-design/web-react/icon';
import BlogDetail from './components/BlogDetail'
import BlogList from './components/BlogList'
import ErrorPage from './components/ErrorPage'
import './pages.scss'
import { Dropdown } from '@arco-design/web-react';
import { Menu } from '@arco-design/web-react';
import { Button } from '@arco-design/web-react';
import LoginModal from './components/LoginModal';
import { useState } from 'react';
import { IconPlus } from '@arco-design/web-react/icon';
import BlogEdit from './components/BlogEdit';

const temp_ifLogin = false

const Pages = () => {
  const location = useLocation()

  const getPageName = () => {
    const { pathname } = location
    if (pathname.search('detail') !== -1) {
      return '博客详情'
    }
    return '博客列表'
  }

  const handleLogout = (key: string) => {
    if (key === 'logout') {
      console.log('退出登录')
    }
  }

  const [editShow, setEditShow] = useState(false)
  const [loginShow, setLoginShow] = useState(false)

  return (
    <div className="blog-wrapper">
      <header className="blog-header">
        <div className="blog-header-txt">
          <span>{getPageName()}</span>
          <section className="blog-header-user">
            {temp_ifLogin && (<>
              <Button
                shape='round'
                type='primary'
                icon={<IconPlus />}
                onClick={() => setEditShow(true)}
              >
                新建博客
              </Button>
              <BlogEdit
                mode='new'
                visible={editShow}
                onClose={() => setEditShow(false)}
              />
            </>)}

            {temp_ifLogin ? (
              <Dropdown
                droplist={
                  <Menu onClickMenuItem={handleLogout}>
                    <Menu.Item key='logout'>退出登录</Menu.Item>
                  </Menu>
                }
                trigger='click'
                position='bottom'
              >
                <Avatar size={28}>
                  <IconUser />
                </Avatar>
              </Dropdown>
            ) : (
              <Button
                shape='round'
                type='primary'
                onClick={() => setLoginShow(true)}
              >
                登录
              </Button>
            )}
          </section>
          <LoginModal
            visible={loginShow}
            onClose={() => setLoginShow(false)}
          />
        </div>
      </header>
      <article className="blog-content">
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="detail/:blogId" element={<BlogDetail />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </article>
    </div>
  )
}

export default Pages