import { Button } from 'antd'
import { LoadingOutlined, PlusCircleOutlined } from '@ant-design/icons'

type ButtonFixedProps = {
  onClickButton?: () => void
  text?: string
  icon?: any
  loading?: boolean
  size?: any
}

const ButtonAdd = ({
  text,
  onClickButton,
  icon,
  loading,
  size,
}: ButtonFixedProps) => {
  return (
    <Button
      style={{
        borderRadius: '5px',
        minWidth: '70px',
        fontWeight: 'bold',
        borderColor: '#00abba',
        color: '#00abba',
      }}
      onClick={() => {
        onClickButton && onClickButton()
      }}
      size={size ? size : 'middle'}
    >
      {loading ? <LoadingOutlined /> : icon ? icon : <PlusCircleOutlined />}
      {text}
    </Button>
  )
}

export default ButtonAdd
