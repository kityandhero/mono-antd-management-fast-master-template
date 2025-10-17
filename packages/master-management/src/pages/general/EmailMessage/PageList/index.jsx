import { connect } from 'easy-soft-dva';
import { showSimpleErrorMessage } from 'easy-soft-utility';

import {
  columnFacadeMode,
  dropdownExpandItemType,
  searchCardConfig,
  unlimitedWithStringFlag,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../../customConfig';
import {
  getEmailMessageAggregateName,
  getEmailMessageStatusName,
  renderSearchEmailMessageAggregateSelect,
  renderSearchEmailMessageStatusSelect,
} from '../../../../customSpecialComponents';
import { modelTypeCollection } from '../../../../modelBuilders';
import { refreshCacheAction } from '../Assist/action';
import { getAggregateBadge, getStatusBadge } from '../Assist/tools';
import { fieldData } from '../Common/data';
import { OperateLogDrawer } from '../OperateLogDrawer';
import { PreviewDrawer } from '../PreviewDrawer';

const { MultiPage } = DataMultiPageView;

@connect(({ emailMessage, schedulingControl }) => ({
  emailMessage,
  schedulingControl,
}))
class PageList extends MultiPage {
  componentAuthority = accessWayCollection.emailMessage.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      tableScrollX: 1680,
      pageTitle: '邮件消息列表',
      paramsKey: accessWayCollection.emailMessage.pageList.paramsKey,
      loadApiPath: modelTypeCollection.emailMessageTypeCollection.pageList,
      currentRecord: null,
    };
  }

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'showOperateLog': {
        this.showOperateLogDrawer(handleData);
        break;
      }

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

  showPreviewDrawer = (record) => {
    this.setState(
      {
        currentRecord: record,
      },
      () => {
        PreviewDrawer.open();
      },
    );
  };

  showOperateLogDrawer = (record) => {
    this.setState(
      {
        currentRecord: record,
      },
      () => {
        OperateLogDrawer.open();
      },
    );
  };

  fillSearchCardInitialValues = () => {
    const values = {};

    values[fieldData.status.name] = unlimitedWithStringFlag.key;
    values[fieldData.aggregate.name] = unlimitedWithStringFlag.key;

    return values;
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 6,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.subject,
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.component,
          component: renderSearchEmailMessageStatusSelect({}),
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.component,
          component: renderSearchEmailMessageAggregateSelect({}),
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  establishListItemDropdownConfig = (record) => {
    return {
      size: 'small',
      text: '摘要',
      placement: 'topRight',
      icon: iconBuilder.read(),
      handleButtonClick: ({ handleData }) => {
        this.showPreviewDrawer(handleData);
      },
      handleData: record,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'showOperateLog',
          icon: iconBuilder.read(),
          text: '操作日志',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'refreshCache',
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          confirm: true,
          title: '将要刷新缓存，确定吗？',
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.subject,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.fromEmailAddress,
      width: 180,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.toEmailAddress,
      width: 180,
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
          text: getEmailMessageStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.sendTime,
      width: 160,
      sorter: false,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.aggregate,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (value) => {
        return {
          status: getAggregateBadge(value),
          text: getEmailMessageAggregateName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.emailMessageId,
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

  renderPresetOther = () => {
    const { currentRecord } = this.state;

    return (
      <>
        <PreviewDrawer maskClosable externalData={currentRecord} />

        <OperateLogDrawer externalData={currentRecord} />
      </>
    );
  };
}

export default PageList;
