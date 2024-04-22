import { Row } from 'antd'
import { ADMIN_ROUTER_PATH } from 'common/config'
import React from 'react'
import { AiOutlineRight } from 'react-icons/ai'
import history from 'utils/history'
import * as Styled from '../styled'

const CATALOG_LIST = [
  {
    name: 'Về chúng ta',
  },
  {
    name: 'Mô tả',
  },
  {
    name: 'Tài chính',
  },
  {
    name: 'Văn hoá doanh nghiệp',
  },
  {
    name: 'Điều kiện',
  },
  {
    name: 'Mẫu thu nhập',
  },
  {
    name: 'Phân chia nhóm',
  },
  {
    name: 'Chính sách cá nhân',
  },
]
const CatalogAboutUs: React.FC = () => {
  return (
    <Row
      gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
      style={{ marginTop: '1rem' }}
    >
      {CATALOG_LIST.map((item: any) => (
        <Styled.ItemCatalog
          xs={12}
          md={8}
          xl={6}
          onClick={() => {
            history.push(ADMIN_ROUTER_PATH.SUPPORT)
          }}
        >
          <div className="catalog-block">
            <div className="name-catalog">{item.name}</div>
            <div className="icon-catalog">
              <AiOutlineRight style={{ fontSize: '20px' }} />
            </div>
          </div>
        </Styled.ItemCatalog>
      ))}
    </Row>
  )
}
export default CatalogAboutUs
