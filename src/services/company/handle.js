import request from '@/utils/request';

export async function queryList(params) {
  return request('/api/company/handle/list', {
    method: 'POST',
    data: params,
  });
}

export async function add(params) {
  return request('/api/company/handle/add', {
    method: 'POST',
    data: params,
  });
}

export async function modify(params) {
  return request('/api/company/handle/edit', {
    method: 'POST',
    data: params,
  });
}

export async function queryDetail(params) {
  return request('/api/company/handle/detail', {
    method: 'POST',
    data: params,
  });
}

export async function remove(params) {
  return request('/api/company/handle/delete', {
    method: 'POST',
    data: params,
  });
}
