import { Row } from 'antd'
import React from 'react'
import QuestComp from './QuestComp'

type Props = {
  levelList: any
  currentLevelIndex: number
}
const QuestHall: React.FC<Props> = ({ levelList, currentLevelIndex }) => {
  return (
    <div style={{ marginTop: '1rem' }}>
      <span style={{ fontSize: '16px' }}>Sảnh nhiệm vụ</span>
      <Row style={{ marginTop: '1rem' }}>
        {levelList?.map((item: any, index: number) => {
          const isValid = index <= currentLevelIndex
          const isUpgradeable = index == currentLevelIndex + 1
          const isInvalid = index > currentLevelIndex && !isUpgradeable

          return <QuestComp data={item} key={item.key} isValid={isValid} />
        })}
      </Row>
    </div>
  )
}
export default QuestHall
