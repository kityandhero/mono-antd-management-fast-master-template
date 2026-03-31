import React from 'react';

import { connect } from 'easy-soft-dva';
import {
  buildRandomHexColor,
  checkHasAuthority,
  convertCollection,
  getValueByKey,
  showSimpleErrorMessage,
  toNumber,
  whetherNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  dropdownExpandItemType,
  listViewConfig,
  searchCardConfig,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../../customConfig';
import {
  getArticleStatusName,
  renderSearchArticleStatusSelect,
} from '../../../../customSpecialComponents';
import { modelTypeCollection } from '../../../../modelBuilders';
import { TreeCard } from '../../Section/TreeCard';
import { AddBasicInfoDrawer } from '../AddBasicInfoDrawer';
import {
  refreshCacheAction,
  setOfflineAction,
  setOnlineAction,
  toggleRecommendAction,
  toggleTopAction,
  toggleVisibleAction,
} from '../Assist/action';
import {
  getStatusBadge,
  handleItemStatus,
  handleItemWhetherRecommend,
  handleItemWhetherTop,
  handleItemWhetherVisible,
} from '../Assist/tools';
import { ChangeImageModal } from '../ChangeImageModal';
import { ChangeRectangleImageModal } from '../ChangeRectangleImageModal';
import { ChangeRenderTypeModal } from '../ChangeRenderTypeModal';
import { ChangeSortModal } from '../ChangeSortModal';
import { fieldData, statusCollection } from '../Common/data';
import { OperateLogDrawer } from '../OperateLogDrawer';

const { MultiPage } = DataMultiPageView;

@connect(({ article, schedulingControl }) => ({
  article,
  schedulingControl,
}))
class PageList extends MultiPage {
  // 在控制台显示组建内调用序列, 仅为进行开发辅助
  showCallProcess = true;

  componentAuthority = accessWayCollection.article.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      tableScrollX: 1806,
      pageTitle: '文章列表',
      paramsKey: accessWayCollection.article.pageList.paramsKey,
      loadApiPath: modelTypeCollection.articleTypeCollection.pageList,
      currentRecord: null,
    };
  }

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'setImage': {
        this.showChangeImageModal(handleData);
        break;
      }

      case 'setRectangleImage': {
        this.showChangeRectangleImageModal(handleData);
        break;
      }

      case 'setRenderType': {
        this.showChangeRenderTypeModal(handleData);
        break;
      }

      case 'setSort': {
        this.showChangeSortModal(handleData);
        break;
      }

      case 'toggleRecommend': {
        this.toggleRecommend(handleData);
        break;
      }

      case 'toggleTop': {
        this.toggleTop(handleData);
        break;
      }

      case 'toggleVisible': {
        this.toggleVisible(handleData);
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

  toggleRecommend = (r) => {
    toggleRecommendAction({
      target: this,
      handleData: r,
      successCallback: ({ target, handleData, remoteData }) => {
        handleItemWhetherRecommend({ target, handleData, remoteData });
      },
    });
  };

  toggleTop = (record) => {
    toggleTopAction({
      target: this,
      handleData: record,
      successCallback: ({ target, handleData, remoteData }) => {
        handleItemWhetherTop({ target, handleData, remoteData });
      },
    });
  };

  toggleVisible = (record) => {
    toggleVisibleAction({
      target: this,
      handleData: record,
      successCallback: ({ target, handleData, remoteData }) => {
        handleItemWhetherVisible({ target, handleData, remoteData });
      },
    });
  };

  setOnline = (r) => {
    setOnlineAction({
      target: this,
      handleData: r,
      successCallback: ({ target, handleData, remoteData }) => {
        handleItemStatus({ target, handleData, remoteData });
      },
    });
  };

  setOffline = (r) => {
    setOfflineAction({
      target: this,
      handleData: r,
      successCallback: ({ target, handleData, remoteData }) => {
        handleItemStatus({ target, handleData, remoteData });
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

  showChangeImageModal = (r) => {
    this.setState({ currentRecord: r }, () => {
      ChangeImageModal.open();
    });
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

  showChangeRectangleImageModal = (r) => {
    this.setState({ currentRecord: r }, () => {
      ChangeRectangleImageModal.open();
    });
  };

  afterChangeRectangleImageModalOk = ({
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

  showChangeRenderTypeModal = (item) => {
    this.setState({ currentRecord: item }, () => {
      ChangeRenderTypeModal.open();
    });
  };

  afterChangeRenderTypeModalOk = () => {
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

  goToEdit = (record) => {
    const articleId = getValueByKey({
      data: record,
      key: fieldData.articleId.name,
      defaultValue: '',
    });

    this.goToPath(`/news/article/edit/load/${articleId}/key/basicInfo`);
  };

  establishSiderTopAreaConfig = () => {
    return (
      <>
        <TreeCard />
      </>
    );
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 12,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.title,
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.component,
          component: renderSearchArticleStatusSelect({}),
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
        text: '新增文章',
        hidden: !checkHasAuthority(
          accessWayCollection.section.addBasicInfo.permission,
        ),
        handleClick: this.showAddBasicInfoDrawer,
      },
    ];
  };

  establishListItemDropdownConfig = (item) => {
    const status = getValueByKey({
      data: item,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    return {
      size: 'small',
      text: '修改',
      icon: iconBuilder.edit(),
      disabled: !checkHasAuthority(accessWayCollection.article.get.permission),
      handleButtonClick: ({ handleData }) => {
        this.goToEdit(handleData);
      },
      handleData: item,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'setImage',
          icon: iconBuilder.picture(),
          text: `设置图片`,
          hidden: !checkHasAuthority(
            accessWayCollection.article.setImage.permission,
          ),
        },
        {
          key: 'setRectangleImage',
          icon: iconBuilder.picture(),
          text: `设置长方形配图`,
          hidden: !checkHasAuthority(
            accessWayCollection.article.setRectangleImage.permission,
          ),
        },
        {
          key: 'setRenderType',
          icon: iconBuilder.edit(),
          text: '设置渲染模式',
          hidden: !checkHasAuthority(
            accessWayCollection.article.setRenderType.permission,
          ),
        },
        {
          key: 'setSort',
          icon: iconBuilder.edit(),
          text: '设置排序值',
          hidden: !checkHasAuthority(
            accessWayCollection.article.setSort.permission,
          ),
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'toggleRecommend',
          icon: iconBuilder.swap(),
          text: '切换推荐',
          hidden: !checkHasAuthority(
            accessWayCollection.article.toggleRecommend.permission,
          ),
          confirm: true,
          title: '将要切换推荐设置，确定吗？',
        },
        {
          key: 'toggleTop',
          icon: iconBuilder.swap(),
          text: '切换置顶',
          hidden: !checkHasAuthority(
            accessWayCollection.article.toggleTop.permission,
          ),
          confirm: true,
          title: '将要切换置顶设置，确定吗？',
        },
        {
          key: 'toggleVisible',
          icon: iconBuilder.swap(),
          text: '切换可见性',
          hidden: !checkHasAuthority(
            accessWayCollection.article.toggleVisible.permission,
          ),
          confirm: true,
          title: '将要切换可见性设置，确定吗？',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'setOnline',
          icon: iconBuilder.playCircle(),
          text: '设为上线',
          disabled: status === statusCollection.online,
          hidden: !checkHasAuthority(
            accessWayCollection.article.setOnline.permission,
          ),
          confirm: true,
          title: '将要设为上线，确定吗？',
        },
        {
          key: 'setOffline',
          icon: iconBuilder.pauseCircle(),
          text: '设为下线',
          disabled: status === statusCollection.offline,
          hidden: !checkHasAuthority(
            accessWayCollection.article.setOffline.permission,
          ),
          confirm: true,
          title: '将要设为下线，确定吗？',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'showOperateLog',
          icon: iconBuilder.read(),
          text: '操作日志',
          hidden: !checkHasAuthority(
            accessWayCollection.article.pageListOperateLog.permission,
          ),
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'refreshCache',
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          hidden: !checkHasAuthority(
            accessWayCollection.article.refreshCache.permission,
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
      width: 80,
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
      dataTarget: fieldData.status,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (value) => {
        return {
          status: getStatusBadge(value),
          text: getArticleStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.renderType,
      width: 100,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) * 8 + 18,
          }),
        };
      },
      formatValue: (value, record) => {
        return getValueByKey({
          data: record,
          key: fieldData.renderTypeNote.name,
        });
      },
    },
    {
      dataTarget: fieldData.whetherVisible,
      width: 100,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) * 3 + 13,
          }),
        };
      },
      formatValue: (value) => {
        const v = toNumber(value);

        return v === whetherNumber.yes ? '显示' : '隐藏';
      },
    },
    {
      dataTarget: fieldData.whetherRecommend,
      width: 100,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) * 4 + 8,
          }),
        };
      },
      formatValue: (value) => {
        const v = toNumber(value);

        return v === whetherNumber.yes ? '是' : '否';
      },
    },
    {
      dataTarget: fieldData.whetherTop,
      width: 100,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) * 4 + 8,
          }),
        };
      },
      formatValue: (value) => {
        const v = toNumber(value);

        return v === whetherNumber.yes ? '是' : '否';
      },
    },
    {
      dataTarget: fieldData.sort,
      width: 80,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.articleId,
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

        <ChangeImageModal
          externalData={currentRecord}
          afterOK={this.afterChangeImageModalOk}
        />

        <ChangeRectangleImageModal
          externalData={currentRecord}
          afterOK={this.afterChangeRectangleImageModalOk}
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
