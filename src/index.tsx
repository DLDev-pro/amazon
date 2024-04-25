import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import store from 'redux/store/store'
import { ConfigProvider } from 'antd'
import viVN from 'antd/lib/locale/vi_VN'
import { I18nextProvider } from 'react-i18next'
import i18n from './assets/i18n/translation'

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={viVN}>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </ConfigProvider>
  </Provider>,
  document.getElementById('root')
)

reportWebVitals()
