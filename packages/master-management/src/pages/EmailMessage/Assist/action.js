import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { modelTypeCollection } from '../../../modelBuilders';
import { fieldData } from '../Common/data';

export async function refreshCacheAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: modelTypeCollection.emailMessageTypeCollection.refreshCache,
    params: {
      emailMessageId: getValueByKey({
        data: handleData,
        key: fieldData.emailMessageId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
