import React from 'react';

import { connect } from 'easy-soft-dva';
import {
  buildRandomHexColor,
  checkHasAuthority,
  convertCollection,
  getValueByKey,
  handleItem,
  showSimpleErrorMessage,
  toNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  dropdownExpandItemType,
  extraBuildType,
  searchCardConfig,
  unlimitedWithStringFlag,
} from 'antd-management-fast-common';
import {
  FunctionSupplement,
  iconBuilder,
} from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../../customConfig';
import {
  getUserWorkflowConfigureStatusName,
  renderSearchFlowMobileApproveViewModeSelect,
} from '../../../../customSpecialComponents';
import { modelTypeCollection } from '../../../../modelBuilders';
import {
  refreshAllEntityCacheAction,
  refreshCacheAction,
  toggleAllowAutoReuseProcessHistoryAction,
  toggleAllowScanCodeVerificationAction,
} from '../Assist/action';
import { getStatusBadge } from '../Assist/tools';
import { fieldData } from '../Common/data';
import { OperateLogDrawer } from '../OperateLogDrawer';
import { SetMobileApproveViewDrawer } from '../SetMobileApproveViewDrawer';

const { MultiPage } = DataMultiPageView;
const {
  Whether: { renderSearchWhetherSelect },
} = FunctionSupplement;

@connect(({ userWorkflowConfigure, schedulingControl }) => ({
  userWorkflowConfigure,
  schedulingControl,
}))
class PageList extends MultiPage {
  columnOperateWidth = 146;

  componentAuthority =
    accessWayCollection.userWorkflowConfigure.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '用户工作流配置列表',
      paramsKey: accessWayCollection.userWorkflowConfigure.pageList.paramsKey,
      loadApiPath:
        modelTypeCollection.userWorkflowConfigureTypeCollection.pageList,
      currentRecord: null,
    };
  }

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'toggleAllowScanCodeVerification': {
        this.toggleAllowScanCodeVerification(handleData);
        break;
      }
      case 'toggleAllowAutoReuseProcessHistory': {
        this.toggleAllowAutoReuseProcessHistory(handleData);
        break;
      }
      case 'showSetMobileApproveViewDrawer': {
        this.showSetMobileApproveViewDrawer(handleData);
        break;
      }

      case 'showOperateLog': {
        this.showOperateLogDrawer(handleData);
        break;
      }

      default: {
        showSimpleErrorMessage(`can not find matched key "${key}"`);
        break;
      }
    }
  };

  toggleAllowScanCodeVerification = (record) => {
    toggleAllowScanCodeVerificationAction({
      target: this,
      handleData: record,
      successCallback: ({ target, remoteData }) => {
        const id = getValueByKey({
          data: remoteData,
          key: fieldData.userWorkflowConfigureId.name,
        });

        handleItem({
          target,
          value: id,
          compareValueHandler: (o) => {
            const v = getValueByKey({
              data: o,
              key: fieldData.userWorkflowConfigureId.name,
            });

            return v;
          },
          handler: (d) => {
            const o = d;

            o[fieldData.whetherAllowScanCodeVerification.name] = getValueByKey({
              data: remoteData,
              key: fieldData.whetherAllowScanCodeVerification.name,
            });

            o[fieldData.whetherAllowScanCodeVerificationNote.name] =
              getValueByKey({
                data: remoteData,
                key: fieldData.whetherAllowScanCodeVerificationNote.name,
              });

            return d;
          },
        });
      },
    });
  };

  toggleAllowAutoReuseProcessHistory = (record) => {
    toggleAllowAutoReuseProcessHistoryAction({
      target: this,
      handleData: record,
      successCallback: ({ target, remoteData }) => {
        const id = getValueByKey({
          data: remoteData,
          key: fieldData.userWorkflowConfigureId.name,
        });

        handleItem({
          target,
          value: id,
          compareValueHandler: (o) => {
            const v = getValueByKey({
              data: o,
              key: fieldData.userWorkflowConfigureId.name,
            });

            return v;
          },
          handler: (d) => {
            const o = d;

            o[fieldData.whetherAllowAutoReuseProcessHistory.name] =
              getValueByKey({
                data: remoteData,
                key: fieldData.whetherAllowAutoReuseProcessHistory.name,
              });

            o[fieldData.whetherAllowAutoReuseProcessHistoryNote.name] =
              getValueByKey({
                data: remoteData,
                key: fieldData.whetherAllowAutoReuseProcessHistoryNote.name,
              });

            return d;
          },
        });
      },
    });
  };

  refreshCache = (record) => {
    refreshCacheAction({
      target: this,
      handleData: record,
    });
  };

  refreshAllEntityCache = () => {
    refreshAllEntityCacheAction({
      target: this,
      handleData: {},
    });
  };

  showSetMobileApproveViewDrawer = (r) => {
    this.setState(
      {
        currentRecord: r,
      },
      () => {
        SetMobileApproveViewDrawer.open();
      },
    );
  };

  afterSetMobileApproveViewDrawerOk = ({
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

  showOperateLogDrawer = (item) => {
    this.setState(
      {
        currentRecord: item,
      },
      () => {
        OperateLogDrawer.open();
      },
    );
  };

  establishExtraActionConfig = () => {
    return {
      list: [
        {
          buildType: extraBuildType.generalExtraButton,
          type: 'default',
          size: 'small',
          icon: iconBuilder.reload(),
          text: '刷新全部用户工作流配置缓存',
          confirm: true,
          title: '即将刷新全部用户工作流配置缓存，确定执行吗?',
          disabled: this.checkInProgress(),
          hidden: !checkHasAuthority(
            accessWayCollection.userWorkflowConfigure.refreshAllEntityCache
              .permission,
          ),
          handleClick: () => {
            this.refreshAllEntityCache();
          },
        },
      ],
    };
  };

  fillSearchCardInitialValues = () => {
    const values = {};

    values[fieldData.whetherAllowAutoReuseProcessHistory.name] =
      unlimitedWithStringFlag.flag;

    values[fieldData.whetherAllowScanCodeVerification.name] =
      unlimitedWithStringFlag.flag;

    values[fieldData.mobileApproveViewMode.name] = unlimitedWithStringFlag.flag;

    return values;
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 5,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.realName,
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.component,
          component: renderSearchWhetherSelect({
            ...fieldData.whetherAllowAutoReuseProcessHistory,
          }),
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.component,
          component: renderSearchWhetherSelect({
            ...fieldData.whetherAllowScanCodeVerification,
          }),
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.component,
          component: renderSearchFlowMobileApproveViewModeSelect({}),
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
      text: '刷新缓存',
      icon: iconBuilder.reload(),
      disabled: !checkHasAuthority(
        accessWayCollection.userWorkflowConfigure.refreshCache.permission,
      ),
      handleButtonClick: ({ handleData }) => {
        this.refreshCache(handleData);
      },
      handleData: item,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'toggleAllowScanCodeVerification',
          icon: iconBuilder.swap(),
          text: '切换是否允许扫码校验',
          hidden: !checkHasAuthority(
            accessWayCollection.userWorkflowConfigure
              .toggleAllowScanCodeVerification.permission,
          ),
          confirm: true,
          title: '即将切换是否允许扫码校验，确定吗？',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'toggleAllowAutoReuseProcessHistory',
          icon: iconBuilder.swap(),
          text: '切换是否允许自动套用审批历史',
          hidden: !checkHasAuthority(
            accessWayCollection.userWorkflowConfigure
              .toggleAllowAutoReuseProcessHistory.permission,
          ),
          confirm: true,
          title: '即将切换是否允许扫码校验，确定吗？',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'showSetMobileApproveViewDrawer',
          icon: iconBuilder.edit(),
          text: '设置移动端审批视图模式',
          hidden: !checkHasAuthority(
            accessWayCollection.userWorkflowConfigure.setMobileApproveViewMode
              .permission,
          ),
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'showOperateLog',
          icon: iconBuilder.read(),
          text: '操作日志',
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.avatar,
      width: 60,
      showRichFacade: true,
      facadeMode: columnFacadeMode.image,
    },
    {
      dataTarget: fieldData.friendlyName,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.mobileApproveViewMode,
      width: 180,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) * 2 + 8,
          }),
        };
      },
      formatValue: (value, record) => {
        return getValueByKey({
          data: record,
          key: fieldData.mobileApproveViewModeNote.name,
          convert: convertCollection.string,
        });
      },
    },
    {
      dataTarget: fieldData.whetherAllowAutoReuseProcessHistory,
      width: 220,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) * 10 + 5,
          }),
        };
      },
      formatValue: (value, record) => {
        return getValueByKey({
          data: record,
          key: fieldData.whetherAllowAutoReuseProcessHistoryNote.name,
          convert: convertCollection.string,
        });
      },
    },
    {
      dataTarget: fieldData.whetherAllowScanCodeVerification,
      width: 180,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) * 10 + 5,
          }),
        };
      },
      formatValue: (value, record) => {
        return getValueByKey({
          data: record,
          key: fieldData.whetherAllowScanCodeVerificationNote.name,
          convert: convertCollection.string,
        });
      },
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
          text: getUserWorkflowConfigureStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.userWorkflowConfigureId,
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
        <SetMobileApproveViewDrawer
          externalData={currentRecord}
          afterOK={this.afterSetMobileApproveViewDrawerOk}
        />

        <OperateLogDrawer externalData={currentRecord} />
      </>
    );
  };
}

export default PageList;
