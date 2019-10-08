import request from '@/utils/request';

export async function queryList(params) {
  return request('/api/trash/list', {
    method: 'POST',
    data: params,
  });
}

export async function add(params) {
  return request('/api/trash/add', {
    method: 'POST',
    data: params,
  });
}

export async function remove(params) {
  return request('/api/trash/delete', {
    method: 'POST',
    data: params,
  });
}
