import { queryList, add, remove } from '@/services/trash';

export default {
  namespace: 'trash',
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
      const lists = yield call(queryList, payload);
      yield put({
        type: 'save',
        payload: {
          lists,
        },
      });
    },
    *add({ payload }, { call }) {
      yield call(add, payload);
    },
    *remove({ payload }, { call }) {
      yield call(remove, payload);
    },
  },
};
