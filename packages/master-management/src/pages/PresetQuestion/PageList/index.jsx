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
  listViewConfig,
  searchCardConfig,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import {
  getBusinessModeName,
  getPresetQuestionStatusName,
  getPresetQuestionTypeName,
  renderSearchBusinessModeSelect,
  renderSearchPresetQuestionStatusSelect,
  renderSearchPresetQuestionTypeSelect,
} from '../../../customSpecialComponents';
import { AddBasicInfoDrawer } from '../AddBasicInfoDrawer';
import {
  refreshCacheAction,
  removeAction,
  setOfflineAction,
  setOnlineAction,
} from '../Assist/action';
import { getStatusBadge } from '../Assist/tools';
import { ChangeBusinessModeModal } from '../ChangeBusinessModeModal';
import { fieldData, statusCollection } from '../Common/data';

const { MultiPage } = DataMultiPageView;

@connect(({ presetQuestion, schedulingControl }) => ({
  presetQuestion,
  schedulingControl,
}))
class PageList extends MultiPage {
  componentAuthority = accessWayCollection.presetQuestion.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '预设问题列表',
      paramsKey: accessWayCollection.presetQuestion.pageList.paramsKey,
      loadApiPath: 'presetQuestion/pageList',
      currentRecord: null,
    };
  }

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'updateBusinessMode': {
        this.showChangeBusinessModeModal(handleData);
        break;
      }

      case 'setOnline': {
        this.setOnline(handleData);
        break;
      }

      case 'setOffline': {
        this.setOffline(handleData);
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
      key: fieldData.presetQuestionId.name,
    });

    handleItem({
      target,
      value: id,
      compareValueHandler: (o) => {
        const v = getValueByKey({
          data: o,
          key: fieldData.presetQuestionId.name,
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

  setOnline = (record) => {
    setOnlineAction({
      target: this,
      handleData: record,
      successCallback: ({ target, handleData, remoteData }) => {
        target.handleItemStatus({ target, handleData, remoteData });
      },
    });
  };

  setOffline = (record) => {
    setOfflineAction({
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

  showChangeBusinessModeModal = (item) => {
    this.setState({ currentRecord: item }, () => {
      ChangeBusinessModeModal.open();
    });
  };

  afterChangeBusinessModeModalOk = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  goToEdit = (record) => {
    const presetQuestionId = getValueByKey({
      data: record,
      key: fieldData.presetQuestionId.name,
      defaultValue: '',
    });

    this.goToPath(
      `/survey/presetQuestion/edit/load/${presetQuestionId}/key/basicInfo`,
    );
  };

  establishDataContainerExtraActionCollectionConfig = () => {
    return [
      {
        buildType:
          listViewConfig.dataContainerExtraActionBuildType.generalButton,
        type: 'primary',
        icon: iconBuilder.plus(),
        text: '新增问题',
        handleClick: this.showAddBasicInfoDrawer,
      },
    ];
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 5,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.title,
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.customSelect,
          component: renderSearchPresetQuestionTypeSelect({}),
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.customSelect,
          component: renderSearchBusinessModeSelect({}),
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.customSelect,
          component: renderSearchPresetQuestionStatusSelect({}),
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
        accessWayCollection.presetQuestion.get.permission,
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
          key: 'updateBusinessMode',
          icon: iconBuilder.edit(),
          text: '设置适用业务',
          hidden: !checkHasAuthority(
            accessWayCollection.section.updateBusinessMode.permission,
          ),
        },
        {
          key: 'setOnline',
          withDivider: true,
          uponDivider: true,
          icon: iconBuilder.upload(),
          text: '设为上线',
          hidden: !checkHasAuthority(
            accessWayCollection.section.setOnline.permission,
          ),
          disabled: itemStatus === statusCollection.online,
          confirm: {
            title: '即将设为上线，确定吗？',
          },
        },
        {
          key: 'setOffline',
          icon: iconBuilder.download(),
          text: '设为下线',
          hidden: !checkHasAuthority(
            accessWayCollection.section.setOffline.permission,
          ),
          disabled: itemStatus === statusCollection.offline,
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
      dataTarget: fieldData.type,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) * 10 + 12,
          }),
        };
      },
      formatValue: (value) => {
        return getPresetQuestionTypeName({
          value: value,
        });
      },
    },
    {
      dataTarget: fieldData.businessMode,
      width: 180,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) * 4 + 32,
          }),
        };
      },
      formatValue: (value) => {
        return getBusinessModeName({
          value: value,
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
          text: getPresetQuestionStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.presetQuestionId,
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

        <ChangeBusinessModeModal
          externalData={currentRecord}
          afterOK={this.afterChangeBusinessModeModalOk}
        />
      </>
    );
  };
}

export default PageList;
