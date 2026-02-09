import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData } from '../Common/data';

export async function setSortAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.departmentTypeCollection.setSort,
    params: {
      departmentId: getValueByKey({
        data: handleData,
        key: fieldData.departmentId.name,
      }),
      sort: getValueByKey({
        data: handleData,
        key: fieldData.sort.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function setParentIdAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.departmentTypeCollection.setParentId,
    params: {
      departmentId: getValueByKey({
        data: handleData,
        key: fieldData.departmentId.name,
      }),
      parentId: getValueByKey({
        data: handleData,
        key: fieldData.parentId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function setSubsidiaryIdAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.departmentTypeCollection.setSubsidiaryId,
    params: {
      departmentId: getValueByKey({
        data: handleData,
        key: fieldData.departmentId.name,
      }),
      subsidiaryId: getValueByKey({
        data: handleData,
        key: fieldData.subsidiaryId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function setNormalAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.departmentTypeCollection.setNormal,
    params: {
      departmentId: getValueByKey({
        data: handleData,
        key: fieldData.departmentId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function setInvalidAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.departmentTypeCollection.setInvalid,
    params: {
      departmentId: getValueByKey({
        data: handleData,
        key: fieldData.departmentId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function refreshCacheAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.departmentTypeCollection.refreshCache,
    params: {
      departmentId: getValueByKey({
        data: handleData,
        key: fieldData.departmentId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
