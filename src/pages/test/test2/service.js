import request from '@/utils/request';

export async function querylist() {
  return request('/api/list');
}
