import { List } from 'antd';

import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  datetimeFormat,
  formatDatetime,
  getValueByKey,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  getDerivedStateFromPropertiesForUrlParameters,
  listViewConfig,
  searchCardConfig,
  unlimitedWithStringFlag,
} from 'antd-management-fast-common';
import {
  buildIconInfoList,
  ColorText,
  EverySpace,
  FlexText,
  iconBuilder,
  StatusBar,
} from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../../../../customConfig';
import { getArticleCommentStatusName } from '../../../../../../customSpecialComponents';
import { modelTypeCollection } from '../../../../../../modelBuilders';
import {
  refreshCacheAction,
  removeAction,
} from '../../../../ArticleComment/Assist/action';
import { getStatusBadge } from '../../../../ArticleComment/Assist/tools';
import { fieldData } from '../../../../ArticleComment/Common/data';
import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState,
} from '../../../Assist/config';

const { InnerMultiPage } = DataMultiPageView;

@connect(({ articleComment, schedulingControl }) => ({
  articleComment,
  schedulingControl,
}))
class PageList extends InnerMultiPage {
  componentAuthority = accessWayCollection.articleComment.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      listViewMode: listViewConfig.viewMode.list,
      tableScroll: { x: 1600 },
      loadApiPath: modelTypeCollection.articleCommentTypeCollection.pageList,
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
    const d = o;
    const { articleId } = this.state;

    d.articleId = articleId;

    return d;
  };

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'refreshCache': {
        this.refreshCache(handleData);
        break;
      }

      case 'remove': {
        this.remove(handleData);
        break;
      }

      default: {
        break;
      }
    }
  };

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
    });
  };

  remove = (r) => {
    removeAction({
      target: this,
      handleData: r,
      successCallback: ({ target }) => {
        target.reloadData();
      },
    });
  };

  renderListViewItemLayout = () => {
    return 'vertical';
  };

  renderListViewSize = () => {
    return 'small';
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
          fieldData: fieldData.keywords,
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  establishListItemDropdownConfig = (record) => {
    return {
      size: 'small',
      text: '查看',
      icon: iconBuilder.read(),
      disabled: !checkHasAuthority(
        accessWayCollection.articleComment.get.permission,
      ),
      handleButtonClick: ({ handleData }) => {
        this.goToEdit(handleData);
      },
      handleData: record,
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
            accessWayCollection.articleComment.refreshCache.permission,
          ),
          confirm: {
            title: '即将刷新缓存，确定吗？',
          },
        },
        {
          key: 'delete',
          withDivider: true,
          uponDivider: true,
          icon: iconBuilder.delete(),
          text: '删除',
          hidden: !checkHasAuthority(
            accessWayCollection.articleComment.remove.permission,
          ),
          confirm: {
            title: '即将删除数据，确定吗？',
          },
        },
      ],
    };
  };

  // eslint-disable-next-line no-unused-vars
  renderPresetListViewItemInner = (item, index) => {
    const articleCommentId = getValueByKey({
      data: item,
      key: fieldData.articleCommentId.name,
      convert: convertCollection.string,
    });

    const userId = getValueByKey({
      data: item,
      key: fieldData.userId.name,
      convert: convertCollection.string,
    });

    const name = getValueByKey({
      data: item,
      key: fieldData.name.name,
      convert: convertCollection.string,
    });

    const organization = getValueByKey({
      data: item,
      key: fieldData.organization.name,
      convert: convertCollection.string,
    });

    const contactInformation = getValueByKey({
      data: item,
      key: fieldData.contactInformation.name,
      convert: convertCollection.string,
      defaultValue: '无',
    });

    const content = getValueByKey({
      data: item,
      key: fieldData.content.name,
      convert: convertCollection.string,
      defaultValue: '无',
    });

    const status = getValueByKey({
      data: item,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    const createTime = getValueByKey({
      data: item,
      key: fieldData.createTime.name,
      convert: convertCollection.datetime,
    });

    const title =
      checkStringIsNullOrWhiteSpace(name) &&
      checkStringIsNullOrWhiteSpace(name) &&
      checkStringIsNullOrWhiteSpace(name)
        ? userId
        : [name, organization, contactInformation].join('/');

    return (
      <>
        <List.Item.Meta
          title={
            <ColorText textPrefix={fieldData.submitPerson.label} text={title} />
          }
        />

        <FlexText textPrefix={fieldData.content.label} text={content} />

        <EverySpace size={6} direction="horizontal" />

        <div>
          <StatusBar
            actions={buildIconInfoList({
              list: [
                {
                  textPrefix: fieldData.articleCommentId.label,
                  text: articleCommentId,
                },
                {
                  textPrefix: fieldData.status.label,
                  text: getArticleCommentStatusName({
                    global: this.getGlobal(),
                    value: status,
                  }),
                },
                {
                  textPrefix: fieldData.createTime.label,
                  text: formatDatetime({
                    data: createTime,
                    format: datetimeFormat.monthDayHourMinuteSecond,
                  }),
                },
              ],
            })}
            extra={this.renderListItemDropdown(item)}
          />
        </div>
      </>
    );
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.content,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.name,
      width: 80,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.organization,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.contactInformation,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.articleTitle,
      width: 220,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.articleCommentId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldData.status,
      width: 120,
      emptyValue: '--',
      showRichFacade: true,
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (value) => {
        return {
          status: getStatusBadge(value),
          text: getArticleCommentStatusName({
            global: this.getGlobal(),
          }),
        };
      },
    },
    {
      dataTarget: fieldData.createTime,
      width: 160,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
      emptyValue: '--',
    },
  ];
}

export default PageList;
