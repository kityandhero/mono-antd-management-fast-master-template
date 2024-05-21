// 全局性常量

export const unknownLabel = '未知';

export const amapkey = 'bff966857f8311eb68ea03dcbac869ad';

export const channelMasterManagement = 'b4e618f907dc41b797f599c1695c1c70';

export const colorCollection = {
  yesColor: '#52c41a',
  noColor: '#ec8402',
  price: '#267cb7',
};

export const keyValueTypeCollection = {
  text: 0,
  multiText: 100,
  image: 200,
  video: 300,
  audio: 400,
  attachment: 500,
  link: 1000,
};

export const fileTypeCollection = {
  image: 100,
  video: 200,
  audio: 300,
  file: 400,
};

export const flowEffectiveRangeCollection = {
  /**
   * 全局适用
   * value : 100
   */
  globalEffective: 100,

  /**
   * 范围内适用
   * value : 200
   */
  rangeEffective: 200,
};

/**
 * 流程审批动作集合
 */
export const flowApproveActionCollection = {
  /**
   * 未知
   * value : 0
   */
  unknown: 0,

  /**
   * 通过
   * value : 100
   */
  pass: 100,

  /**
   * 拒绝
   * value : 200
   */
  refuse: 200,
};

/**
 * 流程审批动作模式集合
 */
export const flowApproveActionModeCollection = {
  /**
   * 未知
   * value : 0
   */
  unknown: 0,

  /**
   * 自动操作
   * value : 100
   */
  autoControl: 100,

  /**
   * 人工
   * value : 200
   */
  manualControl: 200,
};

/**
 * 流程应用范围值集合
 */
export const flowScopeCollection = {
  /**
   * 文章审核
   * value : 100
   */
  articleAudit: 100,

  /**
   * 流程审批
   * value : 200
   */
  processApproval: 200,
};

/**
 * 流程状态值集合
 */
export const flowStatusCollection = {
  /**
   * 禁用
   * value : 0
   */
  disable: 0,

  /**
   * 启用
   * value : 100
   */
  enable: 100,
};

/**
 * 流程表单设计状态值集合
 */
export const flowFormDesignStatusCollection = {
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

/**
 * 流程线条类型值集合
 */
export const flowLineTypeCollection = {
  /**
   * 未知
   * value : 0
   */
  unknown: 0,

  /**
   * 前进
   * value : 100
   */
  forward: 100,

  /**
   * 回退
   * value : 200
   */
  backward: 200,

  /**
   * 抄送
   * value : 300
   */
  carbonCopy: 300,
};

/**
 * 流程线条状态值集合
 */
export const flowLineStatusCollection = {
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

/**
 * 流程节点类型值集合
 */
export const flowNodeTypeCollection = {
  /**
   * 未知
   * value : 0
   */
  unknown: 0,

  /**
   * 起始点
   * value : 10
   */
  startNode: 10,

  /**
   * 过程点
   * value : 20
   */
  intermediateNode: 20,

  /**
   * 抄送点
   * value : 26
   */
  carbonCopyPoint: 26,

  /**
   * 终止点
   * value : 30
   */
  endNode: 30,
};

/**
 * 流程节点状态值集合
 */
export const flowNodeStatusCollection = {
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

/**
 * 流程节点审批人状态值集合
 */
export const flowNodeApproverStatusCollection = {
  /**
   * 正常
   * value : 100
   */
  normal: 100,
};

/**
 * 流程节点条件判断标准值集合
 */
export const flowBranchConditionJudgmentModeCollection = {
  /**
   * 符合全部
   * value : 100
   */
  and: 100,

  /**
   * 符合其一
   * value : 200
   */
  or: 200,
};

/**
 * 流程节点条件状态值集合
 */
export const flowBranchConditionStatusCollection = {
  /**
   * 正常
   * value : 100
   */
  normal: 100,
};

/**
 * 流程节点条件项对比模式值集合
 */
export const flowBranchConditionItemTargetComparisonModelCollection = {
  /**
   * 相等
   * value : 0
   */
  eq: 0,

  /**
   * 不等于
   * value : 0
   */
  ne: 10,

  /**
   * 大于
   * value : 100
   */
  gt: 100,

  /**
   * 大于等于
   * value : 110
   */
  gte: 110,

  /**
   * 小于
   * value : 200
   */
  lt: 200,

  /**
   * 小于等于
   * value : 210
   */
  lte: 210,

  /**
   * 小于等于
   * value : 300
   */
  rangeWithGtAndLt: 300,

  /**
   * 范围值[大于等于 ~ 小于]
   * value : 310
   */
  rangeWithGteAndLt: 310,

  /**
   * 范围值[大于 ~ 小于等于]
   * value : 320
   */
  rangeWithGtAndLte: 320,

  /**
   * 范围值[大于等于 ~ 小于等于]
   * value : 330
   */
  rangeWithGteAndLte: 330,
};

/**
 * 流程节点条件项数据源模式值集合
 */
export const flowBranchConditionItemTargetSourceModeCollection = {
  /**
   * 表单字段
   * value : 100
   */
  formField: 100,

  /**
   * 远程调用
   * value : 1000
   */
  remoteCall: 1000,
};

/**
 * 流程节点条件项数据类型值集合
 */
export const flowBranchConditionItemTargetTypeCollection = {
  /**
   * 数字
   * value : 100
   */
  number: 100,

  /**
   * 文本
   * value : 200
   */
  string: 200,
};

/**
 * 流程节点条件项状态值集合
 */
export const flowBranchConditionItemStatusCollection = {
  /**
   * 正常
   * value : 100
   */
  normal: 100,
};

/**
 * 流程实例状态值集合
 */
export const flowCaseStatusCollection = {
  /**
   * 未知
   * value : 0
   */
  unknown: 0,

  /**
   * 新创建
   * value : 100
   */
  created: 100,

  /**
   * 审批驳回
   * value : 110
   */
  refuse: 110,

  /**
   * 递交审批
   * value : 200
   */
  submitApproval: 200,

  /**
   * 审批中
   * value : 300
   */
  inApprovalProcess: 300,

  /**
   * 审批完成
   * value : 400
   */
  success: 400,
};

/**
 * 流程历史数据状态值集合
 */
export const flowCaseProcessHistoryStatusCollection = {
  /**
   * 已撤销
   * value : -1
   */
  cancel: -1,

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

/**
 * 流程表单附件存储数据状态值集合
 */
export const flowCaseFormAttachmentStatusCollection = {
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

/**
 * 流程表单键值存储数据状态值集合
 */
export const flowCaseFormStorageStatusCollection = {
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

export const keyValueEditModeCollection = {
  string: 'string',
  number: 'number',
  time: 'time',
  whether: 'whether',
};

export const keyValueItemData = {
  id: {
    label: '数据标识',
    name: 'id',
    helper: '数据项的数据标识',
  },
  title: {
    label: '名称',
    name: 'title',
    helper: '自定义数据项的标题名, 一般用于管理识别',
  },
  type: {
    label: '类型',
    name: 'type',
    helper: '数据项的类型',
  },
  typeNote: {
    label: '类型',
    name: 'typeNote',
    helper: '数据项的类型',
  },
  text: {
    label: '文本',
    name: 'text',
    helper: '',
  },
  multiText: {
    label: '多行文字',
    name: 'multiText',
    helper: '',
  },
  image: {
    label: '图片',
    name: 'image',
    helper: '',
  },
  link: {
    label: '链接',
    name: 'link',
    helper: '',
  },
  video: {
    label: '视频',
    name: 'video',
    helper: '',
  },
  audio: {
    label: '音频',
    name: 'audio',
    helper: '',
  },
  attachment: {
    label: '文件',
    name: 'attachment',
    helper: '',
  },
  sort: {
    label: '排序值',
    name: 'sort',
    helper: '',
  },
  createTime: {
    label: '发布时间',
    name: 'createTime',
    helper: '',
  },
  updateTime: {
    label: '最后更新时间',
    name: 'updateTime',
    helper: '',
  },
};

export const defaultPoint = [113.672_108, 34.749_387];

export const emptySignet =
  'data:image/png;base64,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';

export const listSimpleApprove = [
  {
    title: '审批节点样例一',
    note: '拟同意',
    name: '张三',
    signet:
      'data:image/png;base64,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',
    time: '2023-12-26 14:50',
  },
  {
    title: '审批节点样例二',
    note: '拟同意',
    name: '李四',
    signet:
      'data:image/png;base64,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',
    time: '2023-12-26 14:50',
  },
];
