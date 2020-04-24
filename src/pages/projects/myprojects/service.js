// eslint-disable-next-line import/extensions
import request from '@/utils/request';

export async function queryProject() {
  return request('/server/api/projectList');
}
