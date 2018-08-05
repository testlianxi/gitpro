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
    * login({ payload }, {call, put}) {
      const userInfo = yield call(service.userLogin, {uid: 'autobox',password:'autobox@123!abc'});
      return userInfo;
    },

  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
