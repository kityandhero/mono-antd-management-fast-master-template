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
  getBusinessModeName,
  getChannelName,
  getPresetQuestionStatusName,
  getPresetQuestionTypeName,
} from '../../../customSpecialComponents';
import {
  refreshCacheAction,
  setOfflineAction,
  setOnlineAction,
} from '../Assist/action';
import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState,
} from '../Assist/config';
import { ChangeBusinessModeModal } from '../ChangeBusinessModeModal';
import { fieldData, statusCollection } from '../Common/data';

@connect(({ presetQuestion, schedulingControl }) => ({
  presetQuestion,
  schedulingControl,
}))
class Edit extends DataTabContainerSupplement {
  tabList = [
    {
      key: 'basicInfo',
      show: checkHasAuthority(
        accessWayCollection.presetQuestion.updateBasicInfo.permission,
      ),
      tab: '基本信息',
    },
    {
      key: 'items/pageList',
      show: checkHasAuthority(
        accessWayCollection.presetQuestionItem.pageList.permission,
      ),
      tab: '选项集合',
    },
    {
      key: 'operateLog/pageList',
      show: checkHasAuthority(
        accessWayCollection.presetQuestion.pageListOperateLog.permission,
      ),
      tab: '操作日志',
    },
  ];

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '',
      loadApiPath: 'presetQuestion/get',
      backPath: `/presetQuestion/pageList/key`,
      presetQuestionId: null,
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
    const { presetQuestionId } = this.state;

    d[fieldData.presetQuestionId.name] = presetQuestionId;

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

  showChangeBusinessModeModal = (item) => {
    this.setState({ currentRecord: item }, () => {
      ChangeBusinessModeModal.open();
    });
  };

  afterChangeBusinessModeModalOk = () => {
    this.refreshDataWithReloadAnimalPrompt({});
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
          key: 'setOnline',
          text: '设为上线',
          icon: iconBuilder.checkCircle(),
          handleButtonClick: ({ handleData }) => {
            that.setOnline(handleData);
          },
          hidden: !checkHasAuthority(
            accessWayCollection.presetQuestion.setOnline.permission,
          ),
          disabled: status === statusCollection.online,
          confirm: true,
          title: '即将设为上线，确定启用吗？',
          handleData: metaData,
        },
        {
          key: 'setOffline',
          text: '设为下线',
          icon: iconBuilder.shop(),
          handleButtonClick: ({ handleData }) => {
            that.setOffline(handleData);
          },
          hidden: !checkHasAuthority(
            accessWayCollection.presetQuestion.setOffline.permission,
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
          case 'UpdateBusinessMode': {
            that.showChangeBusinessModeModal(handleData);
            break;
          }

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
          key: 'UpdateBusinessMode',
          icon: iconBuilder.edit(),
          text: '设置适用业务',
          hidden: !checkHasAuthority(
            accessWayCollection.section.updateBusinessMode.permission,
          ),
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
      text: getPresetQuestionStatusName({
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
        label: fieldData.presetQuestionId.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.presetQuestionId.name,
        }),
        canCopy: true,
      },
      {
        label: fieldData.channel.label,
        value: getPresetQuestionTypeName({
          value: getValueByKey({
            data: metaData,
            key: fieldData.type.name,
            convert: convertCollection.string,
          }),
        }),
      },
      {
        label: fieldData.businessMode.label,
        value: getBusinessModeName({
          value: getValueByKey({
            data: metaData,
            key: fieldData.businessMode.name,
            convert: convertCollection.string,
          }),
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

  renderPresetOther = () => {
    const { currentRecord } = this.state;

    return (
      <>
        <ChangeBusinessModeModal
          externalData={currentRecord}
          afterOK={this.afterChangeBusinessModeModalOk}
        />
      </>
    );
  };
}

export default Edit;
