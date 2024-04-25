import { Button, Form, Input, message } from 'antd'
import { ADMIN_ROUTER_PATH } from 'common/config'
import React from 'react'
import { useAppSelector } from 'redux/store/store'
import { requestUpdateOrderAddress } from 'services/api/AccountApi'
import { REG_PHONE } from 'utils/constants'
import history from 'utils/history'
import * as Styled from '../withdraw_money/styled'

const DeliveryAddressPage: React.FC = () => {
  const formItemStyle = { style: { marginBottom: 10 } }
  const inputStyle = { style: { height: 40 } }

  const { userInfo } = useAppSelector(state => state.AuthReducer)

  const replaceAt = (replacement: any) => {
    let str = replacement.split('')
    str = str.map((element: any, index: any) => {
      if (index > str.length - 8) return (element = '*')
      return element
    })
    return str.join('')
  }

  // let addressData: any = Cookie.get('userAddr') || undefined
  let addressData: any = userInfo?.order_address
  let data = addressData ? addressData : { name: '', phone: '', address: '' }
  data = {
    name: data?.name ? data?.name : '',
    phone: data?.phone ? replaceAt(data?.phone) : '',
    address: data?.address ? data?.address : '',
  }
  addressData = data

  const onFinish = async (values: any) => {
    await requestUpdateOrderAddress(values)
    // Cookie.set(
    //   'userAddr',
    //   JSON.stringify({
    //     name: values.name,
    //     phone: values.phone,
    //     address: values.address,
    //   })
    // )

    message.success('Cập nhật địa chỉ thành công')
    history.push(ADMIN_ROUTER_PATH.PROFILE)
  }

  return (
    <div>
      <Styled.WrapCardCenter>
        <Styled.CardForm>
          <span
            style={{
              color: '#308aff',
              fontSize: 20,
              fontWeight: 'normal',
            }}
          >
            Địa chỉ cư trú
          </span>
          <br />

          <Form
            onFinish={onFinish}
            layout={'vertical'}
            initialValues={addressData}
          >
            <Form.Item
              {...formItemStyle}
              name="name"
              label={'Họ tên'}
              rules={[{ required: true, message: 'Không được bỏ trống' }]}
            >
              <Input
                disabled={userInfo?.order_address?.name}
                {...inputStyle}
                // prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder={'Họ tên'}
              />
            </Form.Item>
            <Form.Item
              {...formItemStyle}
              name="phone"
              label={'Số điện thoại'}
              rules={[
                { required: true, message: 'Không được bỏ trống' },
                {
                  pattern: REG_PHONE,
                  message: 'Số điện thoại không hợp lệ',
                },
              ]}
            >
              <Input
                {...inputStyle}
                disabled={userInfo?.order_address?.phone}
                // prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder={'Số điện thoại'}
              />
            </Form.Item>
            <Form.Item
              {...formItemStyle}
              name="address"
              label={'Địa chỉ chi tiết'}
              rules={[{ required: true, message: 'Không được bỏ trống' }]}
            >
              <Input
                {...inputStyle}
                disabled={userInfo?.order_address?.address}
                // prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder={'Địa chỉ chi tiết'}
              />
            </Form.Item>
            {!userInfo?.order_address ? (
              <Form.Item
                style={{
                  marginBottom: 0,
                  marginTop: 25,
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
                    fontSize: '12px',
                    margin: '0 auto',
                    outline: 'none',
                    borderColor: 'transparent',
                  }}
                >
                  Xác nhận
                </Button>
              </Form.Item>
            ) : null}
          </Form>
        </Styled.CardForm>
      </Styled.WrapCardCenter>
    </div>
  )
}
export default DeliveryAddressPage
