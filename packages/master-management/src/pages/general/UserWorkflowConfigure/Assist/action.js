import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData } from '../Common/data';

export async function toggleAllowScanCodeVerificationAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.userWorkflowConfigureTypeCollection
      .toggleAllowScanCodeVerification,
    params: {
      userId: getValueByKey({
        data: handleData,
        key: fieldData.userId.name,
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
    api: modelTypeCollection.userWorkflowConfigureTypeCollection.refreshCache,
    params: {
      userWorkflowConfigureId: getValueByKey({
        data: handleData,
        key: fieldData.userWorkflowConfigureId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function refreshAllEntityCacheAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: modelTypeCollection.userWorkflowConfigureTypeCollection
      .refreshAllEntityCache,
    params: {},
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
