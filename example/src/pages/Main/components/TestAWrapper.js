import TestA from './TestA.js';
import { mvcConnect as connect } from 'malganis/hoc/connect';

export default connect(({ state, events, actions }) => {
  return {
    router: state.router,
    msg: state.main.msg,
    getMessage: () => actions.getMessage({ msg: 'aaa' })
  }
})(TestA);
