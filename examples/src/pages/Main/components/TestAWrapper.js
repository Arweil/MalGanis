import TestA from './TestA.js';
import { connect } from '../../../../../dist/GalGanis';

export default connect(({ state, events, actions }) => {
  return {
    router: state.router,
    msg: state.main.msg,
    getMessage: () => actions.getMessage({ msg: 'aaa' })
  }
})(TestA);
