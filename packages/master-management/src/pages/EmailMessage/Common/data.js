import { formNameCollection } from '../../../customConfig';

const fieldExtraData = {
  emailSenderAgentTitle: {
    label: '电子邮件发送代理',
    name: 'emailSenderAgentTitle',
    helper: '',
  },
  contentTypeNote: {
    label: '内容类型',
    name: 'contentTypeNote',
    helper: '',
  },
  aggregateNote: {
    label: '统计状态',
    name: 'aggregateNote',
    helper: '',
  },
};

export const fieldData = {
  ...formNameCollection,
  emailMessageId: {
    label: '主键标识',
    name: 'emailMessageId',
    helper: '',
  },
  subject: {
    label: '主题',
    name: 'subject',
    helper: '',
  },
  content: {
    label: '内容',
    name: 'content',
    helper: '',
  },
  contentType: {
    label: '内容类型',
    name: 'contentType',
    helper: '',
  },
  fromEmailName: {
    label: '来源邮箱名称',
    name: 'fromEmailName',
    helper: '',
  },
  fromEmailAddress: {
    label: '来源邮箱地址',
    name: 'fromEmailAddress',
    helper: '',
  },
  toEmailName: {
    label: '目标邮箱名称',
    name: 'toEmailName',
    helper: '',
  },
  toEmailAddress: {
    label: '目标邮箱地址',
    name: 'toEmailAddress',
    helper: '',
  },
  smtpServerHost: {
    label: 'SMTP服务器域名',
    name: 'smtpServerHost',
    helper: '',
  },
  smtpServerPort: {
    label: 'SMTP服务器端口',
    name: 'smtpServerPort',
    helper: '',
  },
  smtpServerUseSsl: {
    label: 'SMTP服务器是否使用SSL',
    name: 'smtpServerUseSsl',
    helper: '',
  },
  smtpServerAccount: {
    label: 'SMTP服务器账户名',
    name: 'smtpServerAccount',
    helper: '',
  },
  smtpServerPassword: {
    label: 'SMTP服务器账户密码',
    name: 'smtpServerPassword',
    helper: '',
  },
  emailSenderAgentId: {
    label: '电子邮件发送代理标识',
    name: 'emailSenderAgentId',
    helper: '',
  },
  sendTime: {
    label: '发送时间',
    name: 'sendTime',
    helper: '',
  },
  sendResult: {
    label: '发送结果',
    name: 'sendResult',
    helper: '',
  },
  aggregate: {
    label: '汇总状态',
    name: 'aggregate',
    helper: '',
  },
  ...fieldExtraData,
};

/**
 * 状态值集合
 */
export const statusCollection = {
  /**
   * 等待发送
   * value : 0
   */
  wait: 0,

  /**
   * 已经发送
   * value : 10
   */
  alreadySend: 10,

  /**
   * 发送失败
   * value : 20
   */
  failSend: 20,
};

/**
 * 汇总状态值集合
 */
export const aggregateCollection = {
  /**
   * 等待统计
   * value : 0
   */
  wait: 0,

  /**
   * 已经统计
   * value : 10
   */
  alreadyAggregate: 10,
};
