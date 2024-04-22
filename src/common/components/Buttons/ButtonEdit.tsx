import { Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'

type ButtonFixedProps = {
  onClickButton?: () => void
  text?: string
  icon?: any
  loading?: boolean
}

const ButtonEdit = ({ text, onClickButton, icon }: ButtonFixedProps) => {
  return (
    <Button
      style={{
        minWidth: '70px',
        fontWeight: 'bold',
        borderColor: '#8000FF',
        color: '#8000FF',
        borderRadius: '5px',
      }}
      onClick={() => {
        onClickButton && onClickButton()
      }}
    >
      {icon ? icon : <EditOutlined />}
      {text}
    </Button>
  )
}

export default ButtonEdit
