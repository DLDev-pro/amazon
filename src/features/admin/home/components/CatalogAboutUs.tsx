import { Row } from 'antd'
import R from 'assets'
import { ADMIN_ROUTER_PATH } from 'common/config'
import React from 'react'
import history from 'utils/history'
import * as Styled from '../styled'

const CATALOG_LIST = [
  { banner: R.images.vechungta, url: ADMIN_ROUTER_PATH.ABOUT_US },
  { banner: R.images.mota, url: ADMIN_ROUTER_PATH.DESCRIPTION_MEMBER },
  { banner: R.images.taichinh, url: ADMIN_ROUTER_PATH.FINANCIAL_PRINCIPLES },
  {
    banner: R.images.vanhoadoanhnghiep,
    url: ADMIN_ROUTER_PATH.COMPANY_CULTURE,
  },
  { banner: R.images.dieukien, url: ADMIN_ROUTER_PATH.TERM },
  { banner: R.images.mauthuthap, url: ADMIN_ROUTER_PATH.BUSINESS_SIMULATION },
  { banner: R.images.phanchianhom, url: ADMIN_ROUTER_PATH.TEAM_DISTRIBUTION },
  { banner: R.images.chinhsachcanhan, url: ADMIN_ROUTER_PATH.PRIVACY_POLICY },
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
            history.push(item.url)
          }}
          key={item}
        >
          <div className="catalog-block">
            <img src={item.banner} alt="" />
          </div>
        </Styled.ItemCatalog>
      ))}
    </Row>
  )
}
export default CatalogAboutUs
