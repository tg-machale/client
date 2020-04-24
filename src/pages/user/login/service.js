import request from '@/utils/request';

// eslint-disable-next-line consistent-return
export async function fakeAccountLogin(params) {
  const { type } = params
  if (type === 'account') {
    return request('/server/api/login/account', {
      method: 'POST',
      data: params,
    });
  } if (type === 'mobile') {
    return request('/server/api/login/mobile', {
      method: 'POST',
      data: params,
    });
  }
}
export async function getFakeCaptcha(mobile) {
  return request(`/server/api/sendcode?phone=${mobile}`);
}
