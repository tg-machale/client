import { createproject } from './service';


export default {
  namespace: 'Project',
  state: {
    createProjectStatus: {},
  },

  effects: {
    *createProject({ payload }, { call, put }) {
      const response = yield call(createproject, payload);
      yield put({
        type: 'createProjectStatus',
        payload: response,
      });
    },
  },

  reducers: {
    createProjectStatus(state, payload) {
      return { ...state, createProjectStatus: payload };
    },
  }
}
