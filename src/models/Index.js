import service from '_s/Index';
export default {

  namespace: 'Index',

  state: {
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    * login({ uid, password }, {call, put}) {
      const userInfo = yield call(service.userLogin, {uid, password});
      return userInfo;
    },

  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
