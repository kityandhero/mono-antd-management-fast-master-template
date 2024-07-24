import { formNameCollection } from '../../../customConfig';

const fieldExtraData = {};

export const fieldData = {
  ...formNameCollection,
  administrativeDivisionId: {
    label: '数据标识',
    name: 'administrativeDivisionId',
    helper: '',
  },
  ...fieldExtraData,
};
