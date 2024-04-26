/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Col, Divider, Image, Layout, message, Row } from 'antd'
import R from 'assets'
import { ADMIN_ROUTER_PATH, SESSION_KEY } from 'common/config'
import { getUserInfoAction } from 'features/auth/AuthSlice'
import { t } from 'i18next'
import Cookie from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useAppSelector } from 'redux/store/store'
import { getListLevel } from 'services/api/CommonApi'
import Swal from 'sweetalert2'
import { CHAT_LINK } from 'utils/constants'
import history from 'utils/history'

const { Content } = Layout

const HeadTitle = ({ title }: { title: string }) => {
  return (
    <div
      style={{
        fontWeight: 'bold',
        padding: 10,
        marginTop: 10,
        fontSize: 18,
      }}
    >
      {title}
    </div>
  )
}

const OptionSelectVertical = ({
  icon,
  title,
  to,
}: {
  icon: unknown
  title: string
  to: string
}) => {
  return (
    <div
      style={{
        padding: 5,
        paddingLeft: 12,
        marginTop: 5,
        fontSize: 14,
      }}
    >
      <Link
        to={to}
        style={{
          color: 'black',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          fontWeight: 'bold',
        }}
      >
        {icon}
        <div style={{ width: 5, marginTop: 5 }}></div>
        {title}
      </Link>
    </div>
  )
}

const OptionSelectHorizontal = ({
  icon,
  title,
  to,
}: {
  icon: unknown
  title: string
  to: string
}) => {
  return (
    <div
      style={{
        padding: 5,
        paddingLeft: 12,
        marginTop: 5,
        fontSize: 11.5,
      }}
    >
      <Link
        to={to}
        style={{
          color: 'black',
          alignItems: 'center',
          display: 'flex',
          textAlign: 'center',
          fontWeight: 'bold',
        }}
      >
        {icon}
        <div style={{ width: 5 }}></div>
        {title}
      </Link>
    </div>
  )
}

const ProfilePage: React.FC = () => {
  const { userInfo } = useAppSelector(state => state.AuthReducer)
  const dispatch = useDispatch()
  const [listRank, setListRank] = useState<Array<any>>([])
  const [currentLevelIdx, setCurrentLevelIdx] = useState<number>(0)

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

  // console.log('userInfo', listRank[currentLevelIdx]?.price)
  return (
    <Content
      style={{
        backgroundColor: '#e0dede',
      }}
    >
      <Row
        justify="center"
        align="middle"
        style={{
          backgroundImage: ` url(
            data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGgAAAAaCAYAAABb9hlrAAAAWElEQVRoge3RQQHAIBDAsGMasYB0dAwbfSQWss6+/5D1qWkTFCcoTlCcoDhBcYLiBMUJihMUJyhOUJygOEFxguIExQmKExQnKE5QnKA4QXGC4gTFCSqbmQcjtQLReG26xgAAAABJRU5ErkJggg==
          )`,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
        }}
      >
        <Col span="4">
          <Row align="middle">
            <Col>
              <Image
                style={{ borderRadius: 5 }}
                width={60}
                height={60}
                src={R.images.unknown_avatar}
              />
            </Col>
          </Row>
        </Col>
        <Col span="9">
          <Col style={{ marginLeft: 10 }}>
            <Row
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
              align="middle"
              justify="center"
            >
              <Row>
                {/* <b style={{ fontSize: 16 }}>Nguyễn văn a</b> */}
                <b style={{ fontSize: 16 }}>{userInfo?.name}</b>
              </Row>

              <Row justify="center">
                <b
                  style={{
                    fontSize: 12,
                    textAlign: 'center',
                  }}
                >
                  {t('profile_page.invitation_code')}:{' '}
                  {userInfo?.reference_code || userInfo?.phone}
                </b>
              </Row>
            </Row>
          </Col>
        </Col>
        <Col span="6">
          <Row align="top">
            <img
              src={
                listRank[currentLevelIdx]?.price === 5000000
                  ? R.images.tvbac
                  : listRank[currentLevelIdx]?.price === 25000000
                  ? R.images.tvvang
                  : listRank[currentLevelIdx]?.price === 75000000
                  ? R.images.tvbachkim
                  : R.images.tvKimcuong
              }
              alt=""
            />
          </Row>
        </Col>
        <Col span="5">
          <Row align="middle" style={{ height: '100%' }}>
            <Col
              style={{
                width: '100%',
              }}
            >
              <Button
                style={{
                  fontWeight: '700',
                  color: 'black',
                  padding: 0,
                  width: '100%',
                  height: 'fit-content',
                  borderRadius: 5,
                  outline: 'none',
                  backgroundColor: '#e3b40c',
                }}
                onClick={() => {
                  // history.push(ADMIN_ROUTER_PATH.SUPPORT)
                  window.open(CHAT_LINK)
                }}
              >
                {t('profile_page.deposit')}
              </Button>
            </Col>
            <Col
              style={{
                width: '100%',
                marginTop: 3,
              }}
            >
              <Button
                style={{
                  fontWeight: '700',
                  color: 'black',
                  padding: 0,
                  width: '100%',
                  height: 'fit-content',
                  borderRadius: 5,
                  outline: 'none',
                  backgroundColor: '#e3b40c',
                }}
                onClick={() => {
                  dispatch(getUserInfoAction())

                  if (userInfo?.balance == 0) {
                    Swal.fire({
                      title: 'Thông báo',
                      text: 'Số dư tài khoản không đủ để thực hiện thao tác này. Bạn có muốn nạp tiền?',
                      icon: 'error',
                      showCancelButton: true,
                    }).then((result: any) => {
                      if (result.isConfirmed) {
                        history.push(ADMIN_ROUTER_PATH.RECHARGE_MONEY)
                      }
                    })
                  } else {
                    if (userInfo.bank) {
                      history.push(ADMIN_ROUTER_PATH.WITHDRAW_MONEY)
                    } else {
                      message.error('Vui lòng cập nhập thông tin thẻ ngân hàng')
                      history.push(ADMIN_ROUTER_PATH.BANK_CARD)
                    }
                  }
                }}
              >
                {t('profile_page.withdraw')}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      <div style={{ backgroundColor: 'white' }}>
        <HeadTitle title={t('profile_page.order_history')} />
        <hr />
        <Row
          gutter={16}
          style={{
            padding: 10,
          }}
        >
          <Col span={12}>
            <OptionSelectHorizontal
              to={ADMIN_ROUTER_PATH.HISTORY}
              title={t('profile_page.order_history')}
              icon={<img src={R.images.lichsudon} style={{ height: 24 }} />}
            />
          </Col>
          <Col span={12}>
            <OptionSelectHorizontal
              to={ADMIN_ROUTER_PATH.ORDER}
              title={t('profile_page.order_begin')}
              icon={<img src={R.images.sanhang} style={{ height: 24 }} />}
            />
          </Col>
          <Col span={12}>
            <OptionSelectHorizontal
              to={`${ADMIN_ROUTER_PATH.MY_GROUP}?tabs=level_1`}
              title={t('profile_page.my_group')}
              icon={<img src={R.images.nhomcuatoi} style={{ height: 24 }} />}
            />
          </Col>
        </Row>
      </div>

      <div style={{ backgroundColor: 'white' }}>
        <HeadTitle title={t('profile_page.balance') + userInfo?.balance} />
        <hr />

        <Row
          gutter={16}
          style={{
            padding: 10,
          }}
        >
          <Col span={12}>
            <OptionSelectVertical
              to={ADMIN_ROUTER_PATH.HISTORY_TRANSACTION}
              title={t('profile_page.deposit_history')}
              icon={<img src={R.images.naptien} style={{ height: 24 }} />}
            />
          </Col>
          <Col span={12}>
            <OptionSelectVertical
              to={ADMIN_ROUTER_PATH.HISTORY_TRANSACTION}
              title={t('profile_page.withdraw_history')}
              icon={<img src={R.images.ruttien} style={{ height: 24 }} />}
            />
          </Col>
          <Col span={12}>
            <OptionSelectVertical
              to={ADMIN_ROUTER_PATH.HISTORY_TRANSACTION}
              title={t('profile_page.pay_detail')}
              icon={<img src={R.images.thuchi} style={{ height: 24 }} />}
            />
          </Col>
          <Col span={12}>
            <OptionSelectVertical
              to={ADMIN_ROUTER_PATH.DEPOSIT_PASS}
              title={t('profile_page.origin_password')}
              icon={<img src={R.images.mkvon} style={{ height: 24 }} />}
            />
          </Col>
        </Row>
      </div>
      <div style={{ backgroundColor: 'white' }}>
        <HeadTitle title={t('profile_page.profile')} />
        <hr />

        <Row
          gutter={16}
          style={{
            padding: 10,
          }}
        >
          <Col span={12}>
            <OptionSelectVertical
              to={ADMIN_ROUTER_PATH.BANK_CARD}
              title={t('profile_page.bank_card')}
              icon={<img src={R.images.thenganhang} style={{ height: 24 }} />}
            />
          </Col>
          <Col span={12}>
            <OptionSelectVertical
              to={ADMIN_ROUTER_PATH.MEMBER_RANK}
              title={t('profile_page.member_rank')}
              icon={<img src={R.images.hoivien} style={{ height: 24 }} />}
            />
          </Col>
          <Col span={12}>
            <OptionSelectVertical
              to={ADMIN_ROUTER_PATH.DELIVERY_ADDRESS}
              title={t('profile_page.delivery_address')}
              icon={<img src={R.images.diachi} style={{ height: 24 }} />}
            />
          </Col>
          {/* unknown */}
          <Col span={12}>
            {/* <OptionSelectVertical
              to={CHAT_LINK}
              title="Tin nhắn từ hệ thống"
              icon={<img src={R.images.tinnhan} style={{ height: 24 }} />}
            /> */}
            <div
              style={{
                padding: 5,
                paddingLeft: 12,
                marginTop: 5,
                fontSize: 14,
              }}
            >
              <a
                href={CHAT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'black',
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  fontWeight: 'bold',
                }}
              >
                <img src={R.images.tinnhan} style={{ height: 24 }} />
                <div style={{ width: 5, marginTop: 5 }}></div>
                {t('profile_page.system_message')}
              </a>
            </div>
          </Col>
        </Row>
      </div>
      <div style={{ backgroundColor: 'white' }}>
        <HeadTitle title={t('profile_page.contact')} />
        <hr />
        <Row
          gutter={16}
          style={{
            padding: 10,
          }}
        >
          <Col span={12}>
            <OptionSelectHorizontal
              to={ADMIN_ROUTER_PATH.SUPPORT}
              title={t('profile_page.central_take_care_cumstomer')}
              icon={<img src={R.images.dvcskh} style={{ height: 24 }} />}
            />
          </Col>

          <Col span={12}>
            <OptionSelectHorizontal
              to={ADMIN_ROUTER_PATH.SUPPORT}
              title={t('profile_page.feedback')}
              icon={<img src={R.images.ykien} style={{ height: 24 }} />}
            />
          </Col>
        </Row>
      </div>
      <Divider style={{ margin: 5 }} />
      <div
        style={{
          padding: 10,
          paddingLeft: 12,
          marginTop: 5,
          backgroundColor: 'white',
        }}
      >
        <a
          style={{
            color: 'black',
            fontSize: 16,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 5,
            fontWeight: 'bold',
          }}
        >
          <span>{t('profile_page.language')}</span>
          <p
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <select name="countries" id="">
              <option value="VN">Việt Nam</option>
              <option value="JP">Nhật Bản</option>
              <option value="EN">USA</option>
            </select>
            <IoIosArrowForward />
          </p>
        </a>
      </div>
      <Divider style={{ margin: 5 }} />
      <div
        style={{
          padding: 10,
          paddingLeft: 12,
          marginTop: 5,
          marginBottom: 80,
          backgroundColor: 'white',
        }}
      >
        <div
          style={{
            color: 'black',
            fontSize: 16,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 5,
            fontWeight: 'bold',
          }}
        >
          <Link to={ADMIN_ROUTER_PATH.CHANGE_PASS}>
            {t('profile_page.password_login')}
          </Link>
          <p
            onClick={() => {
              alert('Đăng xuất')
              // const refWindow: any = window
              // if (refWindow.$chatwoot) refWindow.$chatwoot.reset()
              // Cookie.remove(SESSION_KEY.SESSION)
              // message.success('Đăng xuất')
              // history.replace('/')
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {t('profile_page.log_out')} <IoIosArrowForward />
          </p>
        </div>
      </div>
    </Content>
  )
}
export default ProfilePage
function getUserInfor(): any {
  throw new Error('Function not implemented.')
}
