import request from '@/utils/request';

export async function fakeRegister(params) {
  return request('/server/api/register', {
    method: 'POST',
    data: params,
  });
}


export async function getcaptcha(phone) {
  return request(`/server/api/sendcode?phone=${phone}`)
}
