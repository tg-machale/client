import request from '@/utils/request';


export async function createproject(data) {
    return request('/server/api/createproject', {
      method: 'POST',
      data,
    });
}
