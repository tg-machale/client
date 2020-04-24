export default {
    namespace: 'test',
    state: {data: [{ name: 'dva', id: 1 }, { name: 'antd', id: 2 }],},
    reducers: {
      delete(state, { payload: id }) {
        return {
          ...state,
          data: state.data.filter(item => item.id !== id)
        }
      },
    },
  };