import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input } from 'antd'
// import LoadingProgress from "common/components/LoadingProgress";
import { SESSION_KEY } from 'common/config'
// import { getUserInfoAction } from 'features/auth/AuthSlice'
import Cookie from 'js-cookie'
import { useState } from 'react'
import { REG_PHONE } from 'utils/constants'
import history from 'utils/history'
import R from 'assets'
import { requestLogin } from './AuthApi'
import './authStyle.css'
import { useDispatch } from 'react-redux'
import { getUserInfoAction } from './AuthSlice'
import { useHistory } from 'react-router-dom'
import { message } from 'antd'

function Login(props: any) {
  const [form] = Form.useForm()
  const history = useHistory()

  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(false)

  const onFinish = async (values: any) => {
    try {
      setLoading(true)
      const resLogin = await requestLogin({
        identifier: values.phone,
        password: values.password,
      })
      Cookie.set(SESSION_KEY.SESSION, resLogin.data.token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      })
      dispatch(getUserInfoAction())
      message.success('Đăng nhập thành công')
      setTimeout(() => {
        history.replace('/')
      }, 1000)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <div className="login">
      <img alt="" src={R.images.bg} className="login-bg" />
      <div className="container-login">
        <img
          className="login-logo"
          width={150}
          src={R.images.logo_web}
          alt=""
        />
        <Form
          form={form}
          layout={'vertical'}
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
            phone: null,
            password: null,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="phone"
            label={'Số điện thoại'}
            rules={[
              { required: true, message: 'Không được bỏ trống' },
              // {
              //   pattern: REG_PHONE,
              //   message: 'Số điện thoại không hợp lệ',
              // },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder={'Số điện thoại'}
            />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: 'Không được bỏ trống' },
              { min: 6, message: 'Nhập ít nhất 6 ký tự' },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder={R.strings().placeholder_password}
            />
          </Form.Item>
          {/* <Form.Item
            style={{
              textAlign: 'right',
            }}
          >
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Ghi nhớ đăng nhập</Checkbox>
            </Form.Item>
          </Form.Item> */}

          <Form.Item
            style={{
              textAlign: 'center',
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              className=" login-form-button"
              style={{ width: '100%', height: 40, fontWeight: 700 }}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        <p className="login-text__btm">
          Không có tài khoản?{' '}
          <a onClick={() => history.push('/register')}>Đăng ký</a>
        </p>
      </div>
      {/* {isLoading && <LoadingProgress />} */}
    </div>
  )
}

export default Login
