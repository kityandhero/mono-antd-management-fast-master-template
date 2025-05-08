import { formNameCollection } from '../../../customConfig';

const fieldExtraData = {
  subsidiaryShortName: {
    label: '公司名',
    name: 'subsidiaryShortName',
    helper: '',
  },
  customerPhone: {
    label: '联系电话',
    name: 'customerPhone',
    helper: '',
  },
  customerNickname: {
    label: '昵称',
    name: 'customerNickname',
    helper: '',
  },
  customerRealName: {
    label: '姓名',
    name: 'customerRealName',
    helper: '',
  },
  customerFriendlyName: {
    label: '称呼',
    name: 'customerFriendlyName',
    helper: '',
  },
  whetherConfirmNote: {
    label: '是否核实',
    name: 'whetherConfirmNote',
    helper: '',
  },
  whetherReplyNote: {
    label: '是否回复',
    name: 'whetherReplyNote',
    helper: '',
  },
  listAttachment: {
    label: '附件列表',
    name: 'listAttachment',
    helper: '',
  },
};

export const fieldData = {
  ...formNameCollection,
  subsidiaryReportMessageId: {
    label: '数据标识',
    name: 'subsidiaryReportMessageId',
    helper: '',
  },
  subsidiaryId: {
    label: '公司标识',
    name: 'subsidiaryId',
    helper: '',
  },
  customerId: {
    label: '顾客标识',
    name: 'customerId',
    helper: '',
  },
  title: {
    label: '标题',
    name: 'title',
    helper: '',
  },
  description: {
    label: '简介描述',
    name: 'description',
    helper: '',
  },
  whetherConfirm: {
    label: '是否核实',
    name: 'whetherConfirm',
    helper: '',
  },
  whetherReply: {
    label: '是否回复',
    name: 'whetherReply',
    helper: '',
  },
  replyContent: {
    label: '回复内容',
    name: 'replyContent',
    helper: '',
  },
  replyTime: {
    label: '回复时间',
    name: 'replyTime',
    helper: '',
  },
  ...fieldExtraData,
};

/**
 * 状态值集合
 */
export const statusCollection = {
  /**
   * 未知
   * value : 0
   */
  unknown: 0,

  /**
   * 正常
   * value : 100
   */
  normal: 100,
};
