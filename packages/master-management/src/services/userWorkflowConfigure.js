import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/userWorkflowConfigure/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const singleListDataApiAddress = '/userWorkflowConfigure/singleList';

export async function singleListData(parameters) {
  return request({
    api: singleListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/userWorkflowConfigure/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const setMobileApproveViewModeDataApiAddress =
  '/userWorkflowConfigure/setMobileApproveViewMode';

export async function setMobileApproveViewModeData(parameters) {
  return request({
    api: setMobileApproveViewModeDataApiAddress,
    params: parameters,
  });
}

export const toggleAllowScanCodeVerificationDataApiAddress =
  '/userWorkflowConfigure/toggleAllowScanCodeVerification';

export async function toggleAllowScanCodeVerificationData(parameters) {
  return request({
    api: toggleAllowScanCodeVerificationDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress = '/userWorkflowConfigure/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}
