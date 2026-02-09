import { formNameCollection } from '../../../../customConfig';

const fieldExtraData = {};

export const fieldData = {
  ...formNameCollection,
  smsCategoryId: {
    label: '数据标识',
    name: 'smsCategoryId',
    helper: '',
  },
  name: {
    label: '类别名称',
    name: 'name',
    helper: '输入合适的类别名称',
  },
  image: {
    label: '图片',
    name: 'image',
    helper: '',
  },
  description: {
    label: '简介描述 ',
    name: 'description',
    helper: '输入合适的简介描述',
  },
  flag: {
    label: '系统特征值',
    name: 'flag',
    helper: '',
  },
  sort: {
    label: '排序值',
    name: 'sort',
    helper: '',
  },
  template: {
    label: '短信模板',
    name: 'template',
    helper: '',
  },
  firstParamMaxLength: {
    label: '第一个参数最大长度',
    name: 'firstParamMaxLength',
    helper: '',
  },
  secondParamMaxLength: {
    label: '第二个参数最大长度',
    name: 'secondParamMaxLength',
    helper: '',
  },
  threeParamMaxLength: {
    label: '第三个参数最大长度',
    name: 'threeParamMaxLength',
    helper: '',
  },
  fourParamMaxLength: {
    label: '第四个参数最大长度',
    name: 'fourParamMaxLength',
    helper: '',
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
   * value : 10
   */
  enable: 10,
};
