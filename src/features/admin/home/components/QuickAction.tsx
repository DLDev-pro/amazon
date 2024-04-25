import { message, Row } from 'antd'
import React from 'react'
import { CrownIcon, CoinIcon, BankIcon } from 'common/components/Icons'
import * as Styled from '../styled'
import history from 'utils/history'
import { ADMIN_ROUTER_PATH } from 'common/config'
import { useAppSelector } from 'redux/store/store'
import Swal from 'sweetalert2'
import { CHAT_LINK } from 'utils/constants'
import R from 'assets'
import { t } from 'i18next'

const QuickAction: React.FC = () => {
  const { userInfo } = useAppSelector(state => state.AuthReducer)

  return (
    <Row
      style={{ marginTop: '1rem' }}
      justify="center"
      gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
    >
      <Styled.ActionBlock
        onClick={() => {
          alert('Vòng quay may mắn')
        }}
        xs={6}
        md={4}
      >
        <div className="main-action">
          <img src={R.images.vongquay} alt="" />
          {t('home_page.lucky_draw')}
        </div>
      </Styled.ActionBlock>
      <Styled.ActionBlock
        onClick={() => {
          history.push(ADMIN_ROUTER_PATH.MEMBER_RANK)
        }}
        xs={6}
        md={4}
      >
        <div className="main-action">
          <img src={R.images.viloinhuan} alt="" />
          {t('home_page.quick_update')}
        </div>
      </Styled.ActionBlock>
      <Styled.ActionBlock
        onClick={() => {
          // history.push(ADMIN_ROUTER_PATH.SUPPORT)
          window.open(CHAT_LINK)
        }}
        xs={6}
        md={4}
      >
        <div className="main-action">
          <img src={R.images.nap} alt="" />
          {t('home_page.quick_deposit')}
        </div>
      </Styled.ActionBlock>
      <Styled.ActionBlock
        onClick={() => {
          if (userInfo?.balance == 0) {
            Swal.fire({
              title: 'Thông báo',
              text: 'Số dư tài khoản không đủ để thực hiện thao tác này. Bạn có muốn nạp tiền?',
              icon: 'error',
              showCancelButton: true,
            }).then((result: any) => {
              if (result.isConfirmed) {
                history.push(ADMIN_ROUTER_PATH.RECHARGE_MONEY)
              }
            })
          } else {
            if (userInfo.bank) {
              history.push(ADMIN_ROUTER_PATH.WITHDRAW_MONEY)
            } else {
              message.error('Vui lòng cập nhập thông tin thẻ ngân hàng')
              history.push(ADMIN_ROUTER_PATH.BANK_CARD)
            }
          }
        }}
        xs={6}
        md={4}
      >
        <div className="main-action">
          <img src={R.images.rut} alt="" />
          {t('home_page.quick_withdraw')}
        </div>
      </Styled.ActionBlock>
    </Row>
  )
}

const StyleIcon = {
  fontSize: '26px',
  marginBottom: '0.3rem',
}
export default QuickAction
