import styled from 'styled-components'

export const WrapCardCenter = styled.div`
  width: '100%';
`

export const CardForm = styled.div`
  width: 500px;
  border-radius: 7px;
  padding: 15px;
  padding: 50px 15px 20px 15px;
  margin: 0 auto;

  @media only screen and (max-width: 500px) {
    width: 90vw;
  }

  span {
    font-size: 13px;
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
