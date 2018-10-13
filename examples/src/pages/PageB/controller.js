import { Controller } from '../../../../dist/GalGanis.js';
import View from './view.js';
import Model from './model.js';

export default class CtrlPageB extends Controller {
  constructor() {
    super()
    this.View = View;
    this.Model = Model;
  }

  pageWillMount() {
    console.log('page ctrl pageWillMount')
  }

  pageDidMount() {
    console.log('page ctrl pageDidMount')
  }
}
