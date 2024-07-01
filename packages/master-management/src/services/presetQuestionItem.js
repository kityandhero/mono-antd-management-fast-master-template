import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/presetQuestionItem/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/presetQuestionItem/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const addBasicInfoDataApiAddress = '/presetQuestionItem/addBasicInfo';

export async function addBasicInfoData(parameters) {
  return request({
    api: addBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const updateBasicInfoDataApiAddress =
  '/presetQuestionItem/updateBasicInfo';

export async function updateBasicInfoData(parameters) {
  return request({
    api: updateBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const updateSortDataApiAddress = '/presetQuestionItem/updateSort';

export async function updateSortData(parameters) {
  return request({
    api: updateSortDataApiAddress,
    params: parameters,
  });
}

export const removeDataApiAddress = '/presetQuestionItem/remove';

export async function removeData(parameters) {
  return request({
    api: removeDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress = '/presetQuestionItem/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}

export const pageListOperateLogDataApiAddress =
  '/presetQuestionItem/pageListOperateLog';

export async function pageListOperateLogData(parameters) {
  return request({
    api: pageListOperateLogDataApiAddress,
    params: parameters,
  });
}

export const uploadImageDataApiAddress = '/presetQuestionItem/uploadImage';

export async function uploadImageData(parameters) {
  return request({
    api: uploadImageDataApiAddress,
    params: parameters,
  });
}
