import { fieldDataFlowCase } from '../../../customConfig';

const fieldDataExtra = {
  canHide: {
    label: '能否隐藏',
    name: 'canHide',
    helper: '',
  },
};

export const fieldData = {
  ...fieldDataFlowCase,
  workflowCaseId: {
    label: '数据标识',
    name: 'workflowCaseId',
    helper: '',
  },
  ...fieldDataExtra,
};
