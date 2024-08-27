import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/workflow/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/workflow/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const addOfficeAutomationArticleAuditDataApiAddress =
  '/workflow/addOfficeAutomationArticleAudit';

export async function addOfficeAutomationArticleAuditData(parameters) {
  return request({
    api: addOfficeAutomationArticleAuditDataApiAddress,
    params: parameters,
  });
}

export const addOfficeAutomationProcessApprovalDataApiAddress =
  '/workflow/addOfficeAutomationProcessApproval';

export async function addOfficeAutomationProcessApprovalData(parameters) {
  return request({
    api: addOfficeAutomationProcessApprovalDataApiAddress,
    params: parameters,
  });
}

export const updateBasicInfoDataApiAddress = '/workflow/updateBasicInfo';

export async function updateBasicInfoData(parameters) {
  return request({
    api: updateBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const setCaseNameTemplateDataApiAddress =
  '/workflow/setCaseNameTemplate';

export async function setCaseNameTemplateData(parameters) {
  return request({
    api: setCaseNameTemplateDataApiAddress,
    params: parameters,
  });
}

export const setDebugApproverModeDataApiAddress =
  '/workflow/setDebugApproverMode';

export async function setDebugApproverModeData(parameters) {
  return request({
    api: setDebugApproverModeDataApiAddress,
    params: parameters,
  });
}

export const setChannelDataApiAddress = '/workflow/setChannel';

export async function setChannelData(parameters) {
  return request({
    api: setChannelDataApiAddress,
    params: parameters,
  });
}

export const openMultibranchDataApiAddress = '/workflow/openMultibranch';

export async function openMultibranchData(parameters) {
  return request({
    api: openMultibranchDataApiAddress,
    params: parameters,
  });
}

export const openMultiEndDataApiAddress = '/workflow/openMultiEnd';

export async function openMultiEndData(parameters) {
  return request({
    api: openMultiEndDataApiAddress,
    params: parameters,
  });
}

export const setEnableDataApiAddress = '/workflow/setEnable';

export async function setEnableData(parameters) {
  return request({
    api: setEnableDataApiAddress,
    params: parameters,
  });
}

export const setDisableDataApiAddress = '/workflow/setDisable';

export async function setDisableData(parameters) {
  return request({
    api: setDisableDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress = '/workflow/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}

export const removeDataApiAddress = '/workflow/remove';

export async function removeData(parameters) {
  return request({
    api: removeDataApiAddress,
    params: parameters,
  });
}

export const pageListOperateLogDataApiAddress = '/workflow/pageListOperateLog';

export async function pageListOperateLogData(parameters) {
  return request({
    api: pageListOperateLogDataApiAddress,
    params: parameters,
  });
}

export const statisticSubmitCountDataApiAddress =
  '/workflow/statisticSubmitCount';

export async function statisticSubmitCountData(parameters) {
  return request({
    api: statisticSubmitCountDataApiAddress,
    params: parameters,
  });
}

export const statisticProcessedCountDataApiAddress =
  '/workflow/statisticProcessedCount';

export async function statisticProcessedCountData(parameters) {
  return request({
    api: statisticProcessedCountDataApiAddress,
    params: parameters,
  });
}

export const statisticWaitCountDataApiAddress = '/workflow/statisticWaitCount';

export async function statisticWaitCountData(parameters) {
  return request({
    api: statisticWaitCountDataApiAddress,
    params: parameters,
  });
}

export const statisticCarbonCopyCountDataApiAddress =
  '/workflow/statisticCarbonCopyCount';

export async function statisticCarbonCopyCountData(parameters) {
  return request({
    api: statisticCarbonCopyCountDataApiAddress,
    params: parameters,
  });
}
