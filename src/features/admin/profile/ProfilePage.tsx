import {
  FileDoneOutlined,
  ShoppingCartOutlined,
  UsergroupDeleteOutlined,
} from '@ant-design/icons'
import { Button, Col, Divider, Image, Layout, message, Row } from 'antd'
import R from 'assets'
import { ADMIN_ROUTER_PATH, SESSION_KEY } from 'common/config'
import { getUserInfoAction } from 'features/auth/AuthSlice'
import Cookie from 'js-cookie'
import React, { useEffect } from 'react'
import { AiOutlineLock, AiOutlineLogout } from 'react-icons/ai'
import { BiLocationPlus, BiSupport } from 'react-icons/bi'
import {
  BsCardChecklist,
  BsFillDiagram3Fill,
  BsLock,
  BsReply,
} from 'react-icons/bs'
import { FaAddressCard, FaMoneyBillAlt } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useAppSelector } from 'redux/store/store'
import Swal from 'sweetalert2'
import { CHAT_LINK } from 'utils/constants'
import { formatSensitiveText } from 'utils/funcHelper'
import history from 'utils/history'
import { formatPrice } from 'utils/ruleForm'

const { Content } = Layout

const HeadTitle = ({ title }: { title: string }) => {
  return (
    <div
      style={{
        backgroundColor: 'lightgray',
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

const OptionSelect = ({
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
        style={{ color: 'black', alignItems: 'center', display: 'flex' }}
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

  useEffect(() => {
    dispatch(getUserInfoAction())
  }, [])

  return (
    <Content
      style={{
        padding: '0 10px',
        margin: '10px 0',
      }}
    >
      <Row justify="center">
        <Col span="12">
          <Row align="middle">
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
                    <b style={{ fontSize: 20 }}>{userInfo?.name}</b>
                  </Row>
                  <Row>
                    <b style={{ fontSize: 16 }}>
                      Số điện thoại: {formatSensitiveText(userInfo?.phone, 4)}
                    </b>
                  </Row>
                  <Row>
                    <b style={{ fontSize: 16 }}>
                      Số dư tài khoản:{' '}
                      <b style={{ color: 'green' }}>{`$${
                        formatPrice(userInfo?.balance) || 0
                      }`}</b>
                    </b>
                  </Row>
                  <Row>
                    <b style={{ fontSize: 14, color: 'grey' }}>
                      Mã mời: {userInfo?.reference_code || userInfo?.phone}
                    </b>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span="12">
          <Row
            justify="end"
            align="middle"
            style={{ height: '100%', padding: 10 }}
          >
            <Col>
              <Button
                style={{ fontWeight: '700' }}
                onClick={() => {
                  // history.push(ADMIN_ROUTER_PATH.SUPPORT)
                  window.open(CHAT_LINK)
                }}
              >
                Nạp tiền
              </Button>
            </Col>
            <Col>
              <Button
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
                style={{ fontWeight: '700' }}
              >
                Rút tiền
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <HeadTitle title="Thông tin cá nhân" />
      {/* <OptionSelect
        to={ADMIN_ROUTER_PATH.DELIVERY_ADDRESS}
        title="Thông tin cá nhân"
        icon={<BiLocationPlus />}
      /> */}
      <OptionSelect
        to={ADMIN_ROUTER_PATH.BANK_CARD}
        title="Thẻ ngân hàng"
        icon={<BsCardChecklist />}
      />
      <OptionSelect
        to={ADMIN_ROUTER_PATH.MEMBER_RANK}
        title="Cấp bậc hội viên"
        icon={<BsFillDiagram3Fill />}
      />
      <OptionSelect
        to={ADMIN_ROUTER_PATH.DELIVERY_ADDRESS}
        title="Địa chỉ"
        icon={<FaAddressCard />}
      />
      <HeadTitle title="Lịch sử đơn hàng" />
      <OptionSelect
        to={ADMIN_ROUTER_PATH.HISTORY}
        title="Lịch sử săn đơn hàng"
        icon={<FileDoneOutlined />}
      />
      <OptionSelect
        to={ADMIN_ROUTER_PATH.ORDER}
        title="Bắt đầu săn đơn hàng"
        icon={<ShoppingCartOutlined />}
      />
      <OptionSelect
        to={`${ADMIN_ROUTER_PATH.MY_GROUP}?tabs=level_1`}
        title="Nhóm của tôi"
        icon={<BsFillDiagram3Fill />}
      />
      <HeadTitle title="Tài khoản" />
      <OptionSelect
        to={ADMIN_ROUTER_PATH.HISTORY_TRANSACTION}
        title="Lịch sử giao dịch"
        icon={<FaMoneyBillAlt />}
      />
      <OptionSelect
        to={ADMIN_ROUTER_PATH.CHANGE_PASS}
        title="Mật khẩu tài khoản"
        icon={<AiOutlineLock />}
      />
      <OptionSelect
        to={ADMIN_ROUTER_PATH.DEPOSIT_PASS}
        title="Mật khẩu vốn"
        icon={<BsLock />}
      />
      <HeadTitle title="Liên hệ chăm sóc khác hàng" />
      <OptionSelect
        to={ADMIN_ROUTER_PATH.SUPPORT}
        title="Trung tâm chăm sóc khách hàng"
        icon={<BiSupport />}
      />
      <OptionSelect
        to={ADMIN_ROUTER_PATH.SUPPORT}
        title="Ý kiến phản hồi"
        icon={<BsReply />}
      />
      <Divider style={{ margin: 5 }} />
      <div
        style={{
          padding: 5,
          paddingLeft: 12,
          marginTop: 5,
          marginBottom: 80,
        }}
        onClick={() => {
          const refWindow: any = window
          if (refWindow.$chatwoot) refWindow.$chatwoot.reset()
          Cookie.remove(SESSION_KEY.SESSION)
          message.success('Đăng xuất')
          history.replace('/')
        }}
      >
        <a style={{ color: 'black', fontSize: 18 }}>
          <AiOutlineLogout /> <b>Đăng xuất</b>
        </a>
      </div>
    </Content>
  )
}
export default ProfilePage
function getUserInfor(): any {
  throw new Error('Function not implemented.')
}
