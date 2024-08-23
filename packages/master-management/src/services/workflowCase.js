import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/workflowCase/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const pageListUnderwayDataApiAddress = '/workflowCase/pageListUnderway';

export async function pageListUnderwayData(parameters) {
  return request({
    api: pageListUnderwayDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/workflowCase/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const getChainDataApiAddress = '/workflowCase/getChain';

export async function getChainData(parameters) {
  return request({
    api: getChainDataApiAddress,
    params: parameters,
  });
}

export const openCancelApproveSwitchDataApiAddress =
  '/workflowCase/openCancelApproveSwitch';

export async function openCancelApproveSwitchData(parameters) {
  return request({
    api: openCancelApproveSwitchDataApiAddress,
    params: parameters,
  });
}

export const closeCancelApproveSwitchDataApiAddress =
  '/workflowCase/closeCancelApproveSwitch';

export async function closeCancelApproveSwitchData(parameters) {
  return request({
    api: closeCancelApproveSwitchDataApiAddress,
    params: parameters,
  });
}

export const openResetAllApproveSwitchDataApiAddress =
  '/workflowCase/openResetAllApproveSwitch';

export async function openResetAllApproveSwitchData(parameters) {
  return request({
    api: openResetAllApproveSwitchDataApiAddress,
    params: parameters,
  });
}

export const closeResetAllApproveSwitchDataApiAddress =
  '/workflowCase/closeResetAllApproveSwitch';

export async function closeResetAllApproveSwitchData(parameters) {
  return request({
    api: closeResetAllApproveSwitchDataApiAddress,
    params: parameters,
  });
}

export const forceEndDataApiAddress = '/workflowCase/forceEnd';

export async function forceEndData(parameters) {
  return request({
    api: forceEndDataApiAddress,
    params: parameters,
  });
}

export const removeDataApiAddress = '/workflowCase/remove';

export async function removeData(parameters) {
  return request({
    api: removeDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress = '/workflowCase/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}

export const pageListOperateLogDataApiAddress =
  '/workflowCase/pageListOperateLog';

export async function pageListOperateLogData(parameters) {
  return request({
    api: pageListOperateLogDataApiAddress,
    params: parameters,
  });
}
