import PageTitle from 'common/components/PageTitle'
import React from 'react'
import { Button, Form, Input, message } from 'antd'
import * as Styled from './styled'
import history from 'utils/history'
import { ADMIN_ROUTER_PATH } from 'common/config'
import { requestChangeDepositPass } from 'services/api/CommonApi'

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

  return (
    <div>
      <Styled.WrapCardCenter>
        <PageTitle title={'Đổi mật khẩu vốn'} />
        <Styled.CardForm>
          <span>Mật khẩu vốn</span>
          <Form layout={'vertical'} onFinish={onFinish}>
            <Form.Item
              name={'old'}
              rules={[{ required: true, message: 'Không được bỏ trống' }]}
              label={'Mật khẩu hiện tại'}
            >
              <Input type={'password'} placeholder="Nhập mật khẩu hiện tại" />
            </Form.Item>
            <Form.Item
              name={'new'}
              rules={[{ required: true, message: 'Không được bỏ trống' }]}
              label={'Mật khẩu mới'}
            >
              <Input type={'password'} placeholder="Nhập mật khẩu mới" />
            </Form.Item>
            <Form.Item
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
              label={'Xác nhận lại mật khẩu'}
            >
              <Input type={'password'} placeholder="Nhập mật khẩu mới" />
            </Form.Item>
            <div style={{ marginTop: 10 }} className="warning-text">
              Lời nhắc nhở: Quên mật khẩu vốn vui lòng{' '}
              <b
                onClick={() => history.push(ADMIN_ROUTER_PATH.SUPPORT)}
                style={{ color: '#1890ff', cursor: 'pointer' }}
              >
                LIÊN HỆ HỖ TRỢ
              </b>
            </div>
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
                  fontWeight: 700,
                }}
              >
                Đổi mật khẩu
              </Button>
            </Form.Item>
          </Form>
        </Styled.CardForm>
      </Styled.WrapCardCenter>
    </div>
  )
}
export default DepositPassPage
