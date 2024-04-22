import { Col, Row } from 'antd'
import styled from 'styled-components'

export const Container = styled.div`
  height: 100%;
  padding: 1rem 0;
`

export const Title = styled.span`
  font-size: 20px;
`

export const ColStyled = styled(Col)`
  font-size: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 600;
  span {
    color: #52c41a;
  }
  @media only screen and (min-width: 768px) {
    border-radius: 12px;
    box-shadow: rgb(17 17 26 / 10%) 0px 1px 0px,
      rgb(17 17 26 / 10%) 0px 8px 24px, rgb(17 17 26 / 10%) 0px 16px 48px;
  }
`

export const ContainerTabs = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`

export const HeaderTabs = styled(Row)`
  width: 80%;
  /* width: 100%; */
  background-color: var(--primary-color);
  padding: 12px;
  display: flex;
  justify-content: space-between;
  .title-tabs {
    text-align: center;
    cursor: pointer;
  }
  .title-tabs:active {
    color: var(--second-color);
  }
  .active {
    color: var(--second-color);
  }
`

export const Empty = styled.div`
  text-align: center;
  width: 100%;
  margin-top: 1rem;
`
