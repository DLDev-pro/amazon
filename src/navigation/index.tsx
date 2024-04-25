import LoginScreen from 'features/auth/Login'
import RegisterScreen from 'features/auth/Register'
import { Route, Router, Switch } from 'react-router-dom'
import history from 'utils/history'
import screenRouter from './RouterType'
import PrivateRoute from './PrivateRouter'
import { getUserInfoAction } from 'features/auth/AuthSlice'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'
import { SESSION_KEY } from 'common/config'
import { Layout } from 'antd'
import { FooterContainer } from 'common/container'
import BodyContainer from 'common/container/BodyContainer'
import { ChatwootWidget } from 'features/ChatwootWidget'
import { useAppSelector } from 'redux/store/store'
import R from 'assets'

import { Row, Col, Typography, Image } from 'antd'
const { Title, Paragraph, Text } = Typography
const { Header, Footer } = Layout

export default function AppNavigator() {
  const cookie = Cookies.get(SESSION_KEY.SESSION)
  const dispatch = useDispatch()

  if (cookie) dispatch(getUserInfoAction())

  const MainNavigator = () => (
    <Layout>
      {/* <Header style={{ backgroundColor: 'var(--primary-color)' }}>
      </Header> */}
      <BodyContainer>
        {screenRouter.map((item, index) => {
          return (
            <Route
              key={index}
              path={item.path}
              component={item.component}
              exact={item.exact}
            />
          )
        })}
      </BodyContainer>
      <ChatwootWidget />
      <Footer
        style={{
          backgroundColor: 'var(--primary-color)',
          position: 'fixed',
          bottom: 0,
          width: '100vw',
          padding: '8px 0',
        }}
      >
        <FooterContainer />
      </Footer>
    </Layout>
  )

  return (
    <Router history={history}>
      <Switch>
        <Route path={'/login'} exact component={LoginScreen} />
        <Route path={'/register'} exact component={RegisterScreen} />
        <PrivateRoute path={'/'} component={MainNavigator} />
      </Switch>
    </Router>
  )
}
