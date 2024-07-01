import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData } from '../Common/data';

export async function removeAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'presetQuestionItem/remove',
    params: {
      presetQuestionItemId: getValueByKey({
        data: handleData,
        key: fieldData.presetQuestionItemId.name,
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
    api: 'presetQuestionItem/refreshCache',
    params: {
      presetQuestionItemId: getValueByKey({
        data: handleData,
        key: fieldData.presetQuestionItemId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
