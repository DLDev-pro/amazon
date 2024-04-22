import { ShoppingCartOutlined } from '@ant-design/icons'
import { Button, Col, message, Modal, Row } from 'antd'
import R from 'assets'
import {
  AchievementsIcon,
  InfoIcon,
  LightBulbIcon,
  UserIcon,
} from 'common/components/Icons'
import BlueIconComp from 'common/components/Icons/BlueIconComp'
import { ADMIN_ROUTER_PATH } from 'common/config'
import { getUserInfoAction } from 'features/auth/AuthSlice'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/store/store'
import { getUserAnalytic } from 'services/api/CommonApi'
import { IsBlockCreateOrder } from 'utils/constants'
import history from 'utils/history'
import { formatPrice } from 'utils/ruleForm'
import {
  requestLevelCategory,
  requestLevelDetail,
  requestLevelList,
} from '../home/Api/LevelApi'
import * as Styled from './styled'

const styleIcon = { fontSize: '35px', color: 'white' }

const ProfilePage: React.FC = () => {
  const [data, setData] = useState<any>({})
  const [dataLevel, setDataLevel] = useState<any>({})
  const [showProduct, setShowProduct] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [detailProduct, setDetailProduct] = useState<any>({})
  const [analyticDetail, setAnalyticDetail] = useState<any>()
  const { userInfo } = useAppSelector(state => state.AuthReducer)
  let addressData: any = userInfo?.order_address
  const dispatch = useAppDispatch()
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const myParam = urlParams.get('key')
    if (myParam) {
      getLevelDetail(myParam)
    } else {
      getLevelList()
    }
    setTimeout(() => {
      setShowProduct(true)
    }, 4100)
  }, [])

  useEffect(() => {
    dispatch(getUserInfoAction())
  }, [])

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const myParam = urlParams.get('key')

    if (myParam) {
      getLevelCategory(myParam)
    } else {
      if (Object.keys(dataLevel).length) getLevelCategory(dataLevel.key)
    }
  }, [dataLevel])

  useEffect(() => {
    ;(async () => {
      const analyticData = await getUserAnalytic()
      setAnalyticDetail(analyticData.data)
    })()
  }, [])

  const getLevelList = async () => {
    try {
      const res = await requestLevelList()

      const ownLevel = userInfo?.level

      let currentLevelData = res.data.find((item: any) => item.key == ownLevel)
      currentLevelData = currentLevelData ? currentLevelData : res.data[0]

      setDataLevel(currentLevelData)
    } catch (error) {
      console.error('Exception ' + error)
    }
  }
  const getLevelDetail = async (myParam: any) => {
    try {
      const res = await requestLevelDetail(myParam)
      setDataLevel(res.data)
    } catch (error) {
      console.error('Exception ' + error)
    }
  }

  const getLevelCategory = async (myParam: any) => {
    try {
      const res = await requestLevelCategory(myParam)
      const category = res.data.map((item: any) => {
        return item.name
      })

      setData({ ...dataLevel, category })
    } catch (error) {
      console.error('Exception ' + error)
    }
  }

  // const buyProduct = async (key: any, productId: any) => {
  //   try {
  //     await requestAddOrder(key, productId)
  //     history.push(ADMIN_ROUTER_PATH.HISTORY)
  //   } catch (error) {
  //     console.error('Exception ' + error)
  //   }
  // }

  // const renderModal = () => {
  //   return (
  //     <Styled.ModalProduct
  //       title="Chi tiết sản phẩm"
  //       visible={showModal}
  //       footer={null}
  //       onCancel={() => {
  //         setShowModal(false)
  //       }}
  //     >
  //       <div className="wrap-product">
  //         <div className="name-product">{detailProduct.name}</div>
  //         <div className="img-product">
  //           <img
  //             src={getImageFromServer(detailProduct.image)}
  //             alt="product"
  //             crossOrigin="anonymous"
  //           />
  //         </div>
  //         <div className="price-product">
  //           <div className="price-block">
  //             <span>Giá tiền(đ):</span>
  //             <div style={{ color: 'var(--green-1)' }}>
  //               {formatPrice(detailProduct.price)}
  //             </div>
  //           </div>
  //           <div className="price-block">
  //             <span>Tiền nhận(đ):</span>
  //             <div style={{ color: 'var(--orange-1)' }}>
  //               {formatPrice(
  //                 (detailProduct.price * data.commission_percent) / 100
  //               )}
  //             </div>
  //           </div>
  //         </div>
  //         <Styled.BuyBtn
  //           icon={<ShoppingCartOutlined />}
  //           onClick={() => {
  //             buyProduct(data.key, detailProduct._id)
  //           }}
  //         >
  //           Mua hàng
  //         </Styled.BuyBtn>
  //       </div>
  //     </Styled.ModalProduct>
  //   )
  // }

  return (
    <div style={{ padding: '0 12px' }}>
      <Styled.WhiteBox style={{ marginTop: '2rem' }}>
        <Styled.Title>
          <BlueIconComp icon={<UserIcon style={styleIcon} />} />
          {data.name}
        </Styled.Title>
        <div style={{ padding: '0 12px' }}>
          <div style={{ marginTop: '1rem' }}>{data?.category?.join(' | ')}</div>
          <div style={{ fontWeight: 600, marginTop: '1rem' }}>
            Hoa hồng {data.commission_percent}%
          </div>

          <Styled.ImageBlock>
            <img alt="gif" src={R.images.img_countdown} />
          </Styled.ImageBlock>
          <Styled.NotificationBlock>
            Chưa khởi động khớp, vui lòng 10:00 - 23:00 tiến hành thao tác
          </Styled.NotificationBlock>
          {showProduct ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '1rem',
              }}
            >
              <Styled.StartBtn
                type="primary"
                size="large"
                onClick={() => {
                  if (!addressData) {
                    message.error('Vui lòng cập nhật địa chỉ trong "Tài khoản"')
                    return
                  }
                  if (
                    userInfo?.is_block_create_order ==
                    IsBlockCreateOrder.Blocked
                  ) {
                    message.error(
                      'Chúc mừng bạn đã trúng 1 đơn hàng thưởng may mắn. Vui lòng liên hệ CSKH để được hỗ trợ'
                    )
                    return
                  } else {
                    history.push({
                      pathname: ADMIN_ROUTER_PATH.BILL,
                      state: {
                        own_level: userInfo?.level,
                        first_level: dataLevel?.key,
                      },
                    })
                  }
                }}
              >
                Bắt đầu
              </Styled.StartBtn>
            </div>
          ) : (
            <></>
          )}
        </div>
      </Styled.WhiteBox>
      {/* {renderModal()} */}
      <Styled.WhiteBox style={{ marginTop: '1rem' }}>
        <Styled.Title>
          <BlueIconComp icon={<AchievementsIcon style={styleIcon} />} />
          Thành quả hôm nay
        </Styled.Title>
        <Row style={{ width: '100%' }}>
          <Styled.InfoBlock xs={24} md={12}>
            <p>Số dư tài khoản</p>
            <span>${formatPrice(analyticDetail?.balance)}</span>
          </Styled.InfoBlock>
          <Styled.InfoBlock xs={24} md={12}>
            <p>Số đơn săn được hôm nay</p>
            <span>{analyticDetail?.count_order_today} đơn</span>
          </Styled.InfoBlock>
          <Styled.InfoBlock xs={24} md={12}>
            <p>Hoa hồng hôm nay đã giành được</p>
            <span>${analyticDetail?.total_commission_today.toFixed(2)}</span>
          </Styled.InfoBlock>
          <Styled.InfoBlock xs={24} md={12}>
            <p>Số tiền đóng băng tài khoản</p>
            <span>${formatPrice(userInfo?.frozen_balance)}</span>
          </Styled.InfoBlock>
        </Row>
      </Styled.WhiteBox>
      <Styled.WhiteBox style={{ marginTop: '1rem' }}>
        <Styled.Title>
          <BlueIconComp icon={<LightBulbIcon style={styleIcon} />} />
          Giải mã
        </Styled.Title>
        <Styled.Note>
          Lưu ý: Nâng cấp gian hàng để nhận được nhiều đơn và có tỷ lệ hoa hồng
          cao hơn !
        </Styled.Note>
      </Styled.WhiteBox>
      <Styled.WhiteBox style={{ marginTop: '1rem' }}>
        <Styled.Title>
          <BlueIconComp icon={<InfoIcon style={styleIcon} />} />
          Hướng dẫn
        </Styled.Title>
        <Styled.Note>
          <div>
            1: Cấp bậc hội viên của bạn có thể được so khớp hằng ngày 60 đơn
            nhiệm vụ
          </div>
          <div>
            2: Nếu bạn không hoàn thành đơn hàng đóng băng bạn sẽ không thể tiếp
            tục nhiệm vụ trong ngày
          </div>
        </Styled.Note>
      </Styled.WhiteBox>
    </div>
  )
}
export default ProfilePage
