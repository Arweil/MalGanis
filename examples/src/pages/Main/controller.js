import { Controller } from '../../../../dist/GalGanis.js';
import View from './view.js';
import Model from './model.js';

export default class MainCtrl extends Controller {
  constructor() {
    super()
    this.View = View;

    this.state = {
      test: 1
    }

    console.log(`page ctrl constructor`)
  }

  componentWillMount() {
    console.log('page ctrl componentWillMount')
  }

  componentFirstMount() {
    console.log('page ctrl componentFirstMount')
  }

  componentDidMount() {
    // await this.setStateAsync({ test: 2 })
    // console.log(this.state.test)
    console.log(`page ctrl componentDidMount`)
  }
}
