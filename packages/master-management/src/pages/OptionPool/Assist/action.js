import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { modelTypeCollection } from '../../../modelBuilders';
import { fieldData } from '../Common/data';

export function setEnableAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.optionPoolTypeCollection.setEnable,
    params: {
      optionPoolId: getValueByKey({
        data: handleData,
        key: fieldData.optionPoolId.name,
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
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.optionPoolTypeCollection.setDisable,
    params: {
      optionPoolId: getValueByKey({
        data: handleData,
        key: fieldData.optionPoolId.name,
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
    api: modelTypeCollection.optionPoolTypeCollection.refreshCache,
    params: {
      optionPoolId: getValueByKey({
        data: handleData,
        key: fieldData.optionPoolId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
