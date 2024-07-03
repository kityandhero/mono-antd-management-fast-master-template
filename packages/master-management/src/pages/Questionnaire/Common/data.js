import { formNameCollection } from '../../../customConfig';

const fieldExtraData = {
  questionCreateModeNote: {
    label: '问题生成模式[创建后不可根更改]',
    name: 'questionCreateModeNote',
    helper: '',
  },
};

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
  whetherRandomOrder: {
    label: '是否随机打乱排序[仅在统一试卷模式生效]',
    name: 'whetherRandomOrder',
    helper: '',
  },
  questionCreateMode: {
    label: '问题生成模式[创建后不可根更改]',
    name: 'questionCreateMode',
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
export const questionCreateModeCollection = {
  /**
   * 未知模式
   * value : 0
   */
  unknown: 0,

  /**
   * 统一题目
   * value : 100
   */
  global: 100,

  /**
   * 随机题目
   * value : 200
   */
  random: 200,
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
