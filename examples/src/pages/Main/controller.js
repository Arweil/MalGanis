import { BaseController } from '../../../../dist/GalGanis.js';
import View from './view.js';
import Model from './model.js';

export default class MainCtrl extends BaseController {
  constructor() {
    super()
    this.View = View;

    this.state = {
      test: 1
    }

    console.log(`page ctrl constructor`)
  }

  async componentDidMount() {
    await this.setStateAsync({ test: 2 })
    console.log(this.state.test)
    console.log(`page ctrl componentDidMount`)
  }
}
