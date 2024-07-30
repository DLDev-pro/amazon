import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Carousel } from 'antd'
import R from 'assets'
import React, { useEffect, useRef } from 'react'
import * as Styled from '../styled'
import { StyledMarquee } from '../styled'

const contentStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
}
type Props = { data: any }


const SlickBanner: React.FC = () => {
  const carouselRef = useRef<any>(null)
  const [saleNotification, setSaleNotification] = React.useState<any>([])
  useEffect( () => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://image.aeonmallstore.com/api/v1/sale-notification'
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const jsonData = await response.json()
        console.log(jsonData)
        setSaleNotification(jsonData.description)
      } catch (error) {
        console.error('Error fetching data:', error)
      }}
      fetchData()
  },[])
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
        <StyledMarquee>
            <p>{saleNotification}</p>
        </StyledMarquee>
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
        </Carousel>
      </div>
    </Styled.WrapSlickBanner>
  )
}
export default SlickBanner
