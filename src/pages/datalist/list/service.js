import request from '@/utils/request';

export async function queryprolist(params) {
  return request('/server/api/queryprolist', {
    params,
  });
}
export async function quotedata(params) {
    return request('/server/api/quote', {
      method: 'POST',
      data: { ...params },
    });
  }
