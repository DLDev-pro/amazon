import { message, Row } from 'antd'
import R from 'assets'
import { ADMIN_ROUTER_PATH } from 'common/config'
import { getUserInfoAction } from 'features/auth/AuthSlice'
import moment from 'moment'
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
import { t } from 'i18next'

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
    getRandom()
    setInterval(() => {
      getRandom()
    }, 5000)
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

  console.log(analyticDetail)
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
  const [income, setIncome] = useState<any>([])

  const getRandom = () => {
    const text = randomIncome()
    const random_come = {
      phone: text,

      date: moment().format('h:mm:ss A'),
    }
    setIncome(random_come)
  }
  const randomIncome = () => {
    // 0123***2345
    var phone = '0'
    //make random phone number
    var possible = '0123456789'
    for (var i = 1; i < 10; i++) {
      if (i >= 3 && i <= 5) {
        phone += '*'
      } else {
        phone += possible.charAt(Math.floor(Math.random() * possible.length))
      }
    }
    return phone
    // phone =
    //     +
    //   possible.charAt(Math.floor(Math.random() * possible.length)) +
    //   '*****' +
    //   possible.charAt(Math.floor(Math.random() * possible.length)) +
    //   possible.charAt(Math.floor(Math.random() * possible.length))
    // return text
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
      <br />
      <br />
      <Styled.WhiteBox style={{ marginTop: '2rem' }}>
        {/* <Styled.Title>
          <BlueIconComp icon={<UserIcon style={styleIcon} />} />
          {data.name}
        </Styled.Title> */}
        <img
          style={{
            //     position: absolute;
            // top: -10px;
            // left: 0;
            // max-width: 100%;
            // width: 120px;
            // padding: 0 5px;
            // border-radius: 5px;
            position: 'absolute',
            top: '-10px',
            left: 0,
            maxWidth: '100%',
            width: '120px',
            padding: '0 5px',
            borderRadius: '5px',
          }}
          src={
            data.price === 5000000
              ? R.images.tvbac
              : data.price === 25000000
              ? R.images.tvvang
              : data.price === 75000000
              ? R.images.tvbachkim
              : R.images.tvKimcuong
          }
          alt=""
        />
        <div
          style={{
            padding: '0 12px',
            textAlign: 'center',
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          <div style={{ marginTop: '1rem' }}>{data?.category?.join(' | ')}</div>
          <div style={{ fontWeight: 600 }}>
            {t('home_page.profit')}
            {data.commission_percent}%
          </div>

          <Styled.ImageBlock>
            <img
              alt="gif"
              src={R.images.banner1}
              style={{
                maxWidth: '100%',
                height: '11rem',
                borderRadius: '14px',
              }}
            />
          </Styled.ImageBlock>
          <Styled.NotificationBlock>
            <span style={{ fontSize: 14 }}>
              <strong>{income.phone}</strong>
            </span>
            <span
              style={{
                color: 'orange',
                padding: '0 5px',
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              {t('order_page.matching_orders')}
            </span>
            <span
              style={{
                color: '#bbbbbb',
              }}
            >
              {income.date}
            </span>
          </Styled.NotificationBlock>
          {showProduct ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '1rem',
              }}
            >
              <div
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
                <img
                  src={R.images.start}
                  alt=""
                  style={{
                    cursor: 'pointer',
                    height: '67px',
                    width: '180px',
                  }}
                />
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </Styled.WhiteBox>
      <h1
        style={{
          fontSize: '18.75px',
          textAlign: 'center',
          width: '100%',
          fontWeight: 600,
          margin: '0.5rem 0',
        }}
      >
        {t('order_page.analytic_detail')}
      </h1>
      {/* {renderModal()} */}
      <Styled.WhiteBox style={{ display: 'flex', textAlign: 'center' }}>
        <Row style={{ width: '100%' }}>
          <Styled.InfoBlock xs={12} md={12}>
            <p>{t('order_page.balance')}</p>
            <span>${formatPrice(analyticDetail?.balance)}</span>
          </Styled.InfoBlock>
          <Styled.InfoBlock xs={12} md={12}>
            <p>{t('order_page.num_completed_orders')}</p>
            <span>{analyticDetail?.count_order_today}/80</span>
          </Styled.InfoBlock>
          <Styled.InfoBlock xs={12} md={12}>
            <p>{t('order_page.reward_today')}</p>
            <span>${analyticDetail?.total_commission_today.toFixed(2)}</span>
          </Styled.InfoBlock>
          <Styled.InfoBlock xs={12} md={12}>
            <p>{t('order_page.frozen_balance')} </p>
            <span>${formatPrice(userInfo?.frozen_balance)}</span>
          </Styled.InfoBlock>
        </Row>
      </Styled.WhiteBox>
      <Styled.WhiteBox style={{ marginTop: '1rem', textAlign: 'center' }}>
        {/* bg-[#2f3848] px-4 py-2 rounded-xl text-[#f2d8be] text-xl w-[30%] flex items-center justify-center mb-4 */}
        <Styled.Title
          style={{
            backgroundColor: '#2f3848',
            borderRadius: 8,
            padding: '4px 0',
            color: '#f2d8be',
            fontSize: '14px',
            width: 108,
            margin: '0 auto',
          }}
        >
          {t('order_page.explain')}
        </Styled.Title>
        <Styled.Note>{t('order_page.explain_desc')}</Styled.Note>
      </Styled.WhiteBox>
      <Styled.WhiteBox style={{ marginTop: '1rem' }}>
        <Styled.Title
          style={{
            position: 'absolute',
            top: '-10px',
            left: 15,
            maxWidth: '100%',
            width: '100px',
            padding: '5px',
            color: 'white',
            fontSize: '12px',
            borderRadius: '5px',
            background: `linear-gradient(209deg, #ffcc2c, #ff9a2c)`,
          }}
        >
          {t('order_page.instructions')}
        </Styled.Title>
        <Styled.Note
          style={{
            fontSize: '12px',
            lineHeight: '24px',
          }}
        >
          <div>{t('order_page.instructions_1')}</div>
          <div>{t('order_page.instructions_2')}</div>
        </Styled.Note>
      </Styled.WhiteBox>
    </div>
  )
}
export default ProfilePage
