import request from '@/utils/request';

export async function queryList(params) {
  return request('/api/transport/list', {
    method: 'POST',
    data: params,
  });
}

export async function add(params) {
  return request('/api/transport/add', {
    method: 'POST',
    data: params,
  });
}

export async function modify(params) {
  return request('/api/transport/edit', {
    method: 'POST',
    data: params,
  });
}

export async function queryDetail(params) {
  return request('/api/transport/detail', {
    method: 'POST',
    data: params,
  });
}
