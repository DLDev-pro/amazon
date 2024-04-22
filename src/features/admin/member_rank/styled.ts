import { Col, Row } from 'antd'
import styled from 'styled-components'

export const Container = styled.div`
  padding: 1rem;
  margin-bottom: 80px;
`
export const Title = styled.span`
  font-size: 20px;
`

export const ContainerOption = styled(Row)`
  width: 70%;
  padding: 12px;
`

export const OptionItem = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const OptionRankMember = styled(Col)`
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
`

export const OptionBlock = styled.div`
  cursor: pointer;
  width: 80%;
  padding: 12px;
  border-radius: 12px;
  box-shadow: rgb(17 17 26 / 10%) 0px 1px 0px, rgb(17 17 26 / 10%) 0px 8px 24px,
    rgb(17 17 26 / 10%) 0px 16px 48px;
  font-weight: 600;
  .title-rank {
    font-size: 16px;
  }
  .money {
    color: #52c41a;
  }
  .content {
    margin-top: 1rem;
  }
`
