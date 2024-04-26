/* eslint-disable jsx-a11y/anchor-is-valid */
import { Carousel, Col, Drawer, Dropdown, Layout, Menu, Row } from 'antd'
import React, { useRef, useState } from 'react'
import { FaPhoneAlt } from 'react-icons/fa'
import { IoLocation } from 'react-icons/io5'
import { MdEmail } from 'react-icons/md'
// import { QRCode } from 'antd'
import {
  DownOutlined,
  FacebookOutlined,
  MenuOutlined,
  RedditOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from '@ant-design/icons'
import R from 'assets'
import Map from './components/Map'
import * as Styled from './styled'

const { Header, Footer, Content } = Layout
const contentStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
}
const menu = (
  <Menu>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.alipay.com/"
      >
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.taobao.com/"
      >
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
)

const AboutPage = () => {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }

  const carouselRef = useRef<any>(null)

  return (
    <Layout
      style={{
        padding: '0 10px',
      }}
    >
      <Header
        style={{
          backgroundColor: 'white',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span onClick={showDrawer}>
          <MenuOutlined />
        </span>
        <img
          src={R.images.logo_web}
          alt=""
          style={{
            width: '100px',
            height: 'auto',
          }}
        />
      </Header>
      <Drawer
        title={
          <img
            src={R.images.logo_web}
            alt="Aeon Group"
            style={{ width: '100px', height: 'auto' }}
          />
        }
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
        width={200}
      >
        <Dropdown overlay={menu} trigger={['click']}>
          <button onClick={e => e.preventDefault()}>
            Thông tin tổng quan <DownOutlined />
          </button>
        </Dropdown>
        <p>Tin tức</p>
        <p>Liên hệ</p>
      </Drawer>
      <Content>
        <h1>
          <strong>Thông tin tổng quan</strong>
        </h1>
        <p>
          Thị trường Aeon Group là điểm đến cuối cùng cho mua sắm và giải trí
          tại Việt Nam. Với sự đa dạng của các thương hiệu từ thời trang đến ẩm
          thực, cùng với các khu vực giải trí rộng lớn, nơi này mang lại trải
          nghiệm đa dạng cho mọi lứa tuổi. Khách hàng có thể lựa chọn các sản
          phẩm chất lượng từ các thương hiệu uy tín, đồng thời tham gia vào các
          sự kiện và hoạt động giải trí thường xuyên, tạo nên sức hấp dẫn cho cả
          gia đình và bạn bè.
        </p>
        <Styled.WrapSlickBanner
          style={{
            padding: '20px 0',
          }}
        >
          <div style={{ margin: 'auto' }}>
            {/* <Styled.ArrowBlock>
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
            </Styled.ArrowBlock> */}
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
      </Content>
      <Footer
        style={{
          padding: '20px 0',
        }}
      >
        <Row
          style={{
            gap: '10px',
          }}
        >
          <Col lg={6} md={24} order={1}>
            <div className="map">
              <Map />
            </div>
          </Col>
          <Col lg={8} md={24} order={2}>
            <div className="footer__logo mb-10">
              <img src={R.images.logo_web} alt="" width={200} />
            </div>
            <div className="tpfooter__widget mb-20">
              <div className="tpfooter__widget mb-20">
                <div className="tpfooter__widget-info">
                  <div className="d-flex align-items-start">
                    <div className="icon">
                      <i className="fas fa-map-marker-alt" />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        gap: '10px',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '20px',
                        }}
                      >
                        <IoLocation />
                      </span>{' '}
                      Địa chỉ: Số 30 Tân Thắng, phường Sơn Kỳ, quận Tân Phú, Tp.
                      Hồ Chí Minh, Việt Nam
                    </div>
                  </div>
                  <div className="d-flex align-items-start">
                    <div className="icon">
                      <i className="fas fa-phone-alt" />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        gap: '10px',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '20px',
                        }}
                      >
                        <FaPhoneAlt />
                      </span>
                      Hotline:{' '}
                      <a rel="nofollow" href="tel:028.628874234 - ext: 324">
                        028.628874234 - ext: 324
                      </a>
                    </div>
                  </div>
                  <div className="d-flex align-items-start">
                    <div className="icon">
                      <i className="fas fa-envelope" />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        gap: '10px',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '20px',
                        }}
                      >
                        <MdEmail />
                      </span>
                      Email:{' '}
                      <a rel="nofollow" href="#">
                        Aeon Group.cs@Aeon Groupmall-vn.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={9} md={0} xs={0} order={3}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '20px',
                paddingLeft: '20px',
              }}
            >
              <ul className="">
                <li>
                  <strong
                    style={{
                      color: 'black',
                      fontSize: '20px',
                    }}
                  >
                    Thông tin
                  </strong>
                </li>
                <li>
                  <a href="#">Giới thiệu</a>
                </li>
                <li>
                  <a href="#">Tin tức</a>
                </li>
                <li>
                  <a href="#">Liên hệ</a>
                </li>
              </ul>

              <ul className="">
                <li>
                  <strong
                    style={{
                      color: 'black',
                      fontSize: '20px',
                    }}
                  >
                    Mua sắm
                  </strong>
                </li>
                <li>
                  <a href="#">Khuyến mại</a>
                </li>
                <li>
                  <a href="#">Tiện tích</a>
                </li>
                <li>
                  <a href="#">Danh sách gian hàng</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
              </ul>

              <ul className="">
                <li>
                  <strong
                    style={{
                      color: 'black',
                      fontSize: '20px',
                    }}
                  >
                    Khách hàng
                  </strong>
                </li>
                <li>
                  <a href="#">Thành viên</a>
                </li>
                <li>
                  <a href="#">Chính sách bảo mật</a>
                </li>
                <li>
                  <a href="#">Liên hệ</a>
                </li>
              </ul>
            </div>
            <div className="footer-right footer-social">
              <span
                style={{
                  fontSize: '25px',
                  paddingLeft: '20px',
                }}
              >
                <b>Kết nối mạng xã hội</b>
              </span>
              <div
                style={{
                  fontSize: '25px',
                  display: 'flex',
                  gap: '10px',
                  marginTop: '10px',
                  paddingLeft: '20px',
                }}
              >
                <FacebookOutlined />
                <TwitterOutlined />
                <YoutubeOutlined />
                <RedditOutlined />
              </div>
            </div>
          </Col>
        </Row>
      </Footer>
    </Layout>
  )
}

export default AboutPage
