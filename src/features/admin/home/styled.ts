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
  height: 4rem;
  padding: 8px 10px;
  margin-bottom: 12px;
  .catalog-block {
    padding: 8px;
    background-image: linear-gradient(
      90deg,
      #32c3c2 0%,
      #2a84c5 45%,
      #0c52d1 100%
    );
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    border-radius: 12px;
    color: white;
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
    white-space: nowrap;
    overflow: hidden;
    cursor: pointer;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px,
      rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px;
  }
`
export const WarpQuest = styled(Col)`
  padding: 12px;
  .main-quest {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 12px;
    border-radius: 12px;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px,
      rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px;
    .rank-name {
      font-weight: 700;
    }
    .discount {
      font-weight: 700;
      color: #52c41a;
    }
    .category-product {
      color: #8c8c8c;
      font-weight: 600;
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
