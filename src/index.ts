import 'core-js';

import Controller from './controller'
import ReactComponentExt from './component/ReactComponentExt'
import app from './App'
import dynamic from './dynamic'

export { mvcConnect as connect } from './hoc/connect'
export * from 'react-router-dom'
export { Controller, ReactComponentExt, dynamic }
export default app
