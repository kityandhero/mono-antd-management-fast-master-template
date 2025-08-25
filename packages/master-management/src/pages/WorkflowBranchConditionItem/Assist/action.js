import { getValueByKey } from 'easy-soft-utility';

import { actionCore, confirmActionCore } from 'antd-management-fast-common';

import { modelTypeCollection } from '../../../modelBuilders';
import { fieldData } from '../Common/data';

export async function removeAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowBranchConditionItemTypeCollection.remove,
    params: {
      workflowBranchConditionItemId: getValueByKey({
        data: handleData,
        key: fieldData.workflowBranchConditionItemId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function removeConfirmAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  confirmActionCore({
    title: `移除条件项`,
    content: `即将移除条件项，确定吗？`,
    api: modelTypeCollection.workflowBranchConditionItemTypeCollection.remove,
    params: {
      workflowBranchConditionItemId: getValueByKey({
        data: handleData,
        key: fieldData.workflowBranchConditionItemId.name,
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
    api: modelTypeCollection.workflowBranchConditionItemTypeCollection
      .refreshCache,
    params: {
      workflowBranchConditionItemId: getValueByKey({
        data: handleData,
        key: fieldData.workflowBranchConditionItemId.name,
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
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowBranchConditionItemTypeCollection
      .refreshAllEntityCache,
    params: {},
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
