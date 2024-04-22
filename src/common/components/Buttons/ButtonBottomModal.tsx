import { Row, Col, Button } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'

type ButtonBottomModalProps = {
  isLoadingButton?: boolean
  onCancel: any
  text?: string
  icon?: any
}

const ButtonBottomModal = ({
  isLoadingButton,
  onCancel,
  text,
  icon,
}: ButtonBottomModalProps) => {
  return (
    <Row gutter={16} justify="end">
      <Col>
        <Button
          style={{ fontWeight: 800, borderRadius: '5px', height: '35px' }}
          danger
          onClick={() => {
            // form.resetFields()
            onCancel()
          }}
        >
          <CloseCircleOutlined />
          Huỷ
        </Button>
      </Col>
      <Col>
        <Button
          // type="primary"
          loading={isLoadingButton}
          htmlType="submit"
          style={{
            fontWeight: 'bold',
            // borderRadius: '5px',
            // backgroundColor: '#00abba',
            borderColor: '#00abba',
            color: '#00abba',
            height: '35px',
            borderRadius: '5px',
          }}
        >
          {icon ? icon : <CheckCircleOutlined />}
          {text}
        </Button>
      </Col>
    </Row>
  )
}

export default ButtonBottomModal
