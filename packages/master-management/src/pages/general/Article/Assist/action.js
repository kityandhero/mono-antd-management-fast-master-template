import { ellipsis, getValueByKey } from 'easy-soft-utility';

import { actionCore, confirmActionCore } from 'antd-management-fast-common';

import { keyValueItemData } from '../../../../customConfig';
import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData } from '../Common/data';

export async function setOnlineAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.articleTypeCollection.setOnline,
    params: {
      articleId: getValueByKey({
        data: handleData,
        key: fieldData.articleId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function setOfflineAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.articleTypeCollection.setOffline,
    params: {
      articleId: getValueByKey({
        data: handleData,
        key: fieldData.articleId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function toggleRecommendAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.articleTypeCollection.toggleRecommend,
    params: {
      articleId: getValueByKey({
        data: handleData,
        key: fieldData.articleId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function toggleTopAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.articleTypeCollection.toggleTop,
    params: {
      articleId: getValueByKey({
        data: handleData,
        key: fieldData.articleId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function toggleVisibleAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.articleTypeCollection.toggleVisible,
    params: {
      articleId: getValueByKey({
        data: handleData,
        key: fieldData.articleId.name,
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
    api: modelTypeCollection.articleTypeCollection.refreshCache,
    params: {
      articleId: getValueByKey({
        data: handleData,
        key: fieldData.articleId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export function setMediaCollectionSortAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  const ids = getValueByKey({
    data: handleData,
    key: 'ids',
  });

  actionCore({
    api: modelTypeCollection.articleTypeCollection.setMediaCollectionSort,
    params: {
      articleId: getValueByKey({
        data: handleData,
        key: fieldData.articleId.name,
      }),
      ids,
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function removeMediaItemAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  const id = getValueByKey({
    data: handleData,
    key: keyValueItemData.id.name,
  });

  actionCore({
    api: modelTypeCollection.articleTypeCollection.removeMediaItem,
    params: {
      articleId: getValueByKey({
        data: handleData,
        key: fieldData.articleId.name,
      }),
      id,
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function removeMediaItemConfirmAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  const id = getValueByKey({
    data: handleData,
    key: keyValueItemData.id.name,
  });

  confirmActionCore({
    title: `移除媒体项`,
    content: `即将移除媒体项“${ellipsis(id, 40)}”，确定吗？`,
    target,
    handleData,
    successCallback,
    okAction: ({ target: t, handleData: r, successCallback: sc }) => {
      removeMediaItemAction({
        target: t,
        handleData: r,
        successCallback: sc,
        successMessage,
      });
    },
  });
}
