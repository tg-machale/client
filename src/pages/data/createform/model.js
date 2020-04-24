
import { routerRedux } from 'dva/router';
import { querylist, saveform, deleteformitem } from './service';
import { func } from 'prop-types';

export default {
  namespace: 'formcreate',
  state: {
    formcreatedata: [
      {
        title: '总支',
        type: 'Card',
        dataIndex: '总支',
        children: [],
      },
    ],
    formdata: [],
    captcha: null,
    seleteData: [
      '总支',
    ],
    coldata: [
      {
        title: '总支',
        type: 'Card',
        dataIndex: '总支',
        children: [],
      },
    ],
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(querylist);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *deleteitem({ payload }, { call, put }) {
      const response = yield call(deleteformitem, payload);
      yield put({
        type: 'updataform',
        payload: response,
      });
    },


    *savedatafetch({ payload }, { call, put }) {
      function traverse(formdata, pagedata) {
        for (let i = 0; i < formdata.length; i++) {
          if (formdata[i].type === 'Card') {
            traverse(formdata[i].children, pagedata);
          } if (formdata[i].title === pagedata.aggregate) {
            formdata[i].children.push(pagedata)
          }
        }
        return formdata
    }

    function getaggregate(pagedata, seleteData) {
      if (pagedata.type === 'Card') {
        for (let i = 0; i < seleteData.length; i++) {
          if (seleteData[i] === pagedata.title) {
            return seleteData
          }
        }
        seleteData.push(pagedata.title)
      }
      return seleteData
    }

      const { formcreatedata, data, seleteData } = payload
      const carddata = traverse(formcreatedata, data)
      const aggregate = getaggregate(data, seleteData)
      yield put({
        type: 'savecarddata',
        payload: { carddata, aggregate },
      });
    },

    *togo({ payload }, { call, put }) {
      yield put(routerRedux.push(`${payload}`));
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
    saveaggregate(state, action) {
       return {
         ...state,
         seleteData: state.seleteData.push(action.payload),
       };
     },
     save(state, { payload }) {
        return {
          ...state,
          captcha: payload,
        }
     },
     savecarddata(state, { payload }) {
      return {
        ...state,
        formcreatedata: payload.carddata,
        seleteData: payload.aggregate,
      }
   },
     initformdata(state, { payload }) {
       return {
         ...state,
         formcreatedata: payload,
       }
     },
     updataform(state, { payload }) {
      return {
        ...state,
        formcreatedata: payload.form,
      }
    },

  },
  }