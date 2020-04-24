// eslint-disable-next-line import/extensions
import request from '@/utils/request';

export async function querylist() {
  return request('/server/api/sendcode?phone=17754921781');
}

export async function saveform(data) {
  return request('/server/api/saveform', {
    method: 'POST',
    data,
  });
}
