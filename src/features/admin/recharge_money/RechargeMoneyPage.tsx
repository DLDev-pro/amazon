import PageTitle from 'common/components/PageTitle'
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Form, Input, Image, Row, Col, InputNumber } from 'antd'
import * as Styled from './styled'
import { getListLevel, getListMethod } from 'services/api/CommonApi'
import { AiFillBank } from 'react-icons/ai'
import history from 'utils/history'
import { ADMIN_ROUTER_PATH } from 'common/config'
import { requestConductTransaction } from 'services/api/TransactionApi'
import { TRANSACTION_TYPE } from 'utils/constants'
import { useQuery } from 'hook/useQuery'
import { formatPrice } from 'utils/ruleForm'
import R from 'assets'

const RechargeMoneyPage: React.FC = () => {
  const query = useQuery()
  const levelKey = query.get('level')

  const [listMethod, setListMethod] = useState<Array<any>>([])
  const [selectedLevel, setSelectedLevel] = useState<any>()
  const [methodSelected, setMethodSelected] = useState<any>({
    method: null,
    index: 0,
  })

  const getData = async () => {
    if (levelKey) {
      const levelData = (await getListLevel()).data
      const selectedLevelData = levelData.find(
        (item: any) => item.key == levelKey
      )

      setSelectedLevel(selectedLevelData)
    }

    const methodData = (await getListMethod()).data
    let parseMethodData = methodData
    if (!levelKey) {
      parseMethodData = methodData.filter(
        (method: any) => method.method_name != 'OwnerBalance'
      )
    }

    setListMethod(parseMethodData)
    setMethodSelected({ method: parseMethodData[0].method_name, index: 0 })
  }

  const onFinish = async (values: any) => {
    let payload = levelKey
      ? {
          type: TRANSACTION_TYPE.PURCHASE_LEVEL,
          method: methodSelected.method,
          level: levelKey,
        }
      : {
          type: TRANSACTION_TYPE.TOPUP,
          method: methodSelected.method,
          amount: values.amount,
        }

    const transactionData = (await requestConductTransaction(payload)).data

    if (methodSelected.method == 'OwnerBalance') {
      history.replace(ADMIN_ROUTER_PATH.HISTORY_TRANSACTION)
    } else {
      history.push(`${ADMIN_ROUTER_PATH.PAYMENT}?id=${transactionData._id}`)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const renderMethodItem = useCallback(
    (item: any, index) => {
      const isOwnerBalance = item.method_name == 'OwnerBalance'
      const bankName = isOwnerBalance
        ? 'Thanh toán bằng số dư'
        : item.bank_name
        ? item.bank_name
        : 'Đang cập nhật'
      const logoUrl = item.logo_url
        ? process.env.REACT_APP_IMG_URL + item.logo_url
        : R.images.visa_img

      const isSelected = index == methodSelected.index

      return (
        <Row
          key={index}
          onClick={() => setMethodSelected({ method: item.method_name, index })}
          style={{
            marginBottom: 3,
            borderBottom: '1px solid rgb(242, 242, 242)',
            padding: '5px',
            cursor: 'pointer',
            borderRadius: 5,
            background: isSelected ? 'rgb(240, 240, 240)' : 'white',
          }}
          align={'middle'}
        >
          <Image
            width={40}
            height={40}
            style={{ borderRadius: 5 }}
            src={logoUrl}
            preview={false}
            crossOrigin="anonymous"
          />
          <Col style={{ marginLeft: 10 }}>
            <Row>{bankName}</Row>
            <Row style={{ color: 'rgb(119, 119, 119)' }}>{bankName}</Row>
          </Col>
        </Row>
      )
    },
    [listMethod, methodSelected]
  )

  return (
    <div>
      <PageTitle title={levelKey ? 'Nâng cấp VIP' : 'Nạp tiền'} />
      <Styled.WrapCardCenter>
        <Styled.CardForm>
          {levelKey && (
            <>
              <div className="ant-input__label">Thông tin VIP</div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>
                {selectedLevel?.name}
              </div>
              <div style={{ fontSize: 15 }}>
                Đơn giá: {formatPrice(selectedLevel?.price)}đ
              </div>
              <hr style={{ borderTop: '1px solid rgb(242, 242, 242)' }}></hr>
            </>
          )}
          <Form
            onFinish={onFinish}
            initialValues={{
              amount: null,
            }}
          >
            <div className="ant-input__label">
              Vui lòng chọn kênh thanh toán
            </div>
            {listMethod.map((item, idx) => renderMethodItem(item, idx))}
            {/* <span className="ant-input__wrapper">
              <span className="ant-input__prefix">$</span>
              <Input
                placeholder="Nhập số tiền"
                className="ant-input__money-custom"
              />
              <span className="ant-input__suffix">USD</span>
            </span> */}
            {!levelKey && (
              <>
                <div style={{ marginTop: 15 }} className="ant-input__label">
                  Số tiền nạp
                </div>
                <Form.Item
                  name="amount"
                  rules={[{ required: true, message: 'Không được bỏ trống' }]}
                >
                  <InputNumber
                    addonAfter={undefined}
                    style={{ width: '100%' }}
                    placeholder="Nhập số tiền"
                    formatter={value =>
                      `${value}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
                    }
                    parser={value => value!.replace(',', '')}
                  />
                </Form.Item>
              </>
            )}
            <Form.Item
              style={{
                marginBottom: 0,
                marginTop: 15,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: '100%',
                  height: 40,
                  fontWeight: 700,
                }}
              >
                {levelKey ? 'Tiền hành nâng cấp' : 'Tiến hành nạp tiền'}
              </Button>
            </Form.Item>
          </Form>
        </Styled.CardForm>
      </Styled.WrapCardCenter>
    </div>
  )
}
export default RechargeMoneyPage
