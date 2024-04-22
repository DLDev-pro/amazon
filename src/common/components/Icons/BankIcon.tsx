import Icon from '@ant-design/icons'

const IconSvg = () => (
  <svg
    viewBox="64 64 896 896"
    focusable="false"
    data-icon="bank"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M240.9 393.9h542.2L512 196.7z" fill="#e6f7ff"></path>
    <path
      d="M894 462c30.9 0 43.8-39.7 18.7-58L530.8 126.2a31.81 31.81 0 00-37.6 0L111.3 404c-25.1 18.2-12.2 58 18.8 58H192v374h-72c-4.4 0-8 3.6-8 8v52c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-52c0-4.4-3.6-8-8-8h-72V462h62zM381 836H264V462h117v374zm189 0H453V462h117v374zm190 0H642V462h118v374zM240.9 393.9L512 196.7l271.1 197.2H240.9z"
      fill="#1890ff"
    ></path>
  </svg>
)

const BankIcon = (props: any) => <Icon component={IconSvg} {...props} />
export default BankIcon
