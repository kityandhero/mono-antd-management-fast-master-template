import { formNameCollection } from '../../../../customConfig';

const fieldExtraData = {
  friendlyName: {
    label: '名称',
    name: 'friendlyName',
    helper: '',
  },
  nickname: {
    label: '用户昵称',
    name: 'nickname',
    helper: '',
  },
  realName: {
    label: '真实姓名',
    name: 'realName',
    helper: '',
  },
  phone: {
    label: '联系电话',
    name: 'phone',
    helper: '',
  },
  email: {
    label: '邮箱账户',
    name: 'email',
    helper: '',
  },
  avatar: {
    label: '头像',
    name: 'avatar',
    helper: '',
  },
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
    label: '是否允许自动套用审批历史',
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
    label: '是否允许自动套用审批历史',
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
