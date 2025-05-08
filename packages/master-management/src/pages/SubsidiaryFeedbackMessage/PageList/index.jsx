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
import {
  iconBuilder,
  iconModeCollection,
} from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection, colorCollection } from '../../../customConfig';
import { modelTypeCollection } from '../../../modelBuilders';
import { PageListOpenFeedbackDrawer } from '../../Subsidiary/PageListOpenFeedbackDrawer';
import {
  refreshCacheAction,
  removeAction,
  toggleConfirmAction,
} from '../Assist/action';
import { handleItemWhetherConfirm } from '../Assist/tools';
import { fieldData } from '../Common/data';

const { MultiPage } = DataMultiPageView;

@connect(({ subsidiaryFeedbackMessage, schedulingControl }) => ({
  subsidiaryFeedbackMessage,
  schedulingControl,
}))
class PageList extends MultiPage {
  componentAuthority =
    accessWayCollection.subsidiaryFeedbackMessage.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '企业留言信息',
      paramsKey:
        accessWayCollection.subsidiaryFeedbackMessage.pageList.paramsKey,
      loadApiPath:
        modelTypeCollection.subsidiaryFeedbackMessageTypeCollection.pageList,
      currentRecord: null,
    };
  }

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'toggleConfirm': {
        this.toggleConfirm(handleData);
        break;
      }

      case 'refreshCache': {
        this.refreshCache(handleData);
        break;
      }

      case 'remove': {
        this.remove(handleData);
        break;
      }

      default: {
        showSimpleErrorMessage('can not find matched key');
        break;
      }
    }
  };

  toggleConfirm = (o) => {
    toggleConfirmAction({
      target: this,
      handleData: o,
      successCallback: ({ target, handleData, remoteData }) => {
        handleItemWhetherConfirm({ target, handleData, remoteData });
      },
    });
  };

  refreshCache = (o) => {
    refreshCacheAction({
      target: this,
      handleData: o,
    });
  };

  remove = (o) => {
    removeAction({
      target: this,
      handleData: o,
      successCallback: ({ target }) => {
        target.refreshDataWithReloadAnimalPrompt({});
      },
    });
  };

  showPageListOpenFeedbackDrawer = () => {
    PageListOpenFeedbackDrawer.open();
  };

  goToEdit = (record) => {
    const subsidiaryFeedbackMessageId = getValueByKey({
      data: record,
      key: fieldData.subsidiaryFeedbackMessageId.name,
      defaultValue: '',
    });

    this.goToPath(
      `/subsidiaryMessages/subsidiaryFeedbackMessage/edit/load/${subsidiaryFeedbackMessageId}/key/basicInfo`,
    );
  };

  establishDataContainerExtraActionCollectionConfig = () => {
    return [
      {
        buildType:
          listViewConfig.dataContainerExtraActionBuildType.generalExtraButton,
        type: 'default',
        icon: iconBuilder.unorderedList(),
        text: '已开启留言功能的企业列表',
        handleClick: this.showPageListOpenFeedbackDrawer,
      },
    ];
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
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  establishListItemDropdownConfig = (item) => {
    const whetherConfirm = getValueByKey({
      data: item,
      key: fieldData.whetherConfirm.name,
      convert: convertCollection.number,
    });

    const that = this;

    return {
      size: 'small',
      text: '查阅',
      icon: iconBuilder.edit(),
      disabled: !checkHasAuthority(
        accessWayCollection.subsidiaryFeedbackMessage.get.permission,
      ),
      handleButtonClick: ({ handleData }) => {
        that.goToEdit(handleData);
      },
      handleData: item,
      handleMenuClick: ({ key, handleData }) => {
        that.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'toggleConfirm',
          text: whetherConfirm === whetherNumber.yes ? '取消核实' : '核实信息',
          icon:
            whetherConfirm === whetherNumber.yes
              ? iconBuilder.closeCircle(
                  {
                    twoToneColor: colorCollection.noColor,
                  },
                  iconModeCollection.twoTone,
                )
              : iconBuilder.checkCircle(
                  {
                    twoToneColor: colorCollection.yesColor,
                  },
                  iconModeCollection.twoTone,
                ),
          confirm: true,
          title: `即将${whetherConfirm ? '取消核实' : '核实信息'}，确定吗？`,
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'refreshCache',
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          hidden: !checkHasAuthority(
            accessWayCollection.subsidiaryFeedbackMessage.refreshCache
              .permission,
          ),
          confirm: true,
          title: '即将刷新缓存，确定吗？',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'remove',
          icon: iconBuilder.delete(),
          text: '移除',
          confirm: true,
          title: '即将此消息，确定吗？',
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.title,
      width: 320,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.customerPhone,
      width: 140,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.customerFriendlyName,
      width: 140,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.subsidiaryShortName,
      width: 200,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.whetherConfirmNote,
      width: 80,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value, o) => {
        const whetherConfirm = getValueByKey({
          data: o,
          key: fieldData.whetherConfirm.name,
          convert: convertCollection.number,
        });

        return {
          color: buildRandomHexColor({
            seed: toNumber(whetherConfirm) * 25 + 47,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.whetherReplyNote,
      width: 80,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value, o) => {
        const whetherReply = getValueByKey({
          data: o,
          key: fieldData.whetherReply.name,
          convert: convertCollection.number,
        });

        return {
          color: buildRandomHexColor({
            seed: toNumber(whetherReply) * 25 + 47,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.subsidiaryFeedbackMessageId,
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

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '简要说明:请及时操作核实功能， 未核实的信息事实参考性可能有所欠缺。',
        },
      ],
    };
  };

  renderPresetOther = () => {
    return <PageListOpenFeedbackDrawer />;
  };
}

export default PageList;
