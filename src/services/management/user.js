import request from '@/utils/request';

export async function queryList(params) {
  return request('/api/user/list', {
    method: 'POST',
    data: params,
  });
}

export async function add(params) {
  return request('/api/user/add', {
    method: 'POST',
    data: params,
  });
}

export async function modify(params) {
  return request('/api/user/edit', {
    method: 'POST',
    data: params,
  });
}

export async function queryDetail(params) {
  return request('/api/user/detail', {
    method: 'POST',
    data: params,
  });
}

export async function remove(params) {
  return request('/api/user/delete', {
    method: 'POST',
    data: params,
  });
}
