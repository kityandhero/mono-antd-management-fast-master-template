import { fieldDataFlow } from '../../../customConfig';

export const fieldData = {
  ...fieldDataFlow,
  workflowId: {
    label: '数据标识',
    name: 'workflowId',
    helper: '',
  },
};

/**
 * 流程调试申请人模式值集合
 */
export const flowDebugUserModeCollection = {
  /**
   * 全局测试用户
   * value : 0
   */
  globalDebugUser: 0,

  /**
   * 流程配置的特定测试用户
   * value : 100
   */
  specialDebugUser: 100,
};
