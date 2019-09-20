import { queryList } from '@/services/transport';

export default {
  namespace: 'transport',
  state: {
    lists: {},
  },
  reducers: {
    init() {
      return {
        lists: {},
      };
    },
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *queryList({ payload }, { call, put }) {
      const { data: lists } = yield call(queryList, payload);
      yield put({
        type: 'save',
        payload: {
          lists,
        },
      });
    },
  },
};
