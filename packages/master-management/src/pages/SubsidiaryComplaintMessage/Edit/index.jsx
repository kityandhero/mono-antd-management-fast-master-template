import { connect } from 'easy-soft-dva';
import {
  convertCollection,
  getValueByKey,
  showSimpleErrorMessage,
  whetherNumber,
} from 'easy-soft-utility';

import { getDerivedStateFromPropertiesForUrlParameters } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import {
  DataTabContainerSupplement,
  getChannelName,
  getSubsidiaryComplaintMessageStatusName,
} from '../../../customSpecialComponents';
import { modelTypeCollection } from '../../../modelBuilders';
import {
  refreshCacheAction,
  removeAction,
  toggleConfirmAction,
} from '../Assist/action';
import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState,
} from '../Assist/config';
import { fieldData } from '../Common/data';

@connect(({ subsidiaryComplaintMessage, schedulingControl }) => ({
  subsidiaryComplaintMessage,
  schedulingControl,
}))
class Edit extends DataTabContainerSupplement {
  tabList = [
    {
      key: 'basicInfo',
      tab: '基本信息',
    },
    {
      key: 'operateLog/pageList',
      tab: '操作日志',
    },
  ];

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '',
      loadApiPath:
        modelTypeCollection.subsidiaryComplaintMessageTypeCollection.get,
      backPath: `/subsidiaryMessages/subsidiaryComplaintMessage/pageList/key`,
      subsidiaryComplaintMessageId: null,
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
    const { subsidiaryComplaintMessageId } = this.state;

    d[fieldData.subsidiaryComplaintMessageId.name] =
      subsidiaryComplaintMessageId;

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

  toggleConfirm = (record) => {
    toggleConfirmAction({
      target: this,
      handleData: record,
      successCallback: ({ target }) => {
        target.refreshData({});
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

  establishPageHeaderAvatarConfig = () => {
    return { icon: iconBuilder.snippets() };
  };

  establishPageHeaderTitlePrefix = () => {
    return '标题';
  };

  establishPageHeaderTagCollectionConfig = () => {
    const { metaData } = this.state;

    if ((metaData || null) == null) {
      return null;
    }

    const whetherConfirm = getValueByKey({
      data: metaData,
      key: fieldData.whetherConfirm.name,
      convert: convertCollection.number,
    });

    const whetherReply = getValueByKey({
      data: metaData,
      key: fieldData.whetherReply.name,
      convert: convertCollection.number,
    });

    return [
      {
        color: 'green',
        text: '已核实',
        hidden: whetherConfirm !== whetherNumber.yes,
      },
      {
        color: 'red',
        text: '尚未核实',
        hidden: whetherConfirm !== whetherNumber.no,
      },
      {
        color: 'orange',
        text: '已回复',
        hidden: whetherReply !== whetherNumber.yes,
      },
      {
        color: 'yellow',
        text: '尚未回复',
        hidden: whetherReply !== whetherNumber.no,
      },
    ];
  };

  establishExtraActionEllipsisConfig = () => {
    const { metaData } = this.state;

    if ((metaData || null) == null) {
      return null;
    }

    const that = this;

    return {
      disabled: this.checkInProgress(),
      handleMenuClick: ({ key, handleData }) => {
        switch (key) {
          case 'refreshCache': {
            that.refreshCache(handleData);
            break;
          }

          default: {
            showSimpleErrorMessage('can not find matched key');
            break;
          }
        }
      },
      handleData: metaData,
      items: [
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
      text: getSubsidiaryComplaintMessageStatusName({
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
        label: fieldData.subsidiaryComplaintMessageId.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.subsidiaryComplaintMessageId.name,
        }),
        canCopy: true,
      },
      {
        label: fieldData.whetherConfirmNote.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.whetherConfirmNote.name,
          convert: convertCollection.string,
        }),
      },
      {
        label: fieldData.whetherReplyNote.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.whetherReplyNote.name,
          convert: convertCollection.string,
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
        }),
      },
    ];
  };
}

export default Edit;
