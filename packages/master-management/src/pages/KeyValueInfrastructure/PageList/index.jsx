import React from 'react';

import { connect } from 'easy-soft-dva';
import { checkHasAuthority } from 'easy-soft-utility';

import {
  columnFacadeMode,
  searchCardConfig,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { refreshCacheAction } from '../Assist/action';
import { fieldData } from '../Common/data';
import { PreviewDrawer } from '../PreviewDrawer';

const { MultiPage } = DataMultiPageView;

@connect(({ keyValueInfrastructure, schedulingControl }) => ({
  keyValueInfrastructure,
  schedulingControl,
}))
class PageList extends MultiPage {
  componentAuthority =
    accessWayCollection.keyValueInfrastructure.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '基础键值列表',
      paramsKey: accessWayCollection.keyValueInfrastructure.pageList.paramsKey,
      loadApiPath: 'keyValueInfrastructure/pageList',
      dateRangeFieldName: '操作时间',
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
    this.setState({ currentRecord: record }, () => {
      PreviewDrawer.open();
    });
  };

  establishSearchCardConfig = () => {
    const { dateRangeFieldName } = this.state;

    return {
      list: [
        {
          lg: 6,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.title,
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.key,
        },
        {
          lg: 8,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardRangePickerCore(dateRangeFieldName),
        },
        {
          lg: 4,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  establishListItemDropdownConfig = (item) => {
    return {
      size: 'small',
      text: '详情',
      icon: iconBuilder.read(),
      disabled: !checkHasAuthority(
        accessWayCollection.keyValueInfrastructure.get.permission,
      ),
      handleButtonClick: ({ handleData }) => {
        this.showPreviewDrawer(handleData);
      },
      handleData: item,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'refreshCache',
          withDivider: true,
          uponDivider: true,
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          hidden: !checkHasAuthority(
            accessWayCollection.keyValueInfrastructure.refreshCache.permission,
          ),
          confirm: true,
          title: '即将刷新缓存，确定吗？',
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.title,
      // width: 320,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.key,
      width: 380,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.value,
      width: 180,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.tag,
      width: 260,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.keyValueInfrastructureId,
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
      </>
    );
  };
}

export default PageList;
