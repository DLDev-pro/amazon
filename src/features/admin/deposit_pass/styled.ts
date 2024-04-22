import styled from 'styled-components'

export const WrapCardCenter = styled.div`
  width: '100%';
  height: calc(100vh - var(--header-height) - var(--footer-height));
  position: 'relative';
`

export const CardForm = styled.div`
  width: 500px;
  border-radius: 7px;
  background: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  box-shadow: rgb(17 17 26 / 10%) 0px 1px 0px, rgb(17 17 26 / 10%) 0px 8px 24px,
    rgb(17 17 26 / 10%) 0px 16px 48px;
  padding: 15px;

  @media only screen and (max-width: 500px) {
    width: 90vw;
  }

  span {
    font-size: 18px;
    font-weight: 600;
  }
  .ant-input__wrapper {
    display: flex;
    border: 0.5px solid rgb(217, 217, 217);
    padding: 5px 10px;
    align-items: center;
    border-radius: 7px;
  }
  .ant-input__prefix {
    font-size: 14px;
    font-weight: 400;
  }
  .ant-input__suffix {
    font-size: 14px;
    font-weight: 400;
  }
  .ant-input__money-custom {
    border: none;
  }
  .ant-input__label {
    font-size: 16px;
    font-weight: 400;
    margin: 5px 0;
  }
  .warning-text {
    font-size: 14px;
    color: red;
  }
`
