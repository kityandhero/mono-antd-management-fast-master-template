import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData } from '../Common/data';

export function setOnlineAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'presetQuestion/setOnline',
    params: {
      presetQuestionId: getValueByKey({
        data: handleData,
        key: fieldData.presetQuestionId.name,
        defaultValue: '',
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export function setOfflineAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'presetQuestion/setOffline',
    params: {
      presetQuestionId: getValueByKey({
        data: handleData,
        key: fieldData.presetQuestionId.name,
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
    api: 'presetQuestion/remove',
    params: {
      presetQuestionId: getValueByKey({
        data: handleData,
        key: fieldData.presetQuestionId.name,
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
    api: 'presetQuestion/refreshCache',
    params: {
      presetQuestionId: getValueByKey({
        data: handleData,
        key: fieldData.presetQuestionId.name,
        defaultValue: '',
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export function practiceAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'presetQuestion/practice',
    params: {
      ...handleData,
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
