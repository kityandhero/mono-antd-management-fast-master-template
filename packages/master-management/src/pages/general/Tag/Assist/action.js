import { getValueByKey, request } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData } from '../Common/data';

export function singleTreeListAction({
  target,
  handleData = {},
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.tagTypeCollection.singleTreeList,
    params: {
      ...handleData,
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export function singleTreeListWithWorkflowAction({
  target,
  handleData = {},
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.tagTypeCollection.singleTreeListWithWorkflow,
    params: {
      ...handleData,
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export function singleTreeListWithQuestionAction({
  target,
  handleData = {},
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.tagTypeCollection.singleTreeListWithQuestion,
    params: {
      ...handleData,
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export function singleTreeListWithNoticeAction({
  target,
  handleData = {},
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.tagTypeCollection.singleTreeListWithNotice,
    params: {
      ...handleData,
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export function setColorAction({ handleData }) {
  request({
    api: modelTypeCollection.tagTypeCollection.setColor,
    params: {
      tagId: getValueByKey({
        data: handleData,
        key: fieldData.tagId.name,
        defaultValue: '',
      }),
      color: getValueByKey({
        data: handleData,
        key: fieldData.color.name,
        defaultValue: '',
      }),
    },
  });
}

export async function setSortAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.tagTypeCollection.setSort,
    params: {
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

export async function toggleRecommendAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.tagTypeCollection.toggleRecommend,
    params: {
      tagId: getValueByKey({
        data: handleData,
        key: fieldData.tagId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function setEnableAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.tagTypeCollection.setEnable,
    params: {
      tagId: getValueByKey({
        data: handleData,
        key: fieldData.tagId.name,
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
    api: modelTypeCollection.tagTypeCollection.setDisable,
    params: {
      tagId: getValueByKey({
        data: handleData,
        key: fieldData.tagId.name,
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
    api: modelTypeCollection.tagTypeCollection.remove,
    params: {
      tagId: getValueByKey({
        data: handleData,
        key: fieldData.tagId.name,
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
    api: modelTypeCollection.tagTypeCollection.refreshCache,
    params: {
      tagId: getValueByKey({
        data: handleData,
        key: fieldData.tagId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
