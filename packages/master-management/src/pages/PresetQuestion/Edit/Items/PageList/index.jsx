import React from 'react';

import { connect } from 'easy-soft-dva';
import {
  buildRandomHexColor,
  checkHasAuthority,
  showSimpleErrorMessage,
  toNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  getDerivedStateFromPropertiesForUrlParameters,
  listViewConfig,
  searchCardConfig,
} from 'antd-management-fast-common';
import {
  FunctionSupplement,
  iconBuilder,
} from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../../../customConfig';
import { getPresetQuestionItemStatusName } from '../../../../../customSpecialComponents';
import { AddBasicInfoDrawer } from '../../../../PresetQuestionItem/AddBasicInfoDrawer';
import {
  refreshCacheAction,
  removeAction,
} from '../../../../PresetQuestionItem/Assist/action';
import { getStatusBadge } from '../../../../PresetQuestionItem/Assist/tools';
import { fieldData } from '../../../../PresetQuestionItem/Common/data';
import { OperateLogDrawer } from '../../../../PresetQuestionItem/OperateLogDrawer';
import { UpdateBasicInfoDrawer } from '../../../../PresetQuestionItem/UpdateBasicInfoDrawer';
import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState,
} from '../../../Assist/config';

const { InnerMultiPage } = DataMultiPageView;
const {
  Whether: { getWhetherName },
} = FunctionSupplement;

@connect(({ presetQuestionItem, schedulingControl }) => ({
  presetQuestionItem,
  schedulingControl,
}))
class PageList extends InnerMultiPage {
  goToUpdateWhenProcessed = true;

  pageValues = {
    pageNo: 1,
    frontendPageNo: 1,
    pageSize: 10,
  };

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'presetQuestionItem/pageList',
      presetQuestionId: null,
      currentRecord: null,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return getDerivedStateFromPropertiesForUrlParameters(
      nextProperties,
      previousState,
      { id: '' },
      parseUrlParametersForSetState,
    );
  }

  checkNeedUpdate = (preProperties, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProperties, preState, snapshot);
  };

  supplementLoadRequestParams = (o) => {
    const { presetQuestionId } = this.state;

    const result = o;

    result[fieldData.presetQuestionId.name] = presetQuestionId;

    return result;
  };

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

      case 'remove': {
        this.remove(handleData);
        break;
      }

      default: {
        showSimpleErrorMessage('can not find matched key');
        break;
      }
    }
  };

  remove = (record) => {
    removeAction({
      target: this,
      handleData: record,
      successCallback: ({ target }) => {
        target.refreshDataWithReloadAnimalPrompt({});
      },
    });
  };

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
    });
  };

  showAddBasicInfoDrawer = () => {
    AddBasicInfoDrawer.open();
  };

  afterAddBasicInfoDrawerOk = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  showUpdateBasicInfoDrawer = (r) => {
    this.setState(
      {
        currentRecord: r,
      },
      () => {
        UpdateBasicInfoDrawer.open();
      },
    );
  };

  afterUpdateBasicInfoDrawerOk = () => {
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

  fillSearchCardInitialValues = () => {
    const values = {};

    return values;
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

  establishDataContainerExtraActionCollectionConfig = () => {
    return [
      {
        buildType:
          listViewConfig.dataContainerExtraActionBuildType.generalButton,
        type: 'primary',
        icon: iconBuilder.addCircle(),
        text: '新增选项',
        hidden: !checkHasAuthority(
          accessWayCollection.presetQuestionItem.addBasicInfo.permission,
        ),
        handleClick: () => {
          this.showAddBasicInfoDrawer();
        },
      },
    ];
  };

  establishListItemDropdownConfig = (item) => {
    return {
      size: 'small',
      text: '修改',
      icon: iconBuilder.edit(),
      disabled: !checkHasAuthority(
        accessWayCollection.presetQuestionItem.get.permission,
      ),
      handleButtonClick: ({ handleData }) => {
        this.showUpdateBasicInfoDrawer(handleData);
      },
      handleData: item,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'showOperateLog',
          withDivider: true,
          uponDivider: true,
          icon: iconBuilder.read(),
          text: '操作日志',
          hidden: !checkHasAuthority(
            accessWayCollection.presetQuestionItem.pageListOperateLog
              .permission,
          ),
        },
        {
          key: 'remove',
          withDivider: true,
          uponDivider: true,
          icon: iconBuilder.delete(),
          text: '移除数据',
          hidden: !checkHasAuthority(
            accessWayCollection.presetQuestionItem.remove.permission,
          ),
          confirm: true,
          title: '将要移除数据，确定吗？',
        },
        {
          key: 'refreshCache',
          withDivider: true,
          uponDivider: true,
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          hidden: !checkHasAuthority(
            accessWayCollection.presetQuestionItem.refreshCache.permission,
          ),
          confirm: true,
          title: '即将刷新缓存，确定吗？',
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
      dataTarget: fieldData.title,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.whetherCorrect,
      width: 80,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) * 25 + 47,
          }),
        };
      },
      formatValue: (value) => {
        return getWhetherName({
          value: value,
        });
      },
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
          text: getPresetQuestionItemStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.presetQuestionItemId,
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
    const { presetQuestionId, currentRecord } = this.state;

    return (
      <>
        <AddBasicInfoDrawer
          hidden={
            !checkHasAuthority(
              accessWayCollection.presetQuestionItem.addBasicInfo.permission,
            )
          }
          externalData={{ presetQuestionId }}
          afterOK={() => {
            this.afterAddBasicInfoDrawerOk();
          }}
        />

        <UpdateBasicInfoDrawer
          hidden={
            !checkHasAuthority(
              accessWayCollection.presetQuestionItem.updateBasicInfo.permission,
            )
          }
          externalData={currentRecord}
          afterOK={() => {
            this.afterUpdateBasicInfoDrawerOk();
          }}
        />

        <OperateLogDrawer externalData={currentRecord} />
      </>
    );
  };
}

export default PageList;
