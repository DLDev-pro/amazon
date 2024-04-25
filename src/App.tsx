import React from 'react'
import './App.css'
import 'antd/dist/antd.css'
import GlobalStyles from 'global-styles'
import AppNavigator from 'navigation'
import './global-styles.css'
import './input.css'
import { LiveChatWidget } from '@livechat/widget-react'

function App() {
  return (
    <React.Fragment>
      <AppNavigator />
      <GlobalStyles />
      <LiveChatWidget license="17675085" />
    </React.Fragment>
  )
}

export default App
