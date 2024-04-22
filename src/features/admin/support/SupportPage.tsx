import React from 'react'
import * as Styled from './styled'
import { MdSupportAgent } from 'react-icons/md'
import BlueIconComp from 'common/components/Icons/BlueIconComp'
import { useAppSelector } from 'redux/store/store'
import { ChatwootWidget } from 'features/ChatwootWidget'

const styleIcon = { fontSize: '35px' }

const SupportPage: React.FC = () => {
  const { userInfo } = useAppSelector(state => state.AuthReducer)

  React.useEffect(() => {
    const refWindow: any = window
    if (refWindow?.$chatwoot) {
      refWindow.$chatwoot.toggle('open') // To open widget
      // refWindow.$chatwoot.toggleBubbleVisibility('show')

      refWindow.$chatwoot.setUser(userInfo?._id, {
        email: `${userInfo?.phone}@gmail.com`,
        name: userInfo?.name,
        avatar_url: userInfo.avatar,
        phone_number: userInfo?.phone,
      })
    } else {
      window.addEventListener('chatwoot:ready', function () {
        refWindow.$chatwoot?.toggle('open') // To open widget
      })
    }
    return () => {
      refWindow.$chatwoot?.toggle('close') // To close widget
      // refWindow.$chatwoot.toggleBubbleVisibility('hide')
    }
  }, [])
  return (
    <Styled.Container>
      <Styled.WarpBox>
        <Styled.Block>
          <Styled.Title>
            <BlueIconComp icon={<MdSupportAgent style={styleIcon} />} />
            Dịch vụ chăm sóc khách hàng
          </Styled.Title>
          <Styled.Note>
            Nếu bạn có vấn đề gì cần hỗ trợ vui lòng liên hệ chăm sóc khách hàng
            trực tuyến
          </Styled.Note>
          <Styled.Title>
            <BlueIconComp icon={<MdSupportAgent style={styleIcon} />} />
            Tìm hiểu về Amazon
          </Styled.Title>
          <Styled.Note>
            Amazon là một công ty công nghệ quốc gia của Mỹ được thành lập
            vào năm 1994 tại Bellevue, Washington do Jeff Bezos sáng lập,
            tập trung chủ yếu vào các hoạt động thương mại điện tử, trí
            tuệ nhân tạo cũng như điện toán đám mây. Ngày nay, Amazon
            được xem là một trong 4 ông lớn của công nghệ thế giới, bên
            cạnh Google, Apple và Facebook.
            Hiện nay, “Amazon” đã trở thành một trong những tập đoàn bán
            lẻ trực tuyến hàng đầu thế giới nổi tiếng trên toàn thế giới,
            với doanh số bán hàng chiếm khoảng 44% tổng doanh số
            thương mại điện tử tại Hoa Kỳ trong năm 2017.
          </Styled.Note>
          <Styled.Title>
            <BlueIconComp icon={<MdSupportAgent style={styleIcon} />} />
            Quy tắc lấy đơn hàng
          </Styled.Title>
          <Styled.Note>
            Để ngăn chặn các hoạt động bất hợp pháp rửa tiền Theo Khoản 1, Điều
            3 Nghị định số 74/2005/NĐ-CP ngày 7/6/2005, người dùng phải hoàn
            thành nhiều nhiệm vụ và rút tiền mặt trong cùng một ngày. Sau khi
            xác nhận rút tiền thành công, thời gian nhận là 1 ~ 5 phút,Khoảng
            thời gian cao điểm không quá 30 phút, và thời gian nhận do các ngân
            hàng. Tham gia công việc bằng phương thức nhận đơn hàng làm nhiệm
            vụ:
            <div>① Đăng ký tài khoản</div>
            <div>② Nạp tiền online</div>
            <div>③ Nhận đơn hàng</div>
            <div>④ Hoàn thành đơn hàng</div>
            <div>⑤ Rút tiền gốc</div>
          </Styled.Note>
        </Styled.Block>
      </Styled.WarpBox>
    </Styled.Container>
  )
}
export default SupportPage
