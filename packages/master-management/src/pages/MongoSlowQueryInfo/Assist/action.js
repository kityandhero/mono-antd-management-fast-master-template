import { actionCore } from 'antd-management-fast-common';

import { modelTypeCollection } from '../../../modelBuilders';

export async function openSlowQueryRecordAction({
  target,
  handleData,
  successCallback,
  successMessage = '开启慢查询日志成功',
}) {
  actionCore({
    api: modelTypeCollection.mongoSlowQueryInfoTypeCollection
      .openSlowQueryRecord,
    params: {},
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function closeSlowQueryRecordAction({
  target,
  handleData,
  successCallback,
  successMessage = '关闭慢查询日志成功',
}) {
  actionCore({
    api: modelTypeCollection.mongoSlowQueryInfoTypeCollection
      .closeSlowQueryRecord,
    params: {},
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
