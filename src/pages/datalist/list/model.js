import { queryprolist, quotedata } from './service';

const Model = {
  namespace: 'quotedata',
  state: {
      prolist: [],
      quotestatus: {},
  },
  effects: {
    *initpro({ payload }, { call, put }) {
      const response = yield call(queryprolist, payload);
      yield put({
        type: 'saveprolist',
        payload: response,
      });
    },
    *quote({ payload }, { call, put }) {
        const response = yield call(quotedata, payload);
        yield put({
          type: 'quotestatus',
          payload: response,
        });
      },

  },
  reducers: {
    saveprolist(state, action) {
      return { ...state, prolist: action.payload };
    },
    quotestatus(state, action) {
        return { ...state, quotestatus: action.payload };
      },
  },
};
export default Model;
