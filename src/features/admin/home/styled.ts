import { Button, Col } from 'antd'
import styled from 'styled-components'

export const WrapUserIncomeList = styled.div`
  margin-top: 1rem;
  color: rgba(0, 0, 0, 0.65);
`

export const UserIncomeList = styled.div`
  display: flex;
  justify-content: space-between;
  span {
    width: 30%;
    text-align: center;
    :nth-child(1) {
      width: 15%;
    }
    :nth-child(2) {
      width: 60%;
      color: var(--second-color);
    }
    :nth-child(3) {
      width: 15%;
    }
  }
`

export const ItemCatalog = styled(Col)`
  .catalog-block {
    border-radius: 12px;
    color: white;
    margin: 2px 0;
    :hover {
      cursor: pointer;
    }
  }
  .icon-catalog {
    display: flex;
    justify-content: flex-end;
  }
`
export const ActionBlock = styled(Col)`
  .main-action {
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 12px;
    padding: 12px;
    text-overflow: ellipsis;
    white-space: normal;
    text-align: center;
    font-size: 12px;
    overflow: hidden;
    cursor: pointer;
  }
`
export const WarpQuest = styled(Col)`
  padding: 12px;
  .main-quest {
    display: flex;
    position: relative;
    flex-direction: column;
    width: 100%;
    padding: 12px;
    border-radius: 12px;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px,
      rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px;
    .active {
      position: relative;
      .overlay {
        position: absolute;
        inset: 0;
        background-color: black;
        opacity: 0.5;
      }
      .text-overlay {
        position: absolute;
        inset: 0;
        color: white;
        background-color: transparent;
        font-weight: 700;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto 0;
      }
    }

    .rank-name {
      position: absolute;
      top: -10px;
      left: 0;
      max-width: 100%;
      width: 120px;
      padding: 0 5px;
      border-radius: 5px;
    }

    .platium img,
    .diamond img {
      border-radius: 10px;
    }
    .discount {
      padding-top: 20px;
      font-weight: 800;
      color: black;
    }
    .category-product {
      color: #8c8c8c;
      font-weight: 600;
      height: 12rem;
    }
    .image-quest {
      height: 80%;
    }
  }
`

export const WrapSlickBanner = styled(Col)`
  position: relative;
`

export const ArrowBlock = styled(Col)`
  position: absolute;
  z-index: 10;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 10px;
  .icon-arror {
    cursor: pointer;
  }
`

export const ButtonStyled = styled(Button)`
  margin-top: 0.5rem;
  color: white;
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  .ant-btn {
    padding: 12px !important;
  }
`
