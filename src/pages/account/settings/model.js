import {updatePhone, getCode, queryCity, queryCurrent, queryProvince, query as queryUsers, updateBase, updatePassword } from './service';

const Model = {
  namespace: 'accountAndsettings',
  state: {
    currentUser: {},
    province: [],
    city: [],
    isLoading: false,
    updateStatus: {},
    updatePasswordStatus: {},
    updatePhoneStatus: {},
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },

    *fetchProvince(_, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryProvince);
      yield put({
        type: 'setProvince',
        payload: response,
      });
    },

    *fetchCity({ payload }, { call, put }) {
      const response = yield call(queryCity, payload);
      yield put({
        type: 'setCity',
        payload: response,
      });
    },
    *Update({ payload }, { call, put }) {
      const response = yield call(updateBase, payload);
      yield put({
        type: 'updateStatus',
        payload: response,
      })
    },
    *updataPassword({ payload }, { call, put }) {
      const response = yield call(updatePassword, payload);
      yield put({
        type: 'updatePasswordStatus',
        payload: response,
      })
    },
    *getcode({ payload }, { call }) {
      yield call(getCode, payload);
    },
    *updataphone({ payload }, { call, put }) {
      const response = yield call(updatePhone, payload);
      yield put({
        type: 'updatePhoneStatus',
        payload: response,
      })
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(state = {}, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },

    setProvince(state, action) {
      return { ...state, province: action.payload };
    },

    setCity(state, action) {
      return { ...state, city: action.payload };
    },

    changeLoading(state, action) {
      return { ...state, isLoading: action.payload };
    },

    updateStatus(state, payload) {
      return { ...state, updateStatus: payload };
    },
    updatePasswordStatus(state, payload) {
      return { ...state, updatePasswordStatus: payload };
    },
    updatePhoneStatus(state, payload) {
      return { ...state, updatePhoneStatus: payload };
    },
  },
};
export default Model;
