import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { modelTypeCollection } from '../../../modelBuilders';
import { fieldData } from '../Common/data';

export async function addAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: modelTypeCollection
      .workflowRangeEffectiveSubsidiaryRelationTypeCollection.add,
    params: {
      workflowId: getValueByKey({
        data: handleData,
        key: fieldData.workflowId.name,
        defaultValue: '',
      }),
      subsidiaryId: getValueByKey({
        data: handleData,
        key: fieldData.subsidiaryId.name,
        defaultValue: '',
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function removeAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: modelTypeCollection
      .workflowRangeEffectiveSubsidiaryRelationTypeCollection.remove,
    params: {
      workflowRangeEffectiveSubsidiaryRelationId: getValueByKey({
        data: handleData,
        key: fieldData.workflowRangeEffectiveSubsidiaryRelationId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function removeAllAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: modelTypeCollection
      .workflowRangeEffectiveSubsidiaryRelationTypeCollection.removeAll,
    params: {
      workflowId: getValueByKey({
        data: handleData,
        key: fieldData.workflowId.name,
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
    api: modelTypeCollection
      .workflowRangeEffectiveSubsidiaryRelationTypeCollection.refreshCache,
    params: {
      workflowRangeEffectiveSubsidiaryRelationId: getValueByKey({
        data: handleData,
        key: fieldData.workflowRangeEffectiveSubsidiaryRelationId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
