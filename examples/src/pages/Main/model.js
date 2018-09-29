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
    }
  }
}
