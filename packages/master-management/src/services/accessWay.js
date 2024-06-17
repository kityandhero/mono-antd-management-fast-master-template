import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/accessWay/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const pageListAssemblyVerifyDataApiAddress =
  '/accessWay/pageListAssemblyVerify';

export async function pageListAssemblyVerifyData(parameters) {
  return request({
    api: pageListAssemblyVerifyDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/accessWay/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const getPermissionFileContentDataApiAddress =
  '/accessWay/getPermissionFileContent';

export async function getPermissionFileContentData(parameters) {
  return request({
    api: getPermissionFileContentDataApiAddress,
    params: parameters,
  });
}

export const getInfrastructureModelConfigFileContentDataApiAddress =
  '/accessWay/getInfrastructureModelConfigFileContent';

export async function getInfrastructureModelConfigFileContentData(parameters) {
  return request({
    api: getInfrastructureModelConfigFileContentDataApiAddress,
    params: parameters,
  });
}

export const getBusinessModelConfigFileContentDataApiAddress =
  '/accessWay/getBusinessModelConfigFileContent';

export async function getBusinessModelConfigFileContentData(parameters) {
  return request({
    api: getBusinessModelConfigFileContentDataApiAddress,
    params: parameters,
  });
}

export const getAllModelConfigFileContentDataApiAddress =
  '/accessWay/getAllModelConfigFileContent';

export async function getAllModelConfigFileContentData(parameters) {
  return request({
    api: getAllModelConfigFileContentDataApiAddress,
    params: parameters,
  });
}

export const getActionMapDataApiAddress = '/accessWay/getActionMap';

export async function getActionMapData(parameters) {
  return request({
    api: getActionMapDataApiAddress,
    params: parameters,
  });
}

export const getPermissionActionMapDataApiAddress =
  '/accessWay/getPermissionActionMap';

export async function getPermissionActionMapData(parameters) {
  return request({
    api: getPermissionActionMapDataApiAddress,
    params: parameters,
  });
}

export const getNonePermissionActionMapDataApiAddress =
  '/accessWay/getNonePermissionActionMap';

export async function getNonePermissionActionMapData(parameters) {
  return request({
    api: getNonePermissionActionMapDataApiAddress,
    params: parameters,
  });
}

export const testPermissionActionUniqueDataApiAddress =
  '/accessWay/testPermissionActionUnique';

export async function testPermissionActionUniqueData(parameters) {
  return request({
    api: testPermissionActionUniqueDataApiAddress,
    params: parameters,
  });
}

export const testPermissionActionDataApiAddress =
  '/accessWay/testPermissionAction';

export async function testPermissionActionData(parameters) {
  return request({
    api: testPermissionActionDataApiAddress,
    params: parameters,
  });
}

export const removeDataApiAddress = '/accessWay/remove';

export async function removeData(parameters) {
  return request({
    api: removeDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress = '/accessWay/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}
