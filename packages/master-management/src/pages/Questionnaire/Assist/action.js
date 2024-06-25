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
    api: 'questionnaire/setOnline',
    params: {
      questionnaireId: getValueByKey({
        data: handleData,
        key: fieldData.questionnaireId.name,
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
    api: 'questionnaire/setOffline',
    params: {
      questionnaireId: getValueByKey({
        data: handleData,
        key: fieldData.questionnaireId.name,
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
    api: 'questionnaire/refreshCache',
    params: {
      questionnaireId: getValueByKey({
        data: handleData,
        key: fieldData.questionnaireId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
