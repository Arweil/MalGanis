import { Controller } from '../../../../dist/GalGanis.js';
import View from './view.js';
import Model from './model.js';
import events from './events.js';

export default class MainCtrl extends Controller {
  constructor() {
    super()
    this.View = View;
    this.Model = Model;

    this.combineEvents(events);
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
    this.store.dispatch({ type: 'getMessage', msg: 'hello redux' })
    // console.log(this.store.getState())
    // console.log(this.store)
    console.log('page ctrl pageDidMount')
  }
}
