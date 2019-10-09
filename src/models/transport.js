import { queryList, add, modify, queryDetail, remove } from '@/services/transport';

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
    *remove({ payload }, { call }) {
      yield call(remove, payload);
    },
    *queryDetail({ payload }, { call, put, select, all }) {
      yield all([
        put({ type: 'handleCompany/queryList' }),
        put({ type: 'produceCompany/queryList' }),
        put({ type: 'trash/queryList' }),
      ]);
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
