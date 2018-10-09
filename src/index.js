import Controller from './controller'
import ReactComponentExt from './component/ReactComponentExt'
import app from './App.js'
import dynamic from './dynamic.js'

export { mvcConnect as connect } from './hoc/connect'
export * from 'react-router-dom'
export { Controller, ReactComponentExt, dynamic }
export default app
