import { formNameCollection } from '../../../customConfig';

const fieldExtraData = {
  businessModeNote: {
    label: '适用业务',
    name: 'businessModeNote',
    helper: '',
  },
};

export const fieldData = {
  ...formNameCollection,
  presetQuestionId: {
    label: '数据标识',
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
  type: {
    label: '问题类型',
    name: 'type',
    helper: '存储后不可更改',
  },
  businessMode: {
    label: '适用业务',
    name: 'businessMode',
    helper: '',
  },
  whetherCorrect: {
    label: '是否正确',
    name: 'whetherCorrect',
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
