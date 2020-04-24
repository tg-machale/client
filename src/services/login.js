import request from '@/utils/request';
export async function fakeAccountLogin(params) {
  const { type } = params
  if (type === 'account') {
    return request('/server/api/login/account', {
      method: 'POST',
      data: params,
    });
  } if (type === 'mobile') {
    return request('/api/login/mobile', {
      method: 'POST',
      data: params,
    });
  }
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
