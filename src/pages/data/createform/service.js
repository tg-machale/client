// eslint-disable-next-line import/extensions
import request from '@/utils/request';

export async function saveform(data) {
  return request('/server/api/saveform', {
    method: 'POST',
    data,
  });
}

export async function deleteformitem(data) {
  return request('/server/api/deleteformitem', {
    method: 'POST',
    data,
  });
}
