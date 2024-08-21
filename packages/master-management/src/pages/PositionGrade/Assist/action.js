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
    api: 'positionGrade/refreshCache',
    params: {
      positionGradeId: getValueByKey({
        data: handleData,
        key: fieldData.positionGradeId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
