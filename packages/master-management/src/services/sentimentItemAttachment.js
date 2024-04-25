import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/sentimentItemAttachment/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/sentimentItemAttachment/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const addBasicInfoDataApiAddress =
  '/sentimentItemAttachment/addBasicInfo';

export async function addBasicInfoData(parameters) {
  return request({
    api: addBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const removeDataApiAddress = '/sentimentItemAttachment/remove';

export async function removeData(parameters) {
  return request({
    api: removeDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress =
  '/sentimentItemAttachment/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}

export const uploadFileDataApiAddress = '/sentimentItemAttachment/uploadFile';

export async function uploadFileData(parameters) {
  return request({
    api: uploadFileDataApiAddress,
    params: parameters,
  });
}
