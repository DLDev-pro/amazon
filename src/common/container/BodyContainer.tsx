import { Layout } from 'antd'
import React from 'react'
import './style.css'

const { Content } = Layout

const BodyContainer: React.FC = ({ children }) => {
  return (
    <Content className="wrap-container" style={{}}>
      <div className="main-container">{children}</div>
    </Content>
  )
}

export default BodyContainer
