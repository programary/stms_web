import request from 'umi-request';
export async function fakeAccountLogin(params) {
  return request('/api/login', {
    method: 'POST',
    data: params,
    format: false,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
