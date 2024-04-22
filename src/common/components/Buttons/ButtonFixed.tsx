import { Button } from 'antd'

type ButtonFixedProps = {
  onClickButton?: () => void
  style?: any
  text?: string
  icon?: any
  loading?: boolean
}

const ButtonFixed = ({
  text,
  onClickButton,
  icon,
  style,
}: ButtonFixedProps) => {
  return (
    <Button
      style={style}
      onClick={() => {
        onClickButton && onClickButton()
      }}
    >
      {icon}
      {text}
    </Button>
  )
}

export default ButtonFixed
