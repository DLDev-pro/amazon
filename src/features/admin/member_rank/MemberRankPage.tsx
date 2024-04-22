import { Button, Col, Image, Row } from 'antd'
import R from 'assets'
import { BonusIcon, CustomerCareIcon, TaskIcon } from 'common/components/Icons'
import { ADMIN_ROUTER_PATH } from 'common/config'
import { getUserInfoAction } from 'features/auth/AuthSlice'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/store/store'
import { getListLevel } from 'services/api/CommonApi'
import history from 'utils/history'
import { formatPrice } from 'utils/ruleForm'
import { LIST_RANK } from './mooks'
import * as S from './styled'

const IconStyle = { fontSize: '38px' }
const MemberRankPage: React.FC = () => {
  const [listRank, setListRank] = useState<Array<any>>([])
  const [currentLevelIdx, setCurrentLevelIdx] = useState<number>(0)

  const { userInfo } = useAppSelector(state => state.AuthReducer)
  const dispatch = useAppDispatch()

  const getData = async () => {
    try {
      const resData = (await getListLevel()).data
      const ownLevel = userInfo?.level

      const currentLevelData = resData.find((item: any) => item.key == ownLevel)
      let currentLvIdx =
        resData.indexOf(currentLevelData) == -1
          ? 0
          : resData.indexOf(currentLevelData)

      setListRank(resData)
      setCurrentLevelIdx(currentLvIdx)
    } catch (err) {}
  }

  useEffect(() => {
    dispatch(getUserInfoAction())
    getData()
  }, [])

  return (
    <S.Container>
      <S.Title>Nâng cấp hội viên</S.Title>
      <Row style={{ marginTop: '1rem' }}>
        <Col>
          <Image
            style={{ borderRadius: 5 }}
            width={70}
            height={70}
            src={R.images.avt_placeholder}
          />
        </Col>
        <Col style={{ marginLeft: 10 }}>
          <Row style={{ height: '100%' }} align="middle">
            <Col>
              <Row>
                <b style={{ fontSize: 20 }}>
                  Cấp bậc của tôi: {listRank[currentLevelIdx]?.name}
                </b>
              </Row>
              <Row>
                <b style={{ fontSize: 14, color: 'grey' }}>
                  Mỗi ngày có thể nhận đơn hàng：
                  {listRank[currentLevelIdx]?.order_quantity_per_day} (Đơn)
                </b>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}
      >
        <S.ContainerOption>
          <S.OptionItem span={8}>
            <BonusIcon style={IconStyle} />
            Thêm hoa hồng
          </S.OptionItem>
          <S.OptionItem span={8}>
            <TaskIcon style={IconStyle} />
            Thêm nhiệm vụ
          </S.OptionItem>
          <S.OptionItem span={8}>
            <CustomerCareIcon style={IconStyle} />
            Chăm sóc khách hàng riêng
          </S.OptionItem>
        </S.ContainerOption>
      </div>
      <div style={{ textAlign: 'center' }}>
        ● Nhấn để chọn chuyên mục cấp bậc mà bạn muốn để thanh toán và nâng cấp
        ●
      </div>
      <Row style={{ marginTop: '2rem' }}>
        {listRank.map((item, index) => {
          const isCurrent = index <= currentLevelIdx
          const isUpgradeable = index == currentLevelIdx + 1
          const isInvalid = index > currentLevelIdx && !isUpgradeable

          return (
            <S.OptionRankMember xs={24} md={12}>
              <S.OptionBlock>
                <Row align={'middle'} justify={'space-between'}>
                  <div className="title-rank">{item?.name}</div>
                  {isCurrent && (
                    <div style={{ color: 'green' }} className="title-rank">
                      Đã nâng cấp
                    </div>
                  )}
                  {isUpgradeable && (
                    <Button
                      onClick={() => {
                        history.push(ADMIN_ROUTER_PATH.SUPPORT)
                        // history.push(
                        //   ADMIN_ROUTER_PATH.RECHARGE_MONEY +
                        //     `?level=${item?.key}`
                        // )
                      }}
                    >
                      Nâng cấp ngay
                    </Button>
                  )}
                  {isInvalid && (
                    <div style={{ color: 'red' }}>
                      Cần đạt cấp hội viên {listRank[index - 1]?.name}
                    </div>
                  )}
                </Row>
                <div className="money">${formatPrice(item?.price)}</div>
                <hr style={{ borderTop: '1px solid #cccccc' }}></hr>
                <div className="content">
                  Số nhiệm vụ: {item?.order_quantity_per_day} đơn/ngày
                </div>
                <div className="content">
                  Tỷ lệ hoa hồng: {item?.commission_percent}% giá trị đơn hàng
                </div>
                <div className="content">
                  Số lượt rút trong ngày: {item?.number_of_cash_out_per_day}{' '}
                  lượt
                </div>
              </S.OptionBlock>
            </S.OptionRankMember>
          )
        })}
      </Row>
    </S.Container>
  )
}
export default MemberRankPage
