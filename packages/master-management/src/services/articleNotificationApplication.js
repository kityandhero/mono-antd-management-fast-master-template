import { request } from 'easy-soft-utility';

export const pageListDataApiAddress =
  '/articleNotificationApplication/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/articleNotificationApplication/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const addBasicInfoDataApiAddress =
  '/articleNotificationApplication/addBasicInfo';

export async function addBasicInfoData(parameters) {
  return request({
    api: addBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const setApplicationIdDataApiAddress =
  '/articleNotificationApplication/setApplicationId';

export async function setApplicationIdData(parameters) {
  return request({
    api: setApplicationIdDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress =
  '/articleNotificationApplication/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}
