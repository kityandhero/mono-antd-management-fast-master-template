import { request } from 'easy-soft-utility';

export const getByFlowCaseIdDataApiAddress =
  '/workflowDebugCaseNextProcessProgressBase/getByFlowCaseId';

export async function getByFlowCaseIdData(parameters) {
  return request({
    api: getByFlowCaseIdDataApiAddress,
    params: parameters,
  });
}
