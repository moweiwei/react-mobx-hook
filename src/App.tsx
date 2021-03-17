import React, { Component } from 'react'
import { Router } from 'react-router'
import { createBrowserHistory } from 'history'
import { Provider } from 'mobx-react'
import { syncHistoryWithStore } from 'mobx-react-router'
// import { renderRoutes } from 'react-router-config'
import { renderRoutes } from 'utils/router.config'
// import { lazy } from 'utils'

import RootStore from 'stores/root'

// import '@kube-design/components/esm/styles/main.scss'
// import 'scss/main.scss'

import routes from './routes'

// const getActions = lazy(() =>
//   import(/* webpackChunkName: "actions" */ 'actions')
// )

class App extends Component {
  rootStore: any
  history: any

  constructor(props: Readonly<Record<string, unknown>>) {
    super(props)

    this.rootStore = new RootStore()
    this.history = syncHistoryWithStore(
      createBrowserHistory(),
      this.rootStore.routing,
    )
  }

  // componentDidMount() {}

  render() {
    return (
      <Provider rootStore={this.rootStore}>
        <Router history={this.history}>{renderRoutes(routes)}</Router>
      </Provider>
    )
  }
}

export default App
