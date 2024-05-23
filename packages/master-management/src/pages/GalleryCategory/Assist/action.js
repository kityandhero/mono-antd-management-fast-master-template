import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData } from '../Common/data';

export function singleTreeListAction({
  target,
  handleData = {},
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'galleryCategory/singleTreeList',
    params: {
      ...handleData,
    },
    target,
    handleData,
    showProcessing: false,
    successCallback,
    successMessage,
  });
}

export function setEnableAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'galleryCategory/setEnable',
    params: {
      galleryCategoryId: getValueByKey({
        data: handleData,
        key: fieldData.galleryCategoryId.name,
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
  successMessage = null,
}) {
  actionCore({
    api: 'galleryCategory/setDisable',
    params: {
      galleryCategoryId: getValueByKey({
        data: handleData,
        key: fieldData.galleryCategoryId.name,
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
    api: 'galleryCategory/refreshCache',
    params: {
      galleryCategoryId: getValueByKey({
        data: handleData,
        key: fieldData.galleryCategoryId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
