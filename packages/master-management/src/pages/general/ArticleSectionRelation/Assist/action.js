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
    api: modelTypeCollection.articleSectionRelationTypeCollection.add,
    params: handleData,
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
    api: modelTypeCollection.articleSectionRelationTypeCollection.remove,
    params: {
      articleId: getValueByKey({
        data: handleData,
        key: fieldData.articleId.name,
        defaultValue: '',
      }),
      sectionId: getValueByKey({
        data: handleData,
        key: fieldData.sectionId.name,
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
    api: modelTypeCollection.articleSectionRelationTypeCollection.refreshCache,
    params: {
      articleSectionRelationId: getValueByKey({
        data: handleData,
        key: fieldData.articleSectionRelationId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
