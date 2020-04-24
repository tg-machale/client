import { routerRedux } from 'dva/router';
import { fetchForm, addData } from './service';

export default {
  namespace: 'addata',
  state: {
      form: [],
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(fetchForm);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *togo({ payload }, { call, put }) {
      yield put(routerRedux.push(`${payload}`));
    },
    *Addata({ payload }, { call, put }) {
      const response = yield call(addData, payload);
      yield put({
        type: 'adddataStatus',
        payload: response,
      });
    },


  },
  reducers: {
     save(state, { payload }) {
        return {
          ...state,
          form: payload,
        }
     },
  },
}
