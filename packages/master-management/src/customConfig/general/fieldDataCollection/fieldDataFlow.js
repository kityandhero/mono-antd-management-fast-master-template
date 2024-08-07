import { formNameCollection } from './fieldDataCommon';

const formExtraData = {
  workflowNodeList: {
    label: '节点信息',
    name: 'workflowNodeList',
    helper: '',
  },
  workflowLineList: {
    label: '线条信息',
    name: 'workflowLineList',
    helper: '',
  },
};

export const fieldDataFlow = {
  ...formNameCollection,
  workflowId: {
    label: '数据标识',
    name: 'workflowId',
    helper: '',
  },
  name: {
    label: '名称',
    name: 'name',
    helper: '',
  },
  description: {
    label: '简介描述 ',
    name: 'description',
    helper: '',
  },
  caseNameTemplate: {
    label: '实例名模版 ',
    name: 'caseNameTemplate',
    helper: '设置实例名模板, 示例: {flowName} 事由{reason}',
  },
  scope: {
    label: '应用范围',
    name: 'scope',
    helper: '应用范围',
  },
  scopeNote: {
    label: '应用范围',
    name: 'scopeNote',
    helper: '应用范围',
  },
  businessMode: {
    label: '适用业务',
    name: 'businessMode',
    helper: '',
  },
  businessModeNote: {
    label: '适用业务',
    name: 'businessModeNote',
    helper: '',
  },
  effectiveRange: {
    label: '生效范围',
    name: 'effectiveRange',
    helper: '',
  },
  effectiveRangeNote: {
    label: '生效范围',
    name: 'effectiveRangeNote',
    helper: '',
  },
  whetherAllowMultibranch: {
    label: '允许多路分支',
    name: 'whetherAllowMultibranch',
    helper: '',
  },
  whetherAllowMultibranchNote: {
    label: '是否允许多路分支',
    name: 'whetherAllowMultibranchNote',
    helper: '',
  },
  whetherAllowMultiEnd: {
    label: '是否允许多个终点',
    name: 'whetherAllowMultiEnd',
    helper: '',
  },
  whetherAllowMultiEndNote: {
    label: '是否允许多个终点',
    name: 'whetherAllowMultiEndNote',
    helper: '',
  },
  creatorUserId: {
    label: '是否创建人用户标识',
    name: 'creatorUserId',
    helper: '',
  },
  creatorUserRealName: {
    label: '创建人姓名',
    name: 'creatorUserRealName',
    helper: '',
  },
  creatorUserNickname: {
    label: '创建人昵称',
    name: 'creatorUserNickname',
    helper: '',
  },
  status: {
    label: '状态',
    name: 'status',
    helper: '用户状态',
  },
  statusNote: {
    label: '状态',
    name: 'statusNote',
    helper: '用户状态',
  },
  createOperatorId: {
    label: '创建人标识',
    name: 'createOperatorId',
    helper: '',
  },
  createTime: {
    label: '创建时间',
    name: 'createTime',
    helper: '',
  },
  updateOperatorId: {
    label: '更新人标识',
    name: 'updateOperatorId',
    helper: '',
  },
  updateTime: {
    label: '更新时间',
    name: 'updateTime',
    helper: '',
  },
  ...formExtraData,
};
