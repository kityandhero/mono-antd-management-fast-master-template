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

@connect(({ emailSenderAgentStatistic, schedulingControl }) => ({
  emailSenderAgentStatistic,
  schedulingControl,
}))
class PageList extends MultiPage {
  componentAuthority =
    accessWayCollection.emailSenderAgentStatistic.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '邮件代理发送统计列表',
      paramsKey:
        accessWayCollection.emailSenderAgentStatistic.pageList.paramsKey,
      loadApiPath:
        modelTypeCollection.emailSenderAgentStatisticTypeCollection.pageList,
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
        showSimpleErrorMessage('can not find matched key');
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

  establishListItemDropdownConfig = (item) => {
    return {
      size: 'small',
      text: '刷新缓存',
      icon: iconBuilder.reload(),
      disabled: !checkHasAuthority(
        accessWayCollection.emailSenderAgentStatistic.refreshCache.permission,
      ),
      confirm: true,
      title: '即将刷新缓存，确定吗？',
      handleData: item,
      handleButtonClick: ({ handleData }) => {
        this.refreshCache(handleData);
      },
    };
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 18,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.emailSenderAgentTitle,
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.emailSenderAgentTitle,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.totalCount,
      width: 80,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.emailSenderAgentId,
      width: 220,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldData.emailSenderAgentStatisticId,
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
