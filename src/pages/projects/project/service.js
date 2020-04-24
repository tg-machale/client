// eslint-disable-next-line import/extensions
import request from '@/utils/request';

export async function queryOneProject(data) {
    return request('/server/api/project', {
      method: 'POST',
      data,
    });
  }
  export async function updataitemdata(params) {
    return request('/server/api/updataitemdata', {
      method: 'POST',
      data: { ...params },
    });
  }

  export async function deletedataitem(params) {
    return request('/server/api/deletedataitem', {
      method: 'POST',
      data: { ...params },
    });
  }