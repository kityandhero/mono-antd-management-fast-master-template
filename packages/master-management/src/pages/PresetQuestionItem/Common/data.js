import { formNameCollection } from '../../../customConfig';

const fieldExtraData = {
  whetherCorrectNote: {
    label: '是否正确',
    name: 'whetherCorrectNote',
    helper: '',
  },
};

export const fieldData = {
  ...formNameCollection,
  presetQuestionItemId: {
    label: '数据标识',
    name: 'presetQuestionItemId',
    helper: '',
  },
  presetQuestionId: {
    label: '问题标识',
    name: 'presetQuestionId',
    helper: '',
  },
  title: {
    label: '标题',
    name: 'title',
    helper: '',
  },
  image: {
    label: '图片',
    name: 'image',
    helper: '',
  },
  description: {
    label: '简介描述',
    name: 'description',
    helper: '',
  },
  whetherCorrect: {
    label: '是否正确',
    name: 'whetherCorrect',
    helper: '该选项是否为应当选择',
  },
  sort: {
    label: '排序值',
    name: 'sort',
    helper: '选项的排序顺序按降序排列，排序值相同时随机排序',
  },
  ...fieldExtraData,
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
