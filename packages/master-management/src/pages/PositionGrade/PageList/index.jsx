import React from 'react';

import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  getValueByKey,
  showSimpleErrorMessage,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  searchCardConfig,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { AddBasicInfoDrawer } from '../AddBasicInfoDrawer';
import { refreshCacheAction } from '../Assist/action';
import { ChangeSortModal } from '../ChangeSortModal';
import { fieldData } from '../Common/data';
import { OperateLogDrawer } from '../OperateLogDrawer';
import { UpdateBasicInfoDrawer } from '../UpdateBasicInfoDrawer';

const { MultiPage } = DataMultiPageView;

@connect(({ positionGrade, schedulingControl }) => ({
  positionGrade,
  schedulingControl,
}))
class PageList extends MultiPage {
  componentAuthority = accessWayCollection.positionGrade.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '列表',
      paramsKey: accessWayCollection.positionGrade.pageList.paramsKey,
      loadApiPath: 'positionGrade/pageList',
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

  showAddBasicInfoDrawer = () => {
    AddBasicInfoDrawer.open();
  };

  afterAddBasicInfoDrawerOk = ({
    // eslint-disable-next-line no-unused-vars
    singleData,
    // eslint-disable-next-line no-unused-vars
    listData,
    // eslint-disable-next-line no-unused-vars
    extraData,
    // eslint-disable-next-line no-unused-vars
    responseOriginalData,
    // eslint-disable-next-line no-unused-vars
    submitData,
    // eslint-disable-next-line no-unused-vars
    subjoinData,
  }) => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  showUpdateBasicInfoDrawer = (record) => {
    this.setState(
      {
        currentRecord: record,
      },
      () => {
        UpdateBasicInfoDrawer.open();
      },
    );
  };

  afterUpdateBasicInfoDrawerOk = () => {
    this.refreshDataWithReloadAnimalPrompt({ delay: 500 });
  };

  showChangeSortModal = (r) => {
    this.setState({ currentRecord: r }, () => {
      ChangeSortModal.open();
    });
  };

  afterChangeSortModalOk = ({
    // eslint-disable-next-line no-unused-vars
    singleData,
    // eslint-disable-next-line no-unused-vars
    listData,
    // eslint-disable-next-line no-unused-vars
    extraData,
    // eslint-disable-next-line no-unused-vars
    responseOriginalData,
    // eslint-disable-next-line no-unused-vars
    submitData,
    // eslint-disable-next-line no-unused-vars
    subjoinData,
  }) => {
    this.refreshDataWithReloadAnimalPrompt({});
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

  goToEdit = (record) => {
    const positionGradeId = getValueByKey({
      data: record,
      key: fieldData.positionGradeId.name,
      defaultValue: '',
    });

    this.goToPath(`/positionGrade/edit/load/${positionGradeId}/key/basicInfo`);
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 6,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.title,
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
      text: '修改',
      icon: iconBuilder.edit(),
      disabled: !checkHasAuthority(
        accessWayCollection.positionGrade.get.permission,
      ),
      handleButtonClick: ({ handleData }) => {
        this.goToEdit(handleData);
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
            accessWayCollection.positionGrade.refreshCache.permission,
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
      width: 320,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.positionGradeId,
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
        <AddBasicInfoDrawer afterOK={this.afterAddBasicInfoDrawerOk} />

        <UpdateBasicInfoDrawer
          externalData={currentRecord}
          afterOK={this.afterUpdateBasicInfoDrawerOk}
        />

        <ChangeSortModal
          externalData={currentRecord}
          afterOK={this.afterChangeSortModalOk}
        />

        <OperateLogDrawer externalData={currentRecord} />
      </>
    );
  };
}

export default PageList;
