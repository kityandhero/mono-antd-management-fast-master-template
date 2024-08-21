import { formNameCollection } from '../../../customConfig';

const fieldExtraData = {};

export const fieldData = {
  ...formNameCollection,
  positionGradeId: {
    label: '数据标识',
    name: 'positionGradeId',
    helper: '',
  },
  ...fieldExtraData,
};
