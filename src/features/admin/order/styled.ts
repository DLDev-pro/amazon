import { Button, Col, Modal } from 'antd'
import styled from 'styled-components'

export const WhiteBox = styled.div`
  padding: 12px;
  box-shadow: rgb(17 17 26 / 10%) 0px 1px 0px, rgb(17 17 26 / 10%) 0px 8px 24px,
    rgb(17 17 26 / 10%) 0px 16px 48px;
  border-radius: 12px;
`

export const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
  display: flex;
  align-items: center;
`

export const ImageBlock = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  max-height: 450px;
  img {
    max-width: 100%;
  }
`

export const InfoBlock = styled(Col)`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  span {
    font-weight: 700;
    color: var(--second-color);
  }
`

export const NotificationBlock = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
`

export const Note = styled.div`
  margin-top: 1rem;
`
export const ProductBlock = styled(Col)`
  padding: 1rem;

  .wrap-product {
    padding: 1rem;
    box-shadow: 0 20px 27px rgb(0 0 0 / 5%);
    background-color: var(--background-color-1);
  }
  .name-product {
    color: var(--primary-title);
    font-weight: 600;
  }
  .img-product {
    margin-top: 1rem;
  }
  .price-product {
    margin-top: 1rem;
    font-weight: 600;
  }
  img {
    object-fit: cover;
    width: 100%;
    height: 200px;
  }
`
export const BuyBtn = styled(Button)`
  width: 100%;
  background-color: var(--second-color);
  border-color: var(--second-color);
  margin-top: 1rem;
  font-weight: 600;
  color: white;
  :hover {
    color: var(--primary-color);
    background-color: var(--second-color);
    border-color: var(--second-color);
  }
`

export const ModalProduct = styled(Modal)`
  .ant-modal-body {
    padding: 0;
  }
  .wrap-product {
    padding: 1rem;
    box-shadow: 0 20px 27px rgb(0 0 0 / 5%);
    background-color: var(--background-color-1);
  }
  .name-product {
    color: var(--primary-title);
    font-weight: 600;
  }
  .img-product {
    margin-top: 1rem;
  }
  .price-product {
    margin-top: 1rem;
    font-weight: 600;
    .price-block {
      display: flex;
      span {
        margin-right: 8px;
      }
    }
  }
  img {
    object-fit: cover;
    width: 100%;
  }
`

export const WrapContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`

export const Container = styled.div`
  max-width: 600px;
  width: 100%;
  padding: 0.5rem;
  .title {
    text-align: center;
    font-size: 18px;
    color: var(--orange-1);
    font-weight: 500;
    margin-top: 1rem;
  }
  .img-product {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    img {
      width: 100%;
      max-width: 100px;
    }
  }
  .value-order {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    color: var(--green-1);
    span {
      color: var(--orange-1);
    }
  }
  .cancel-btn {
    text-align: center;
    margin-top: 1rem;
    text-decoration: underline;
    color: #bdbdbd;
    cursor: pointer;
  }
`
export const SendBtn = styled(Button)`
  margin-top: 1rem;
  width: 100%;
  border-radius: 20px;
  color: white;
  font-weight: 600;
  font-size: 20px;
  height: auto;
  background: linear-gradient(
    36deg,
    rgba(63, 148, 230, 1) 0%,
    rgba(59, 159, 203, 1) 36%,
    rgba(0, 212, 255, 1) 88%
  );
  :hover {
    border: none;
    color: white;
    background: linear-gradient(
      36deg,
      rgba(63, 148, 230, 1) 0%,
      rgba(59, 159, 203, 1) 36%,
      rgba(0, 212, 255, 1) 88%
    );
  }
`

export const StartBtn = styled(Button)`
  font-size: 20px;
  border-radius: 10px;
  font-weight: 500;
`
export const BillContainer = styled.div`
  max-width: 800px;
  width: 100%;
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 12px;
  box-shadow: rgb(17 17 26 / 10%) 0px 1px 0px, rgb(17 17 26 / 10%) 0px 8px 24px,
    rgb(17 17 26 / 10%) 0px 16px 48px;
  .info {
    margin-top: 1rem;
    font-size: 18px;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
  }
  .content {
    color: var(--orange-1);
  }
  @media only screen and (max-width: 576px) {
    margin-top: 0px;
    border-radius: 0px;
  }
`
