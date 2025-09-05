import { request } from 'easy-soft-utility';

export const singleListDataApiAddress = '/mongoSlowQueryInfo/singleList';

export async function singleListData(parameters) {
  return request({
    api: singleListDataApiAddress,
    params: parameters,
  });
}

export const getCurrentOperationsDataApiAddress =
  '/mongoSlowQueryInfo/getCurrentOperations';

export async function getCurrentOperationsData(parameters) {
  return request({
    api: getCurrentOperationsDataApiAddress,
    params: parameters,
  });
}

export const getProfilingStatusDataApiAddress =
  '/mongoSlowQueryInfo/getProfilingStatus';

export async function getProfilingStatusData(parameters) {
  return request({
    api: getProfilingStatusDataApiAddress,
    params: parameters,
  });
}

export const openSlowQueryRecordDataApiAddress =
  '/mongoSlowQueryInfo/openSlowQueryRecord';

export async function openSlowQueryRecordData(parameters) {
  return request({
    api: openSlowQueryRecordDataApiAddress,
    params: parameters,
  });
}

export const closeSlowQueryRecordDataApiAddress =
  '/mongoSlowQueryInfo/closeSlowQueryRecord';

export async function closeSlowQueryRecordData(parameters) {
  return request({
    api: closeSlowQueryRecordDataApiAddress,
    params: parameters,
  });
}
