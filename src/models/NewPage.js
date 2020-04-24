import { queryuser } from "@/services/newPage";



export default {
  namespace: "newPage", //这里就是前面type里面的名字,
  state: {
    data: {
      
    }
  },
  effects: {
    *fetch({payload} , { call, put }) {
      const response = yield call(queryuser);
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
         data: action.payload
       };
     }
  }
}
