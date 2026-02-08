import { formNameCollection } from '../../../../customConfig';

const fieldExtraData = {};

export const fieldData = {
  ...formNameCollection,
  workflowTagRelationId: {
    label: '数据标识',
    name: 'workflowTagRelationId',
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
   * value : 100
   */
  enable: 100,
};
