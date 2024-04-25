import { Col, Row } from 'antd'
import styled from 'styled-components'

export const Container = styled.div`
  margin-bottom: 80px;
`
export const Title = styled.span`
  font-size: 16px;
  color: white;
  padding: 6px;
`

export const ContainerOption = styled(Row)`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`

export const OptionItem = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
`
export const OptionRankMember = styled(Col)`
  padding: 0;
  display: flex;
  justify-content: center;
  text-align: center;
`

export const OptionBlock = styled.div`
  cursor: pointer;
  text-align: center;
  padding: 12px 0 16px;
  margin: 6px;
  border-radius: 12px;
  box-shadow: rgb(17 17 26 / 10%) 0px 1px 0px, rgb(17 17 26 / 10%) 0px 8px 24px,
    rgb(17 17 26 / 10%) 0px 16px 48px;
  font-weight: 600;
  .title-rank {
    color: #a29d9d;
    line-height: 2rem;
    font-size: 13px;
    width: 100%;
    text-align: center;
  }
  .money {
    color: blue;
  }
  .content {
    font-size: 13px;
  }
`
