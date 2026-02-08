import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData } from '../Common/data';

export async function addAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: modelTypeCollection.questionTagRelationTypeCollection.add,
    params: handleData,
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function addBatchAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: modelTypeCollection.questionTagRelationTypeCollection.addBatch,
    params: {
      questionId: getValueByKey({
        data: handleData,
        key: fieldData.questionId.name,
        defaultValue: '',
      }),
      tagIdCollection: getValueByKey({
        data: handleData,
        key: 'tagIdCollection',
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
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.questionTagRelationTypeCollection.remove,
    params: {
      questionId: getValueByKey({
        data: handleData,
        key: fieldData.questionId.name,
        defaultValue: '',
      }),
      tagId: getValueByKey({
        data: handleData,
        key: fieldData.tagId.name,
        defaultValue: '',
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
    api: modelTypeCollection.workflowTagRelationTypeCollection.refreshCache,
    params: {
      workflowTagRelationId: getValueByKey({
        data: handleData,
        key: fieldData.workflowTagRelationId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
