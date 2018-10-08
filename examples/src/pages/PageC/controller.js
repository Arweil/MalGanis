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

  getInitialState() {
    console.log('page ctrl getInitialState')
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
