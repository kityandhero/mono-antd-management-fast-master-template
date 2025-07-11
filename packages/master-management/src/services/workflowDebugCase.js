import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/workflowDebugCase/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const pageListUnderwayDataApiAddress =
  '/workflowDebugCase/pageListUnderway';

export async function pageListUnderwayData(parameters) {
  return request({
    api: pageListUnderwayDataApiAddress,
    params: parameters,
  });
}

export const pageListLatestApproveDataApiAddress =
  '/workflowDebugCase/pageListLatestApprove';

export async function pageListLatestApproveData(parameters) {
  return request({
    api: pageListLatestApproveDataApiAddress,
    params: parameters,
  });
}

export const pageListWaitApproveDataApiAddress =
  '/workflowDebugCase/pageListWaitApprove';

export async function pageListWaitApproveData(parameters) {
  return request({
    api: pageListWaitApproveDataApiAddress,
    params: parameters,
  });
}

export const singleListNextNodeApproverDataApiAddress =
  '/workflowDebugCase/singleListNextNodeApprover';

export async function singleListNextNodeApproverData(parameters) {
  return request({
    api: singleListNextNodeApproverDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/workflowDebugCase/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const verifyCodeDataApiAddress = '/workflowDebugCase/verifyCode';

export async function verifyCodeData(parameters) {
  return request({
    api: verifyCodeDataApiAddress,
    params: parameters,
  });
}

export const getByWorkflowDataApiAddress = '/workflowDebugCase/getByWorkflow';

export async function getByWorkflowData(parameters) {
  return request({
    api: getByWorkflowDataApiAddress,
    params: parameters,
  });
}

export const getChainByWorkflowDataApiAddress =
  '/workflowDebugCase/getChainByWorkflow';

export async function getChainByWorkflowData(parameters) {
  return request({
    api: getChainByWorkflowDataApiAddress,
    params: parameters,
  });
}

export const updateBasicInfoDataApiAddress =
  '/workflowDebugCase/updateBasicInfo';

export async function updateBasicInfoData(parameters) {
  return request({
    api: updateBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const toggleEmergencyDataApiAddress =
  '/workflowDebugCase/toggleEmergency';

export async function toggleEmergencyData(parameters) {
  return request({
    api: toggleEmergencyDataApiAddress,
    params: parameters,
  });
}

export const setSubsidiaryIdDataApiAddress =
  '/workflowDebugCase/setSubsidiaryId';

export async function setSubsidiaryIdData(parameters) {
  return request({
    api: setSubsidiaryIdDataApiAddress,
    params: parameters,
  });
}

export const setApplicantStatementDataApiAddress =
  '/workflowDebugCase/setApplicantStatement';

export async function setApplicantStatementData(parameters) {
  return request({
    api: setApplicantStatementDataApiAddress,
    params: parameters,
  });
}

export const setAttentionUserDataApiAddress =
  '/workflowDebugCase/setAttentionUser';

export async function setAttentionUserData(parameters) {
  return request({
    api: setAttentionUserDataApiAddress,
    params: parameters,
  });
}

export const setAttentionStatementDataApiAddress =
  '/workflowDebugCase/setAttentionStatement';

export async function setAttentionStatementData(parameters) {
  return request({
    api: setAttentionStatementDataApiAddress,
    params: parameters,
  });
}

export const submitFormDataApiAddress = '/workflowDebugCase/submitForm';

export async function submitFormData(parameters) {
  return request({
    api: submitFormDataApiAddress,
    params: parameters,
  });
}

export const submitApprovalDataApiAddress = '/workflowDebugCase/submitApproval';

export async function submitApprovalData(parameters) {
  return request({
    api: submitApprovalDataApiAddress,
    params: parameters,
  });
}

export const openCancelApproveSwitchDataApiAddress =
  '/workflowDebugCase/openCancelApproveSwitch';

export async function openCancelApproveSwitchData(parameters) {
  return request({
    api: openCancelApproveSwitchDataApiAddress,
    params: parameters,
  });
}

export const closeCancelApproveSwitchDataApiAddress =
  '/workflowDebugCase/closeCancelApproveSwitch';

export async function closeCancelApproveSwitchData(parameters) {
  return request({
    api: closeCancelApproveSwitchDataApiAddress,
    params: parameters,
  });
}

export const openResetAllApproveSwitchDataApiAddress =
  '/workflowDebugCase/openResetAllApproveSwitch';

export async function openResetAllApproveSwitchData(parameters) {
  return request({
    api: openResetAllApproveSwitchDataApiAddress,
    params: parameters,
  });
}

export const closeResetAllApproveSwitchDataApiAddress =
  '/workflowDebugCase/closeResetAllApproveSwitch';

export async function closeResetAllApproveSwitchData(parameters) {
  return request({
    api: closeResetAllApproveSwitchDataApiAddress,
    params: parameters,
  });
}

export const forceEndDataApiAddress = '/workflowDebugCase/forceEnd';

export async function forceEndData(parameters) {
  return request({
    api: forceEndDataApiAddress,
    params: parameters,
  });
}

export const archiveDataApiAddress = '/workflowDebugCase/archive';

export async function archiveData(parameters) {
  return request({
    api: archiveDataApiAddress,
    params: parameters,
  });
}

export const cancelArchiveDataApiAddress = '/workflowDebugCase/cancelArchive';

export async function cancelArchiveData(parameters) {
  return request({
    api: cancelArchiveDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress = '/workflowDebugCase/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}

export const pageListOperateLogDataApiAddress =
  '/workflowDebugCase/pageListOperateLog';

export async function pageListOperateLogData(parameters) {
  return request({
    api: pageListOperateLogDataApiAddress,
    params: parameters,
  });
}
