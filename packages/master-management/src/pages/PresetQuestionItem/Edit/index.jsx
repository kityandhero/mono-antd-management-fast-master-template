import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  convertCollection,
  getValueByKey,
  showSimpleErrorMessage,
} from 'easy-soft-utility';

import { getDerivedStateFromPropertiesForUrlParameters } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { accessWayCollection } from '../../../customConfig';
import {
  DataTabContainerSupplement,
  getChannelName,
  getPresetQuestionItemStatusName,
} from '../../../customSpecialComponents';
import {
  refreshCacheAction,
  setDisableAction,
  setEnableAction,
} from '../Assist/action';
import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState,
} from '../Assist/config';
import { fieldData, statusCollection } from '../Common/data';

@connect(({ presetQuestionItem, schedulingControl }) => ({
  presetQuestionItem,
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
      loadApiPath: 'presetQuestionItem/get',
      backPath: `/presetQuestionItem/pageList/key`,
      presetQuestionItemId: null,
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
    const { presetQuestionItemId } = this.state;

    d[fieldData.presetQuestionItemId.name] = presetQuestionItemId;

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

  setEnable = (r) => {
    setEnableAction({
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

  setDisable = (r) => {
    setDisableAction({
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

  establishPageHeaderAvatarConfig = () => {
    return { icon: iconBuilder.snippets() };
  };

  establishPageHeaderTitlePrefix = () => {
    return '标题';
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
          key: 'setEnable',
          text: '设为上线',
          icon: iconBuilder.checkCircle(),
          handleButtonClick: ({ handleData }) => {
            that.setEnable(handleData);
          },
          hidden: !checkHasAuthority(
            accessWayCollection.presetQuestionItem.setEnable.permission,
          ),
          disabled: status === statusCollection.online,
          confirm: true,
          title: '即将设为上线，确定启用吗？',
          handleData: metaData,
        },
        {
          key: 'setDisable',
          text: '设为下线',
          icon: iconBuilder.shop(),
          handleButtonClick: ({ handleData }) => {
            that.setDisable(handleData);
          },
          hidden: !checkHasAuthority(
            accessWayCollection.presetQuestionItem.setDisable.permission,
          ),
          disabled: status === statusCollection.offline,
          confirm: true,
          title: '即将设为下线，确定启用吗？',
          handleData: metaData,
        },
      ],
    };
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
      text: getPresetQuestionItemStatusName({
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
        label: fieldData.presetQuestionItemId.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.presetQuestionItemId.name,
        }),
        canCopy: true,
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
