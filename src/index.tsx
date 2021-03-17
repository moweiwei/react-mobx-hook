import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Spin } from 'antd'

const render = async (component) => {
  // const { locales } = await i18n.init()
  ReactDOM.render(
    <Suspense fallback={<Spin />}>
      {/* <LocaleProvider locales={locales} localeKey="lang" ignoreWarnings> */}
      {component}
      {/* </LocaleProvider> */}
    </Suspense>,
    document.getElementById('root'),
  )
}

render(<App />)

if (module && module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default

    render(<NextApp />)
  })
}
