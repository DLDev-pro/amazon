import { message, notification } from 'antd'
import R from 'assets'
import { LightBulbIcon } from 'common/components/Icons'
import BlueIconComp from 'common/components/Icons/BlueIconComp'
import { ADMIN_ROUTER_PATH } from 'common/config'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import history from 'utils/history'
import { formatPrice } from 'utils/ruleForm'
import { requestAnOrder, sendOrder } from './api/ApiOrder'
import * as S from './styled'

const styleIcon = { fontSize: '35px', color: 'white' }

const BillOrder: React.FC = () => {
  const [data, setData] = useState<any>({})
  const location: any = useLocation()

  useEffect(() => {
    if (location.state.own_level) {
      getData(location.state.own_level)
    } else {
      getData(location.state.first_level)
    }
  }, [])

  const getData = async (key: any) => {
    try {
      const res = await requestAnOrder(key)
      setData(res.data)
    } catch (error) {
      history.goBack()
      // message.error('Có lỗi xảy ra')
    }
  }

  const handleClickBtn = async () => {
    try {
      const res = await sendOrder(data?._id)
      if (res.data?.status === 'Success') {
        notification.success({
          message: 'Đơn hàng',
          description: ' Gửi đơn hàng thành công',
        })
        history.push(ADMIN_ROUTER_PATH.ORDER)
      }
    } catch (error) {
      // message.error('Không đủ số dư, vui lòng nạp tiền vào tài khoản')
    }
  }

  return (
    <S.WrapContainer>
      <S.BillContainer>
        <S.Title>
          <BlueIconComp icon={<LightBulbIcon style={styleIcon} />} />
          Đơn vị trật tự
        </S.Title>
        <div style={{ marginTop: '1rem' }}>
          Thời gian nhận：
          {data?.created_at &&
            moment(data?.created_at).format('DD/MM/YYYY HH:mm:ss')}
        </div>
        <div>Mã đơn hàng：{data?._id}</div>
        <b>{data?.meta?.level.commission_percent}%</b>
        <S.ImageBlock>
          <img
            alt="gif"
            src={process.env.REACT_APP_IMG_URL + data?.product?.image}
            crossOrigin="anonymous"
          />
        </S.ImageBlock>
        <div className="info">
          Tổng số tiền đơn hàng:
          <span className="content">$ {formatPrice(data?.meta?.value)}</span>
        </div>
        <div className="info">
          Hoa hồng:
          <span className="content">
            $ {formatPrice(data?.meta?.commission)}
          </span>
        </div>
        <div className="info">
          Số tiền hoàn trả:
          <span className="content">
            {' '}
            $ {formatPrice(data?.meta?.value + data?.meta?.commission)}
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1rem',
          }}
        >
          <S.StartBtn
            type="primary"
            size="large"
            onClick={() => {
              handleClickBtn()
            }}
          >
            Gửi đơn hàng
          </S.StartBtn>
        </div>
      </S.BillContainer>
    </S.WrapContainer>
  )
}
export default BillOrder
