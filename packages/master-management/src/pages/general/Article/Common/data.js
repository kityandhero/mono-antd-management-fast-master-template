import { formNameCollection } from '../../../../customConfig';

const fieldExtraData = {
  businessModeNote: {
    label: '适用业务',
    name: 'businessModeNote',
    helper: '栏目的适用业务',
  },
  renderTypeNote: {
    label: '渲染模式',
    name: 'renderTypeNote',
    helper: '栏目的渲染模式',
  },
  whetherRecommendNote: {
    label: '推荐',
    name: 'whetherRecommendNote',
    helper: '',
  },
  whetherTopNote: {
    label: '置顶',
    name: 'whetherTopNote',
    helper: '',
  },
  whetherVisibleNote: {
    label: '可见性',
    name: 'whetherVisibleNote',
    helper: '',
  },
};

export const fieldData = {
  ...formNameCollection,
  articleId: {
    label: '主键标识',
    name: 'articleId',
    helper: '',
  },
  title: {
    label: '标题',
    name: 'title',
    helper: '',
  },
  subtitle: {
    label: '副标题',
    name: 'subtitle',
    helper: '',
  },
  description: {
    label: '简介描述',
    name: 'description',
    helper: '',
  },
  image: {
    label: '图片',
    name: 'image',
    helper: '',
  },
  rectangleImage: {
    label: '长方形图片',
    name: 'rectangleImage',
    helper: '',
  },
  video: {
    label: '视频',
    name: 'video',
    helper: '',
  },
  audio: {
    label: '音频',
    name: 'audio',
    helper: '',
  },
  attachment: {
    label: '附件',
    name: 'attachment',
    helper: '',
  },
  contentData: {
    label: '内容数据',
    name: 'contentData',
    helper: '',
  },
  mediaData: {
    label: '媒体数据',
    name: 'mediaData',
    helper: '',
  },
  renderType: {
    label: '渲染模式',
    name: 'renderType',
    helper: '',
  },
  sort: {
    label: '排序值',
    name: 'sort',
    helper: '',
  },
  author: {
    label: '发布人',
    name: 'author',
    helper: '',
  },
  redirect: {
    label: '跳转地址',
    name: 'redirect',
    helper: '',
  },
  accessCount: {
    label: '访问量',
    name: 'accessCount',
    helper: '',
  },
  businessMode: {
    label: '适用业务',
    name: 'businessMode',
    helper: '',
  },
  workflowNodeId: {
    label: '工作流项目标识',
    name: 'workflowNodeId',
    helper: '',
  },
  workflowProcess: {
    label: '工作流进程',
    name: 'workflowProcess',
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
  ...fieldExtraData,
};

/**
 * 状态值集合
 */
export const statusCollection = {
  /**
   * 已下线
   * value : 0
   */
  offline: 0,

  /**
   * 已上线
   * value : 10
   */
  online: 10,
};
