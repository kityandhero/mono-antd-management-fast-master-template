import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData } from '../Common/data';

export async function setEnableAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.articleCommentTypeCollection.setEnable,
    params: {
      articleCommentId: getValueByKey({
        data: handleData,
        key: fieldData.articleCommentId.name,
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
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.articleCommentTypeCollection.setDisable,
    params: {
      articleCommentId: getValueByKey({
        data: handleData,
        key: fieldData.articleCommentId.name,
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
    api: modelTypeCollection.articleCommentTypeCollection.refreshCache,
    params: {
      articleCommentId: getValueByKey({
        data: handleData,
        key: fieldData.articleCommentId.name,
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
    api: modelTypeCollection.articleCommentTypeCollection.remove,
    params: {
      articleCommentId: getValueByKey({
        data: handleData,
        key: fieldData.articleCommentId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
