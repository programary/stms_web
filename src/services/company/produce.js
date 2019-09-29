import request from '@/utils/request';

export async function queryList(params) {
  return request('/api/company/produce/list', {
    method: 'POST',
    data: params,
  });
}

export async function add(params) {
  return request('/api/company/produce/add', {
    method: 'POST',
    data: params,
  });
}

export async function modify(params) {
  return request('/api/company/produce/edit', {
    method: 'POST',
    data: params,
  });
}

export async function queryDetail(params) {
  return request('/api/company/produce/detail', {
    method: 'POST',
    data: params,
  });
}

export async function remove(params) {
  return request('/api/company/produce/delete', {
    method: 'POST',
    data: params,
  });
}
