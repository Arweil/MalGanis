import React from 'react';
import CtrlProxy from '../component/CtrlProxy';
import ViewProxy from '../component/ViewProxy';
import Root from '../component/Root';

export default class BaseController {
  constructor() {
    this.View = null
    this.Model = null

    this.flag = {
      mounted: false,
    }
  }

  render() {
    return (
      <Root>
        <ViewProxy events={{}} controller={this} view={this.View} />
        <CtrlProxy controller={this} />
      </Root>
    )
  }
}
