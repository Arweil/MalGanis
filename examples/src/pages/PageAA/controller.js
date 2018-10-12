import { Controller } from '../../../../dist/GalGanis.js';
import View from './view.js';
import Model from './model.js';

export default class CtrlPageAA extends Controller {
  constructor() {
    super()
    this.View = View;
    this.Model = Model;
  }

  pageWillMount() {
    console.log('page ctrl pageWillMount')
  }

  pageFirstMount() {
    console.log('page ctrl pageFirstMount')
  }

  pageDidMount() {
    console.log('page ctrl pageDidMount')
  }
}
