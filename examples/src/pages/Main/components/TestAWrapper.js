import TestA from './TestA.js';
import { connect } from '../../../../../dist/GalGanis';

function mapStateToProps(state) {
  return {
    router: state.router,
    msg: state.main.msg
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getMessage: () => dispatch({ type: 'getMessage', msg: 'aaa' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestA);
