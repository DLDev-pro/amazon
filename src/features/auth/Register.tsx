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
import { requestLogin, requestSignin } from './AuthApi'
import './authStyle.css'
import { useDispatch } from 'react-redux'
import { getUserInfoAction } from './AuthSlice'
import { useHistory } from 'react-router-dom'
import { message } from 'antd'

function Register(props: any) {
  const [form] = Form.useForm()
  const history = useHistory()

  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(false)

  const onFinish = async (values: any) => {
    try {
      setLoading(true)
      const resRegister = await requestSignin({
        identifier: values.identifier,
        name: values.name,
        phone: values.phone,
        password: values.password,
        tfa_password: values.tfa_pass,
        reference_code: values.invite_code,
      })
      Cookie.set(SESSION_KEY.SESSION, resRegister.data.token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      })
      dispatch(getUserInfoAction())
      message.success('Đăng ký thành công')
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
            identifier: null,
            phone: null,
            username: null,
            password: null,
            tfa_pass: null,
            invite_code: null,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            label={'Họ và tên'}
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
              placeholder={'Họ và tên'}
            />
          </Form.Item>{' '}
          <Form.Item
            name="identifier"
            label={'Tên đăng nhập'}
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
              placeholder={'Tên đăng nhập'}
            />
          </Form.Item>
          <Form.Item
            name="phone"
            label={'Số điện thoại'}
            rules={[{ required: true, message: 'Không được bỏ trống' }]}
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
          <Form.Item
            label="Mật khẩu vốn"
            name="tfa_pass"
            rules={[
              { required: true, message: 'Không được bỏ trống' },
              { min: 6, message: 'Nhập ít nhất 6 ký tự' },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder={'Mật khẩu vốn'}
            />
          </Form.Item>
          <Form.Item
            label="Mã mời"
            name="invite_code"
            rules={[
              { required: true, message: 'Không được bỏ trống' },
              { len: 6, message: 'Mã giới thiệu gồm 6' },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder={'Mã mời'}
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
                marginTop: 20,
              }}
            >
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
        <p className="login-text__btm">
          Đã có tài khoản?{' '}
          <a onClick={() => history.push('/login')}>Đăng nhập</a>
        </p>
      </div>
      {/* {isLoading && <LoadingProgress />} */}
    </div>
  )
}

export default Register
