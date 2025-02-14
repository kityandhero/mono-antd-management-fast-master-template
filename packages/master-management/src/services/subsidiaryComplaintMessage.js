import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/subsidiaryComplaintMessage/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/subsidiaryComplaintMessage/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const repayDataApiAddress = '/subsidiaryComplaintMessage/repay';

export async function repayData(parameters) {
  return request({
    api: repayDataApiAddress,
    params: parameters,
  });
}
