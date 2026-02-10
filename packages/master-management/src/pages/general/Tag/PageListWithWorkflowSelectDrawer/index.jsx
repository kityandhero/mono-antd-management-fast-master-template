import { connect } from 'easy-soft-dva';

import { switchControlAssist } from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';
import { BasePageListSelectDrawer } from '../BasePageListSelectDrawer';

const visibleFlag = '7bd6264091674d4cbdc45a8a7001f6fb';

@connect(({ tag, schedulingControl }) => ({
  tag,
  schedulingControl,
}))
// 组件基类, 仅为代码复用性设计, 具体使用时请自行考虑
class PageListWithWorkflowSelectDrawer extends BasePageListSelectDrawer {
  static close() {
    switchControlAssist.close(visibleFlag);
  }

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      // 页面加载时自动加载的远程请求
      loadApiPath: modelTypeCollection.tagTypeCollection.pageListWithWorkflow,
    };
  }
}

export { PageListWithWorkflowSelectDrawer };
