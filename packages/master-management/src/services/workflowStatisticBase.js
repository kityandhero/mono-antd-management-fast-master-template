import { request } from 'easy-soft-utility';

export const statisticCaseSubmitCountDataApiAddress =
  '/workflowStatisticBase/statisticCaseSubmitCount';

export async function statisticCaseSubmitCountData(parameters) {
  return request({
    api: statisticCaseSubmitCountDataApiAddress,
    params: parameters,
  });
}

export const statisticDebugCaseSubmitCountDataApiAddress =
  '/workflowStatisticBase/statisticDebugCaseSubmitCount';

export async function statisticDebugCaseSubmitCountData(parameters) {
  return request({
    api: statisticDebugCaseSubmitCountDataApiAddress,
    params: parameters,
  });
}

export const statisticCaseLatestApproveCountDataApiAddress =
  '/workflowStatisticBase/statisticCaseLatestApproveCount';

export async function statisticCaseLatestApproveCountData(parameters) {
  return request({
    api: statisticCaseLatestApproveCountDataApiAddress,
    params: parameters,
  });
}

export const statisticDebugCaseLatestApproveCountDataApiAddress =
  '/workflowStatisticBase/statisticDebugCaseLatestApproveCount';

export async function statisticDebugCaseLatestApproveCountData(parameters) {
  return request({
    api: statisticDebugCaseLatestApproveCountDataApiAddress,
    params: parameters,
  });
}

export const statisticCaseWaitApproveCountDataApiAddress =
  '/workflowStatisticBase/statisticCaseWaitApproveCount';

export async function statisticCaseWaitApproveCountData(parameters) {
  return request({
    api: statisticCaseWaitApproveCountDataApiAddress,
    params: parameters,
  });
}

export const statisticDebugCaseWaitApproveCountDataApiAddress =
  '/workflowStatisticBase/statisticDebugCaseWaitApproveCount';

export async function statisticDebugCaseWaitApproveCountData(parameters) {
  return request({
    api: statisticDebugCaseWaitApproveCountDataApiAddress,
    params: parameters,
  });
}

export const statisticCaseNotificationWaitReadCountDataApiAddress =
  '/workflowStatisticBase/statisticCaseNotificationWaitReadCount';

export async function statisticCaseNotificationWaitReadCountData(parameters) {
  return request({
    api: statisticCaseNotificationWaitReadCountDataApiAddress,
    params: parameters,
  });
}

export const statisticDebugCaseNotificationWaitReadCountDataApiAddress =
  '/workflowStatisticBase/statisticDebugCaseNotificationWaitReadCount';

export async function statisticDebugCaseNotificationWaitReadCountData(
  parameters,
) {
  return request({
    api: statisticDebugCaseNotificationWaitReadCountDataApiAddress,
    params: parameters,
  });
}
