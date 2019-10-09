import { uploadAttach, removeAttach, queryAttach } from '@/services/attachment';

export default {
  namespace: 'attachment',
  state: {
    lists: [],
  },
  reducers: {
    init() {
      return {
        lists: [],
      };
    },
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *queryAttach({ payload }, { call, put }) {
      const lists = yield call(queryAttach, payload);
      yield put({
        type: 'save',
        payload: {
          lists,
        },
      });
    },
    *uploadAttach({ payload }, { call }) {
      yield call(uploadAttach, payload);
    },
    *removeAttach({ payload }, { call }) {
      yield call(removeAttach, payload);
    },
  },
};
