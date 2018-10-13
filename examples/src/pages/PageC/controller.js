import { Controller } from '../../../../dist/GalGanis.js';
import View from './view.js';
import Model from './model.js';

export default class CtrlPageC extends Controller {
  constructor() {
    super()
    this.View = View;
    this.Model = Model;

    // this.combineEvents(events);
  }

  pageWillMount() {
    console.log('page ctrl pageWillMount')
  }

  pageDidMount() {
    console.log('page ctrl pageDidMount')
  }
}
