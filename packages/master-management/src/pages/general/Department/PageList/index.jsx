import React from 'react';

import { connect } from 'easy-soft-dva';
import {
  buildRandomHexColor,
  checkHasAuthority,
  convertCollection,
  getValueByKey,
  handleItem,
  showSimpleErrorMessage,
  toNumber,
  zeroString,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  dropdownExpandItemType,
  listViewConfig,
  searchCardConfig,
  unlimitedWithStringFlag,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../../customConfig';
import {
  getDepartmentOwnershipModeName,
  getDepartmentStatusName,
  renderSearchDepartmentOwnershipModeSelect,
} from '../../../../customSpecialComponents';
import { modelTypeCollection } from '../../../../modelBuilders';
import { PageListSubsidiarySelectActionDrawer } from '../../Subsidiary/PageListSelectActionDrawer';
import {
  clearParentIdAction,
  refreshCacheAction,
  setInvalidAction,
  setNormalAction,
  setParentIdAction,
  setSubsidiaryIdAction,
} from '../Assist/action';
import { getStatusBadge } from '../Assist/tools';
import { ChangeSortModal } from '../ChangeSortModal';
import { fieldData, statusCollection } from '../Common/data';
import { OperateLogDrawer } from '../OperateLogDrawer';
import { PageListDepartmentSelectActionDrawer } from '../PageListSelectActionDrawer';

const { MultiPage } = DataMultiPageView;

@connect(({ department, schedulingControl }) => ({
  department,
  schedulingControl,
}))
class PageList extends MultiPage {
  componentAuthority = accessWayCollection.department.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '部门列表',
      paramsKey: accessWayCollection.department.pageList.paramsKey,
      loadApiPath: modelTypeCollection.departmentTypeCollection.pageList,
      dateRangeFieldName: '创建时间',
      currentRecord: null,
    };
  }

  handleItemStatus = ({ target, handleData, remoteData }) => {
    const departmentId = getValueByKey({
      data: handleData,
      key: fieldData.departmentId.name,
    });

    handleItem({
      target,
      value: departmentId,
      compareValueHandler: (o) => {
        const { departmentId: v } = o;

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

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'showPageListDepartmentSelectActionDrawer': {
        this.showPageListDepartmentSelectActionDrawer(handleData);
        break;
      }

      case 'showPageListSubsidiarySelectActionDrawer': {
        this.showPageListSubsidiarySelectActionDrawer(handleData);
        break;
      }

      case 'setSort': {
        this.showChangeSortModal(handleData);
        break;
      }

      case 'clearParentId': {
        this.clearParentId(handleData);
        break;
      }

      case 'setNormal': {
        this.setNormal(handleData);
        break;
      }

      case 'setInvalid': {
        this.setInvalid(handleData);
        break;
      }

      case 'showOperateLog': {
        this.showOperateLogDrawer(handleData);
        break;
      }

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
    const { currentRecord } = this.state;

    setParentIdAction({
      target: this,
      handleData: {
        departmentId: getValueByKey({
          data: currentRecord,
          key: fieldData.departmentId.name,
          convert: convertCollection.string,
        }),
        parentId: getValueByKey({
          data: o,
          key: fieldData.departmentId.name,
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
      successCallback: ({ target, remoteData }) => {
        const id = getValueByKey({
          data: remoteData,
          key: fieldData.departmentId.name,
        });

        handleItem({
          target,
          value: id,
          compareValueHandler: (o) => {
            const v = getValueByKey({
              data: o,
              key: fieldData.departmentId.name,
            });

            return v;
          },
          handler: (d) => {
            const o = d;

            o[fieldData.parentId.name] = getValueByKey({
              data: remoteData,
              key: fieldData.parentId.name,
            });

            o[fieldData.parentName.name] = getValueByKey({
              data: remoteData,
              key: fieldData.parentName.name,
            });

            return d;
          },
        });
      },
    });
  };

  setNormal = (r) => {
    setNormalAction({
      target: this,
      handleData: r,
      successCallback: ({ target, handleData, remoteData }) => {
        target.handleItemStatus({ target, handleData, remoteData });
      },
    });
  };

  setInvalid = (r) => {
    setInvalidAction({
      target: this,
      handleData: r,
      successCallback: ({ target, handleData, remoteData }) => {
        target.handleItemStatus({ target, handleData, remoteData });
      },
    });
  };

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
    });
  };

  setSubsidiaryId = (o) => {
    const { currentRecord } = this.state;

    setSubsidiaryIdAction({
      target: this,
      handleData: {
        departmentId: getValueByKey({
          data: currentRecord,
          key: fieldData.departmentId.name,
          convert: convertCollection.string,
        }),
        subsidiaryId: getValueByKey({
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

  showChangeSortModal = (r) => {
    this.setState(
      {
        currentRecord: r,
      },
      () => {
        ChangeSortModal.open();
      },
    );
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

  showPageListDepartmentSelectActionDrawer = (r) => {
    this.setState(
      {
        currentRecord: r,
      },
      () => {
        PageListDepartmentSelectActionDrawer.open();
      },
    );
  };

  showPageListSubsidiarySelectActionDrawer = (r) => {
    this.setState(
      {
        currentRecord: r,
      },
      () => {
        PageListSubsidiarySelectActionDrawer.open();
      },
    );
  };

  showOperateLogDrawer = (item) => {
    this.setState(
      {
        currentRecord: item,
      },
      () => {
        OperateLogDrawer.open();
      },
    );
  };

  goToAdd = () => {
    this.goToPath(`/organization/department/add`);
  };

  goToEdit = (record) => {
    const { departmentId } = record;

    this.goToPath(
      `/organization/department/edit/load/${departmentId}/key/basicInfo`,
    );
  };

  fillSearchCardInitialValues = () => {
    const values = {};

    values[fieldData.ownershipMode.name] = unlimitedWithStringFlag.flag;

    return values;
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 5,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.departmentId,
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.name,
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.customSelect,
          component: renderSearchDepartmentOwnershipModeSelect({}),
        },
        {
          lg: 4,
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
        icon: iconBuilder.plus(),
        text: '增加部门',
        handleClick: this.goToAdd,
      },
    ];
  };

  establishListItemDropdownConfig = (item) => {
    const parentId = getValueByKey({
      data: item,
      key: fieldData.parentId.name,
      convert: convertCollection.string,
    });

    const status = getValueByKey({
      data: item,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    return {
      size: 'small',
      text: '编辑',
      icon: iconBuilder.edit(),
      disabled: !checkHasAuthority(
        accessWayCollection.department.get.permission,
      ),
      handleButtonClick: ({ handleData }) => {
        this.goToEdit(handleData);
      },
      handleData: item,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'setSort',
          icon: iconBuilder.edit(),
          text: '设置排序值',
          hidden: !checkHasAuthority(
            accessWayCollection.department.setSort.permission,
          ),
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'showPageListDepartmentSelectActionDrawer',
          icon: iconBuilder.edit(),
          text: `设置上级类别`,
          hidden: !checkHasAuthority(
            accessWayCollection.department.setParentId.permission,
          ),
        },
        {
          key: 'clearParentId',
          icon: iconBuilder.clear(),
          text: '清除上级类别',
          confirm: true,
          title: '将要设清除上级类别，确定吗？',
          disabled: parentId === zeroString,
          hidden: !checkHasAuthority(
            accessWayCollection.department.clearParentId.permission,
          ),
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'showPageListSubsidiarySelectActionDrawer',
          icon: iconBuilder.edit(),
          text: `设置所属公司`,
          hidden: !checkHasAuthority(
            accessWayCollection.department.setSubsidiaryId.permission,
          ),
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'setNormal',
          icon: iconBuilder.playCircle(),
          text: '设为正常',
          disabled: status === statusCollection.normal,
          hidden: !checkHasAuthority(
            accessWayCollection.department.setNormal.permission,
          ),
          confirm: true,
          title: '将要设为启用，确定吗？',
        },
        {
          key: 'setInvalid',
          icon: iconBuilder.pauseCircle(),
          text: '设为无效',
          disabled: status === statusCollection.invalid,
          hidden: !checkHasAuthority(
            accessWayCollection.department.setInvalid.permission,
          ),
          confirm: true,
          title: '将要设为禁用，确定吗？',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'showOperateLog',
          icon: iconBuilder.read(),
          text: '操作日志',
          hidden: !checkHasAuthority(
            accessWayCollection.department.pageListOperateLog.permission,
          ),
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
          hidden: !checkHasAuthority(
            accessWayCollection.smsCategory.refreshCache.permission,
          ),
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.name,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.ownershipMode,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) + 29,
          }),
        };
      },
      formatValue: (value) => {
        return getDepartmentOwnershipModeName({
          value: value,
        });
      },
    },
    {
      dataTarget: fieldData.parentName,
      width: 180,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.subsidiaryShortName,
      width: 180,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.sort,
      width: 80,
      showRichFacade: true,
      emptyValue: '--',
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
          text: getDepartmentStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.parentId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.subsidiaryId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.departmentId,
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
        <ChangeSortModal
          externalData={currentRecord}
          afterOK={this.afterChangeSortModalOk}
        />

        <PageListSubsidiarySelectActionDrawer
          afterSelect={(selectData) => {
            this.setSubsidiaryId(selectData);
          }}
        />

        <PageListDepartmentSelectActionDrawer
          width={1000}
          externalData={{
            subsidiaryId: getValueByKey({
              data: currentRecord,
              key: fieldData.subsidiaryId.name,
              defaultValue: '',
            }),
          }}
          afterSelect={(selectData) => {
            this.setParentId(selectData);
          }}
        />

        <OperateLogDrawer externalData={currentRecord} />
      </>
    );
  };
}

export default PageList;
