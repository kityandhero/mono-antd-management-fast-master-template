import { request } from 'easy-soft-utility';

export const getDataApiAddress = '/hostServiceBase/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const changeDataApiAddress = '/hostServiceBase/change';

export async function changeData(parameters) {
  return request({
    api: changeDataApiAddress,
    params: parameters,
  });
}

export const refreshAllStatusDataApiAddress =
  '/hostServiceBase/refreshAllStatus';

export async function refreshAllStatusData(parameters) {
  return request({
    api: refreshAllStatusDataApiAddress,
    params: parameters,
  });
}
