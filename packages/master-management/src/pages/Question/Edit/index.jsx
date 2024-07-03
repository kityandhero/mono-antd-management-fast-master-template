import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  convertCollection,
  getValueByKey,
  showSimpleErrorMessage,
  whetherNumber,
} from 'easy-soft-utility';

import {
  extraBuildType,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { accessWayCollection } from '../../../customConfig';
import {
  DataTabContainerSupplement,
  getBusinessModeName,
  getChannelName,
  getQuestionStatusName,
  getQuestionTypeName,
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
import { ChangeWhetherCorrectModal } from '../ChangeWhetherCorrectModal';
import { fieldData, statusCollection, typeCollection } from '../Common/data';

@connect(({ question, schedulingControl }) => ({
  question,
  schedulingControl,
}))
class Edit extends DataTabContainerSupplement {
  tabList = [
    {
      key: 'basicInfo',
      hidden: !checkHasAuthority(
        accessWayCollection.question.updateBasicInfo.permission,
      ),
      tab: '基本信息',
    },
    {
      key: 'items/pageList',
      hidden: !checkHasAuthority(
        accessWayCollection.questionItem.pageList.permission,
      ),
      tab: '选项集合',
    },
    {
      key: 'answerInfo',
      hidden: !checkHasAuthority(
        accessWayCollection.question.updateAnswer.permission,
      ),
      tab: '答案解析',
    },
    {
      key: 'tagInfo/pageList',
      hidden: !checkHasAuthority(
        accessWayCollection.questionTagRelation.pageList.permission,
      ),
      tab: '标签设置',
    },
    {
      key: 'operateLog/pageList',
      hidden: !checkHasAuthority(
        accessWayCollection.question.pageListOperateLog.permission,
      ),
      tab: '操作日志',
    },
  ];

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '',
      loadApiPath: 'question/get',
      backPath: `/survey/question/pageList/key`,
      questionId: null,
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
    const { questionId } = this.state;

    d[fieldData.questionId.name] = questionId;

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

  adjustTabListAvailable = (tabListAvailable) => {
    const { metaData } = this.state;

    const result = [];

    if (
      checkHasAuthority(accessWayCollection.question.get.permission) &&
      metaData != null
    ) {
      const type = getValueByKey({
        data: metaData,
        key: fieldData.type.name,
        convert: convertCollection.number,
      });

      for (const data of Object.values(tabListAvailable)) {
        const o = data;

        if (o.key === 'items/pageList') {
          if (type === typeCollection.judgment) {
            o.hidden = true;

            result.push(o);
          } else {
            result.push(o);
          }
        } else {
          result.push(o);
        }
      }
    }

    return result;
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

  showChangeBusinessModeModal = () => {
    ChangeBusinessModeModal.open();
  };

  afterChangeBusinessModeModalOk = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  showChangeWhetherCorrectModal = () => {
    ChangeWhetherCorrectModal.open();
  };

  afterChangeWhetherCorrectModalOk = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  establishPageHeaderAvatarConfig = () => {
    return { icon: iconBuilder.snippets() };
  };

  establishPageHeaderTitlePrefix = () => {
    return '标题';
  };

  establishExtraActionConfig = () => {
    return {
      list: [
        {
          buildType: extraBuildType.generalExtraButton,
          icon: iconBuilder.edit(),
          text: '设置判断结果',
          hidden: !checkHasAuthority(
            accessWayCollection.question.updateWhetherCorrect.permission,
          ),
          handleClick: () => {
            this.showChangeWhetherCorrectModal();
          },
        },
      ],
    };
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
            accessWayCollection.question.setOnline.permission,
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
            accessWayCollection.question.setOffline.permission,
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
      text: getQuestionStatusName({
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

    const type = getValueByKey({
      data: metaData,
      key: fieldData.type.name,
      convert: convertCollection.number,
    });

    return [
      {
        label: fieldData.questionId.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.questionId.name,
        }),
        canCopy: true,
      },
      {
        label: fieldData.type.label,
        value: getQuestionTypeName({
          value: getValueByKey({
            data: metaData,
            key: fieldData.type.name,
            convert: convertCollection.string,
          }),
        }),
      },
      {
        label: fieldData.whetherCorrect.label,
        hidden: type !== typeCollection.judgment,
        value: getValueByKey({
          data: metaData,
          key: fieldData.whetherCorrect.name,
          convert: convertCollection.number,
          formatBuilder: (v) => {
            return v === whetherNumber.yes ? '✔' : '✖';
          },
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
    const { metaData } = this.state;

    return (
      <>
        <ChangeBusinessModeModal
          externalData={metaData}
          afterOK={this.afterChangeBusinessModeModalOk}
        />

        <ChangeWhetherCorrectModal
          externalData={metaData}
          afterOK={this.afterChangeWhetherCorrectModalOk}
        />
      </>
    );
  };
}

export default Edit;
