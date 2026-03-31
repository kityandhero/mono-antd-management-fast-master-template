import React from 'react';

import {
  checkHasAuthority,
  checkInCollection,
  getValueByKey,
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

import { accessWayCollection } from '../../../../customConfig';
import {
  getArticleSectionRelationStatusName,
  getArticleStatusName,
  getSectionStatusName,
} from '../../../../customSpecialComponents';
import { modelTypeCollection } from '../../../../modelBuilders';
import { getStatusBadge as getArticleStatusBadge } from '../../Article/Assist/tools';
import { fieldData as fieldDataArticle } from '../../Article/Common/data';
import { PageListSelectDrawer as PageListSelectArticleDrawer } from '../../Article/PageListSelectDrawer';
import { getStatusBadge as getSectionStatusBadge } from '../../Section/Assist/tools';
import { fieldData as fieldDataSection } from '../../Section/Common/data';
import { PageListSelectDrawer as PageListSelectSectionDrawer } from '../../Section/PageListSelectDrawer';
import { addAction, refreshCacheAction, removeAction } from '../Assist/action';
import { getStatusBadge } from '../Assist/tools';
import { fieldData, infoModeCollection } from '../Common/data';

const { InnerMultiPage } = DataMultiPageView;

class BaseInnerPageList extends InnerMultiPage {
  componentAuthority =
    accessWayCollection.articleSectionRelation.singleList.permission;

  currentInfoMode = infoModeCollection.integration;

  currentExternalData = {};

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '文章栏目绑定关系列表',
      loadApiPath:
        modelTypeCollection.articleSectionRelationTypeCollection.singleList,
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
        showSimpleErrorMessage(`can not find matched key "${key}"`);
        break;
      }
    }
  };

  add = (record) => {
    const { infoMode } = this.props;
    const { externalData } = this.state;

    let articleId = '';
    let sectionId = '';

    if (toNumber(infoMode) === infoModeCollection.section) {
      articleId = getValueByKey({
        data: externalData,
        key: fieldDataArticle.articleId.name,
        defaultValue: '0',
      });

      sectionId = getValueByKey({
        data: record,
        key: fieldDataSection.sectionId.name,
        defaultValue: '0',
      });
    }

    if (toNumber(infoMode) === infoModeCollection.article) {
      articleId = getValueByKey({
        data: record,
        key: fieldDataArticle.articleId.name,
        defaultValue: '0',
      });

      sectionId = getValueByKey({
        data: externalData,
        key: fieldDataSection.sectionId.name,
        defaultValue: '0',
      });
    }

    addAction({
      target: this,
      handleData: {
        sectionId,
        articleId,
      },
      successCallback: ({ target }) => {
        target.refreshDataWithReloadAnimalPrompt({});
      },
    });
  };

  remove = (r) => {
    removeAction({
      target: this,
      handleData: r,
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

  showPageListSelectArticleDrawer = () => {
    PageListSelectArticleDrawer.open();
  };

  showPageListSelectSectionDrawer = () => {
    PageListSelectSectionDrawer.open();
  };

  getPresetPageTitle = () => {
    const infoMode = this.currentInfoMode;

    if (toNumber(infoMode) === infoModeCollection.section) {
      return '栏目列表';
    }

    if (toNumber(infoMode) === infoModeCollection.article) {
      return '文章列表';
    }

    if (toNumber(infoMode) === infoModeCollection.integration) {
      return '文章栏目绑定信息';
    }

    return [];
  };

  establishSearchCardConfig = () => {
    const infoMode = this.currentInfoMode;

    return {
      list: [
        {
          lg: 8,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.sectionName,
          hidden: !checkInCollection(
            [infoModeCollection.section, infoModeCollection.integration],
            toNumber(infoMode),
          ),
        },
        {
          lg: 8,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.articleTitle,
          hidden: !checkInCollection(
            [infoModeCollection.article, infoModeCollection.integration],
            toNumber(infoMode),
          ),
        },
        {
          lg: 8,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  establishDataContainerExtraActionCollectionConfig = () => {
    const infoMode = this.currentInfoMode;

    return [
      {
        buildType:
          listViewConfig.dataContainerExtraActionBuildType.generalExtraButton,
        type: 'primary',
        icon: iconBuilder.plus(),
        text: '绑定文章',
        hidden:
          !checkHasAuthority(
            accessWayCollection.articleSectionRelation.add.permission,
          ) ||
          !checkInCollection([infoModeCollection.article], toNumber(infoMode)),
        handleClick: this.showPageListSelectArticleDrawer,
      },
      {
        buildType:
          listViewConfig.dataContainerExtraActionBuildType.generalExtraButton,
        type: 'primary',
        icon: iconBuilder.plus(),
        text: '绑定栏目',
        hidden:
          !checkHasAuthority(
            accessWayCollection.articleSectionRelation.add.permission,
          ) ||
          !checkInCollection([infoModeCollection.section], toNumber(infoMode)),
        handleClick: this.showPageListSelectSectionDrawer,
      },
    ];
  };

  establishListItemDropdownConfig = (item) => {
    return {
      size: 'small',
      text: '移除',
      icon: iconBuilder.delete(),
      disabled: !checkHasAuthority(
        accessWayCollection.articleSectionRelation.remove.permission,
      ),
      handleButtonClick: ({ handleData }) => {
        this.remove(handleData);
      },
      handleData: item,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      confirm: true,
      title: '即将移除关联信息，确定吗？',
      items: [
        {
          key: 'refreshCache',
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          hidden: !checkHasAuthority(
            accessWayCollection.articleSectionRelation.refreshCache.permission,
          ),
          confirm: true,
          title: '即将刷新缓存，确定吗？',
        },
      ],
    };
  };

  getColumnWrapper = () => {
    const infoMode = this.currentInfoMode;

    if (toNumber(infoMode) === infoModeCollection.section) {
      return this.getSectionInfoColumnWrapper();
    }

    if (toNumber(infoMode) === infoModeCollection.article) {
      return this.getArticleInfoColumnWrapper();
    }

    return [
      {
        dataTarget: fieldData.articleTitle,
        align: 'left',
        showRichFacade: true,
        emptyValue: '--',
      },
      {
        dataTarget: fieldData.sectionName,
        width: 220,
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
            text: getArticleSectionRelationStatusName({
              value: value,
            }),
          };
        },
      },
      {
        dataTarget: fieldData.articleSectionRelationId,
        width: 120,
        showRichFacade: true,
        canCopy: true,
      },
      {
        dataTarget: { ...fieldData.createTime, label: '关系创建时间' },
        width: 160,
        showRichFacade: true,
        facadeMode: columnFacadeMode.datetime,
      },
    ];
  };

  getArticleInfoColumnWrapper = () => [
    {
      dataTarget: fieldData.articleTitle,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.articleStatus,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (value) => {
        return {
          status: getArticleStatusBadge(value),
          text: getArticleStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.articleId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: { ...fieldData.createTime, label: '关系创建时间' },
      width: 160,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
    },
  ];

  getSectionInfoColumnWrapper = () => [
    {
      dataTarget: fieldData.sectionName,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.sectionStatus,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (value) => {
        return {
          status: getSectionStatusBadge(value),
          text: getSectionStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.sectionId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: { ...fieldData.createTime, label: '关系创建时间' },
      width: 160,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
    },
  ];

  renderPresetOther = () => {
    return (
      <>
        <PageListSelectArticleDrawer
          afterSelectSuccess={(selectData) => {
            this.add(selectData);
          }}
        />

        <PageListSelectSectionDrawer
          afterSelectSuccess={(selectData) => {
            this.add(selectData);
          }}
        />
      </>
    );
  };
}

export { BaseInnerPageList };
