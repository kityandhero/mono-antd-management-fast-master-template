import { request } from 'easy-soft-utility';

export const getGraphicalTreeDataApiAddress =
  '/organizationBase/getGraphicalTree';

export async function getGraphicalTreeData(parameters) {
  return request({
    api: getGraphicalTreeDataApiAddress,
    params: parameters,
  });
}

export const getGraphicalDirectDepartmentDataApiAddress =
  '/organizationBase/getGraphicalDirectDepartment';

export async function getGraphicalDirectDepartmentData(parameters) {
  return request({
    api: getGraphicalDirectDepartmentDataApiAddress,
    params: parameters,
  });
}

export const getGraphicalSingleSubsidiaryDepartmentDataApiAddress =
  '/organizationBase/getGraphicalSingleSubsidiaryDepartment';

export async function getGraphicalSingleSubsidiaryDepartmentData(parameters) {
  return request({
    api: getGraphicalSingleSubsidiaryDepartmentDataApiAddress,
    params: parameters,
  });
}
