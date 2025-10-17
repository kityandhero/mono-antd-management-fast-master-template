import { formNameCollection } from '../../../../customConfig';

const fieldExtraData = {
  name: {
    label: '名称',
    name: 'name',
    helper: '',
  },
};

export const fieldData = {
  ...formNameCollection,
  masterManagerLoginLogId: {
    label: '数据标识',
    name: 'masterManagerLoginLogId',
    helper: '',
  },
  masterManagerId: {
    label: '主控账户标识',
    name: 'masterManagerId',
    helper: '',
  },
  account: {
    label: '登录账户',
    name: 'account',
    helper: '',
  },
  ip: {
    label: '登录IP',
    name: 'ip',
    helper: '',
  },
  location: {
    label: '登录位置',
    name: 'location',
    helper: '',
  },
  ...fieldExtraData,
};
