import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  getValueByKey,
  showSimpleErrorMessage,
  zeroString,
} from 'easy-soft-utility';

import {
  dropdownExpandItemType,
  getDerivedStateFromPropertiesForUrlParameters,
  tabBarCollection,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { accessWayCollection } from '../../../../customConfig';
import {
  DataTabContainerSupplement,
  getTagStatusName,
} from '../../../../customSpecialComponents';
import { modelTypeCollection } from '../../../../modelBuilders';
import { GraphicalSingleSubsidiaryDepartmentTreeDrawer } from '../../Organization/GraphicalSingleSubsidiaryDepartmentTreeDrawer';
import {
  clearParentIdAction,
  refreshCacheAction,
  setDisableAction,
  setEnableAction,
  setParentIdAction,
} from '../Assist/action';
import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState,
} from '../Assist/config';
import { ChangeLogoModal } from '../ChangeLogoModal';
import { ChangeSortModal } from '../ChangeSortModal';
import { fieldData, statusCollection } from '../Common/data';
import { PageListSubsidiarySelectActionDrawer } from '../PageListSelectActionDrawer';

@connect(({ subsidiary, schedulingControl }) => ({
  subsidiary,
  schedulingControl,
}))
class Detail extends DataTabContainerSupplement {
  componentAuthority = accessWayCollection.subsidiary.get.permission;

  tabList = [
    {
      key: 'basicInfo',
      hidden: !checkHasAuthority(accessWayCollection.subsidiary.get.permission),
      tab: '基本信息',
    },
    {
      key: 'operateLog/pageList',
      hidden: !checkHasAuthority(
        accessWayCollection.subsidiary.pageListOperateLog.permission,
      ),
      tab: '操作日志',
    },
  ];

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '',
      loadApiPath: modelTypeCollection.subsidiaryTypeCollection.get,
      backPath: `/organization/subsidiary/pageList/key`,
      subsidiaryId: null,
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
    const { subsidiaryId } = this.state;

    d.subsidiaryId = subsidiaryId;

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
        key: fieldData.shortName.name,
      }),
    });
  };

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

  setParentId = (o) => {
    const { metaData } = this.state;

    setParentIdAction({
      target: this,
      handleData: {
        subsidiaryId: getValueByKey({
          data: metaData,
          key: fieldData.subsidiaryId.name,
          convert: convertCollection.string,
        }),
        parentId: getValueByKey({
          data: o,
          key: fieldData.subsidiaryId.name,
          convert: convertCollection.string,
        }),
      },
      successCallback: ({ target }) => {
        target.refreshDataWithReloadAnimalPrompt({});
      },
    });
  };

  clearParentId = (r) => {
    clearParentIdAction({
      target: this,
      handleData: r,
      successCallback: ({ target }) => {
        target.refreshDataWithReloadAnimalPrompt({});
      },
    });
  };

  setEnable = (r) => {
    setEnableAction({
      target: this,
      handleData: r,
      // eslint-disable-next-line no-unused-vars
      successCallback: ({ target, handleData, remoteData }) => {
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
      // eslint-disable-next-line no-unused-vars
      successCallback: ({ target, handleData, remoteData }) => {
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

  showChangeLogoModal = () => {
    ChangeLogoModal.open();
  };

  afterChangeLogoModalOk = ({
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

  openGraphicalSingleSubsidiaryDepartmentTreeDrawer = () => {
    GraphicalSingleSubsidiaryDepartmentTreeDrawer.open();
  };

  showPageListSubsidiarySelectActionDrawer = () => {
    PageListSubsidiarySelectActionDrawer.open();
  };

  establishPageHeaderTitlePrefix = () => {
    return '公司';
  };

  establishPageHeaderAvatarConfig = () => {
    const { metaData } = this.state;

    const logo = getValueByKey({
      data: metaData,
      key: fieldData.logo.name,
    });

    if (!checkStringIsNullOrWhiteSpace(logo || '')) {
      return { src: logo };
    }

    return null;
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
          text: '启用公司',
          icon: iconBuilder.playCircle(),
          handleButtonClick: ({ handleData }) => {
            that.setEnable(handleData);
          },
          confirm: true,
          title: '即将启用公司，确定吗？',
          handleData: metaData,
          disabled: status === statusCollection.enable,
          hidden: !checkHasAuthority(
            accessWayCollection.subsidiary.setEnable.permission,
          ),
        },
        {
          key: 'setDisable',
          text: '禁用公司',
          icon: iconBuilder.pauseCircle(),
          handleButtonClick: ({ handleData }) => {
            that.setDisable(handleData);
          },
          confirm: true,
          title: '即将禁用公司，确定吗？',
          handleData: metaData,
          disabled: status === statusCollection.disable,
          hidden: !checkHasAuthority(
            accessWayCollection.subsidiary.setDisable.permission,
          ),
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

    const parentId = getValueByKey({
      data: metaData,
      key: fieldData.parentId.name,
      convert: convertCollection.string,
    });

    return {
      disabled: this.checkInProgress(),
      handleMenuClick: ({ key, handleData }) => {
        switch (key) {
          case 'setLogo': {
            this.showChangeLogoModal(handleData);
            break;
          }

          case 'setSort': {
            this.showChangeSortModal(handleData);
            break;
          }

          case 'showPageListSubsidiarySelectActionDrawer': {
            that.showPageListSubsidiarySelectActionDrawer(handleData);
            break;
          }

          case 'clearParentId': {
            this.clearParentId(handleData);
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
          key: 'setLogo',
          icon: iconBuilder.picture(),
          text: `设置图片`,
          hidden: !checkHasAuthority(
            accessWayCollection.subsidiary.setLogo.permission,
          ),
        },
        {
          key: 'setSort',
          icon: iconBuilder.edit(),
          text: '设置排序值',
          hidden: !checkHasAuthority(
            accessWayCollection.subsidiary.setSort.permission,
          ),
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'showPageListSubsidiarySelectActionDrawer',
          icon: iconBuilder.edit(),
          text: `设置上级公司`,
          hidden: !checkHasAuthority(
            accessWayCollection.subsidiary.setParentId.permission,
          ),
        },
        {
          key: 'clearParentId',
          icon: iconBuilder.clear(),
          text: '清除上级公司',
          confirm: true,
          title: '将要设清除上级公司，确定吗？',
          disabled: parentId === zeroString,
          hidden: !checkHasAuthority(
            accessWayCollection.subsidiary.clearParentId.permission,
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
            accessWayCollection.subsidiary.refreshCache.permission,
          ),
          confirm: true,
          title: '即将刷新缓存，确定吗？',
        },
      ],
    };
  };

  establishTabBarExtraContentRightConfig = () => {
    return [
      {
        buildType: tabBarCollection.extraBuildType.button,
        icon: iconBuilder.unorderedList(),
        text: '组织图例',
        size: 'small',
        handleClick: () => {
          this.openGraphicalSingleSubsidiaryDepartmentTreeDrawer();
        },
      },
    ];
  };

  establishPageHeaderExtraContentConfig = () => {
    const { metaData } = this.state;

    return {
      textLabel: '当前状态',
      text: getTagStatusName({
        value: getValueByKey({
          data: metaData,
          key: fieldData.status.name,
          convert: convertCollection.number,
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
        label: fieldData.subsidiaryId.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.subsidiaryId.name,
          defaultValue: '未设置',
        }),
        canCopy: true,
      },
      {
        label: fieldData.shortName.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.shortName.name,
          defaultValue: '未设置',
        }),
      },
      {
        label: fieldData.fullName.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.fullName.name,
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
        label: fieldData.parentId.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.parentId.name,
          defaultValue: '未设置',
        }),
      },
      {
        label: fieldData.parentShortName.label,
        value: getValueByKey({
          data: metaData,
          key: fieldData.parentShortName.name,
          defaultValue: '未设置',
        }),
      },
    ];
  };

  renderPresetOther = () => {
    const { metaData } = this.state;

    return (
      <>
        <ChangeLogoModal
          externalData={metaData}
          afterOK={this.afterChangeLogoModalOk}
        />

        <ChangeSortModal
          externalData={metaData}
          afterOK={this.afterChangeSortModalOk}
        />

        <GraphicalSingleSubsidiaryDepartmentTreeDrawer
          maskClosable
          externalData={metaData}
        />

        <PageListSubsidiarySelectActionDrawer
          afterSelect={(selectData) => {
            this.setParentId(selectData);
          }}
        />
      </>
    );
  };
}

export default Detail;
