import { fakeChartData, queryActivities, queryCurrent, queryProjectNotice } from './service';

const Model = {
  namespace: 'dashboardAndworkplace',
  state: {
    currentUser: {},
    projectNotice: [],
    activities: [],
    radarData: [],
  },
  effects: {
    *init({ payload }, { put }) {
      yield put({
        type: 'fetchUserCurrent',
        payload,
      });
      yield put({
        type: 'fetchProjectNotice',
      });
      yield put({
        type: 'fetchActivitiesList',
      });
      yield put({
        type: 'fetchChart',
      });
    },

    *fetchUserCurrent({ payload }, { call, put }) {
      const response = yield call(queryCurrent, payload);
        yield put({
          type: 'save',
          payload: {
            currentUser: response,
          },
        });
    },

    *fetchProjectNotice(_, { call, put }) {
      const response = yield call(queryProjectNotice);
      yield put({
        type: 'save',
        payload: {
          projectNotice: Array.isArray(response) ? response : [],
        },
      });
    },

    *fetchActivitiesList(_, { call, put }) {
      const response = yield call(queryActivities);
      yield put({
        type: 'save',
        payload: {
          activities: Array.isArray(response) ? response : [],
        },
      });
    },

    *fetchChart(_, { call, put }) {
      const { radarData } = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: {
          radarData,
        },
      });
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },

    clear() {
      return {
        currentUser: {},
        projectNotice: [],
        activities: [],
        radarData: [],
      };
    },
  },
};
export default Model;
