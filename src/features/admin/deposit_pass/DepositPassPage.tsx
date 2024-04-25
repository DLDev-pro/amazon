import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { Button, Form, Input, message } from 'antd'
import { ADMIN_ROUTER_PATH } from 'common/config'
import React, { useState } from 'react'
import { requestChangeDepositPass } from 'services/api/CommonApi'
import history from 'utils/history'
import * as Styled from './styled'
const cssInput = {
  backgroundColor: '#fff',
  borderRadius: 5,
  fontSize: 16,
  outline: 'none',

  padding: '10px 5px 10px 12px',
}
const DepositPassPage: React.FC = () => {
  const onFinish = async (values: any) => {
    const resData = await requestChangeDepositPass({
      old_tfa_password: values.old,
      new_tfa_password: values.new,
    })

    if (resData.status) {
      message.success('Đổi mật khẩu vốn thành công')
      history.push(ADMIN_ROUTER_PATH.PROFILE)
    } else {
      message.error('Mật khẩu hiện tại không khớp')
    }
  }
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Styled.WrapCardCenter>
      <Styled.CardForm>
        <span>Đổi mật khẩu giao dịch</span>
        <br />
        <Form layout={'vertical'} onFinish={onFinish}>
          <Form.Item
            style={{ marginBottom: 16 }}
            name={'old'}
            rules={[{ required: true, message: 'Không được bỏ trống' }]}
          >
            <Input.Password
              type={showPassword ? 'text' : 'password'}
              iconRender={visible =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              style={cssInput}
              placeholder="Nhập mật khẩu hiện tại"
            />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: 16 }}
            name={'new'}
            rules={[{ required: true, message: 'Không được bỏ trống' }]}
          >
            <Input.Password
              type={showPassword ? 'text' : 'password'}
              iconRender={visible =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              placeholder="Nhập mật khẩu mới"
              style={cssInput}
            />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: 16 }}
            name={'verify'}
            rules={[
              { required: true, message: 'Không được bỏ trống' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('new') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Mật khẩu không khớp'))
                },
              }),
            ]}
          >
            <Input.Password
              style={cssInput}
              type={showPassword ? 'text' : 'password'}
              iconRender={visible =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              placeholder="Xác nhận mật khẩu mới"
            />
          </Form.Item>

          <Form.Item
            style={{
              marginBottom: 0,
              marginTop: 15,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: '100%',
                height: 40,
                backgroundColor: '#2f3848',
                borderRadius: 8,
                padding: '4px 0',
                color: 'white',
                fontSize: '14px',
                margin: '0 auto',
                outline: 'none',
                borderColor: 'transparent',
              }}
            >
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </Styled.CardForm>
    </Styled.WrapCardCenter>
  )
}
export default DepositPassPage
