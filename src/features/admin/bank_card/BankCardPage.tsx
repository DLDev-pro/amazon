import { Button, Form, Input, message, Select } from 'antd'
import { ADMIN_ROUTER_PATH } from 'common/config'
import React, { useEffect } from 'react'
import { useAppSelector } from 'redux/store/store'
import { requestUpdateBankInfor } from 'services/api/AccountApi'
import { UserBankNames } from 'utils/constants'
import history from 'utils/history'
import * as Styled from './styled'

const BankCardPage: React.FC = () => {
  const { Option } = Select
  const { userInfo } = useAppSelector(state => state.AuthReducer)
  const onFinish = async (values: any) => {
    const resData = (
      await requestUpdateBankInfor({
        full_name: values.name,
        phone: values.phone,
        bank_number: values.bankNumber,
        bank_name: values.bankName,
      })
    ).data

    if (resData.bank) {
      message.success('Cập nhật thông tin thẻ ngân hàng thành công')
      history.push(ADMIN_ROUTER_PATH.PROFILE)
    }
  }

  const replaceAt = (replacement: any) => {
    let str = replacement.split('')
    str = str.map((element: any, index: any) => {
      if (index > str.length - 4) return (element = '*')
      return element
    })

    return str.join('')
  }
  console.log(userInfo)
  return (
    <Styled.Container>
      <Styled.Title>Thẻ ngân hàng của tôi</Styled.Title>

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{
          name: userInfo?.bank ? userInfo?.bank?.full_name : '',
          bankNumber: userInfo?.bank
            ? replaceAt(userInfo?.bank?.bank_number)
            : '',
          bankName: userInfo?.bank ? userInfo?.bank?.bank_name : '',
          phone: userInfo?.bank ? replaceAt(userInfo?.bank?.phone) : '',
        }}
        onFinish={onFinish}
        autoComplete="off"
        style={{ marginTop: '1rem' }}
      >
        <Form.Item
          label="Họ và tên chủ tài khoản"
          name="name"
          rules={[{ required: true, message: 'Không được bỏ trống' }]}
        >
          <Input disabled={userInfo?.bank?.full_name} placeholder="Họ tên" />
        </Form.Item>
        <Form.Item
          label="Tài khoản"
          name="phone"
          rules={[{ required: true, message: 'Không được bỏ trống' }]}
        >
          <Input disabled={userInfo?.bank?.phone} placeholder="Số điện thoại" />
        </Form.Item>
        <Form.Item
          label="Số tài khoản"
          name="bankNumber"
          rules={[{ required: true, message: 'Không được bỏ trống' }]}
        >
          <Input
            disabled={userInfo?.bank?.bank_number}
            placeholder="Số tài khoản"
          />
        </Form.Item>
        <Form.Item
          name={'bankName'}
          label="Tên ngân hàng"
          rules={[{ required: true, message: 'Không được bỏ trống' }]}
        >
          <Select
            disabled={userInfo?.bank?.bank_name}
            showSearch
            placeholder="Tên ngân hàng"
            optionFilterProp="children"
            onChange={() => {}}
            filterOption={(input, option) =>
              (option!.children as unknown as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          >
            {Object.values(UserBankNames).map(bank => (
              <Option value={bank}>{bank}</Option>
            ))}
          </Select>
        </Form.Item>

        <span style={{ color: 'red' }}>
          Vì mục đích an ninh và bảo mật, quý khách vui lòng không điền hoặc
          cung cấp bất kỳ thông tin tài khoản và mật khẩu đăng nhập ngân hàng
          như Internet Banking, Mobile Banking cho bất kỳ ai, nhân viên CSKH
          Amazon VietNam cũng sẽ không yêu cầu bạn cung cấp trong suốt quá trình
          sử dụng dịch vụ!
        </span>
        {/* {!userInfo?.bank ? (
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              CÀI ĐẶT THÔNG TIN
            </Button>
          </Form.Item>
        ) : null} */}
      </Form>
    </Styled.Container>
  )
}
export default BankCardPage
