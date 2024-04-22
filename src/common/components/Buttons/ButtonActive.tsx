import { Button, Popconfirm } from 'antd'
import {
  CheckCircleOutlined,
  LeftCircleOutlined,
  LoadingOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons'

type ButtonFixedProps = {
  onConfirm?: () => void
  onCancel?: () => void
  isActive: number | boolean
  loading?: boolean
  title: string
  okText?: any
  cancelText?: any
}

const ButtonActive = ({
  isActive,
  onConfirm,
  onCancel,
  loading,
  title,
  okText,
  cancelText,
}: ButtonFixedProps) => {
  return (
    <Popconfirm
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
            <CheckCircleOutlined />
            &nbsp;Đồng ý
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
        style: {
          borderRadius: '5px',
          minWidth: '70px',
          fontWeight: 'bold',
          borderColor: '#50C78F',
          color: '#50C78F',
        },
      }}
      cancelButtonProps={{
        style: {
          borderRadius: '5px',
          minWidth: '70px',
          fontWeight: 'bold',
          borderColor: 'black',
          color: 'black',
        },
      }}
    >
      <Button
        style={
          isActive
            ? {
                minWidth: '70px',
                fontWeight: 'bold',
                borderColor: '#FE9A2E',
                color: '#FE9A2E',
                borderRadius: '5px',
              }
            : {
                minWidth: '70px',
                fontWeight: 'bold',
                borderColor: '#2e9436',
                color: '#2e9436',
                borderRadius: '5px',
              }
        }
        // onClick={() => {
        //   onClickButton && onClickButton()
        // }}
        loading={loading}
      >
        {loading ? (
          <LoadingOutlined />
        ) : isActive ? (
          <PauseCircleOutlined />
        ) : (
          <PlayCircleOutlined />
        )}

        {isActive ? 'Ngừng hoạt động' : 'Hoạt động'}
      </Button>
    </Popconfirm>
  )
}

export default ButtonActive
