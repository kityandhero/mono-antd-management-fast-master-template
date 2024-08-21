import { formNameCollection } from '../../../customConfig';

const fieldExtraData = {};

export const fieldData = {
  ...formNameCollection,
  positionId: {
    label: '数据标识',
    name: 'positionId',
    helper: '',
  },
  ...fieldExtraData,
};
