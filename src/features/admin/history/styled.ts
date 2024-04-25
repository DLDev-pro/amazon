import { Row, Col } from 'antd'
import styled from 'styled-components'

export const ContainerHistory = styled.div`
  margin: 1rem 0;
`
export const TopTitle = styled.div`
  padding: 12px;
  background-color: var(--background-color-1);
  .title {
    font-size: 20px;
  }
  span {
    font-size: 14px;
  }
`
export const ContainerTabs = styled.div`
  color: white;
  display: flex;
  justify-content: center;
`

export const HeaderTabs = styled(Row)`
  width: 100%;
  /* background-color: var(--primary-color); */
  padding: 6px 0;
  display: flex;
  justify-content: space-between;
  .title-tabs {
    font-size: 15px;
    font-weight: 700;
    text-align: center;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #c4a6a7;
  }
  .title-tabs.active {
    color: #ff3c61;
    font-weight: 600;
  }
`

export const Container = styled.div`
  height: 100%;
  padding: 1rem 0;
  margin-bottom: 80px;
`

export const Title = styled.span`
  font-size: 20px;
`

export const ColStyled = styled(Col)`
  font-size: 16px;
  padding: 0 0 16px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 600;

  @media only screen and (min-width: 768px) {
    border-radius: 12px;
  }
`

export const Empty = styled.div`
  text-align: center;
  width: 100%;
  margin-top: 1rem;
`

export const ItemWrapper = styled.div`
  background: white;
  padding: 5px 20px;
  box-shadow: rgb(17 17 26 / 10%) 0px 1px 0px, rgb(17 17 26 / 10%) 0px 8px 24px,
    rgb(17 17 26 / 10%) 0px 16px 48px;
  margin-bottom: 10px;
`

export const ContentTab = styled.div`
  padding: 1rem 0.5rem;
`

export const OrderBlock = styled(Col)`
  box-shadow: rgb(17 17 26 / 10%) 0px 1px 0px, rgb(17 17 26 / 10%) 0px 8px 24px,
    rgb(17 17 26 / 10%) 0px 16px 48px;
  padding: 10px;
  margin-bottom: 0.5rem;
  position: relative;
  font-weight: 600;
  cursor: pointer;
  .tag-status {
    position: absolute;
    right: -2px;
    top: -2px;
    width: 130px;
    height: 24px;
    border-bottom-left-radius: 20px;
    padding-left: 20px;
    color: white;
  }
  .inner-info {
    margin-top: 0.5rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .price-order {
      margin-left: 12px;
      display: flex;
      width: 100%;
      .price-block {
        width: 50%;
      }
    }
  }

  img {
    width: 100%;
    max-width: 80px;
  }
  .name-product {
    font-weight: 600;
    color: var(--primary-title);
  }
`
