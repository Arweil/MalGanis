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
            controller: () => import('@/pages/PageA/controller.js')
          })} />
          <Route exact path="/PageA" component={dynamic({
            app,
            controller: () => import('@/pages/PageA/controller.js')
          })} />
          <Route path="/PageA/PageAA" component={dynamic({
            app,
            controller: () => import('@/pages/PageAA/controller.js')
          })} />
          <Route path="/PageB" component={dynamic({
            app,
            controller: () => import('@/pages/PageB/controller.js')
          })} />
          <Route path="/PageC" component={dynamic({
            app,
            controller: () => import('@/pages/PageC/controller.js')
          })} />
          <Route path="/Main" component={dynamic({
            app,
            controller: () => import('@/pages/Main/controller.js')
          })} />
        </Switch>
      </Router>
    </Layout>
  )
}
