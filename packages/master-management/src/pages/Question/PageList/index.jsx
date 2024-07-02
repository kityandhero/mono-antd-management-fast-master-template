import { connect } from 'easy-soft-dva';
import {
  buildRandomHexColor,
  checkHasAuthority,
  convertCollection,
  getValueByKey,
  handleItem,
  showSimpleErrorMessage,
  toNumber,
  whetherNumber,
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
  getQuestionStatusName,
  getQuestionTypeName,
  renderSearchBusinessModeSelect,
  renderSearchQuestionStatusSelect,
  renderSearchQuestionTypeSelect,
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
import { ChangeWhetherCorrectModal } from '../ChangeWhetherCorrectModal';
import { fieldData, statusCollection, typeCollection } from '../Common/data';
import { PracticeDrawer } from '../PracticeDrawer';
import { UpdateAnswerDrawer } from '../UpdateAnswerDrawer';

const { MultiPage } = DataMultiPageView;

@connect(({ question, schedulingControl }) => ({
  question,
  schedulingControl,
}))
class PageList extends MultiPage {
  componentAuthority = accessWayCollection.question.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '预设问题列表',
      paramsKey: accessWayCollection.question.pageList.paramsKey,
      loadApiPath: 'question/pageList',
      currentRecord: null,
    };
  }

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'showUpdateAnswerDrawer': {
        this.showUpdateAnswerDrawer(handleData);
        break;
      }

      case 'showPracticeDrawer': {
        this.showPracticeDrawer(handleData);
        break;
      }

      case 'updateBusinessMode': {
        this.showChangeBusinessModeModal(handleData);
        break;
      }

      case 'updateWhetherCorrect': {
        this.showChangeWhetherCorrectModal(handleData);
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
      key: fieldData.questionId.name,
      defaultValue: '',
    });

    handleItem({
      target,
      value: id,
      compareValueHandler: (o) => {
        const v = getValueByKey({
          data: o,
          key: fieldData.questionId.name,
          defaultValue: '',
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

  showChangeWhetherCorrectModal = (item) => {
    this.setState({ currentRecord: item }, () => {
      ChangeWhetherCorrectModal.open();
    });
  };

  afterChangeWhetherCorrectModalOk = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  showUpdateAnswerDrawer = (item) => {
    this.setState({ currentRecord: item }, () => {
      UpdateAnswerDrawer.open();
    });
  };

  afterUpdateAnswerDrawerOk = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  showPracticeDrawer = (item) => {
    this.setState({ currentRecord: item }, () => {
      PracticeDrawer.open();
    });
  };

  goToEdit = (record) => {
    const questionId = getValueByKey({
      data: record,
      key: fieldData.questionId.name,
      defaultValue: '',
    });

    this.goToPath(`/survey/question/edit/load/${questionId}/key/basicInfo`);
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
          component: renderSearchQuestionTypeSelect({}),
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.customSelect,
          component: renderSearchBusinessModeSelect({}),
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.customSelect,
          component: renderSearchQuestionStatusSelect({}),
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

    const itemType = getValueByKey({
      data: item,
      key: fieldData.type.name,
      convert: convertCollection.number,
    });

    return {
      size: 'small',
      text: '修改',
      icon: iconBuilder.edit(),
      disabled: !checkHasAuthority(accessWayCollection.question.get.permission),
      handleButtonClick: ({ handleData }) => {
        this.goToEdit(handleData);
      },
      handleData: item,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'showPracticeDrawer',
          icon: iconBuilder.bug(),
          text: '测试题目',
          hidden: !checkHasAuthority(
            accessWayCollection.question.practice.permission,
          ),
        },
        {
          key: 'updateWhetherCorrect',
          withDivider: true,
          uponDivider: true,
          icon: iconBuilder.edit(),
          text: '设置判断结果',
          hidden:
            itemType !== typeCollection.judgment ||
            !checkHasAuthority(
              accessWayCollection.question.updateWhetherCorrect.permission,
            ),
        },
        {
          key: 'showUpdateAnswerDrawer',
          icon: iconBuilder.edit(),
          text: '更新答案解析',
          hidden: !checkHasAuthority(
            accessWayCollection.question.updateAnswer.permission,
          ),
        },
        {
          key: 'updateBusinessMode',
          withDivider: true,
          uponDivider: true,
          icon: iconBuilder.edit(),
          text: '设置适用业务',
          hidden: !checkHasAuthority(
            accessWayCollection.question.updateBusinessMode.permission,
          ),
        },
        {
          key: 'setOnline',
          withDivider: true,
          uponDivider: true,
          icon: iconBuilder.upload(),
          text: '设为上线',
          hidden: !checkHasAuthority(
            accessWayCollection.question.setOnline.permission,
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
            accessWayCollection.question.setOffline.permission,
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
            accessWayCollection.question.refreshCache.permission,
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
      formatValue: (value, record) => {
        const type = getValueByKey({
          data: record,
          key: fieldData.type.name,
          convert: convertCollection.number,
        });

        if (type !== typeCollection.judgment) {
          return value;
        }

        const whetherCorrect = getValueByKey({
          data: record,
          key: fieldData.whetherCorrect.name,
          convert: convertCollection.number,
        });

        return `（${whetherCorrect === whetherNumber.yes ? '✔' : '✖'}）${value}`;
      },
    },
    {
      dataTarget: fieldData.type,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) * 14 + 12,
          }),
        };
      },
      formatValue: (value) => {
        return getQuestionTypeName({
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
          text: getQuestionStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.questionId,
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

        <ChangeWhetherCorrectModal
          externalData={currentRecord}
          afterOK={this.afterChangeWhetherCorrectModalOk}
        />

        <UpdateAnswerDrawer
          externalData={currentRecord}
          afterOK={this.afterUpdateAnswerDrawerOk}
        />

        <PracticeDrawer externalData={currentRecord} />
      </>
    );
  };
}

export default PageList;
