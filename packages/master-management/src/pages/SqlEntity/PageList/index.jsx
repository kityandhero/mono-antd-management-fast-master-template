import React from 'react';

import { connect } from 'easy-soft-dva';
import { checkHasAuthority } from 'easy-soft-utility';

import { searchCardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { refreshCacheAction } from '../Assist/action';
import { fieldData } from '../Common/data';
import { FieldContentDrawer } from '../FieldContentDrawer';
import { SqlContentDrawer } from '../SqlContentDrawer';

const { MultiPage } = DataMultiPageView;

@connect(({ sqlEntity, schedulingControl }) => ({
  sqlEntity,
  schedulingControl,
}))
class PageList extends MultiPage {
  componentAuthority = accessWayCollection.sqlEntity.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '列表',
      paramsKey: accessWayCollection.sqlEntity.pageList.paramsKey,
      loadApiPath: 'sqlEntity/pageList',
      currentRecord: null,
    };
  }

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'showFieldContent': {
        this.showFieldContentDrawer(handleData);
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

  showSqlContentDrawer = (record) => {
    this.setState(
      {
        currentRecord: record,
      },
      () => {
        SqlContentDrawer.open();
      },
    );
  };

  showFieldContentDrawer = (record) => {
    this.setState(
      {
        currentRecord: record,
      },
      () => {
        FieldContentDrawer.open();
      },
    );
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 6,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.name,
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
      text: '查阅',
      icon: iconBuilder.read(),
      disabled: !checkHasAuthority(
        accessWayCollection.sqlEntity.get.permission,
      ),
      handleButtonClick: ({ handleData }) => {
        this.showSqlContentDrawer(handleData);
      },
      handleData: item,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'showFieldContent',
          withDivider: true,
          uponDivider: true,
          icon: iconBuilder.reload(),
          text: '字段信息',
          hidden: !checkHasAuthority(
            accessWayCollection.sqlEntity.get.permission,
          ),
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.name,
      width: 320,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.label,
      width: 280,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.tableName,
      width: 380,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.namespace,
      showRichFacade: true,
      emptyValue: '--',
    },
    // {
    //   dataTarget: fieldData.assemblyFullName,
    //   width: 200,
    //   showRichFacade: true,
    //   emptyValue: '--',
    // },
    // {
    //   dataTarget: fieldData.sqlEntityId,
    //   width: 120,
    //   showRichFacade: true,
    //   canCopy: true,
    // },
  ];

  renderPresetOther = () => {
    const { currentRecord } = this.state;

    return (
      <>
        <SqlContentDrawer maskClosable externalData={currentRecord} />

        <FieldContentDrawer maskClosable externalData={currentRecord} />
      </>
    );
  };
}

export default PageList;
