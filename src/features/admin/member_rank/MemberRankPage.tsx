import { Button, Col, Image, Row } from 'antd'
import R from 'assets'
import { ADMIN_ROUTER_PATH } from 'common/config'
import { getUserInfoAction } from 'features/auth/AuthSlice'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/store/store'
import { getListLevel } from 'services/api/CommonApi'
import history from 'utils/history'
import { formatPrice } from 'utils/ruleForm'
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
      console.log(resData)
    } catch (err) { }
  }

  useEffect(() => {
    dispatch(getUserInfoAction())
    getData()
  }, [])

  return (
    <S.Container>
      <div
        style={{
          backgroundImage: '-webkit-linear-gradient(left, #27a6fa, #8e71f5)',
          margin: '0 -15px',
          paddingLeft: 15,
          paddingRight: 15,
          position: 'relative',
          paddingTop: 63,
        }}
      >
        <div
          style={{
            margin: '0 -15px',
            position: 'absolute',
            top: 0,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgb(142 113 245 / 1)',
            paddingBottom: '1rem !important',
            paddingTop: '1rem !important',
          }}
        >
          <S.Title>Nâng cấp hội viên</S.Title>
        </div>

        <Row
          style={{
            marginTop: '1rem',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            padding: '1rem 3px',
            margin: '0 15px',
            backgroundImage:
              listRank[currentLevelIdx]?.price === 5000000
                ? `url(${R.images.bac})`
                : listRank[currentLevelIdx]?.price === 25000000
                  ? `url(${R.images.vang})`
                  : listRank[currentLevelIdx]?.price === 75000000
                    ? `url(${R.images.bachkim})`
                    : `url(${R.images.kimcuong})`,
          }}
        >
          <Col span={3}>
            <Image
              style={{ borderRadius: 5 }}
              width={50}
              height={50}
              src={R.images.unknown_avatar}
            />
          </Col>
          <Col span={12} style={{ marginLeft: 10 }}>
            <Row style={{ height: '100%' }} align="middle">
              <Col>
                <Row>
                  <b style={{ fontSize: 12 }}>
                    Cấp bậc của tôi: {listRank[currentLevelIdx]?.name}
                  </b>
                </Row>
                <Row>
                  <b style={{ fontSize: 12, color: 'grey' }}>
                    Mỗi ngày có thể nhận: {listRank[currentLevelIdx]?.order_quantity_per_day}
                  </b>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span={8}>
            <Button
              // --tw-bg-opacity: 1;
              // background-color: rgb(207 165 93 / var(--tw-bg-opacity));
              style={{
                fontWeight: '700',
                color: '#0d6efd',
                padding: '5px 15px',
                width: '100%',
                height: 'fit-content',
                borderRadius: 99,
                outline: 'none',
                backgroundColor: 'rgb(207 165 93 / 1)',
                fontSize: 10,
              }}
              onClick={() => {
                history.push(ADMIN_ROUTER_PATH.PROFILE)
              }}
            >
              Trung tâm cá nhân
            </Button>
          </Col>
        </Row>
      </div>
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}
      >
        <S.ContainerOption>
          <S.OptionItem span={8}>
            <img src={R.images.themhoahong} alt="" width={60} />
            Thêm hoa hồng
          </S.OptionItem>
          <S.OptionItem span={8}>
            <img src={R.images.themnv} alt="" width={60} />
            Thêm nhiệm vụ
          </S.OptionItem>
          <S.OptionItem span={8}>
            <img src={R.images.cskhrieng} alt="" width={60} />
            CSKH riêng
          </S.OptionItem>
        </S.ContainerOption>
      </div>

      <Row style={{ marginTop: '2rem' }}>
        {listRank.map((item, index) => {
          const isCurrent = index <= currentLevelIdx
          const isUpgradeable = index == currentLevelIdx + 1
          const isInvalid = index > currentLevelIdx && !isUpgradeable

          return (
            <S.OptionRankMember xs={12} md={12} key={index}>
              <S.OptionBlock>
                <Row
                  align={'middle'}
                  justify={'space-between'}
                  style={{ width: '100%' }}
                >
                  <div className="title-rank">Thành viên {item?.name}</div>
                  {/* {isCurrent && (
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
                  )} */}
                  {/* {isInvalid && (
                    <div style={{ color: 'red' }}>
                      Cần đạt cấp hội viên {listRank[index - 1]?.name}
                    </div>
                  )} */}
                </Row>
                <div className="money">{formatPrice(item?.price)}</div>
                <hr style={{ borderTop: '1px solid #cccccc' }}></hr>
                <div className="content">
                  Số nhiệm vụ: {item?.order_quantity_per_day} đơn/ngày
                </div>
                <div className="content">
                  Tỷ lệ hoa hồng: {item?.commission_percent}%/đơn
                </div>
                <div className="content">
                  Thời gian hiệu lực của hội viên 365
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
