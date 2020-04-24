import { querylist } from "./service";



export default {
  namespace: "List", //这里就是前面type里面的名字,
  state: {
    data: null
  },
  effects: {
    *fetch({payload} , { call, put }) {
      const response = yield call(querylist);

      yield put({
        type: 'save',
        payload: response,
      });
    },


  },
  reducers: {
     save(state, action) {
       return {
         ...state,
         data: action.payload,
       };
     },
     delete(state, { payload: key }) {
       return {
         ...state,
         data: state.data.filter(item => item.key !== key),
       }
     }
  }
}
