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

const { MultiPageSelectModal } = DataMultiPageView;

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = 'bf0208be0cd247d09059cd2b4b3cb0fb';

@connect(({ section, schedulingControl }) => ({
  section,
  schedulingControl,
}))
class PageListSelectModal extends MultiPageSelectModal {
  reloadWhenShow = false;

  componentAuthority = accessWayCollection.section.pageList.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
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

export { PageListSelectModal };
