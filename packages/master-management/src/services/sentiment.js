import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/sentiment/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/sentiment/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const addBasicInfoDataApiAddress = '/sentiment/addBasicInfo';

export async function addBasicInfoData(parameters) {
  return request({
    api: addBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const updateBasicInfoDataApiAddress = '/sentiment/updateBasicInfo';

export async function updateBasicInfoData(parameters) {
  return request({
    api: updateBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const setOnlineDataApiAddress = '/sentiment/setOnline';

export async function setOnlineData(parameters) {
  return request({
    api: setOnlineDataApiAddress,
    params: parameters,
  });
}

export const setOfflineDataApiAddress = '/sentiment/setOffline';

export async function setOfflineData(parameters) {
  return request({
    api: setOfflineDataApiAddress,
    params: parameters,
  });
}

export const removeDataApiAddress = '/sentiment/remove';

export async function removeData(parameters) {
  return request({
    api: removeDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress = '/sentiment/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}

export const createExportKeyDataApiAddress = '/sentiment/createExportKey';

export async function createExportKeyData(parameters) {
  return request({
    api: createExportKeyDataApiAddress,
    params: parameters,
  });
}

export const pageListOperateLogDataApiAddress = '/sentiment/pageListOperateLog';

export async function pageListOperateLogData(parameters) {
  return request({
    api: pageListOperateLogDataApiAddress,
    params: parameters,
  });
}

export const uploadFileDataApiAddress = '/sentiment/uploadFile';

export async function uploadFileData(parameters) {
  return request({
    api: uploadFileDataApiAddress,
    params: parameters,
  });
}
