import Icon from '@ant-design/icons'

const RubyIconSvg = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 3L3 10v12l13 7 13-7V10l-13-7z" fill="#A91401" />
    <path d="M16 3v24l13-7V10L16 3z" fill="#A61402" />
    <path d="M16 3L3 10l13 7 13-7-13-7z" fill="#A41201" />
    <path d="M16 27L3 20l13-7 13 7-13 7z" fill="#911" />
    <path d="M16 27v-7l-13-7v7l13 7z" fill="#911" />
    <path d="M16 13L3 20v-7l13-7z" fill="#A01000" />
  </svg>
)

const RubyIcon = (props: any) => <Icon component={RubyIconSvg} {...props} />
export default RubyIcon
