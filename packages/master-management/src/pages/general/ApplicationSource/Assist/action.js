import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData } from '../Common/data';

export async function setEnableAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: modelTypeCollection.applicationSourceTypeCollection.setEnable,
    params: {
      applicationSourceId: getValueByKey({
        data: handleData,
        key: fieldData.applicationSourceId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function setDisableAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: modelTypeCollection.applicationSourceTypeCollection.setDisable,
    params: {
      applicationSourceId: getValueByKey({
        data: handleData,
        key: fieldData.applicationSourceId.name,
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
    api: modelTypeCollection.applicationSourceTypeCollection.refreshCache,
    params: {
      applicationSourceId: getValueByKey({
        data: handleData,
        key: fieldData.applicationSourceId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
