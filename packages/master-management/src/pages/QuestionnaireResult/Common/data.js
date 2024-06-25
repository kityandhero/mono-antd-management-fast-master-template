import { formNameCollection } from '../../../customConfig';

const fieldExtraData = {};

export const fieldData = {
  ...formNameCollection,
  questionnaireResultId: {
    label: '数据标识',
    name: 'questionnaireResultId',
    helper: '',
  },
  ...fieldExtraData,
};
