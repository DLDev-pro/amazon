import { Col, Image, Row, Typography } from 'antd'
import R from 'assets'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/store/store'
import { formatPrice } from 'utils/ruleForm'
import { requestLevelCategory, requestLevelList } from './Api/LevelApi'
import CatalogAboutUs from './components/CatalogAboutUs'
import QuestHall from './components/QuestHall'
import QuickAction from './components/QuickAction'
import SlickBanner from './components/SlickBanner'
import * as Styled from './styled'
import { t } from 'i18next'
import AboutPage from './About'

const { Title, Paragraph, Text } = Typography
const HomePage: React.FC = () => {
  const [incomeList, setIncomeList] = useState<any>([])
  const [levelList, setLevelList] = useState<any>([])
  const [currentLevelIdx, setCurrentLevelIdx] = useState<number>(0)
  const [data, setData] = useState<any>([])

  const { userInfo } = useAppSelector(state => state.AuthReducer)
  const dispatch = useAppDispatch()

  useEffect(() => {
    getLevelList()
    getRandomList()
    setInterval(() => {
      getRandomList()
    }, 5000)
  }, [])

  useEffect(() => {
    getLevelCategory()
  }, [levelList])

  const getLevelList = async () => {
    try {
      const resData = (await requestLevelList()).data
      const ownLevel = userInfo?.level

      const currentLevelData = resData.find((item: any) => item.key == ownLevel)
      let currentLvIdx =
        resData.indexOf(currentLevelData) == -1
          ? 0
          : resData.indexOf(currentLevelData)

      setLevelList([...resData])
      setCurrentLevelIdx(currentLvIdx)
    } catch (error) {
      console.error('Exception ' + error)
    }
  }

  const getLevelCategory = async () => {
    try {
      let full_data = [...levelList]
      levelList?.forEach(async (item: any, index: number) => {
        const res = await requestLevelCategory(item.key)
        full_data[index].category = res.data.map((item: any) => {
          return item.name
        })
      })

      setData(full_data)
    } catch (error) {
      console.error('Exception ' + error)
    }
  }

  const getRandomList = () => {
    let list_random = []
    for (var i = 0; i < 5; i++) {
      let text = randomIncome()
      list_random.push({
        name: text,
        income:
          t('profit_reward') +
          formatPrice(Math.floor(Math.random() * 9999) + 99),
        date: moment().format('MM-DD'),
      })
    }
    setIncomeList(list_random)
  }

  const randomIncome = () => {
    var number_first = '789'
    var possible = '0123456789'
    var text = ''
    text =
      0 +
      number_first.charAt(Math.floor(Math.random() * number_first.length)) +
      possible.charAt(Math.floor(Math.random() * possible.length)) +
      '*****' +
      possible.charAt(Math.floor(Math.random() * possible.length)) +
      possible.charAt(Math.floor(Math.random() * possible.length))
    return text
  }
  const [openPopup, setOpenPopup] = useState<boolean>(true)

  const PopupModal = () => {
    return (
      <div
        style={{
          backgroundColor: 'rgba(0,0,0,.5)',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 999,
        }}
      >
        <div
          style={{
            position: 'fixed',
            top: '12rem',
            left: '50%',
            transform: 'translateX(-50% )',
            width: '95%',
            margin: '0 auto',

            height: '25rem',
            zIndex: 999,
            background: `url(${R.images.bgModalHome}) 2rem no-repeat, -webkit-gradient(linear, left top, left bottom, from(#ffcc2c), color-stop(60%, #fff))`,
            backgroundClip: 'padding-box',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            outline: 0,
            pointerEvents: 'auto',
          }}
        >
          <span
            style={{
              position: 'fixed',
              top: '0',
              right: '0',
              height: '2rem',
              width: '2rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: 'bold',
              fontSize: '1.5rem',
              zIndex: 999,
            }}
            onClick={() => setOpenPopup(false)}
          >
            X
          </span>
          <div
            style={{
              position: 'absolute',
            }}
            role="document"
          >
            <div className="modal-content">
              <div
                style={{
                  alignItems: 'center',
                  borderBottom: '1px solid rgba(0,0,0,.125)',
                  borderTopLeftRadius: '0.3rem',
                  borderTopRightRadius: '0.3rem',
                  display: 'flex',
                  flexShrink: 0,
                  justifyContent: 'center',
                  padding: '1rem',
                }}
              >
                <img
                  src={R.images.modalleft}
                  style={{
                    width: '35px',
                  }}
                  alt=""
                />
                <img
                  src={R.images.thongbaodacbiet}
                  style={{
                    width: '200px',
                  }}
                  alt=""
                />
                <img
                  src={R.images.modalright}
                  style={{
                    width: '35px',
                  }}
                  alt=""
                />
              </div>
              <div
                //         background-color: #fff;
                //         border-radius: 15px;
                //         margin: 0 15px;
                //         font-size: 1.5rem;
                // line-height: 2rem;
                // padding: var(--bs-modal-padding);
                // position: relative;
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '15px',
                  margin: '0 15px',
                  fontSize: '14px',

                  padding: '1rem',
                  position: 'relative',
                }}
              >
                <h1
                  style={{
                    fontSize: '16px',
                  }}
                >
                  Aeon Group kính chào khách hàng!
                </h1>
                <p>
                  <span style={{ color: 'rgb(52, 152, 219)' }}>
                    Nâng cấp độc quyền:
                  </span>
                  Khu vực nâng cấp có thể tăng số lượng đơn hàng mỗi ngày, cấp
                  độ thành viên càng cao thì số lượng đơn hàng càng nhiều và hoa
                  hồng càng cao.
                </p>
                <br />
                <p>
                  <span style={{ color: 'rgb(52, 152, 219)' }}>
                    Lợi ích khi mời:
                  </span>{' '}
                  Bạn nhận được 0,1 - 0,5% hoa hồng đến từ đơn hàng của cộng tác
                  viên!
                </p>
                <br />

                <p>
                  <span style={{ color: 'rgb(52, 152, 219)' }}>Nhắc nhở:</span>{' '}
                  Đối với những người bạn lần đầu tiên rút tiền, vui lòng liên
                  hệ với bộ phận chăm sóc khách hàng.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div>
      {openPopup && <PopupModal />}
      <HeaderContainer />
      <SlickBanner />
      <QuickAction />
      <QuestHall levelList={data} currentLevelIndex={currentLevelIdx} />
      <CatalogAboutUs />
      <Styled.WrapUserIncomeList>
        <strong>{t('home_page.user_reward_status')}</strong>
        {incomeList.map((item: any) => (
          <Styled.UserIncomeList key={item.name}>
            <span>
              <strong>{item.name}</strong>
            </span>
            <span>
              <strong>{item.income}</strong>
            </span>
            <span
              style={{
                color: '#bbbbbb',
              }}
            >
              {item.date}
            </span>
          </Styled.UserIncomeList>
        ))}
      </Styled.WrapUserIncomeList>
    </div>
  )
}

const HeaderContainer = () => {
  const { userInfo } = useAppSelector(state => state.AuthReducer)
  if (userInfo === null) return <></>
  return (
    <Row
      gutter={5}
      style={{
        padding: '10px',
      }}
    >
      <Col span={12}>
        <Typography>
          <Title
            level={1}
            style={{
              marginBottom: 0,
            }}
          >
            {t('home_page.welcome')}
          </Title>
          <Paragraph>{t('home_page.welcome_desc')}</Paragraph>
        </Typography>
      </Col>
      <Col
        span={12}
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <div>
          <p>{userInfo.name}</p>
          <Text
            style={{
              background: '#ff5f3d',
              width: 'fit-content',
              padding: '0 5px',
              borderRadius: 999,
              display: 'inline-block',
            }}
          >
            ${userInfo.balance}
          </Text>
        </div>
        {userInfo.avatar !== null && (
          <Image
            width={60}
            height={60}
            style={{ borderRadius: '50%', objectFit: 'cover' }}
            src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg"
          />
        )}
        {userInfo.avatar === null && (
          <Image
            width={60}
            height={60}
            style={{ borderRadius: '50%' }}
            src={R.images.unknown_avatar}
          />
        )}
      </Col>
    </Row>
  )
}

export default HomePage
