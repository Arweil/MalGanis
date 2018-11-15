export default {
  namespace: 'main',
  state: {
    msg: 'init msg',
  },
  reducers: {
    getMessage (state, { msg }) {
      return {
        ...state,
        msg
      }
    },
    getMessage1: (state, { msg }) => {
      return {
        ...state,
        msg
      }
    }
  }
}
