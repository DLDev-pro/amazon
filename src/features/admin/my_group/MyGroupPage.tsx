import { Col, Row } from 'antd'
import { ADMIN_ROUTER_PATH } from 'common/config'
import React, { useEffect, useState } from 'react'
import { formatPrice } from 'utils/ruleForm'
import history from 'utils/history'
import * as Styled from './styled'
import moment from 'moment'
import { BiUserCircle } from 'react-icons/bi'
import { requestMyGroup } from './api/MyGroupApi'

const MyGroupPage: React.FC = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const myParam = urlParams.get('tabs')
  const [data, setData] = useState<any>({ totalData: {}, dataUsers: [] })

  useEffect(() => {
    getData()
  }, [myParam])

  const getData = async () => {
    try {
      const res = await requestMyGroup(myParam)
      setData(res.data)
    } catch (error) {
      console.error('Exception ' + error)
    }
  }

  const styleCol = { border: '1px orange solid', padding: '12px' }
  return (
    <Styled.Container>
      <Styled.Title>Nhóm của tôi</Styled.Title>
      {/* <Row style={{ marginTop: '1rem', width: '50%' }} justify="space-around">
          <Col md={12} style={styleCol}>
            <div>
              <div>Số dư của nhóm</div>
              <div>{formatPrice(data.totalData?.total_balance)}</div>
            </div>
          </Col>
          <Col md={12} style={styleCol}>
            <div>
              <div>Hoa hồng từ cấp dưới của tôi</div>
              <div>{formatPrice(data.totalData?.commission)}</div>
            </div>
          </Col>
          <Col md={12} style={styleCol}>
            <div>
              <div>Tổng số tiền nạp của nhóm</div>
              <div>{formatPrice(data.totalData?.total_topUp)}</div>
            </div>
          </Col>
          <Col md={12} style={styleCol}>
            <div>
              <div>Tổng số tiền rút của nhóm</div>
              <div>{formatPrice(data.totalData?.total_CashOut)}</div>
            </div>
          </Col>
          <Col md={12} style={styleCol}>
            <div>
              <div>Hoa hồng khớp đơn của nhóm</div>
              <div>{formatPrice(data.totalData?.order_commission)}</div>
            </div>
          </Col>
          <Col md={12} style={styleCol}></Col>
        </Row> */}
      <span>
        Số người đã mời: <b>{formatPrice(data.totalData?.total_customer)}</b>
      </span>

      {/* <Styled.ContainerTabs>
        <Styled.HeaderTabs>
          <Col
            span={8}
            className={`title-tabs ${
              myParam === 'level1' || !myParam ? 'active' : ''
            }`}
            onClick={() => {
              history.push({
                pathname: ADMIN_ROUTER_PATH.MY_GROUP,
                search: '?tabs=level_1',
              })
            }}
          >
            Cấp 1
          </Col>
          <Col
            span={8}
            className={`title-tabs ${myParam === 'level2' ? 'active' : ''}`}
            onClick={() => {
              history.push({
                pathname: ADMIN_ROUTER_PATH.MY_GROUP,
                search: '?tabs=level_2',
              })
            }}
          >
            Cấp 2
          </Col>
          <Col
            span={8}
            className={`title-tabs ${myParam === 'level3' ? 'active' : ''}`}
            onClick={() => {
              history.push({
                pathname: ADMIN_ROUTER_PATH.MY_GROUP,
                search: '?tabs=level_3',
              })
            }}
          >
            Cấp 3
          </Col>
        </Styled.HeaderTabs>
      </Styled.ContainerTabs> */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '80%' }}>
          {data?.dataUsers.length ? (
            <>
              {data?.dataUsers.map((item: any) => (
                <Row
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    marginTop: '8px',
                    padding: '12px',
                  }}
                >
                  <Col
                    span={2}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <BiUserCircle style={{ fontSize: '30px' }} />
                  </Col>
                  <Col span={11}>
                    <div>Họ tên: {item.name}</div>
                    <div style={{ color: 'orange' }}>
                      Nạp tiền: {formatPrice(item.topUp)}
                    </div>
                    <div style={{ color: 'orange' }}>
                      Rút tiền: {formatPrice(item.CashOut)}
                    </div>
                  </Col>
                  <Col span={11}>
                    <div>Số điện thoại: {item.phone}</div>
                    <div>
                      Thời gian đăng ký:{' '}
                      {moment(item.create_at).format('YYYY-MM-DD HH:mm:ss')}
                    </div>
                  </Col>
                </Row>
              ))}
            </>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </Styled.Container>
  )
}
export default MyGroupPage
