import { Col, Row, DatePicker, Button } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { getListTransaction } from 'services/api/TransactionApi'
import { TRANSACTION_STATUS, TRANSACTION_TYPE } from 'utils/constants'
import { formatPrice } from 'utils/ruleForm'
import * as Styled from './styled'

const dateFormat = 'DD/MM/YYYY'

const transactionType = {
  ALL: { index: 0, title: 'Tất cả các loại', type: undefined },
  [TRANSACTION_TYPE.TOPUP]: {
    index: 1,
    title: 'Lịch sử nạp tiền',
    type: TRANSACTION_TYPE.TOPUP,
  },
  [TRANSACTION_TYPE.CASH_OUT]: {
    index: 2,
    title: 'Lịch sử rút tiền',
    type: TRANSACTION_TYPE.CASH_OUT,
  },
  [TRANSACTION_TYPE.PURCHASE_LEVEL]: {
    index: 3,
    title: 'Lịch sử nâng cấp VIP',
    type: TRANSACTION_TYPE.PURCHASE_LEVEL,
  },
}

const HistoryTransactionPage = () => {
  const [transactions, setTransactions] = useState<Array<any>>([])

  const handleClickTab = async (tab: any) => {
    let tabs = document.getElementsByClassName('title-tabs')
    let current = document.getElementsByClassName('active')
    if (current[0]) {
      current[0].className = current[0].className.replace(' active', '')
    }
    tabs[tab.index].className = tabs[tab.index].className.concat(' active')

    const transactionData = (await getListTransaction({ type: tab.type })).data
    setTransactions(transactionData)
  }

  const getData = async () => {}

  useEffect(() => {
    handleClickTab(transactionType.ALL)
    // getData()
  }, [])

  const renderTransactionItem = (item: any) => {
    const transactionType =
      item.type == TRANSACTION_TYPE.TOPUP
        ? 'Nạp tiền'
        : item.type == TRANSACTION_TYPE.CASH_OUT
        ? 'Rút tiền'
        : 'Thanh toán VIP'

    return (
      <Styled.ItemWrapper>
        <Row justify="space-between">
          <Col style={{ fontSize: 16 }}>
            Mã giao dịch: <b>{item._id}</b>
          </Col>
          <Col style={{ fontSize: 16, color: '#999' }}>
            {moment(item.created_at).format('YYYY-MM-DD HH:mm:ss')}
          </Col>
        </Row>
        <Row justify="space-between">
          <Col style={{ fontSize: 16 }}>
            Giá trị giao dịch:{' '}
            <b
              style={{
                color: item.type == TRANSACTION_TYPE.TOPUP ? 'green' : 'red',
              }}
            >
              {formatPrice(item.amount)}
            </b>
          </Col>
          <Col style={{ fontSize: 16 }}>
            Loại giao dịch: <b>{transactionType}</b>
          </Col>
        </Row>
        <Row justify="space-between">
          <Col style={{ fontSize: 16 }}>
            {transactionType} từ:{' '}
            {item?.meta?.user_bank?.bank_name ||
              item?.meta?.admin_topup_method?.bank_name}
          </Col>
        </Row>
        <Row justify="space-between">
          <Col style={{ fontSize: 16 }}>
            Trạng thái : {item.status == "Pending" ? <span style={{color: "orange"}}>Đang chờ duyệt</span> : item.status == "Reject" ? <span style={{color: "red"}}>Từ chối</span> : <span style={{color: "green"}}>Hoàn Thành</span>}
          </Col>
          {item.status == "Reject" &&<Col style={{ fontSize: 16 }}>
            Lí do : {item.reject_reason}
          </Col>}
        </Row>
      </Styled.ItemWrapper>
    )
  }

  return (
    <Styled.Container>
      <Styled.Title>Lịch sử nạp tiền</Styled.Title>
      <Row style={{ marginTop: '1rem' }} justify="space-around">
        <Styled.ColStyled xs={24} md={8}>
          <DatePicker format={dateFormat} />
        </Styled.ColStyled>
        <Styled.ColStyled xs={24} md={8}>
          <DatePicker format={dateFormat} />
        </Styled.ColStyled>
      </Row>
      <Row justify="center">
        <Button
          style={{
            margin: '16px 0 20px 0',
            alignSelf: 'center',
            borderColor: '',
          }}
        >
          Tìm kiếm
        </Button>
      </Row>
      <Styled.ContainerTabs>
        <Styled.HeaderTabs>
          {Object.values(transactionType).map((item, index) => (
            <Col
              key={index}
              span={24 / Object.keys(transactionType).length}
              className="title-tabs"
              onClick={() => {
                handleClickTab(item)
              }}
            >
              {item.title}
            </Col>
          ))}
        </Styled.HeaderTabs>
      </Styled.ContainerTabs>
      {transactions.length ? (
        <div style={{ padding: '0px 20px', marginTop: 20 }}>
          {transactions.map(item => renderTransactionItem(item))}
        </div>
      ) : (
        <Styled.Empty>Trang này không có lịch sử</Styled.Empty>
      )}
    </Styled.Container>
  )
}
export default HistoryTransactionPage
