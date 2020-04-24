
import { querylist, saveform } from './service';

export default {
  namespace: 'formcreate',
  state: {
    formcreatedata: [
  ],
    formdata: [],
    captcha: null,
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(querylist);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchForm({ payload }, { call, put }) {
      const response = yield call(saveform, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },


  },
  reducers: {
    saveformcreatedata(state, action) {
       return {
         ...state,
         formcreatedata: state.formcreatedata.concat(action.payload),
       };
     },
     save(state, { payload }) {
        return {
          ...state,
          captcha: payload,
        }
     },
  },
}
