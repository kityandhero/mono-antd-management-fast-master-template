import { formNameCollection } from '../../../../customConfig';

export const fieldData = {
  ...formNameCollection,
  tagId: {
    label: '账户标识',
    name: 'tagId',
    helper: '',
  },
  name: {
    label: '名称',
    name: 'name',
    helper: '',
  },
  color: {
    label: '色值',
    name: 'color',
    helper: '',
  },
  displayName: {
    label: '显示名称',
    name: 'displayName',
    helper: '',
  },
  image: {
    label: '图片',
    name: 'image',
    helper: '',
  },
  sort: {
    label: '排序值',
    name: 'sort',
    helper: '',
  },
  description: {
    label: '简介描述 ',
    name: 'description',
    helper: '',
  },
  displayRange: {
    label: '显示区域',
    name: 'displayRange',
    helper: '',
  },
  displayRangeNote: {
    label: '显示区域',
    name: 'displayRangeNote',
    helper: '',
  },
  businessMode: {
    label: '适用范围',
    name: 'businessMode',
    helper: '',
  },
  businessModeNote: {
    label: '适用范围',
    name: 'businessModeNote',
    helper: '',
  },
  type: {
    label: '类型',
    name: 'type',
    helper: '标签的类型',
  },
  typeNote: {
    label: '类型',
    name: 'typeNote',
    helper: '标签的类型',
  },
  whetherRecommend: {
    label: '推荐',
    name: 'whetherRecommend',
    helper: '',
  },
};

/**
 * 状态值集合
 */
export const statusCollection = {
  /**
   * 已禁用
   * value : 0
   */
  disable: 0,

  /**
   * 已启用
   * value : 100
   */
  enable: 100,
};
