import request from '@/utils/request';

export async function uploadAttach(params) {
  return request('/api/company/file/upload', {
    method: 'POST',
    data: params,
  });
}

export async function removeAttach(params) {
  return request('/api/company/file/delete', {
    method: 'POST',
    data: params,
  });
}

export async function queryAttach(params) {
  return request('/api/company/file/get', {
    method: 'POST',
    data: params,
  });
}
