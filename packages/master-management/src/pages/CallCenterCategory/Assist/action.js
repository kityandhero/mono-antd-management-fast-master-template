import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData } from '../Common/data';

export function singleTreeListAction({
  target,
  handleData = {},
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'callCenterCategory/singleTreeList',
    params: {
      ...handleData,
    },
    target,
    handleData,
    showProcessing: false,
    successCallback,
    successMessage,
  });
}

export function setEnableAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'callCenterCategory/setEnable',
    params: {
      callCenterCategoryId: getValueByKey({
        data: handleData,
        key: fieldData.callCenterCategoryId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export function setDisableAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'callCenterCategory/setDisable',
    params: {
      callCenterCategoryId: getValueByKey({
        data: handleData,
        key: fieldData.callCenterCategoryId.name,
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
  successMessage = null,
}) {
  actionCore({
    api: 'callCenterCategory/refreshCache',
    params: {
      callCenterCategoryId: getValueByKey({
        data: handleData,
        key: fieldData.callCenterCategoryId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
