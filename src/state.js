const store = {
  initState: [],

  get state() {
    return this.initState;
  },

  set state(payload) {
    this.initState = payload;
  },
};
export default store;
