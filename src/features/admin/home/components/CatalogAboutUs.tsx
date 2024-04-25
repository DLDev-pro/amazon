import { Row } from 'antd'
import R from 'assets'
import { ADMIN_ROUTER_PATH } from 'common/config'
import React from 'react'
import history from 'utils/history'
import * as Styled from '../styled'

const CATALOG_LIST = [
  R.images.vechungta,
  R.images.mota,
  R.images.taichinh,
  R.images.vanhoadoanhnghiep,
  R.images.dieukien,
  R.images.mauthuthap,
  R.images.phanchianhom,
  R.images.chinhsachcanhan,
]

const CatalogAboutUs: React.FC = () => {
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      {CATALOG_LIST.map((item: any) => (
        <Styled.ItemCatalog
          xs={6}
          md={8}
          xl={6}
          onClick={() => {
            history.push(ADMIN_ROUTER_PATH.SUPPORT)
          }}
          key={item}
        >
          <div className="catalog-block">
            <img src={item} alt="" />
          </div>
        </Styled.ItemCatalog>
      ))}
    </Row>
  )
}
export default CatalogAboutUs
