import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { workflowCaseTypeCollection } from '../../../modelBuilders/general/workflowCase';
import { fieldData } from '../Common/data';

export async function getChainAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'workflowCase/getChain',
    params: {
      workflowCaseId: getValueByKey({
        data: handleData,
        key: fieldData.workflowCaseId.name,
        defaultValue: '',
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
    showProcessing: false,
  });
}

export async function openCancelApproveSwitchAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'workflowCase/openCancelApproveSwitch',
    params: {
      workflowCaseId: getValueByKey({
        data: handleData,
        key: fieldData.workflowCaseId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function closeCancelApproveSwitchAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'workflowCase/closeCancelApproveSwitch',
    params: {
      workflowCaseId: getValueByKey({
        data: handleData,
        key: fieldData.workflowCaseId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function openResetAllApproveSwitchAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'workflowCase/openResetAllApproveSwitch',
    params: {
      workflowCaseId: getValueByKey({
        data: handleData,
        key: fieldData.workflowCaseId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function closeResetAllApproveSwitchAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'workflowCase/closeResetAllApproveSwitch',
    params: {
      workflowCaseId: getValueByKey({
        data: handleData,
        key: fieldData.workflowCaseId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function forceEndAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: workflowCaseTypeCollection.forceEnd,
    params: {
      workflowCaseId: getValueByKey({
        data: handleData,
        key: fieldData.workflowCaseId.name,
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
    api: 'workflowCase/refreshCache',
    params: {
      workflowCaseId: getValueByKey({
        data: handleData,
        key: fieldData.workflowCaseId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
