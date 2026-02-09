import React from 'react';

import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  convertCollection,
  getValueByKey,
  handleItem,
  showSimpleErrorMessage,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  dropdownExpandItemType,
  listViewConfig,
  searchCardConfig,
  unlimitedWithStringFlag,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../../customConfig';
import {
  getWorkflowCategoryStatusName,
  renderSearchWorkflowCategoryStatusSelect,
} from '../../../../customSpecialComponents';
import { modelTypeCollection } from '../../../../modelBuilders';
import { AddBasicInfoDrawer } from '../AddBasicInfoDrawer';
import {
  refreshCacheAction,
  setDisableAction,
  setEnableAction,
} from '../Assist/action';
import { getStatusBadge } from '../Assist/tools';
import { ChangeImageModal } from '../ChangeImageModal';
import { ChangeSortModal } from '../ChangeSortModal';
import { fieldData, statusCollection } from '../Common/data';
import { OperateLogDrawer } from '../OperateLogDrawer';
import { UpdateBasicInfoDrawer } from '../UpdateBasicInfoDrawer';

const { MultiPage } = DataMultiPageView;

@connect(({ workflowCategory, schedulingControl }) => ({
  workflowCategory,
  schedulingControl,
}))
class PageList extends MultiPage {
  componentAuthority = accessWayCollection.workflowCategory.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '流程类别列表',
      paramsKey: accessWayCollection.workflowCategory.pageList.paramsKey,
      loadApiPath: modelTypeCollection.workflowCategoryTypeCollection.pageList,
      currentRecord: null,
    };
  }

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'setSort': {
        this.showChangeSortModal(handleData);
        break;
      }

      case 'setImage': {
        this.showChangeImageModal(handleData);
        break;
      }

      case 'setEnable': {
        this.setEnable(handleData);
        break;
      }

      case 'setDisable': {
        this.setDisable(handleData);
        break;
      }

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

  handleItemStatus = ({ target, handleData, remoteData }) => {
    const id = getValueByKey({
      data: handleData,
      key: fieldData.workflowCategoryId.name,
    });

    handleItem({
      target,
      value: id,
      compareValueHandler: (o) => {
        const v = getValueByKey({
          data: o,
          key: fieldData.workflowCategoryId.name,
        });

        return v;
      },
      handler: (d) => {
        const o = d;

        o[fieldData.status.name] = getValueByKey({
          data: remoteData,
          key: fieldData.status.name,
        });

        o[fieldData.statusNote.name] = getValueByKey({
          data: remoteData,
          key: fieldData.statusNote.name,
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
    this.setState(
      {
        currentRecord: r,
      },
      () => {
        ChangeSortModal.open();
      },
    );
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

  showChangeImageModal = (r) => {
    this.setState(
      {
        currentRecord: r,
      },
      () => {
        ChangeImageModal.open();
      },
    );
  };

  afterChangeImageModalOk = ({
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

  fillSearchCardInitialValues = () => {
    const values = {};

    values[fieldData.status.name] = unlimitedWithStringFlag.key;

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
          type: searchCardConfig.contentItemType.customSelect,
          component: renderSearchWorkflowCategoryStatusSelect({}),
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
        icon: iconBuilder.plus(),
        text: '新增类别',
        handleClick: this.showAddBasicInfoDrawer,
      },
    ];
  };

  establishListItemDropdownConfig = (record) => {
    const status = getValueByKey({
      data: record,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    return {
      size: 'small',
      text: '修改',
      icon: iconBuilder.edit(),
      disabled: !checkHasAuthority(
        accessWayCollection.workflowCategory.get.permission,
      ),
      handleButtonClick: ({ handleData }) => {
        this.showUpdateBasicInfoDrawer(handleData);
      },
      handleData: record,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'setImage',
          icon: iconBuilder.picture(),
          text: `设置图片`,
          hidden: !checkHasAuthority(
            accessWayCollection.smsCategory.setImage.permission,
          ),
        },
        {
          key: 'setSort',
          icon: iconBuilder.sortAscending(),
          text: '设置排序值',
          hidden: !checkHasAuthority(
            accessWayCollection.smsCategory.setSort.permission,
          ),
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'setEnable',
          icon: iconBuilder.playCircle(),
          text: '设为启用',
          disabled: status === statusCollection.enable,
          hidden: !checkHasAuthority(
            accessWayCollection.workflowCategory.setEnable.permission,
          ),
          confirm: true,
          title: '即将设为启用，确定吗？',
        },
        {
          key: 'setDisable',
          icon: iconBuilder.pauseCircle(),
          text: '设为禁用',
          disabled: status === statusCollection.disable,
          hidden: !checkHasAuthority(
            accessWayCollection.workflowCategory.setDisable.permission,
          ),
          confirm: true,
          title: '即将设为禁用，确定吗？',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'showOperateLog',
          icon: iconBuilder.read(),
          text: '操作日志',
          hidden: !checkHasAuthority(
            accessWayCollection.smsCategory.pageListOperateLog.permission,
          ),
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'refreshCache',
          icon: iconBuilder.reload(),
          text: '刷新缓存',
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
      dataTarget: fieldData.name,
      width: 160,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.description,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.parentName,
      width: 160,
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
          text: getWorkflowCategoryStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.workflowCategoryId,
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

        <ChangeImageModal
          externalData={currentRecord}
          afterOK={this.afterChangeImageModalOk}
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
