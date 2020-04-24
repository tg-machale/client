import { fakeRegister, getcaptcha } from './service';

const Model = {
  namespace: 'userAndregister',
  state: {
    status: undefined,
  },
  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(fakeRegister, payload);
      debugger
      yield put({
        type: 'registerHandle',
        payload: response,
      });
    },
    *getCaptcha({ payload }, { call }) {
      yield call(getcaptcha, payload);
    },
  },
  reducers: {
    registerHandle(state, { payload }) {
      return { ...state, status: payload.status };
    },
  },
};
export default Model;
