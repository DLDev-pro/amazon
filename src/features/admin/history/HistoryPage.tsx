import { Col } from 'antd'
import { ADMIN_ROUTER_PATH } from 'common/config'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { getImageFromServer } from 'utils/funcHelper'
import history from 'utils/history'
import { formatPrice } from 'utils/ruleForm'
import { requestHistory } from './api/ApiHistory'
import * as Styled from './styled'
import { t } from 'i18next'
import R from 'assets'

const HistoryPage: React.FC = () => {
  const [listOrder, setlistOrder] = useState<any>([])
  const [orderBlock, setOrderBlock] = useState<any>()

  const [params, setParams] = useState<any>({
    status: undefined,
    limit: 1000,
  })

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const myParam = urlParams.get('status')
    if (myParam) {
      setParams({ ...params, status: myParam })
    } else {
      setParams({ ...params, status: undefined })
    }
  }, [window.location.search])

  useEffect(() => {
    getHistoryList()
  }, [params])

  const getHistoryList = async () => {
    let dataOrderBlock: Array<any> = []
    try {
      const res = await requestHistory(params)
      const convertData = res.data?.map((item: any) => ({
        id: item?._id,
        image_url: item.product?.image,
        name_product: item.product?.name,
        price_product: item.meta?.value,
        commission: item.meta?.commission,
        status: item.status,
        is_block_create_order: item?.user?.is_block_create_order,
      }))

      if (params.status == 'Processing') {
        Cookies.set('block_order', JSON.stringify(convertData[0]))
      }
      if (params.status == 'Frozen') {
        let item: any = await Cookies.get('block_order')
        item = JSON.parse(item)
        if (item?.is_block_create_order == 0) {
          dataOrderBlock = [JSON.parse(item)]
          return
        }
      }
      setlistOrder(dataOrderBlock?.length ? dataOrderBlock : convertData)
    } catch (error) {
      console.error('Exception ' + error)
    }
  }

  const getColorForTagStatus = (status: string) => {
    switch (status) {
      case 'Processi-ng':
        return { color: 'var(--orange-1)', text: t('history_page.pending') }
      case 'Success':
        return { color: 'var(--green-1)', text: t('history_page.completed') }
      case 'Frozen':
        return { color: 'var(--blue-1)', text: t('history_page.frozen') }
      default:
        return { color: 'var(--orange-1)', text: t('history_page.pending') }
    }
  }

  return (
    <Styled.ContainerHistory>
      <Styled.ContainerTabs>
        <Styled.HeaderTabs>
          <Col
            span={6}
            className={`title-tabs ${!params.status ? 'active' : ''}`}
            onClick={() => {
              history.push({
                pathname: ADMIN_ROUTER_PATH.HISTORY,
              })
            }}
          >
            {t('history_page.all')}
          </Col>
          <Col
            span={6}
            className={`title-tabs ${params.status === 'Processing' ? 'active' : ''
              }`}
            onClick={() => {
              history.push({
                pathname: ADMIN_ROUTER_PATH.HISTORY,
                search: '?status=Processing',
              })
            }}
          >
            {t('history_page.processing')}
          </Col>

          <Col
            span={6}
            className={`title-tabs ${params.status === 'Success' ? 'active' : ''
              }`}
            onClick={() => {
              history.push({
                pathname: ADMIN_ROUTER_PATH.HISTORY,
                search: '?status=Success',
              })
            }}
          >
            {t('history_page.success')}
          </Col>
          <Col
            span={6}
            className={`title-tabs ${params.status === 'Frozen' ? 'active' : ''
              }`}
            onClick={() => {
              history.push({
                pathname: ADMIN_ROUTER_PATH.HISTORY,
                search: '?status=Frozen',
              })
            }}
          >
            {t('history_page.fail')}
          </Col>
        </Styled.HeaderTabs>
      </Styled.ContainerTabs>
      <hr
        style={{
          color: 'var(--primary-color)',
          backgroundColor: 'var(--primary-color)',

          height: '0.5px',
          width: '95%',
          margin: '0 auto',
          border: 'none',
        }}
      />

      <Styled.ContentTab>
        {listOrder?.map((item: any) => {
          console.log('item', item)
          let nameProduct = item.name_product
          if (item.name_product.length > 50) {
            nameProduct = item.name_product.slice(0, 45) + '...'
          }
          return (
            <Styled.OrderBlock
              key={item.id}
              style={{
                borderRadius: '10px',
                color: 'white',
                backgroundImage: 'linear-gradient(to right, #65affe, #17c8fc)',
              }}
              onClick={() => {
                if (item.status === 'Processing')
                  history.push({
                    pathname: ADMIN_ROUTER_PATH.DETAIL_ORDER,
                    state: item,
                  })
              }}
            >
              <div
                className="tag-status"
                style={{
                  backgroundColor: getColorForTagStatus(item.status).color,
                }}
              >
                {getColorForTagStatus(item.status).text}
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <img
                  src={R.images.logo_web}
                  style={{
                    width: '50px',
                  }}
                  alt=""
                />
                Từ Aeon Group
              </div>
              <div className="name-product">{nameProduct}</div>
              <div className="inner-info">
                <img
                  alt="product"
                  src={getImageFromServer(item.image_url)}
                  // src={R.images.logo_web}
                  crossOrigin="anonymous"
                />
                <div className="price-order">
                  <div className="price-block">
                    <div
                      style={{
                        fontSize: '12px',
                      }}
                    >
                      Giá trị đơn hàng
                    </div>
                    <div style={{ color: 'var(--green-1)', fontSize: 18 }}>
                      {formatPrice(item.price_product)}
                    </div>
                  </div>
                  <div className="price-block">
                    <div
                      style={{
                        fontSize: '12px',
                      }}
                    >
                      Lợi nhuận
                    </div>
                    <div style={{ color: 'var(--orange-1)', fontSize: 18 }}>
                      {formatPrice(item.commission)}
                    </div>
                  </div>
                </div>
              </div>
            </Styled.OrderBlock>
          )
        })}
      </Styled.ContentTab>
    </Styled.ContainerHistory>
  )
}

export default HistoryPage
