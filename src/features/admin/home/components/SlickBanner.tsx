import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Carousel } from 'antd'
import R from 'assets'
import React, { useRef } from 'react'
import * as Styled from '../styled'

const contentStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
}
type Props = { data: any }

const SlickBanner: React.FC = () => {
  const carouselRef = useRef<any>(null)
  return (
    <Styled.WrapSlickBanner>
      <div style={{ margin: 'auto' }}>
        <Styled.ArrowBlock>
          <LeftOutlined
            className="icon-arror"
            style={{ fontSize: '20px' }}
            onClick={() => {
              if (carouselRef.current) {
                carouselRef.current.prev()
              }
            }}
          />
          <RightOutlined
            className="icon-arror"
            style={{ fontSize: '20px' }}
            onClick={() => {
              if (carouselRef.current) {
                carouselRef.current.next()
              }
            }}
          />
        </Styled.ArrowBlock>
        <Carousel autoplay ref={carouselRef}>
          <div>
            <img alt="banner" src={R.images.banner1} style={contentStyle} />
          </div>
          <div>
            <img alt="banner" src={R.images.banner2} style={contentStyle} />
          </div>
          <div>
            <img alt="banner" src={R.images.banner3} style={contentStyle} />
          </div>
          <div>
            <img alt="banner" src={R.images.banner4} style={contentStyle} />
          </div>
          <div>
            <img alt="banner" src={R.images.banner5} style={contentStyle} />
          </div>
        </Carousel>
      </div>
    </Styled.WrapSlickBanner>
  )
}
export default SlickBanner
