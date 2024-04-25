import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
// import LoadingProgress from "common/components/LoadingProgress";
import { SESSION_KEY } from 'common/config'
// import { getUserInfoAction } from 'features/auth/AuthSlice'
import { message } from 'antd'
import R from 'assets'
import Cookie from 'js-cookie'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { requestLogin } from './AuthApi'
import { getUserInfoAction } from './AuthSlice'
import './authStyle.css'

function Login(props: any) {
  const [form] = Form.useForm()
  const history = useHistory()

  const [showPassword, setShowPassword] = useState(false)
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
      setLoading(false)
    }
  }

  return (
    <div className="login">
      <img alt="" src={R.images.bg} className="login-bg" />
      <div className="container-login">
        {/* <img
          className="login-logo"
          width={150}
          src={R.images.logo_web}
          alt=""
        /> */}
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
            rules={[
              { required: true, message: 'Không được bỏ trống' },
              // {
              //   pattern: REG_PHONE,
              //   message: 'Số điện thoại không hợp lệ',
              // },
            ]}
          >
            <Input
              style={{
                borderRadius: '9999px',
                height: 46,
                fontSize: 16,
                fontWeight: 300,
                textAlign: 'center',
              }}
              prefix={
                <UserOutlined
                  className="site-form-item-icon"
                  style={{
                    color: '#db5221',
                  }}
                />
              }
              placeholder={'Số điện thoại'}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Không được bỏ trống' },
              { min: 6, message: 'Nhập ít nhất 6 ký tự' },
            ]}
          >
            <Input.Password
              style={{
                borderRadius: '9999px',
                height: 46,
                fontSize: 16,
                fontWeight: 300,
              }}
              prefix={
                <LockOutlined
                  className="site-form-item-icon"
                  style={{
                    color: '#db5221',
                  }}
                />
              }
              type={showPassword ? 'text' : 'password'}
              placeholder={R.strings().placeholder_password}
              iconRender={visible =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item
            style={{
              textAlign: 'center',
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              className=" login-form-button"
              style={{
                width: '100%',
                height: 40,
                fontWeight: 700,
                borderRadius: 7,
                backgroundColor: '#2f3848',
                borderColor: '#2f3848',
                color: '#f2d8be',
              }}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>

        <Button
          type="primary"
          htmlType="submit"
          className=" login-form-button"
          style={{
            marginTop: 10,
            width: '100%',
            height: 40,
            fontWeight: 700,
            borderRadius: 7,
            backgroundColor: '#2f3848',
            borderColor: '#2f3848',
            color: '#f2d8be',
          }}
        >
          <a onClick={() => history.push('/register')}>Đăng ký</a>
        </Button>
      </div>
      {/* {isLoading && <LoadingProgress />} */}
    </div>
  )
}

export default Login
