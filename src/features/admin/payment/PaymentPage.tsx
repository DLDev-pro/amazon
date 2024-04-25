import PageTitle from 'common/components/PageTitle'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button, Form, Input, Image, Row, Col, InputNumber } from 'antd'
import * as Styled from './styled'
import { getListMethod } from 'services/api/CommonApi'
import { AiFillBank } from 'react-icons/ai'
import { useQuery } from 'hook/useQuery'
import { getDetailTransaction } from 'services/api/TransactionApi'
import moment from 'moment'
import history from 'utils/history'
import { ADMIN_ROUTER_PATH } from 'common/config'
import { formatPrice } from 'utils/ruleForm'

const HorizontalItem = ({ left, right }: { left: string; right: string }) => {
  return (
    <Row style={{ marginBottom: 5 }} justify="space-between">
      <Col style={{ fontSize: 17 }}>{left}</Col>
      <Col style={{ fontSize: 17, fontWeight: 600 }}>{right}</Col>
    </Row>
  )
}

const PaymentPage: React.FC = () => {
  const [countdown, setCountdown] = useState<number>(0)
  const [transactionDetail, setTransactionDetail] = useState<any>()

  const query = useQuery()
  const transactionId = query.get('id')

  const getData = async () => {
    const transactionData = (await getDetailTransaction({ id: transactionId }))
      .data

    setTransactionDetail(transactionData)

    const now = moment(new Date())
    const end = moment(transactionData.meta.admin_topup_method.expire)
    const duration = moment.duration(end.diff(now))
    const second = duration.asSeconds()

    if (second < 0) {
      history.replace(ADMIN_ROUTER_PATH.HOME)
    } else {
      setCountdown(Math.round(second))
    }
  }

  const onFinish = (values: any) => {
  }

  useEffect(() => {
    let counter = window.setInterval(function () {
      if (countdown > 0) {
        setCountdown(prev => prev - 1)
      } else if (countdown <= 0) {
        window.clearInterval(counter)

        history.replace(ADMIN_ROUTER_PATH.HOME)
      }
    }, 1000)

    return () => {
      clearInterval(counter)
    }
  }, [countdown])

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <PageTitle title={'Nạp tiền'} />
      <Styled.WrapCardCenter>
        <Styled.CardForm>
          <Row align="middle">
            <Image
              width={100}
              height={100}
              src="https://cdn.britannica.com/s:700x500/17/155017-050-9AC96FC8/Example-QR-code.jpg"
            />
            <div
              style={{
                display: 'flex',
                flexFlow: 'column-reverse',
                flex: 1,
                height: 100,
                marginLeft: 10,
              }}
            >
              <Col style={{ flex: 1 }} order={12}>
                <Row justify="space-between">
                  <Col style={{ fontSize: 16 }}>Mã giao dịch</Col>
                  <Col style={{ fontSize: 16 }}>{transactionDetail?._id}</Col>
                </Row>
                <Row justify="space-between">
                  <Col style={{ fontSize: 16 }}>Số tiền thanh toán</Col>
                  <Col style={{ fontSize: 16 }}>{`${formatPrice(
                    transactionDetail?.amount
                  )}đ`}</Col>
                </Row>
              </Col>
              <div
                style={{
                  display: 'flex',
                  flexFlow: 'column',
                  flex: 1,
                  justifyContent: 'flex-end',
                }}
              >
                <div
                  style={{ fontSize: 18, color: 'red' }}
                >{`${countdown}s`}</div>
              </div>
            </div>
          </Row>
          <Styled.Line />
          <HorizontalItem
            left="Nội dung ghi chú"
            right={transactionDetail?.meta?.admin_topup_method?.pin}
          />
          <HorizontalItem
            left="Thông tin người thụ hưởng"
            right={transactionDetail?.meta?.admin_topup_method?.full_name}
          />
          <HorizontalItem
            left="Số tài khoản ngân hàng"
            right={
              transactionDetail?.meta?.admin_topup_method?.bank_number.length
                ? transactionDetail.meta?.admin_topup_method?.bank_number
                : 'Đang cập nhật'
            }
          />
          <HorizontalItem
            left="Ngân hàng thụ hưởng"
            right={
              transactionDetail?.meta?.admin_topup_method?.bank_name.length
                ? transactionDetail.meta?.admin_topup_method?.bank_name
                : 'Đang cập nhật'
            }
          />
          <div style={{ marginTop: 20 }} className="warning-text">
            Lời nhắc nhở: Vui lòng nhập đúng nội dung chuyển khoản
          </div>
          <div style={{ marginTop: 5 }} className="warning-text">
            Vui lòng xác nhận lại thông tin tài khoản ngân hàng của bạn, điền và
            thanh toán trong thời gian còn hiệu lực. Nếu hết thời gian hiệu lực,
            vui lòng tạo mới yêu cầu nạp tiền
          </div>
        </Styled.CardForm>
      </Styled.WrapCardCenter>
    </div>
  )
}
export default PaymentPage
