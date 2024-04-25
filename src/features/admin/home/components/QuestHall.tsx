import { Col, Row } from 'antd'
import React from 'react'
import QuestComp from './QuestComp'

type Props = {
  levelList: any
  currentLevelIndex: number
}
const QuestHall: React.FC<Props> = ({ levelList, currentLevelIndex }) => {
  return (
    <div style={{ marginTop: '1rem' }}>
      <span
        style={{
          fontSize: '18px',
          fontWeight: 700,
        }}
      >
        Sảnh nhiệm vụ
      </span>
      <Row style={{ marginTop: '1rem' }}>
        {levelList?.map((item: any, index: number) => {
          const isValid = index <= currentLevelIndex
          const isUpgradeable = index == currentLevelIndex + 1
          const isInvalid = index > currentLevelIndex && !isUpgradeable

          return (
            <Col key={index} xs={12} lg={12}>
              <QuestComp data={item} key={item.key} isValid={isValid} />
            </Col>
          )
        })}
      </Row>
    </div>
  )
}
export default QuestHall
