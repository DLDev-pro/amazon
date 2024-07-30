import PageTitle from 'common/components/PageTitle'
import React from 'react'
import { Button, Form, Input, message } from 'antd'
import * as Styled from './styled'
import { useAppSelector } from 'redux/store/store'
import { formatPrice } from 'utils/ruleForm'
import { requestConductTransaction } from 'services/api/TransactionApi'
import history from 'utils/history'
import { ADMIN_ROUTER_PATH } from 'common/config'

const WithdrawMoneyPage: React.FC = () => {
  const { userInfo } = useAppSelector(state => state.AuthReducer)
  const [form] = Form.useForm()

  const onFinish = async (values: any) => {
    const resData = await requestConductTransaction({
      type: 'CashOut',
      amount: Number(values.amount),
      tfa_password: values.pass,
    })

    if (resData.data) {
      message.success('Yêu cầu rút tiền thành công')
      history.push(ADMIN_ROUTER_PATH.HISTORY_TRANSACTION)
    } else {
      message.error(resData.message[0] + 'Vui lòng liên hệ CSKH để được giải quyết')
    }
  }

  return (
    <div>
      <Styled.WrapCardCenter>
        <PageTitle title={'Rút tiền'} />
        <Styled.CardForm>
          <span>Số tiền rút</span>
          <Form
            form={form}
            initialValues={{
              amount: null,
              pass: null,
            }}
            onFinish={onFinish}
          >
            <div className="ant-input__label">Nhập số tiền</div>
            <Form.Item
              name={'amount'}
              rules={[{ required: true, message: 'Không được bỏ trống' }]}
            >
              <Input
                placeholder="Nhập số tiền"
                prefix={''}
                // className="ant-input__money-custom"
              />
            </Form.Item>
            {/* <span className="ant-input__wrapper">
              <span className="ant-input__prefix">$</span>
              <span className="ant-input__suffix">USD</span>
            </span> */}
            <div
              style={{
                display: 'flex',
                margin: '10px 0',
                alignItems: 'center',
              }}
            >
              <div style={{ marginRight: 15 }}>
                Tổng tiền: {formatPrice(userInfo?.balance + userInfo?.frozen_balance)}
              </div>
              <div
                onClick={() => {
                  form.setFieldsValue({ amount: formatPrice(userInfo?.balance + userInfo?.frozen_balance).replaceAll(',', '').replace('VND', '') })
                }}
                style={{
                  cursor: 'pointer',
                  padding: '0 5px',
                  borderRadius: '3px',
                  background: 'rgba(150, 150, 150, 0.1)',
                  border: '1px solid rgba(99, 99, 99, 0.2)',
                }}
              >
                Rút tất cả
              </div>
            </div>
            <div className="ant-input__label">Mật khẩu vốn</div>
            <Form.Item
              name={'pass'}
              rules={[{ required: true, message: 'Không được bỏ trống' }]}
            >
              <Input type={'password'} placeholder="Nhập mật khẩu vốn" />
            </Form.Item>
            <div style={{ marginTop: 10 }} className="warning-text">
              Lời nhắc nhở: Vui lòng kiểm tra kỹ thông tin thanh toán
            </div>
            <div className="warning-text">Việc rút tiền trừ phí xử lý 0%</div>
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
                Rút tiền ngay lập tức
              </Button>
            </Form.Item>
          </Form>
        </Styled.CardForm>
      </Styled.WrapCardCenter>
    </div>
  )
}
export default WithdrawMoneyPage
