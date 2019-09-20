import request from '@/utils/request';

export async function queryList(params) {
  return request('/api/transport/list', {
    method: 'POST',
    data: params,
  });
}
