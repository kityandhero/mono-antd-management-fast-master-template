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
  setDisableAction,
  setEnableAction,
} from '../../../../PresetQuestionItem/Assist/action';
import { getStatusBadge } from '../../../../PresetQuestionItem/Assist/tools';
import {
  fieldData,
  statusCollection,
} from '../../../../PresetQuestionItem/Common/data';
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
    pageSize: 2,
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
      case 'setEnable': {
        this.setEnable(handleData);
        break;
      }

      case 'setDisable': {
        this.setDisable(handleData);
        break;
      }

      case 'remove': {
        this.remove(handleData);
        break;
      }

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

  handleItemStatus = ({ target, handleData, remoteData }) => {
    const id = getValueByKey({
      data: handleData,
      key: fieldData.presetQuestionItemId.name,
      defaultValue: '',
    });

    handleItem({
      target,
      value: id,
      compareValueHandler: (o) => {
        const v = getValueByKey({
          data: o,
          key: fieldData.presetQuestionItemId.name,
          defaultValue: '',
        });

        return v;
      },
      handler: (d) => {
        const o = d;

        o[fieldData.status.name] = getValueByKey({
          data: remoteData,
          key: fieldData.status.name,
        });

        return d;
      },
    });
  };

  setEnable = (record) => {
    setEnableAction({
      target: this,
      handleData: record,
      successCallback: ({ target, handleData, remoteData }) => {
        target.handleItemStatus({ target, handleData, remoteData });
      },
    });
  };

  setDisable = (record) => {
    setDisableAction({
      target: this,
      handleData: record,
      successCallback: ({ target, handleData, remoteData }) => {
        target.handleItemStatus({ target, handleData, remoteData });
      },
    });
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
    const itemStatus = getValueByKey({
      data: item,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

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
          key: 'setEnable',
          icon: iconBuilder.upload(),
          text: '设为启用',
          hidden: !checkHasAuthority(
            accessWayCollection.presetQuestionItem.setEnable.permission,
          ),
          disabled: itemStatus === statusCollection.enable,
          confirm: {
            title: '即将设为上线，确定吗？',
          },
        },
        {
          key: 'setDisable',
          icon: iconBuilder.download(),
          text: '设为禁用',
          hidden: !checkHasAuthority(
            accessWayCollection.presetQuestionItem.setDisable.permission,
          ),
          disabled: itemStatus === statusCollection.disable,
          confirm: {
            title: '即将设为下线，确定吗？',
          },
        },
        {
          withDivider: true,
          uponDivider: true,
          key: 'remove',
          icon: iconBuilder.delete(),
          text: '移除数据',
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
            accessWayCollection.presetQuestion.refreshCache.permission,
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
      </>
    );
  };
}

export default PageList;
