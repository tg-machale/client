/* eslint-disable import/extensions */
import { routerRedux } from 'dva/router';
import { queryOneProject, updataitemdata, deletedataitem } from './service';

const Model = {
  namespace: 'project',
  state: {
    project: {},
    own: {},
    authority: [],
  },
  effects: {
    *fetchOne({ payload }, { call, put }) {
      const response = yield call(queryOneProject, payload);
      yield put({
        type: 'saveOneProject',
        payload: {
           response,
        },
      });
    },
    *togo({ payload }, { put }) {
      yield put(routerRedux.push(`${payload}`));
    },
    *updataitemdata({ payload }, { call, put }) {
      const response = yield call(updataitemdata, payload);
      yield put({
        type: 'updataitemdatastatus',
        payload: response,
      });
    },
    *deletedataitem({ payload }, { call, put }) {
      const response = yield call(deletedataitem, payload);
      yield put({
        type: 'updataitemdatastatus',
        payload: response,
      });
    },

  },
  reducers: {
    saveOneProject(state, { payload }) {
      return {
        ...state,
        project: payload.response.doc[0],
        own: payload.response.user,
        authority: payload.response.Projectauthority,
      };
    },
    updataitemdatastatus(state, { payload }) {
      return {
        ...state,
        project: payload.project,
      };
    },

  },
};
export default Model;
