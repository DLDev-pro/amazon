import { ADMIN_ROUTER_PATH } from 'common/config'
import React from 'react'
import { AiOutlineHome } from 'react-icons/ai'
import { BsBoxSeam, BsPerson } from 'react-icons/bs'
import { GiClick } from 'react-icons/gi'
import { MdSupportAgent } from 'react-icons/md'
import history from 'utils/history'
import './style.css'
import * as Styled from './styled'
import { CHAT_LINK } from 'utils/constants'
import { t } from 'i18next'

const FooterContainer: React.FC = () => {
  const MenuFooter = [
    {
      pathname: ADMIN_ROUTER_PATH.HOME,
      title: t('navigation_bottom.home'),
      icon: <AiOutlineHome style={styleIcon} />,
    },

    {
      pathname: ADMIN_ROUTER_PATH.HISTORY,
      title: t('navigation_bottom.history'),
      icon: <BsBoxSeam style={styleIcon} />,
    },
    {
      pathname: ADMIN_ROUTER_PATH.ORDER,
      title: t('navigation_bottom.order'),
      icon: <GiClick style={styleIcon} />,
      special: true,
    },
    {
      pathname: ADMIN_ROUTER_PATH.SUPPORT,
      title: t('navigation_bottom.support'),
      icon: <MdSupportAgent style={styleIcon} />,
    },
    {
      pathname: ADMIN_ROUTER_PATH.PROFILE,
      title: t('navigation_bottom.profile'),
      icon: <BsPerson style={styleIcon} />,
    },
  ]

  return (
    <Styled.FooterBlock>
      <div className="main-footer">
        {MenuFooter?.map((item: any, index: number) =>
          item.special ? (
            <span
              key={index}
              className={`menu-nav ${
                item.pathname === window.location.pathname ? 'menu-active' : ''
              }`}
              id="order"
              onClick={() => {
                history.push(item.pathname)
              }}
            >
              <div className="circle-item">
                {item.icon} <p>{item.title} </p>
              </div>
            </span>
          ) : (
            <span
              key={index}
              className={`menu-nav ${
                item.pathname === window.location.pathname ? 'menu-active' : ''
              }`}
              onClick={() => {
                if (item.pathname == ADMIN_ROUTER_PATH.SUPPORT) {
                  window.open(CHAT_LINK)
                  return
                }
                history.push(item.pathname)
              }}
            >
              {item.icon} <p>{item.title}</p>
            </span>
          )
        )}
      </div>
    </Styled.FooterBlock>
  )
}

const styleIcon = { fontSize: '18px' }
export { FooterContainer }
