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
    api: 'qrCodeCategory/singleTreeList',
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
    api: 'qrCodeCategory/setEnable',
    params: {
      qrCodeCategoryId: getValueByKey({
        data: handleData,
        key: fieldData.qrCodeCategoryId.name,
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
    api: 'qrCodeCategory/setDisable',
    params: {
      qrCodeCategoryId: getValueByKey({
        data: handleData,
        key: fieldData.qrCodeCategoryId.name,
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
    api: 'qrCodeCategory/refreshCache',
    params: {
      qrCodeCategoryId: getValueByKey({
        data: handleData,
        key: fieldData.qrCodeCategoryId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
