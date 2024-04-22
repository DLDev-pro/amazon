import { LockOutlined } from '@ant-design/icons'
import { Button, Carousel } from 'antd'
import R from 'assets'
import { ADMIN_ROUTER_PATH } from 'common/config'
import React from 'react'
import { useHistory } from 'react-router-dom'
import * as Styled from '../styled'

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
    <Styled.WarpQuest xs={24} lg={12}>
      <div className="main-quest">
        <span className="rank-name">{data?.name}</span>
        <span className="discount">{data?.commission_percent}%</span>
        <span style={{ marginBottom: 5 }} className="category-product">
          {data?.category?.join(' | ')}
        </span>
        <span className="image-quest">
          <Carousel autoplay>
            {data?.background_urls.map((img: any) => (
              <div>
                <img
                  alt="banner"
                  src={`${process.env.REACT_APP_IMG_URL}${img}`}
                  crossOrigin={'anonymous'}
                  style={contentStyle}
                />
              </div>
            ))}
          </Carousel>
        </span>
        <Styled.ButtonStyled
          onClick={() => {
            if (isValid)
              history.push(`${ADMIN_ROUTER_PATH.ORDER}?key=${data.key}`)
            else history.push(ADMIN_ROUTER_PATH.MEMBER_RANK)
          }}
          icon={!isValid && <LockOutlined />}
        >
          {isValid ? 'Đang hoạt động' : 'Mở khoá cấp độ'}
        </Styled.ButtonStyled>
      </div>
    </Styled.WarpQuest>
  )
}
export default QuestComp
