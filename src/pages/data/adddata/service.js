// eslint-disable-next-line import/extensions
import request from '@/utils/request';

export async function fetchForm() {
  return request('/server/api/sendcode?phone=17754921781');
}

export async function addData(data) {
  return request('/server/api/adddata', {
    method: 'POST',
    data,
  });
}
