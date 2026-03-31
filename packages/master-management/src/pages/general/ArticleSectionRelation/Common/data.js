import { formNameCollection } from '../../../../customConfig';

const fieldExtraData = {
  sectionName: {
    label: '栏目名称',
    name: 'sectionName',
    helper: '',
  },
  sectionStatus: {
    label: '栏目状态',
    name: 'sectionStatus',
    helper: '',
  },
  sectionStatusNote: {
    label: '栏目状态',
    name: 'sectionStatusNote',
    helper: '',
  },
  articleTitle: {
    label: '文章标题',
    name: 'articleTitle',
    helper: '',
  },
  articleSubtitle: {
    label: '文章标题',
    name: 'articleSubtitle',
    helper: '',
  },
  articleStatus: {
    label: '文章状态',
    name: 'articleStatus',
    helper: '',
  },
  articleStatusNote: {
    label: '文章状态',
    name: 'articleStatusNote',
    helper: '',
  },
};

export const fieldData = {
  ...formNameCollection,
  articleSectionRelationId: {
    label: '主键标识',
    name: 'articleSectionRelationId',
    helper: '',
  },
  articleId: {
    label: '文章标识',
    name: 'articleId',
    helper: '',
  },
  sectionId: {
    label: '栏目标识',
    name: 'sectionId',
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
 * 信息模式值集合
 */
export const infoModeCollection = {
  /**
   * 栏目
   * value : 100
   */
  section: 100,

  /**
   * 文章
   * value : 200
   */
  article: 200,

  /**
   * 融合信息
   * value : 300
   */
  integration: 300,
};

/**
 * 状态值集合
 */
export const statusCollection = {
  /**
   * 已禁用
   * value : 0
   */
  disable: 0,

  /**
   * 已启用
   * value : 100
   */
  enable: 100,
};
