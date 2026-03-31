import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  getValueByKey,
  showSimpleErrorMessage,
  whetherNumber,
} from 'easy-soft-utility';

import {
  dropdownExpandItemType,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { accessWayCollection } from '../../../../customConfig';
import {
  DataTabContainerSupplement,
  getArticleStatusName,
  getChannelName,
} from '../../../../customSpecialComponents';
import { modelTypeCollection } from '../../../../modelBuilders';
import {
  refreshCacheAction,
  setOfflineAction,
  setOnlineAction,
  toggleRecommendAction,
  toggleTopAction,
  toggleVisibleAction,
} from '../Assist/action';
import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState,
} from '../Assist/config';
import { ChangeRenderTypeModal } from '../ChangeRenderTypeModal';
import { ChangeSortModal } from '../ChangeSortModal';
import { fieldData, statusCollection } from '../Common/data';

@connect(({ article, schedulingControl }) => ({
  article,
  schedulingControl,
}))
class Edit extends DataTabContainerSupplement {
  tabList = [
    {
      key: 'basicInfo',
      tab: '基本信息',
      hidden: !checkHasAuthority(accessWayCollection.article.get.permission),
    },
    {
      key: 'contentInfo',
      tab: '图文H5信息',
      hidden: !checkHasAuthority(accessWayCollection.article.get.permission),
    },
    {
      key: 'mediaInfo',
      tab: '媒体信息',
      hidden: !checkHasAuthority(
        accessWayCollection.article.getMediaItem.permission,
      ),
    },
    {
      key: 'articleSectionRelation/pageList',
      hidden: !checkHasAuthority(
        accessWayCollection.articleSectionRelation.pageList.permission,
      ),
      tab: '栏目设置',
    },
    {
      key: 'operateLog/pageList',
      tab: '操作日志',
      hidden: !checkHasAuthority(
        accessWayCollection.article.pageListOperateLog.permission,
      ),
    },
  ];

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '',
      loadApiPath: modelTypeCollection.articleTypeCollection.get,
      backPath: `/news/article/pageList/key`,
      articleId: null,
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

    d[fieldData.articleId.name] = articleId;

    return d;
  };

  doOtherAfterLoadSuccess = ({
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    this.setState({
      pageTitle: getValueByKey({
        data: metaData,
        key: fieldData.title.name,
      }),
    });
  };

  toggleRecommend = (record) => {
    toggleRecommendAction({
      target: this,
      handleData: record,
      successCallback: ({ target, remoteData }) => {
        const { metaData } = target.state;

        metaData[fieldData.whetherRecommend.name] = getValueByKey({
          data: remoteData,
          key: fieldData.whetherRecommend.name,
        });

        target.setState({ metaData });
      },
    });
  };

  toggleTop = (record) => {
    toggleTopAction({
      target: this,
      handleData: record,
      successCallback: ({ target, remoteData }) => {
        const { metaData } = target.state;

        metaData[fieldData.whetherTop.name] = getValueByKey({
          data: remoteData,
          key: fieldData.whetherTop.name,
        });

        target.setState({ metaData });
      },
    });
  };

  toggleVisible = (record) => {
    toggleVisibleAction({
      target: this,
      handleData: record,
      successCallback: ({ target, remoteData }) => {
        const { metaData } = target.state;

        metaData[fieldData.whetherVisible.name] = getValueByKey({
          data: remoteData,
          key: fieldData.whetherVisible.name,
        });

        target.setState({ metaData });
      },
    });
  };

  setOnline = (r) => {
    setOnlineAction({
      target: this,
      handleData: r,
      successCallback: ({ target, remoteData }) => {
        const { metaData } = target.state;

        metaData[fieldData.status.name] = getValueByKey({
          data: remoteData,
          key: fieldData.status.name,
        });

        target.setState({ metaData });
      },
    });
  };

  setOffline = (r) => {
    setOfflineAction({
      target: this,
      handleData: r,
      successCallback: ({ target, remoteData }) => {
        const { metaData } = target.state;

        metaData[fieldData.status.name] = getValueByKey({
          data: remoteData,
          key: fieldData.status.name,
        });

        target.setState({ metaData });
      },
    });
  };

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
    });
  };

  showChangeRenderTypeModal = () => {
    ChangeRenderTypeModal.open();
  };

  afterChangeRenderTypeModalOk = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  showChangeSortModal = () => {
    ChangeSortModal.open();
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

  establishPageHeaderAvatarConfig = () => {
    const { metaData } = this.state;

    if (metaData != null) {
      const image = getValueByKey({
        data: metaData,
        key: fieldData.image.name,
      });

      if (!checkStringIsNullOrWhiteSpace(image)) {
        return { src: image };
      }
    }

    return null;
  };

  establishPageHeaderTitlePrefix = () => {
    return '标题';
  };

  establishPageHeaderTagCollectionConfig = () => {
    const { metaData } = this.state;

    if ((metaData || null) == null) {
      return null;
    }

    const whetherRecommend = getValueByKey({
      data: metaData,
      key: fieldData.whetherRecommend.name,
      convert: convertCollection.number,
    });

    const whetherTop = getValueByKey({
      data: metaData,
      key: fieldData.whetherTop.name,
      convert: convertCollection.number,
    });

    const whetherVisible = getValueByKey({
      data: metaData,
      key: fieldData.whetherVisible.name,
      convert: convertCollection.number,
    });

    const status = getValueByKey({
      data: metaData,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    return [
      {
        color: 'blue',
        text: '推荐',
        hidden: whetherRecommend !== whetherNumber.yes,
      },
      {
        color: 'yellow',
        text: '置顶',
        hidden: whetherTop !== whetherNumber.yes,
      },
      {
        color: 'pink',
        text: '显示',
        hidden: whetherVisible !== whetherNumber.yes,
      },
      {
        color: 'green',
        text: '上线',
        hidden: status !== statusCollection.online,
      },
      {
        color: 'red',
        text: '下线',
        hidden: status !== statusCollection.offline,
      },
    ];
  };

  establishExtraActionGroupConfig = () => {
    const { metaData } = this.state;

    if (metaData == null) {
      return null;
    }

    const status = getValueByKey({
      data: metaData,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    const that = this;

    return {
      buttons: [
        {
          key: 'setOnline',
          text: '设为上线',
          icon: iconBuilder.upload(),
          handleButtonClick: ({ handleData }) => {
            that.setOnline(handleData);
          },
          hidden: !checkHasAuthority(
            accessWayCollection.article.setOnline.permission,
          ),
          disabled: status === statusCollection.online,
          confirm: {
            title: '设置为上线，确定吗？',
          },
          handleData: metaData,
        },
        {
          key: 'setOffline',
          text: '设为下线',
          icon: iconBuilder.download(),
          handleButtonClick: ({ handleData }) => {
            that.setOffline(handleData);
          },
          hidden: !checkHasAuthority(
            accessWayCollection.article.setOffline.permission,
          ),
          disabled: status === statusCollection.offline,
          confirm: {
            title: '设置为下线，确定吗？',
          },
          handleData: metaData,
        },
      ],
    };
  };

  establishExtraActionEllipsisConfig = () => {
    const { metaData } = this.state;

    if (metaData == null) {
      return null;
    }

    const whetherRecommend = getValueByKey({
      data: metaData,
      key: fieldData.whetherRecommend.name,
      convert: convertCollection.number,
    });

    const whetherTop = getValueByKey({
      data: metaData,
      key: fieldData.whetherTop.name,
      convert: convertCollection.number,
    });

    const whetherVisible = getValueByKey({
      data: metaData,
      key: fieldData.whetherVisible.name,
      convert: convertCollection.number,
    });

    const that = this;

    return {
      disabled: this.checkInProgress(),
      handleMenuClick: ({ key, handleData }) => {
        switch (key) {
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

          case 'refreshCache': {
            that.refreshCache(handleData);
            break;
          }

          default: {
            showSimpleErrorMessage(`can not find matched key "${key}"`);
            break;
          }
        }
      },
      handleData: metaData,
      items: [
        {
          key: 'setRenderType',
          text: '渲染模式',
          icon: iconBuilder.instagram(),
          handleButtonClick: ({ handleData }) => {
            that.showChangeRenderTypeModal(handleData);
          },
          hidden: !checkHasAuthority(
            accessWayCollection.article.setRenderType.permission,
          ),
          disabled: this.checkInProgress(),
          handleData: metaData,
        },
        {
          key: 'setSort',
          text: '设置排序值',
          icon: iconBuilder.sortAscending(),
          handleButtonClick: ({ handleData }) => {
            that.showChangeSortModal(handleData);
          },
          hidden: !checkHasAuthority(
            accessWayCollection.article.setSort.permission,
          ),
          disabled: this.checkInProgress(),
          handleData: metaData,
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'toggleRecommend',
          text: whetherRecommend ? '取消推荐' : '设为推荐',
          icon: iconBuilder.swap(),
          handleButtonClick: ({ handleData }) => {
            that.toggleRecommend(handleData);
          },
          hidden: !checkHasAuthority(
            accessWayCollection.article.toggleRecommend.permission,
          ),
          disabled: this.checkInProgress(),
          confirm: {
            title: `即将${whetherRecommend ? '取消推荐' : '设为推荐'}，确定吗？`,
          },
          handleData: metaData,
        },
        {
          key: 'toggleTop',
          text: whetherTop ? '取消置顶' : '设为置顶',
          icon: iconBuilder.swap(),
          handleButtonClick: ({ handleData }) => {
            that.toggleTop(handleData);
          },
          hidden: !checkHasAuthority(
            accessWayCollection.article.toggleTop.permission,
          ),
          disabled: this.checkInProgress(),
          confirm: {
            title: `即将${whetherTop ? '取消置顶' : '设为置顶'}，确定吗？`,
          },
          handleData: metaData,
        },
        {
          key: 'toggleVisible',
          text: whetherVisible ? '设为隐藏' : '设为显示',
          icon: iconBuilder.swap(),
          handleButtonClick: ({ handleData }) => {
            that.toggleVisible(handleData);
          },
          hidden: !checkHasAuthority(
            accessWayCollection.article.toggleVisible.permission,
          ),
          disabled: this.checkInProgress(),
          confirm: {
            title: `即将${whetherVisible ? '设为隐藏' : '设为显示'}，确定吗？`,
          },
          handleData: metaData,
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

  establishPageHeaderExtraContentConfig = () => {
    const { metaData } = this.state;

    return {
      textLabel: fieldData.status.label,
      text: getArticleStatusName({
        value: getValueByKey({
          data: metaData,
          key: fieldData.status.name,
        }),
      }),
      timeLabel: fieldData.createTime.label,
      time: getValueByKey({
        data: metaData,
        key: fieldData.createTime.name,
        convert: convertCollection.datetime,
      }),
    };
  };

  establishPageHeaderContentGridConfig = () => {
    const { metaData } = this.state;

    return [
      {
        label: fieldData.articleId.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.articleId.name,
          defaultValue: '未设置',
        }),
        canCopy: true,
      },
      {
        label: fieldData.renderTypeNote.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.renderTypeNote.name,
          defaultValue: '未设置',
        }),
      },
      {
        label: fieldData.sort.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.sort.name,
          defaultValue: '未设置',
        }),
      },
      {
        label: fieldData.businessModeNote.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.businessModeNote.name,
          defaultValue: '未设置',
        }),
      },
      {
        label: fieldData.channel.label,
        value: getChannelName({
          value: getValueByKey({
            data: metaData,
            key: fieldData.channel.name,
            convert: convertCollection.string,
          }),
          defaultValue: '未设置',
        }),
      },
    ];
  };

  renderPresetOther = () => {
    const { metaData } = this.state;

    return (
      <>
        <ChangeRenderTypeModal
          externalData={metaData}
          afterOK={this.afterChangeRenderTypeModalOk}
        />

        <ChangeSortModal
          externalData={metaData}
          afterOK={this.afterChangeSortModalOk}
        />
      </>
    );
  };
}

export default Edit;
