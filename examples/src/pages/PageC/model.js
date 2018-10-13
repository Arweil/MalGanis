export default {
  namespace: 'main',
  state: {
    msg: 'init msg',
  },
  reducers: {
    updateMessage(state, { msg }) {
      return {
        ...state,
        msg
      }
    },
  }
}
