import { message } from 'antd'
import { ADMIN_ROUTER_PATH } from 'common/config'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getImageFromServer } from 'utils/funcHelper'
import history from 'utils/history'
import { formatPrice } from 'utils/ruleForm'
import { sendOrder } from './api/ApiOrder'
import * as S from './styled'
const DetailOrder: React.FC = () => {
  const [data, setData] = useState<any>({})
  const location: any = useLocation()
  useEffect(() => {
    if (location.state) {
      setData(location.state)
    }
  }, [])
  const onPurchaseOrder = async () => {
    try {
      const res = await sendOrder(data.id)
      if (res.data.status === 'Success') {
        history.push({
          pathname: ADMIN_ROUTER_PATH.HISTORY,
          search: '?status=Success',
        })
      } else {
        message.error(res.message)
      }
    } catch (error) {
      console.error('Exception ' + error)
    }
  }
  return (
    <S.WrapContainer>
      <S.Container>
        <div
          className="title"
          style={{ color: 'var(--orange-1)', fontWeight: 600 }}
        >
          Xác nhận đơn hàng
        </div>
        <div className="title" style={{ color: 'var(--green-1)' }}>
          Đặt đơn hàng thành công!!!
        </div>
        <div className="img-product">
          <img
            alt="product"
            src={getImageFromServer(data.image_url)}
            crossOrigin="anonymous"
          />
        </div>
        <div className="value-order">
          Giá trị đơn hàng(đ):<span>{formatPrice(data.price_product)}</span>
        </div>
        <div className="value-order">
          Lợi nhuận(đ): <span>{formatPrice(data.commission)}</span>
        </div>
        <div className="value-order">
          Số tiền(đ):
          <span>{formatPrice(data.commission + data.price_product)}</span>
        </div>
        <S.SendBtn onClick={onPurchaseOrder}>Gửi lệnh</S.SendBtn>
        <div
          className="cancel-btn"
          onClick={() => {
            history.push(ADMIN_ROUTER_PATH.HISTORY)
          }}
        >
          Nhảy quả
        </div>
      </S.Container>
    </S.WrapContainer>
  )
}
export default DetailOrder
