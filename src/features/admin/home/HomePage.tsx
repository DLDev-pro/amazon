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
  return (
    <div>
      <SlickBanner />
      <QuickAction />
      <QuestHall levelList={data} currentLevelIndex={currentLevelIdx} />
      <CatalogAboutUs />
      <Styled.WrapUserIncomeList>
        <p>Động thái thu nhập hoa hồng người dùng</p>
        {incomeList.map((item: any) => (
          <Styled.UserIncomeList>
            <span>{item.name}</span>
            <span>{item.income}</span>
            <span>{item.date}</span>
          </Styled.UserIncomeList>
        ))}
      </Styled.WrapUserIncomeList>
    </div>
  )
}
export default HomePage
