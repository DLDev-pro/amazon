import { Row } from 'antd'
import styled from 'styled-components'

export const HeaderBlock = styled(Row)`
  color: white;
  @media only screen and (max-width: 768px) {
    .tool {
      display: none !important;
    }
  }
`

export const ItemBlock = styled.span`
  margin-left: 10px;
  font-weight: 600;
  display: flex;
  align-items: center;
  :hover {
    cursor: pointer;
  }
`

export const FooterBlock = styled(Row)`
  color: white;
  background-color: var(--primary-color);
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    :hover {
      cursor: pointer;
    }
    p {
      margin: 0.3rem 0;
    }
    .circle-item {
      aspect-ratio: 1 / 1;
      background-color: #febd69;
      border-radius: 50%;
      padding: 4px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  .main-footer {
    width: 100%;
    max-width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .menu-active {
    color: var(--second-color);
  }
  @media only screen and (max-width: 576px) {
    font-size: 12px;
  }
  .menu-active[id='order'] {
    color: var(--primary-color);
  }
`
