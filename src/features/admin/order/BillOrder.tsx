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
import { t } from 'i18next'

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
          {t('bill.unit_of_order')}
        </S.Title>
        <div style={{ marginTop: '1rem' }}>
          {t('bill.created_at')}：
          {data?.created_at &&
            moment(data?.created_at).format('DD/MM/YYYY HH:mm:ss')}
        </div>
        <div>
          {t('bill.order_id')}：{data?._id}
        </div>
        <b>
          {t('bill.commission')}: {data?.meta?.level.commission_percent}%
        </b>
        <S.ImageBlock>
          <img
            alt="gif"
            src={process.env.REACT_APP_IMG_URL + data?.product?.image}
            crossOrigin="anonymous"
          />
        </S.ImageBlock>
        <div className="info">
          {t('bill.total_order_price')}:
          <span className="content">$ {formatPrice(data?.meta?.value)}</span>
        </div>
        <div className="info">
          {t('bill.commission')}:
          <span className="content">
            $ {formatPrice(data?.meta?.commission)}
          </span>
        </div>
        <div className="info">
          {t('bill.return_blance')}:
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
            {t('bill.send_order')}
          </S.StartBtn>
        </div>
      </S.BillContainer>
    </S.WrapContainer>
  )
}
export default BillOrder
