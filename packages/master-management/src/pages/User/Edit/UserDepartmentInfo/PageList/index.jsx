import { connect } from 'easy-soft-dva';
import {
  buildRandomHexColor,
  checkHasAuthority,
  showSimpleErrorMessage,
  toNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  dropdownExpandItemType,
  getDerivedStateFromPropertiesForUrlParameters,
  listViewConfig,
  searchCardConfig,
} from 'antd-management-fast-common';
import {
  FunctionSupplement,
  iconBuilder,
} from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../../../customConfig';
import { getUserDepartmentInfoStatusName } from '../../../../../customSpecialComponents';
import { PageListBindUserDrawer } from '../../../../Department/PageListBindUserDrawer';
import {
  refreshCacheAction,
  removeAction,
  removePositionAction,
  removePositionGradeAction,
  setPrimaryAction,
} from '../../../../UserDepartmentInfo/Assist/action';
import { getStatusBadge } from '../../../../UserDepartmentInfo/Assist/tools';
import { ChangePositionGradeModal } from '../../../../UserDepartmentInfo/ChangePositionGradeModal';
import { ChangePositionModal } from '../../../../UserDepartmentInfo/ChangePositionModal';
import { fieldData } from '../../../../UserDepartmentInfo/Common/data';
import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState,
} from '../../../Assist/config';

const { InnerMultiPage } = DataMultiPageView;
const {
  Whether: { getWhetherName },
} = FunctionSupplement;

@connect(({ userDepartmentInfo, schedulingControl }) => ({
  userDepartmentInfo,
  schedulingControl,
}))
class PageList extends InnerMultiPage {
  componentAuthority =
    accessWayCollection.userDepartmentInfo.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '用户公司关系列表',
      paramsKey: accessWayCollection.userDepartmentInfo.pageList.paramsKey,
      loadApiPath: 'userDepartmentInfo/pageList',
      dateRangeFieldName: '创建时间',
      userId: null,
      currentRecord: null,
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
    const { userId } = this.state;

    d.userId = userId;

    return d;
  };

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'setPrimary': {
        this.setPrimary(handleData);

        break;
      }

      case 'setPosition': {
        this.showChangePositionModal(handleData);

        break;
      }

      case 'removePosition': {
        this.removePosition(handleData);

        break;
      }

      case 'setPositionGrade': {
        this.showChangePositionGradeModal(handleData);

        break;
      }

      case 'removePositionGrade': {
        this.removePositionGrade(handleData);

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

  setPrimary = (r) => {
    setPrimaryAction({
      target: this,
      handleData: r,
      successCallback: ({ target }) => {
        target.refreshDataWithReloadAnimalPrompt({});
      },
    });
  };

  removePosition = (r) => {
    removePositionAction({
      target: this,
      handleData: r,
      successCallback: ({ target }) => {
        target.refreshDataWithReloadAnimalPrompt({});
      },
    });
  };

  removePositionGrade = (r) => {
    removePositionGradeAction({
      target: this,
      handleData: r,
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

  showPageListBindUserDrawer = () => {
    PageListBindUserDrawer.open();
  };

  afterPageListBindUserDrawerClose = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  showChangePositionModal = (o) => {
    this.setState({ currentRecord: o }, () => {
      ChangePositionModal.open();
    });
  };

  afterChangePositionModalClose = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  showChangePositionGradeModal = (o) => {
    this.setState({ currentRecord: o }, () => {
      ChangePositionGradeModal.open();
    });
  };

  afterChangePositionGradeModalClose = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 5,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.userDepartmentInfoId,
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  establishDataContainerExtraActionCollectionConfig = () => {
    return [
      {
        buildType:
          listViewConfig.dataContainerExtraActionBuildType.generalButton,
        type: 'primary',
        icon: iconBuilder.setting(),
        text: '设置所属部门',
        handleClick: this.showPageListBindUserDrawer,
      },
    ];
  };

  establishListItemDropdownConfig = (record) => {
    return {
      size: 'small',
      text: '编辑',
      icon: iconBuilder.edit(),
      disabled: !checkHasAuthority(
        accessWayCollection.userDepartmentInfo.get.permission,
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
          key: 'setPrimary',
          icon: iconBuilder.edit(),
          text: '设为主要所属',
          confirm: true,
          title: '将要将该公司设为主要所属关系，确定吗？',
        },
        {
          key: 'remove',
          icon: iconBuilder.delete(),
          text: '移除所属关系',
          confirm: true,
          title: '将要移除所属关系，确定吗？',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'setPosition',
          icon: iconBuilder.edit(),
          text: '设置职位',
        },
        {
          key: 'removePosition',
          icon: iconBuilder.delete(),
          text: '移除职位',
          confirm: true,
          title: '将要将该职位移除，确定吗？',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'setPositionGrade',
          icon: iconBuilder.edit(),
          text: '设置职级',
        },
        {
          key: 'removePositionGrade',
          icon: iconBuilder.delete(),
          text: '移除职级',
          confirm: true,
          title: '将要将该职级移除，确定吗？',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'refreshCache',
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          confirm: true,
          title: '将要刷新缓存，确定吗？',
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.realName,
      width: 140,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.phone,
      width: 140,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.departmentName,
      width: 180,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.positionName,
      width: 160,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.positionGradeName,
      width: 160,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.subsidiaryShortName,
      width: 300,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.whetherPrimary,
      width: 160,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) + 47,
          }),
        };
      },
      formatValue: (value) => {
        return getWhetherName({
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
          text: getUserDepartmentInfoStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.userDepartmentInfoId,
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
          text: '主要归属关系仅能设置一个',
        },
        {
          text: '无归属关系时, 最新设置的关系将默认成为主要归属关系',
        },
        {
          text: '当移除后仅剩一个部门归属关系时，将自动设置为主要归属关系',
        },
      ],
    };
  };

  renderPresetOther = () => {
    const { userId, currentRecord } = this.state;

    return (
      <>
        <PageListBindUserDrawer
          externalData={{ userId }}
          afterClose={this.afterPageListBindUserDrawerClose}
        />

        <ChangePositionModal
          externalData={currentRecord}
          afterClose={this.afterChangePositionModalClose}
        />

        <ChangePositionGradeModal
          externalData={currentRecord}
          afterClose={this.afterChangePositionGradeModalClose}
        />
      </>
    );
  };
}

export default PageList;
