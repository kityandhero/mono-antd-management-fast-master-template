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
