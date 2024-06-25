import { formNameCollection } from '../../../customConfig';

const fieldExtraData = {};

export const fieldData = {
  ...formNameCollection,
  questionId: {
    label: '数据标识',
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
  type: {
    label: '问题类型',
    name: 'type',
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
