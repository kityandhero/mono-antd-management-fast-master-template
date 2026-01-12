import { request } from 'easy-soft-utility';

export const singleListDataApiAddress = '/databaseLock/singleList';

export async function singleListData(parameters) {
  return request({
    api: singleListDataApiAddress,
    params: parameters,
  });
}

export const getCommandDataApiAddress = '/databaseLock/getCommand';

export async function getCommandData(parameters) {
  return request({
    api: getCommandDataApiAddress,
    params: parameters,
  });
}
