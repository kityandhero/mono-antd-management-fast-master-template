import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/questionnaire/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/questionnaire/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const addBasicInfoDataApiAddress = '/questionnaire/addBasicInfo';

export async function addBasicInfoData(parameters) {
  return request({
    api: addBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const updateBasicInfoDataApiAddress = '/questionnaire/updateBasicInfo';

export async function updateBasicInfoData(parameters) {
  return request({
    api: updateBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const updateContentInfoDataApiAddress =
  '/questionnaire/updateContentInfo';

export async function updateContentInfoData(parameters) {
  return request({
    api: updateContentInfoDataApiAddress,
    params: parameters,
  });
}

export const updateSortDataApiAddress = '/questionnaire/updateSort';

export async function updateSortData(parameters) {
  return request({
    api: updateSortDataApiAddress,
    params: parameters,
  });
}

export const toggleRecommendDataApiAddress = '/questionnaire/toggleRecommend';

export async function toggleRecommendData(parameters) {
  return request({
    api: toggleRecommendDataApiAddress,
    params: parameters,
  });
}

export const toggleTopDataApiAddress = '/questionnaire/toggleTop';

export async function toggleTopData(parameters) {
  return request({
    api: toggleTopDataApiAddress,
    params: parameters,
  });
}

export const toggleVisibleDataApiAddress = '/questionnaire/toggleVisible';

export async function toggleVisibleData(parameters) {
  return request({
    api: toggleVisibleDataApiAddress,
    params: parameters,
  });
}

export const setOnlineDataApiAddress = '/questionnaire/setOnline';

export async function setOnlineData(parameters) {
  return request({
    api: setOnlineDataApiAddress,
    params: parameters,
  });
}

export const setOfflineDataApiAddress = '/questionnaire/setOffline';

export async function setOfflineData(parameters) {
  return request({
    api: setOfflineDataApiAddress,
    params: parameters,
  });
}

export const removeDataApiAddress = '/questionnaire/remove';

export async function removeData(parameters) {
  return request({
    api: removeDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress = '/questionnaire/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}
