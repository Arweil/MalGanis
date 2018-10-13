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

  getInitialState(state) {
    console.log('page ctrl getInitialState')

    return Promise.resolve({
      ...state,
      msg: 'new init msg'
    });
  }

  pageBeforeRender() {
    console.log('page ctrl pageBeforeRender')

    return Promise.resolve();
  }

  pageWillMount() {
    console.log('page ctrl pageWillMount')
  }

  pageDidMount() {
    console.log('page ctrl pageDidMount')
    this.store.actions.getMessage({ msg: 'hello redux' });
    this.store.actions.getMessage1({ msg: 'hello redux1' });

    // https://github.com/js-cookie/js-cookie
    this.jsCookie.set('mvcTestCookie', 'success', { expires: 7 });
    console.log(`get mvcTestCookie: ${this.jsCookie.get('mvcTestCookie')}`);

    // console.log(this.store.getState())
    // console.log(this.store)
  }

  pageWillLeave() {
    console.log('page ctrl pageWillLeave')
  }
}
