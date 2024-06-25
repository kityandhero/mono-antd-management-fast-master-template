import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData } from '../Common/data';

export function setOnlineAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'questionItem/setOnline',
    params: {
      questionItemId: getValueByKey({
        data: handleData,
        key: fieldData.questionItemId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export function setOfflineAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'questionItem/setOffline',
    params: {
      questionItemId: getValueByKey({
        data: handleData,
        key: fieldData.questionItemId.name,
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
    api: 'questionItem/refreshCache',
    params: {
      questionItemId: getValueByKey({
        data: handleData,
        key: fieldData.questionItemId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
