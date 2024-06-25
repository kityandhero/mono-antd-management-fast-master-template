import { formNameCollection } from '../../../customConfig';

const fieldExtraData = {};

export const fieldData = {
  ...formNameCollection,
  questionnaireId: {
    label: '数据标识',
    name: 'questionnaireId',
    helper: '',
  },
  title: {
    label: '标题',
    name: 'title',
    helper: '',
  },
  contentData: {
    label: '内容',
    name: 'contentData',
    helper: '',
  },
  image: {
    label: '图片',
    name: 'image',
    helper: '',
  },
  description: {
    label: '简介描述',
    name: 'description',
    helper: '',
  },
  luckyDrawId: {
    label: '关联抽奖标识',
    name: 'luckyDrawId',
    helper: '',
  },
  luckyDrawThreshold: {
    label: '触发抽奖阈值',
    name: 'luckyDrawThreshold',
    helper: '',
  },
  sort: {
    label: '排序值',
    name: 'sort',
    helper: '',
  },
  whetherRecommend: {
    label: '是否推荐',
    name: 'whetherRecommend',
    helper: '',
  },
  whetherTop: {
    label: '是否置顶',
    name: 'whetherTop',
    helper: '',
  },
  whetherVisible: {
    label: '是否可见',
    name: 'whetherVisible',
    helper: '',
  },
  businessMode: {
    label: '适用业务',
    name: 'businessMode',
    helper: '',
  },
  ...fieldExtraData,
};

/**
 * 状态值集合
 */
export const statusCollection = {
  /**
   * 已上线
   * value : 0
   */
  online: 0,

  /**
   * 已下线
   * value : 100
   */
  offline: 100,
};
