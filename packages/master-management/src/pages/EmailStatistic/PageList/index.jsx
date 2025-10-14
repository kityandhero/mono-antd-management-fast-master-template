import { connect } from 'easy-soft-dva';
import { checkHasAuthority, showSimpleErrorMessage } from 'easy-soft-utility';

import {
  columnFacadeMode,
  searchCardConfig,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { modelTypeCollection } from '../../../modelBuilders';
import { refreshCacheAction } from '../Assist/action';
import { fieldData } from '../Common/data';

const { MultiPage } = DataMultiPageView;

@connect(({ emailStatistic, schedulingControl }) => ({
  emailStatistic,
  schedulingControl,
}))
class PageList extends MultiPage {
  componentAuthority = accessWayCollection.emailStatistic.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '短信发送统计列表',
      paramsKey: accessWayCollection.emailStatistic.pageList.paramsKey,
      loadApiPath: modelTypeCollection.emailStatisticTypeCollection.pageList,
      currentRecord: null,
    };
  }

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'refreshCache': {
        this.refreshCache(handleData);
        break;
      }

      default: {
        showSimpleErrorMessage(`can not find matched key "${key}"`);
        break;
      }
    }
  };

  refreshCache = (record) => {
    refreshCacheAction({
      target: this,
      handleData: record,
    });
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 12,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.emailStatisticId,
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  establishListItemDropdownConfig = (item) => {
    return {
      size: 'small',
      text: '刷新缓存',
      icon: iconBuilder.reload(),
      disabled: !checkHasAuthority(
        accessWayCollection.emailStatistic.refreshCache.permission,
      ),
      confirm: true,
      title: '即将刷新缓存，确定吗？',
      handleData: item,
      handleButtonClick: ({ handleData }) => {
        this.refreshCache(handleData);
      },
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.totalCount,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.emailStatisticId,
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

export default PageList;
