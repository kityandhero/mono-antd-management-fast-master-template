import { formNameCollection } from '../../../customConfig';

export const fieldData = {
  ...formNameCollection,
  title: {
    label: '通道',
    name: 'title',
    helper: '开关的名称',
  },
  tag: {
    label: '标识码',
    name: 'tag',
    helper: '',
  },
  key: {
    label: '名称',
    name: 'key',
    helper: '开关的键名',
  },
  value: {
    label: 'SQL日志记录',
    name: 'value',
    // helper: '开关的键值',
  },
};
