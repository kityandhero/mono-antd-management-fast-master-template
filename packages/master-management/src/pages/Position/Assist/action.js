import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData } from '../Common/data';

export async function refreshCacheAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'position/refreshCache',
    params: {
      positionId: getValueByKey({
        data: handleData,
        key: fieldData.positionId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
