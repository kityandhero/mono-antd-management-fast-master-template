import { request } from 'easy-soft-utility';

export const getByFlowCaseIdDataApiAddress =
  '/workflowCaseNextProcessProgressBase/getByFlowCaseId';

export async function getByFlowCaseIdData(parameters) {
  return request({
    api: getByFlowCaseIdDataApiAddress,
    params: parameters,
  });
}
