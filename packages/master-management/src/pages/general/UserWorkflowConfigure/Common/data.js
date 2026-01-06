import { formNameCollection } from '../../../../customConfig';

const fieldExtraData = {
  mobileApproveViewModeNote: {
    label: '移动端审批视图模式',
    name: 'mobileApproveViewModeNote',
    helper: '',
  },
  whetherAllowScanCodeVerificationNote: {
    label: '是否允许扫码校验',
    name: 'whetherAllowScanCodeVerificationNote',
    helper: '',
  },
  whetherAllowAutoReuseProcessHistoryNote: {
    label:
      '是否允许自动套用审批历史【审批实例若存在用户已审批的历史, 则自动套用, 避免重复操作】',
    name: 'whetherAllowAutoReuseProcessHistoryNote',
    helper: '',
  },
};

export const fieldData = {
  ...formNameCollection,
  userWorkflowConfigureId: {
    label: '数据标识',
    name: 'userWorkflowConfigureId',
    helper: '',
  },
  userId: {
    label: '用户标识',
    name: 'userId',
    helper: '',
  },
  mobileApproveViewMode: {
    label: '移动端审批视图模式',
    name: 'mobileApproveViewMode',
    helper: '',
  },
  whetherAllowScanCodeVerification: {
    label: '是否允许扫码校验',
    name: 'whetherAllowScanCodeVerification',
    helper: '',
  },
  whetherAllowAutoReuseProcessHistory: {
    label:
      '是否允许自动套用审批历史【审批实例若存在用户已审批的历史, 则自动套用, 避免重复操作】',
    name: 'whetherAllowAutoReuseProcessHistory',
    helper: '',
  },
  ...fieldExtraData,
};

/**
 * 状态值集合
 */
export const statusCollection = {
  /**
   * 正常
   * value : 100
   */
  normal: 100,
};
