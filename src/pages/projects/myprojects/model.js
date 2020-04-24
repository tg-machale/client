/* eslint-disable import/extensions */
import { queryProject, queryOneProject } from './service';
import { routerRedux } from 'dva/router';

const Model = {
  namespace: 'projectList',
  state: {
    data: [],
    onedata: [],
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryProject);
      yield put({
        type: 'save',
        payload: {
          currentUser: response,
        },
      });
    },
    *togo({ payload }, { call, put }) {
      yield put(routerRedux.push(`${payload}`));
    },


  },
  reducers: {
    add(state, { payload }) {
      return {
        ...state,
        data: state.data.concat(payload),
      };
    },
    save(state, { payload }) {
      if (state.data.length == 0) {
        return {
          ...state,
          data: payload.currentUser,
        };
      }
        return {
          ...state,
        };
    },

  },
};
export default Model;
