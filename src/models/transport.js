import { queryList, add, modify, queryDetail } from '@/services/transport';

export default {
  namespace: 'transport',
  state: {
    lists: {},
    detailMap: {},
  },
  reducers: {
    init() {
      return {
        lists: {},
        detailMap: {},
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
    *modify({ payload }, { call }) {
      yield call(modify, payload);
    },
    *queryDetail({ payload }, { call, put, select }) {
      const data = yield call(queryDetail, payload);
      const detail = yield select(({ transport: { detailMap } }) => detailMap);
      const detailMap = {
        ...detail,
        [payload.id]: data,
      };
      yield put({
        type: 'save',
        payload: {
          detailMap,
        },
      });
    },
  },
};
