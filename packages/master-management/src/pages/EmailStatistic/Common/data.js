import { formNameCollection } from '../../../customConfig';

const fieldExtraData = {};

export const fieldData = {
  ...formNameCollection,
  emailStatisticId: {
    label: '主键标识',
    name: 'emailStatisticId',
    helper: '',
  },
  totalCount: {
    label: '发送数量',
    name: 'totalCount',
    helper: '',
  },
  ...fieldExtraData,
};
