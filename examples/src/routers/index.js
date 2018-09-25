import React from 'react'
import { Router, Route, Switch, dynamic } from '../../../dist/GalGanis.js'

import Layout from '@/layout/index.js'

export default ({ app, history }) => {
  return (
    <Layout>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={dynamic({
            app,
            controller: () => import('@/pages/Main/controller.js')
          })} />
          <Route path="/PageA" component={dynamic({
            app,
            controller: () => import('@/pages/PageA/controller.js')
          })} />
        </Switch>
      </Router>
    </Layout>
  )
}
