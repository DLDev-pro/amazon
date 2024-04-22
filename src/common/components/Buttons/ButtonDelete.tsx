import { Button, Popconfirm } from 'antd'
import { CloseCircleOutlined, LeftCircleOutlined } from '@ant-design/icons'

type ButtonFixedProps = {
  onConfirm: () => void
  onCancel?: () => void
  text?: string
  title: string
  icon?: any
  loading?: boolean
  okText?: any
  cancelText?: any
}

const ButtonDelete = ({
  text,
  icon,
  title,
  okText,
  cancelText,
  onConfirm,
  onCancel,
}: ButtonFixedProps) => {
  return (
    <Popconfirm
      placement="bottomLeft"
      title={title}
      onConfirm={() => {
        onConfirm && onConfirm()
      }}
      onCancel={() => {
        onCancel && onCancel()
      }}
      okText={
        okText ? (
          okText
        ) : (
          <span>
            <CloseCircleOutlined />
            &nbsp;Xóa
          </span>
        )
      }
      cancelText={
        cancelText ? (
          cancelText
        ) : (
          <span>
            <LeftCircleOutlined />
            &nbsp;Trở lại
          </span>
        )
      }
      okButtonProps={{
        type: 'ghost',
        danger: true,
      }}
      cancelButtonProps={{
        style: {
          minWidth: '70px',
          fontWeight: 'bold',
          borderColor: 'black',
          color: 'black',
          borderRadius: '5px',
        },
      }}
    >
      <Button
        style={{
          minWidth: '70px',
          fontWeight: 'bold',
          borderRadius: '5px',
        }}
        danger
      >
        {icon ? icon : <CloseCircleOutlined />}
        {text}
      </Button>
    </Popconfirm>
  )
}

export default ButtonDelete
