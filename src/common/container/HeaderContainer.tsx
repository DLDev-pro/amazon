import { Col, Dropdown, Menu, Row, Image } from 'antd'
import R from 'assets'
import React from 'react'
import * as Style from './styled'
import { MdSupportAgent } from 'react-icons/md'
import { IoNotificationsOutline } from 'react-icons/io5'
import history from 'utils/history'
import { ADMIN_ROUTER_PATH } from 'common/config'

const HeaderContainer: React.FC = () => {
  const menu = (
    <Menu
      style={{ width: 400, minHeight: 150 }}
      // items={[
      //   {
      //     key: '1',
      //     label: (
      //       <a
      //         target="_blank"
      //         rel="noopener noreferrer"
      //         href="https://www.aliyun.com"
      //       >
      //         2nd menu item
      //       </a>
      //     ),
      //   },
      // ]}
    >
      <Menu.Item key={0}>
        <Row
          style={{
            background: '#ededed',
            padding: 7,
            borderRadius: 5,
          }}
          align={'middle'}
        >
          <Image preview={false} width={50} height={50} src={R.images.notify} />
          <Col style={{ marginLeft: 10 }}>
            <div style={{ fontWeight: 600, fontSize: 16 }}>Thông báo</div>
            <div>Chào mừng bạn đến với TARGET</div>
          </Col>
        </Row>
      </Menu.Item>
    </Menu>
  )

  return (
    <Style.HeaderBlock justify="space-between">
      <Col xs={24} md={6}>
        <img
          alt="logo"
          src={R.images.logo_web}
          style={{
            width: '22%',
            minWidth: '120px',
          }}
        />
      </Col>
      <Col
        xs={0}
        md={18}
        style={{ display: 'flex', justifyContent: 'flex-end' }}
        className="tool"
      >
        <Dropdown overlay={menu} trigger={['click']}>
          <Style.ItemBlock>
            <IoNotificationsOutline style={styleIcon} />
            Thông báo
          </Style.ItemBlock>
        </Dropdown>
        <Style.ItemBlock
          onClick={() => history.push(ADMIN_ROUTER_PATH.SUPPORT)}
        >
          <MdSupportAgent style={styleIcon} />
          Hỗ trợ
        </Style.ItemBlock>
      </Col>
    </Style.HeaderBlock>
  )
}
const styleIcon = { fontSize: '20px' }

export { HeaderContainer }
