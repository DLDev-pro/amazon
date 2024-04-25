import { LockOutlined } from '@ant-design/icons'
import { Button, Carousel } from 'antd'
import R from 'assets'
import { ADMIN_ROUTER_PATH } from 'common/config'
import React from 'react'
import { useHistory } from 'react-router-dom'
import * as Styled from '../styled'
import { t } from 'i18next'

type Props = { data: any; isValid: boolean }

const contentStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  aspectRatio: '1.7',
  borderRadius: 3,
}

const QuestComp: React.FC<Props> = ({ data, isValid }) => {
  const history = useHistory()
  return (
    <Styled.WarpQuest
      xs={24}
      lg={24}
      style={{
        padding: '0 6px',
        marginBottom: 10,
      }}
    >
      <div className="main-quest">
        <span
          // className="rank-name"
          className={`rank-name ${
            data.price === 75000000
              ? 'platium'
              : data.price === 120000000
              ? 'diamond'
              : ''
          }`}
        >
          {/* {data?.name} */}
          <img
            src={
              data.price === 5000000
                ? R.images.tvbac
                : data.price === 25000000
                ? R.images.tvvang
                : data.price === 75000000
                ? R.images.tvbachkim
                : R.images.tvKimcuong
            }
            alt=""
          />
        </span>
        <span className="discount">
          {t('home_page.profit')} {data?.commission_percent}%
        </span>
        <span style={{ marginBottom: 5 }} className="category-product">
          {data?.category?.join(' | ')}
        </span>
        <div className="active">
          <img src={R.images.logo_web} alt="" />
          {!isValid && (
            <div>
              <div className="overlay"></div>
              <Styled.ButtonStyled
                className="text-overlay"
                onClick={() => {
                  if (isValid)
                    history.push(`${ADMIN_ROUTER_PATH.ORDER}?key=${data.key}`)
                  else history.push(ADMIN_ROUTER_PATH.MEMBER_RANK)
                }}
                icon={!isValid && <LockOutlined />}
              >
                {isValid ? '' : t('wait_for_upgrade')}
              </Styled.ButtonStyled>
            </div>
          )}
        </div>
      </div>
    </Styled.WarpQuest>
  )
}
export default QuestComp
