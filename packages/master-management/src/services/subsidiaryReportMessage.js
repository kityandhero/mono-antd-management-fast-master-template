import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/subsidiaryReportMessage/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/subsidiaryReportMessage/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const repayDataApiAddress = '/subsidiaryReportMessage/repay';

export async function repayData(parameters) {
  return request({
    api: repayDataApiAddress,
    params: parameters,
  });
}
