import request from '@/utils/request';

export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function queryProvince() {
  return request('/server/api/geographic/province');
}
export async function queryCity(province) {
  return request(`/server/api/geographic/city?province=${province}`);
}
export async function query() {
  return request('/api/users');
}
export async function updateBase(data) {
  return request('/server/api/updateBase', {
    method: 'POST',
    data,
  });
}
export async function updatePassword(data) {
  return request('/server/api/updatePassword', {
    method: 'POST',
    data,
  });
}
export async function getCode(name) {
  return request(`/server/api/getcode?name=${name}`);
}
export async function updatePhone(data) {
  return request('/server/api/updatePhone', {
    method: 'POST',
    data,
  });
}
