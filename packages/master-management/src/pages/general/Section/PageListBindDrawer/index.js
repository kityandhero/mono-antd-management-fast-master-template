import { connect } from 'easy-soft-dva';
import { checkHasAuthority, getValueByKey, toString } from 'easy-soft-utility';

import {
  columnFacadeMode,
  listViewConfig,
  searchCardConfig,
} from 'antd-management-fast-common';
import { iconModeCollection } from 'antd-management-fast-component';
import {
  DataMultiPageView,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../../customConfig';
import {
  getSectionStatusName,
  renderSearchSectionStatusSelect,
} from '../../../../customSpecialComponents';
import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData as fieldDataArticle } from '../../Article/Common/data';
import { addAction } from '../../ArticleSectionRelation/Assist/action';
import { getStatusBadge } from '../Assist/tools';
import { fieldData, statusCollection } from '../Common/data';

const { MultiPageDrawer } = DataMultiPageView;

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '360161cea0fd4c348b153bf81908a338';

@connect(({ section, schedulingControl }) => ({
  section,
  schedulingControl,
}))
class PageListBindDrawer extends MultiPageDrawer {
  reloadWhenShow = false;

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      tableScrollX: 880,
      loadApiPath: modelTypeCollection.sectionTypeCollection.pageList,
      listViewMode: listViewConfig.viewMode.table,
    };
  }

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  static close() {
    switchControlAssist.close(visibleFlag);
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

  supplementLoadRequestParams = (o) => {
    return {
      ...this.supplementRequestParams(o),
    };
  };

  supplementRequestParams = (o) => {
    const { externalData } = this.state;

    return {
      ...o,
      ...externalData,
    };
  };

  add = (record) => {
    const { externalData } = this.props;

    const articleId = getValueByKey({
      data: externalData,
      key: fieldDataArticle.articleId.name,
    });

    const sectionId = getValueByKey({
      data: record,
      key: fieldData.sectionId.name,
    });

    addAction({
      target: this,
      handleData: { articleId, sectionId },
    });
  };

  getPresetPageTitle = () => {
    return '绑定栏目';
  };

  fillSearchCardInitialValues = () => {
    const values = {};

    values[fieldData.status.name] = toString(statusCollection.online);

    return values;
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 8,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.name,
        },
        {
          lg: 8,
          type: searchCardConfig.contentItemType.component,
          component: renderSearchSectionStatusSelect({}),
        },
        {
          lg: 8,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  establishListItemDropdownConfig = (record) => {
    return {
      size: 'small',
      text: '绑定',
      icon: iconModeCollection.link,
      disabled: !checkHasAuthority(
        accessWayCollection.article.bindSection.permission,
      ),
      handleButtonClick: ({ handleData }) => {
        this.add(handleData);
      },
      handleData: record,
      confirm: {
        title: '即将进行栏目绑定，确定码？',
      },
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.name,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.image,
      width: 80,
      showRichFacade: true,
      facadeMode: columnFacadeMode.image,
    },
    {
      dataTarget: fieldData.parentName,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.sort,
      width: 80,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.status,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (value) => {
        return {
          status: getStatusBadge(value),
          text: getSectionStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.createTime,
      width: 160,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.sectionId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
  ];
}

export { PageListBindDrawer };
