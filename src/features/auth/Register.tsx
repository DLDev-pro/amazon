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
  const [reading, setReading] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const onFinish = async (values: any) => {
    if (!reading) {
      message.error(
        'Vui lòng đọc và đồng ý với thoả thuận mở tài khoản của Amazon'
      )
      return
    }
    try {
      setLoading(true)
      const resRegister = await requestSignin({
        identifier: values.identifier,
        name: 'user',
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
      setLoading(false)
    }
  }

  return (
    <div className="login">
      <img alt="" src={R.images.bg} className="login-bg" />
      <div className="container-login">
        <h1
          style={{
            textAlign: 'center',
            color: 'white',
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          Đăng ký
        </h1>
        <p
          style={{
            textAlign: 'center',
            color: 'white',
            fontSize: 10,
            marginBottom: 10,
          }}
        >
          Lưu ý: Nhập đúng họ và tên thật để liên kết tài khoản ngân hàng và rút
          tiền
        </p>
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
              placeholder={'Vui lòng nhập họ và tên thật'}
            />
          </Form.Item>{' '}
          <Form.Item
            name="phone"
            rules={[{ required: true, message: 'Không được bỏ trống' }]}
          >
            <Input
              style={{
                borderRadius: '9999px',
                height: 46,
                fontSize: 16,
                fontWeight: 300,
                textAlign: 'center',
              }}
              placeholder={'Vui lòng nhập số điện thoại'}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Không được bỏ trống' },
              { min: 6, message: 'Nhập ít nhất 6 ký tự' },
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
              type="password"
              placeholder={`Vui lòng nhập ${R.strings().placeholder_password.replace(
                'Mật khẩu',
                'mật khẩu'
              )}`}
            />
          </Form.Item>
          <Form.Item
            name="tfa_pass"
            rules={[
              { required: true, message: 'Không được bỏ trống' },
              { min: 6, message: 'Nhập ít nhất 6 ký tự' },
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
              type="password"
              placeholder={'Vui lòng nhập mật khẩu vốn'}
            />
          </Form.Item>
          <Form.Item
            name="invite_code"
            rules={[
              { required: true, message: 'Không được bỏ trống' },
              { len: 6, message: 'Mã giới thiệu gồm 6' },
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
              placeholder={'Vui lòng nhập mã mời'}
            />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            style={{
              textAlign: 'center',
            }}
          >
            <Checkbox
              style={{ color: 'white' }}
              onChange={e => setReading(e.target.checked)}
            >
              Tôi đã đọc và đồng ý với thoả thuận mở tài khoản của Amazon
            </Checkbox>
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
                fontSize: 18,
                borderRadius: 25,
                backgroundColor: 'red',
                borderColor: 'red',
                fontWeight: 700,
              }}
            >
              Đăng ký
            </Button>
          </Form.Item>
          {/* checkbox Lưu ý: Nhập đúng họ và tên thật để liên kết tài khoản ngân hàng và rút tiền  */}
        </Form>
        <p className="login-text__btm">
          Đã có tài khoản?{' '}
          <a style={{ color: 'orange' }} onClick={() => history.push('/login')}>
            Đăng nhập
          </a>
        </p>
      </div>
      {/* {isLoading && <LoadingProgress />} */}
    </div>
  )
}

export default Register
