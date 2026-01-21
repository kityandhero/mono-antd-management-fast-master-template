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

export const singleListNextNodeApproverDataApiAddress =
  '/workflowCase/singleListNextNodeApprover';

export async function singleListNextNodeApproverData(parameters) {
  return request({
    api: singleListNextNodeApproverDataApiAddress,
    params: parameters,
  });
}

export const getNextNextNodeApproverAndWorkflowNodeDataApiAddress =
  '/workflowCase/getNextNextNodeApproverAndWorkflowNode';

export async function getNextNextNodeApproverAndWorkflowNodeData(parameters) {
  return request({
    api: getNextNextNodeApproverAndWorkflowNodeDataApiAddress,
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

export const verifyCodeDataApiAddress = '/workflowCase/verifyCode';

export async function verifyCodeData(parameters) {
  return request({
    api: verifyCodeDataApiAddress,
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

export const updateBasicInfoDataApiAddress = '/workflowCase/updateBasicInfo';

export async function updateBasicInfoData(parameters) {
  return request({
    api: updateBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const toggleEmergencyDataApiAddress = '/workflowCase/toggleEmergency';

export async function toggleEmergencyData(parameters) {
  return request({
    api: toggleEmergencyDataApiAddress,
    params: parameters,
  });
}

export const setTitleFromCaseNameTemplateDataApiAddress =
  '/workflowCase/setTitleFromCaseNameTemplate';

export async function setTitleFromCaseNameTemplateData(parameters) {
  return request({
    api: setTitleFromCaseNameTemplateDataApiAddress,
    params: parameters,
  });
}

export const setSubsidiaryIdDataApiAddress = '/workflowCase/setSubsidiaryId';

export async function setSubsidiaryIdData(parameters) {
  return request({
    api: setSubsidiaryIdDataApiAddress,
    params: parameters,
  });
}

export const setApplicantStatementDataApiAddress =
  '/workflowCase/setApplicantStatement';

export async function setApplicantStatementData(parameters) {
  return request({
    api: setApplicantStatementDataApiAddress,
    params: parameters,
  });
}

export const setAttentionUserDataApiAddress = '/workflowCase/setAttentionUser';

export async function setAttentionUserData(parameters) {
  return request({
    api: setAttentionUserDataApiAddress,
    params: parameters,
  });
}

export const setAttentionStatementDataApiAddress =
  '/workflowCase/setAttentionStatement';

export async function setAttentionStatementData(parameters) {
  return request({
    api: setAttentionStatementDataApiAddress,
    params: parameters,
  });
}

export const hideDataApiAddress = '/workflowCase/hide';

export async function hideData(parameters) {
  return request({
    api: hideDataApiAddress,
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

export const disuseDataApiAddress = '/workflowCase/disuse';

export async function disuseData(parameters) {
  return request({
    api: disuseDataApiAddress,
    params: parameters,
  });
}

export const archiveDataApiAddress = '/workflowCase/archive';

export async function archiveData(parameters) {
  return request({
    api: archiveDataApiAddress,
    params: parameters,
  });
}

export const cancelArchiveDataApiAddress = '/workflowCase/cancelArchive';

export async function cancelArchiveData(parameters) {
  return request({
    api: cancelArchiveDataApiAddress,
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

export const refreshAllEntityCacheDataApiAddress =
  '/workflowCase/refreshAllEntityCache';

export async function refreshAllEntityCacheData(parameters) {
  return request({
    api: refreshAllEntityCacheDataApiAddress,
    params: parameters,
  });
}

export const repairSubsidiaryDataApiAddress = '/workflowCase/repairSubsidiary';

export async function repairSubsidiaryData(parameters) {
  return request({
    api: repairSubsidiaryDataApiAddress,
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
