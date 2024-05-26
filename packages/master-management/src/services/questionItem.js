import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/questionItem/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/questionItem/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const addBasicInfoDataApiAddress = '/questionItem/addBasicInfo';

export async function addBasicInfoData(parameters) {
  return request({
    api: addBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const updateBasicInfoDataApiAddress = '/questionItem/updateBasicInfo';

export async function updateBasicInfoData(parameters) {
  return request({
    api: updateBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const updateSortDataApiAddress = '/questionItem/updateSort';

export async function updateSortData(parameters) {
  return request({
    api: updateSortDataApiAddress,
    params: parameters,
  });
}

export const setOnlineDataApiAddress = '/questionItem/setOnline';

export async function setOnlineData(parameters) {
  return request({
    api: setOnlineDataApiAddress,
    params: parameters,
  });
}

export const setOfflineDataApiAddress = '/questionItem/setOffline';

export async function setOfflineData(parameters) {
  return request({
    api: setOfflineDataApiAddress,
    params: parameters,
  });
}

export const removeDataApiAddress = '/questionItem/remove';

export async function removeData(parameters) {
  return request({
    api: removeDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress = '/questionItem/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}
