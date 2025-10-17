import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData } from '../Common/data';

export async function refreshCacheAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: modelTypeCollection.emailStatisticTypeCollection.refreshCache,
    params: {
      emailStatisticId: getValueByKey({
        data: handleData,
        key: fieldData.emailStatisticId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
