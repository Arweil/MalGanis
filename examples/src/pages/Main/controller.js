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
    console.log('page ctrl pageDidMount')
    this.store.actions.getMessage({ msg: 'hello redux' });
    this.store.actions.getMessage1({ msg: 'hello redux1' });
    // console.log(this.store.getState())
    // console.log(this.store)
  }
}
