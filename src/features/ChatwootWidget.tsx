import React from 'react'
import { useAppSelector } from 'redux/store/store'

export const ChatwootWidget: React.FC = () => {
  const { userInfo } = useAppSelector(state => state.AuthReducer)

  React.useEffect(() => {
    const refWindow: any = window
    // Add Chatwoot Settings
    refWindow.chatwootSettings = {
      hideMessageBubble: true,
      position: 'right', // This can be left or right
      locale: 'vn', // Language to be set
      type: 'standard', // [standard, expanded_bubble]
      darkMode: 'light', // [light, auto]
    }

    // Paste the script from inbox settings except the <script> tag
    ;(function (d: any, t: any) {
      const BASE_URL = 'https://'
      const g = d?.createElement(t)
      const s = d?.getElementsByTagName(t)[0]
      g.src = BASE_URL + '/packs/js/sdk.js'
      s.parentNode.insertBefore(g, s)
      g.async = !0
      g.onload = function () {
        refWindow.chatwootSDK.run({
          websiteToken: 'kUmjKmctm8hAm7dZF81VAQn4',
          baseUrl: BASE_URL,
        })
      }
    })(document, 'script')

    // refWindow.addEventListener('chatwoot:ready', function () {
    //   // docs: https://www.chatwoot.com/docs/product/channels/live-chat/sdk/setup
    //   const key = 'AC49FmGgduDGUZhpUWTCQW2V'
    //   const message = userInfo?._id

    //   const hash = Hmac256(key, message)

    //   refWindow.$chatwoot.setUser(userInfo?._id, {
    //     email: `${userInfo?.phone}@gmail.com`,
    //     name: userInfo?.name,
    //     avatar_url: userInfo.avatar,
    //     phone_number: userInfo?.phone,
    //     identifier_hash: hash,
    //   })
    // })
  }, [userInfo])

  return null
}
