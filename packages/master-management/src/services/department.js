import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/department/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const singleListDataApiAddress = '/department/singleList';

export async function singleListData(parameters) {
  return request({
    api: singleListDataApiAddress,
    params: parameters,
  });
}

export const singleTreeListDataApiAddress = '/department/singleTreeList';

export async function singleTreeListData(parameters) {
  return request({
    api: singleTreeListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/department/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const addBasicInfoDataApiAddress = '/department/addBasicInfo';

export async function addBasicInfoData(parameters) {
  return request({
    api: addBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const updateBasicInfoDataApiAddress = '/department/updateBasicInfo';

export async function updateBasicInfoData(parameters) {
  return request({
    api: updateBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const setParentIdDataApiAddress = '/department/setParentId';

export async function setParentIdData(parameters) {
  return request({
    api: setParentIdDataApiAddress,
    params: parameters,
  });
}

export const setSubsidiaryIdDataApiAddress = '/department/setSubsidiaryId';

export async function setSubsidiaryIdData(parameters) {
  return request({
    api: setSubsidiaryIdDataApiAddress,
    params: parameters,
  });
}

export const setSortDataApiAddress = '/department/setSort';

export async function setSortData(parameters) {
  return request({
    api: setSortDataApiAddress,
    params: parameters,
  });
}

export const setNormalDataApiAddress = '/department/setNormal';

export async function setNormalData(parameters) {
  return request({
    api: setNormalDataApiAddress,
    params: parameters,
  });
}

export const setInvalidDataApiAddress = '/department/setInvalid';

export async function setInvalidData(parameters) {
  return request({
    api: setInvalidDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress = '/department/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}

export const pageListOperateLogDataApiAddress =
  '/department/pageListOperateLog';

export async function pageListOperateLogData(parameters) {
  return request({
    api: pageListOperateLogDataApiAddress,
    params: parameters,
  });
}
