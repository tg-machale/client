import request from '@/utils/request';
export async function query() {
  return request('/api/users');
}
export async function queryCurrent(name) {
  return request(`/server/api/currentUser?name=${name}`);
}
export async function queryNotices() {
  return request('/api/notices');
}
