import { formNameCollection } from '../../../../customConfig';

const fieldExtraData = {};

export const fieldData = {
  ...formNameCollection,
  articleCommentId: {
    label: '主键标识',
    name: 'articleCommentId',
    helper: '',
  },
  articleId: {
    label: '文章标识',
    name: 'articleId',
    helper: '',
  },
  userId: {
    label: '用户标识',
    name: 'userId',
    helper: '',
  },
  name: {
    label: '姓名',
    name: 'name',
    helper: '',
  },
  organization: {
    label: '组织/单位',
    name: 'organization',
    helper: '',
  },
  contactInformation: {
    label: '联系方式',
    name: 'contactInformation',
    helper: '',
  },
  content: {
    label: '内容',
    name: 'content',
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
