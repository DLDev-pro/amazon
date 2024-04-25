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
          'Hoa hồng thu nhập $' +
          formatPrice(Math.floor(Math.random() * 9999) + 99),
        date: moment().format('MM-DD'),
      })
    }
    setIncomeList(list_random)
  }

  const randomIncome = () => {
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    var text = ''
    text =
      possible.charAt(Math.floor(Math.random() * possible.length)) +
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
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '10rem',
          height: '10rem',
          backgroundColor: 'rgba(0,0,0)',
          zIndex: 999,
        }}
      >
        <span
          style={{
            position: 'fixed',
            top: '-5%',
            right: '-5%',
            height: '2rem',
            width: '2rem',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bold',
            borderRadius: '50%',
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
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
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
        <strong>Động thái thu nhập hoa hồng người dùng</strong>
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
      gutter={20}
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
            Hello
          </Title>
          <Paragraph>
            Hãy để Amonzon Group khởi đầu con đường làm giàu của bạn
          </Paragraph>
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
              width: 100,
              padding: '0 5px',
              borderRadius: 999,
              display: 'inline-block',
            }}
          >
            $ {userInfo.balance}
          </Text>
        </div>
        {userInfo.avatar !== null && (
          <Image
            width={60}
            height={60}
            style={{ borderRadius: '50%' }}
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
