import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData } from '../Common/data';

export function setOnlineAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.callCenterTypeCollection.setOnline,
    params: {
      callCenterId: getValueByKey({
        data: handleData,
        key: fieldData.callCenterId.name,
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
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.callCenterTypeCollection.setOffline,
    params: {
      callCenterId: getValueByKey({
        data: handleData,
        key: fieldData.callCenterId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export function removeAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: modelTypeCollection.callCenterTypeCollection.remove,
    params: {
      callCenterId: getValueByKey({
        data: handleData,
        key: fieldData.callCenterId.name,
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
    api: modelTypeCollection.callCenterTypeCollection.refreshCache,
    params: {
      callCenterId: getValueByKey({
        data: handleData,
        key: fieldData.callCenterId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
