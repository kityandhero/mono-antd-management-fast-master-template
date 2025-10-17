import { formNameCollection } from '../../../../customConfig';

const fieldExtraData = {
  emailSenderAgentTitle: {
    label: '电子邮件发送代理',
    name: 'emailSenderAgentTitle',
    helper: '',
  },
};

export const fieldData = {
  ...formNameCollection,
  emailSenderAgentStatisticId: {
    label: '主键标识',
    name: 'emailSenderAgentStatisticId',
    helper: '',
  },
  totalCount: {
    label: '发送数量',
    name: 'totalCount',
    helper: '',
  },
  emailSenderAgentId: {
    label: '电子邮件发送代理标识',
    name: 'emailSenderAgentId',
    helper: '',
  },
  ...fieldExtraData,
};
