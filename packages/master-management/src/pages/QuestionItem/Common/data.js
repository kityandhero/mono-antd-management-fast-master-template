import { formNameCollection } from '../../../customConfig';

const fieldExtraData = {};

export const fieldData = {
  ...formNameCollection,
  questionItemId: {
    label: '数据标识',
    name: 'questionItemId',
    helper: '',
  },
  questionId: {
    label: '问题标识',
    name: 'questionId',
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
  shouldChoose: {
    label: '正确选项',
    name: 'shouldChoose',
    helper: '',
  },
  sort: {
    label: '排序值',
    name: 'sort',
    helper: '',
  },
  businessMode: {
    label: '适用业务',
    name: 'businessMode',
    helper: '',
  },
  ...fieldExtraData,
};

/**
 * 状态值集合
 */
export const statusCollection = {
  /**
   * 已上线
   * value : 0
   */
  online: 0,

  /**
   * 已下线
   * value : 100
   */
  offline: 100,
};
