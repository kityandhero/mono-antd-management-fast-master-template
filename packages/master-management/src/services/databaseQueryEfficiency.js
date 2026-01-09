import { request } from 'easy-soft-utility';

export const singleListDataApiAddress = '/databaseQueryEfficiency/singleList';

export async function singleListData(parameters) {
  return request({
    api: singleListDataApiAddress,
    params: parameters,
  });
}
