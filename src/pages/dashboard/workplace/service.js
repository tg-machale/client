// eslint-disable-next-line import/extensions
import request from '@/utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}
export async function queryActivities() {
  return request('/api/activities');
}
export async function fakeChartData() {
  return request('/api/fake_chart_data');
}
export async function queryCurrent(name) {
  return request(`/server/api/currentUser?name=${name}`);
}
