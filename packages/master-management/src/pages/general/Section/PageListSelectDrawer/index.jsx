import { connect } from 'easy-soft-dva';

import {
  columnFacadeMode,
  searchCardConfig,
} from 'antd-management-fast-common';
import {
  DataMultiPageView,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../../customConfig';
import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData } from '../Common/data';

const { MultiPageSelectDrawer } = DataMultiPageView;

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = 'd6d1716cdff44f52ab0e12ca90047fd8';

@connect(({ section, schedulingControl }) => ({
  section,
  schedulingControl,
}))
class PageListSelectDrawer extends MultiPageSelectDrawer {
  // 在控制台显示组建内调用序列, 仅为进行开发辅助
  // showCallProcess = true;

  reloadWhenShow = false;

  componentAuthority = accessWayCollection.section.pageList.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  static close() {
    switchControlAssist.close(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      tableScrollX: 920,
      loadApiPath: modelTypeCollection.sectionTypeCollection.pageList,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

  getPresetPageTitle = () => {
    return '请选择栏目';
  };

  renderPresetTitleIcon = () => null;

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 16,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.name,
        },
        {
          lg: 8,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.image,
      width: 60,
      showRichFacade: true,
      facadeMode: columnFacadeMode.image,
    },
    {
      dataTarget: fieldData.name,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.sectionId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldData.createTime,
      width: 160,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
    },
  ];
}

export { PageListSelectDrawer };
