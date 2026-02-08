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
  whetherNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  dropdownExpandItemType,
  extraBuildType,
  listViewConfig,
  searchCardConfig,
  unlimitedWithStringFlag,
} from 'antd-management-fast-common';
import { buildButton, iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import {
  accessWayCollection,
  flowStatusCollection,
  simpleQRCode,
} from '../../../../customConfig';
import {
  getBusinessModeName,
  getChannelName,
  getFlowEffectiveRangeName,
  getFlowStatusName,
  renderSearchBusinessModeSelect,
  renderSearchFlowEffectiveRangeSelect,
  renderSearchFlowScopeSelect,
  renderSearchFlowStatusSelect,
} from '../../../../customSpecialComponents';
import { modelTypeCollection } from '../../../../modelBuilders';
import { fieldData as fieldDataSubsidiary } from '../../Subsidiary/Common/data';
import { SubsidiarySelectDrawerField } from '../../Subsidiary/SelectDrawerField';
import { singleTreeListWithWorkflowAction } from '../../Tag/Assist/action';
import { refreshAllEntityCacheAction as refreshAllWorkflowBranchConditionEntityCacheAction } from '../../WorkflowBranchCondition/Assist/action';
import { refreshAllEntityCacheAction as refreshAllWorkflowBranchConditionItemEntityCacheAction } from '../../WorkflowBranchConditionItem/Assist/action';
import { refreshAllEntityCacheAction as refreshAllWorkflowCaseEntityCacheAction } from '../../WorkflowCase/Assist/action';
import { singleTreeListAction } from '../../WorkflowCategory/Assist/action';
import { refreshAllEntityCacheAction as refreshAllWorkflowDebugCaseEntityCacheAction } from '../../WorkflowDebugCase/Assist/action';
import { refreshAllEntityCacheAction as refreshAllWorkflowFormDesignEntityCacheAction } from '../../WorkflowFormDesign/Assist/action';
import { FlowCaseFormExampleDocumentDisplayDrawer } from '../../WorkflowFormDesign/FlowCaseFormExampleDocumentDisplayDrawer';
import { refreshAllEntityCacheAction as refreshAllWorkflowLineEntityCacheAction } from '../../WorkflowLine/Assist/action';
import { refreshAllEntityCacheAction as refreshAllWorkflowNodeEntityCacheAction } from '../../WorkflowNode/Assist/action';
import { refreshAllEntityCacheAction as refreshAllWorkflowNodeApproverEntityCacheAction } from '../../WorkflowNodeApprover/Assist/action';
import { AddOfficeAutomationArticleAuditDrawer } from '../AddOfficeAutomationArticleAuditDrawer';
import { AddOfficeAutomationProcessApprovalDrawer } from '../AddOfficeAutomationProcessApprovalDrawer';
import {
  refreshAllEntityCacheAction as refreshAllWorkflowEntityCacheAction,
  refreshCacheAction,
  removeAction,
  setDisableAction,
  setEnableAction,
  toggleAvailableOnMobileSwitchAction,
} from '../Assist/action';
import { getStatusBadge } from '../Assist/tools';
import { ChangeSortModal } from '../ChangeSortModal';
import { fieldData } from '../Common/data';
import { CreateDuplicateModal } from '../CreateDuplicateModal';
import { FlowDisplayDrawer } from '../FlowDisplayDrawer';
import { UpdateChannelModal } from '../UpdateChannelModal';

const { MultiPage } = DataMultiPageView;

@connect(({ workflow, schedulingControl }) => ({
  workflow,
  schedulingControl,
}))
class PageList extends MultiPage {
  componentAuthority = accessWayCollection.workflow.pageList.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      tableScrollX: 1880,
      pageTitle: '流程列表',
      paramsKey: accessWayCollection.workflow.pageList.paramsKey,
      loadApiPath: modelTypeCollection.workflowTypeCollection.pageList,
      dateRangeFieldName: '创建时间',
      currentRecord: null,
      currentRecordShowApply: false,
      currentRecordListApply: [],
      currentRecordShowAttention: false,
      currentRecordListAttention: [],
      subsidiaryId: '',
      subsidiaryShortName: '',
      workflowCategoryId: '',
      workflowCategoryName: '',
      workflowCategoryTreeData: [],
      tagIdCollection: [],
      tagName: '',
      tagTreeData: [],
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = { ...o };
    const { subsidiaryId, workflowCategoryId, tagIdCollection } = this.state;

    d[fieldData.subsidiaryId.name] = subsidiaryId ?? '';
    d[fieldData.workflowCategoryId.name] = workflowCategoryId;
    d[fieldData.tagIdCollection.name] = tagIdCollection.join(',');

    return d;
  };

  doOtherRemoteRequest = () => {
    this.loadWorkflowCategoryTreeList({ refresh: whetherNumber.no });
    this.loadTagTreeList();
  };

  loadWorkflowCategoryTreeList = ({ refresh = whetherNumber.no }) => {
    singleTreeListAction({
      target: this,
      handleData: { refresh },
      successCallback: ({ target, remoteListData }) => {
        target.setState({
          workflowCategoryTreeData: remoteListData,
        });
      },
    });
  };

  reloadWorkflowCategoryTreeList = () => {
    this.loadWorkflowCategoryTreeList({ refresh: whetherNumber.yes });
  };

  loadTagTreeList = () => {
    singleTreeListWithWorkflowAction({
      target: this,
      handleData: {},
      successCallback: ({ target, remoteListData }) => {
        target.setState({
          tagTreeData: remoteListData,
        });
      },
    });
  };

  reloadTagTreeList = () => {
    this.loadTagTreeList();
  };

  handleSearchResetState = () => {
    return {
      subsidiaryId: '',
      subsidiaryShortName: '',
      tagIdCollection: [],
      tagName: '',
      workflowCategoryId: '',
      workflowCategoryName: '',
    };
  };

  handleItemStatus = ({ target, handleData, remoteData }) => {
    const workflowId = getValueByKey({
      data: handleData,
      key: fieldData.workflowId.name,
    });

    handleItem({
      target,
      value: workflowId,
      compareValueHandler: (o) => {
        const { workflowId: v } = o;

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

  handleItemAvailableOnMobileSwitch = ({ target, handleData, remoteData }) => {
    const workflowId = getValueByKey({
      data: handleData,
      key: fieldData.workflowId.name,
    });

    handleItem({
      target,
      value: workflowId,
      compareValueHandler: (o) => {
        const { workflowId: v } = o;

        return v;
      },
      handler: (d) => {
        const o = d;

        o[fieldData.availableOnMobileSwitch.name] = getValueByKey({
          data: remoteData,
          key: fieldData.availableOnMobileSwitch.name,
        });

        o[fieldData.availableOnMobileSwitchNote.name] = getValueByKey({
          data: remoteData,
          key: fieldData.availableOnMobileSwitchNote.name,
        });

        return d;
      },
    });
  };

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'setChannel': {
        this.showUpdateChannelModal(handleData);
        break;
      }

      case 'updateSort': {
        this.showChangeSortModal(handleData);
        break;
      }

      case 'showCreateDuplicateModal': {
        this.showCreateDuplicateModal(handleData);
        break;
      }

      case 'showFlowCaseFormExampleDocumentDisplayDrawer': {
        this.showFlowCaseFormExampleDocumentDisplayDrawer(handleData);
        break;
      }

      case 'showFlowDisplayDrawer': {
        this.showFlowDisplayDrawer(handleData);
        break;
      }

      case 'toggleAvailableOnMobileSwitch': {
        this.toggleAvailableOnMobileSwitch(handleData);
        break;
      }

      case 'setEnable': {
        this.setEnable(handleData);
        break;
      }

      case 'setDisable': {
        this.setDisable(handleData);
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
        showSimpleErrorMessage(`can not find matched key "${key}"`);
        break;
      }
    }
  };

  /**
   * 切换移动端是否可以发起审批
   * @param {*} o 当前数据体
   */
  toggleAvailableOnMobileSwitch = (o) => {
    toggleAvailableOnMobileSwitchAction({
      target: this,
      handleData: o,
      successCallback: ({ target, handleData, remoteData }) => {
        target.handleItemAvailableOnMobileSwitch({
          target,
          handleData,
          remoteData,
        });
      },
    });
  };

  setEnable = (item) => {
    setEnableAction({
      target: this,
      handleData: item,
      successCallback: ({ target, handleData, remoteData }) => {
        target.handleItemStatus({ target, handleData, remoteData });
      },
    });
  };

  setDisable = (item) => {
    setDisableAction({
      target: this,
      handleData: item,
      successCallback: ({ target, handleData, remoteData }) => {
        target.handleItemStatus({ target, handleData, remoteData });
      },
    });
  };

  remove = (item) => {
    const { metaListData } = this.state;

    const that = this;

    removeAction({
      target: that,
      handleData: item,
      successCallback: ({ target }) => {
        if (metaListData.length === 1) {
          target.refreshDataWithReloadAnimalPrompt({
            prepareRequest: () => {
              that.pageValues.pageNo =
                that.pageValues.pageNo - 1 <= 0
                  ? 1
                  : that.pageValues.pageNo - 1;

              that.pageValues.frontendPageNo =
                that.pageValues.frontendPageNo - 1 <= 0
                  ? 1
                  : that.pageValues.frontendPageNo - 1;
            },
          });
        } else {
          target.refreshDataWithReloadAnimalPrompt({});
        }
      },
    });
  };

  refreshCache = (item) => {
    refreshCacheAction({
      target: this,
      handleData: item,
    });
  };

  refreshAllWorkflowEntityCache = () => {
    refreshAllWorkflowEntityCacheAction({
      target: this,
      handleData: {},
    });
  };

  refreshAllWorkflowLineEntityCache = () => {
    refreshAllWorkflowLineEntityCacheAction({
      target: this,
      handleData: {},
    });
  };

  refreshAllWorkflowNodeEntityCache = () => {
    refreshAllWorkflowNodeEntityCacheAction({
      target: this,
      handleData: {},
    });
  };

  refreshAllWorkflowNodeApproverEntityCache = () => {
    refreshAllWorkflowNodeApproverEntityCacheAction({
      target: this,
      handleData: {},
    });
  };

  refreshAllWorkflowBranchConditionEntityCache = () => {
    refreshAllWorkflowBranchConditionEntityCacheAction({
      target: this,
      handleData: {},
    });
  };

  refreshAllWorkflowBranchConditionItemEntityCache = () => {
    refreshAllWorkflowBranchConditionItemEntityCacheAction({
      target: this,
      handleData: {},
    });
  };

  refreshAllWorkflowDebugCaseEntityCache = () => {
    refreshAllWorkflowDebugCaseEntityCacheAction({
      target: this,
      handleData: {},
    });
  };

  refreshAllWorkflowCaseEntityCache = () => {
    refreshAllWorkflowCaseEntityCacheAction({
      target: this,
      handleData: {},
    });
  };

  refreshAllWorkflowFormDesignEntityCache = () => {
    refreshAllWorkflowFormDesignEntityCacheAction({
      target: this,
      handleData: {},
    });
  };

  showUpdateChannelModal = (o) => {
    this.setState({ currentRecord: o }, () => {
      UpdateChannelModal.open();
    });
  };

  afterUpdateChannelModalOk = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  showChangeSortModal = (o) => {
    this.setState({ currentRecord: o }, () => {
      ChangeSortModal.open();
    });
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

  showAddOfficeAutomationArticleAuditDrawer = () => {
    AddOfficeAutomationArticleAuditDrawer.open();
  };

  afterAddOfficeAutomationArticleAuditDrawerOk = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  showAddOfficeAutomationProcessApprovalDrawer = () => {
    AddOfficeAutomationProcessApprovalDrawer.open();
  };

  afterAddOfficeAutomationProcessApprovalDrawerOk = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  showCreateDuplicateModal = (o) => {
    this.setState({ currentRecord: o }, () => {
      CreateDuplicateModal.open();
    });
  };

  afterCreateDuplicateModalOk = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  showFlowDisplayDrawer = (o) => {
    this.setState({ currentRecord: o }, () => {
      FlowDisplayDrawer.open();
    });
  };

  showFlowCaseFormExampleDocumentDisplayDrawer = (o) => {
    this.setState(
      {
        currentRecord: o,
      },
      () => {
        FlowCaseFormExampleDocumentDisplayDrawer.open();
      },
    );
  };

  afterSubsidiarySelect = (o) => {
    const subsidiaryId = getValueByKey({
      data: o,
      key: fieldDataSubsidiary.subsidiaryId.name,
    });

    const shortName = getValueByKey({
      data: o,
      key: fieldDataSubsidiary.shortName.name,
    });

    this.setState({
      subsidiaryId: subsidiaryId,
      subsidiaryShortName: shortName,
    });
  };

  afterSubsidiaryClearSelect = () => {
    this.setState({
      subsidiaryId: '',
      subsidiaryShortName: '',
    });
  };

  goToEdit = (item) => {
    const workflowId = getValueByKey({
      data: item,
      key: fieldData.workflowId.name,
    });

    this.goToPath(`/flow/workflow/edit/load/${workflowId}/key/basicInfo`);
  };

  establishExtraActionConfig = () => {
    return {
      list: [
        {
          buildType: extraBuildType.generalExtraButton,
          type: 'default',
          size: 'small',
          icon: iconBuilder.reload(),
          text: '刷新全部工作流实体缓存',
          confirm: true,
          title: '即将刷新全部工作流实体缓存，确定执行吗?',
          disabled: this.checkInProgress(),
          hidden: !checkHasAuthority(
            accessWayCollection.workflow.refreshAllEntityCache.permission,
          ),
          handleClick: () => {
            this.refreshAllWorkflowEntityCache();
          },
        },
      ],
    };
  };

  establishExtraActionEllipsisConfig = () => {
    const that = this;

    return {
      size: 'small',
      disabled: this.checkInProgress(),
      handleMenuClick: ({ key, handleData }) => {
        switch (key) {
          case 'refreshAllWorkflowLineEntityCache': {
            that.refreshAllWorkflowLineEntityCache(handleData);
            break;
          }

          case 'refreshAllWorkflowNodeEntityCache': {
            that.refreshAllWorkflowNodeEntityCache(handleData);
            break;
          }

          case 'refreshAllWorkflowNodeApproverEntityCache': {
            that.refreshAllWorkflowNodeApproverEntityCache(handleData);
            break;
          }

          case 'refreshAllWorkflowBranchConditionEntityCache': {
            that.refreshAllWorkflowBranchConditionEntityCache(handleData);
            break;
          }

          case 'refreshAllWorkflowBranchConditionItemEntityCache': {
            that.refreshAllWorkflowBranchConditionItemEntityCache(handleData);
            break;
          }

          case 'refreshAllWorkflowDebugCaseEntityCache': {
            that.refreshAllWorkflowDebugCaseEntityCache(handleData);
            break;
          }

          case 'refreshAllWorkflowCaseEntityCache': {
            that.refreshAllWorkflowCaseEntityCache(handleData);
            break;
          }

          case 'refreshAllWorkflowFormDesignEntityCache': {
            that.refreshAllWorkflowFormDesignEntityCache(handleData);
            break;
          }

          default: {
            showSimpleErrorMessage(`can not find matched key "${key}"`);
            break;
          }
        }
      },
      handleData: {},
      items: [
        {
          key: 'refreshAllWorkflowLineEntityCache',
          icon: iconBuilder.reload(),
          size: 'small',
          text: '刷新全部工作流线条实体缓存',
          confirm: true,
          title: '即将刷新全部工作流线条实体缓存，确定执行吗?',
          disabled: this.checkInProgress(),
          hidden: !checkHasAuthority(
            accessWayCollection.workflowLine.refreshAllEntityCache.permission,
          ),
        },
        {
          key: 'refreshAllWorkflowNodeEntityCache',
          icon: iconBuilder.reload(),
          size: 'small',
          text: '刷新全部工作流节点实体缓存',
          confirm: true,
          title: '即将刷新全部工作流节点实体缓存，确定执行吗?',
          disabled: this.checkInProgress(),
          hidden: !checkHasAuthority(
            accessWayCollection.workflowNode.refreshAllEntityCache.permission,
          ),
        },
        {
          key: 'refreshAllWorkflowNodeApproverEntityCache',
          icon: iconBuilder.reload(),
          size: 'small',
          text: '刷新全部工作流节点审批人实体缓存',
          confirm: true,
          title: '即将刷新全部工作流节点审批人实体缓存，确定执行吗?',
          disabled: this.checkInProgress(),
          hidden: !checkHasAuthority(
            accessWayCollection.workflowNodeApprover.refreshAllEntityCache
              .permission,
          ),
        },
        {
          key: 'refreshAllWorkflowBranchConditionEntityCache',
          icon: iconBuilder.reload(),
          size: 'small',
          text: '刷新全部工作流条件实体缓存',
          confirm: true,
          title: '即将刷新全部工作流条件实体缓存，确定执行吗?',
          disabled: this.checkInProgress(),
          hidden: !checkHasAuthority(
            accessWayCollection.workflowBranchCondition.refreshAllEntityCache
              .permission,
          ),
        },
        {
          key: 'refreshAllWorkflowBranchConditionItemEntityCache',
          icon: iconBuilder.reload(),
          size: 'small',
          text: '刷新全部工作流条件项实体缓存',
          confirm: true,
          title: '即将刷新全部工作流条件项实体缓存，确定执行吗?',
          disabled: this.checkInProgress(),
          hidden: !checkHasAuthority(
            accessWayCollection.workflowBranchConditionItem
              .refreshAllEntityCache.permission,
          ),
        },
        {
          key: 'refreshAllWorkflowFormDesignEntityCache',
          icon: iconBuilder.reload(),
          size: 'small',
          text: '刷新全部工作流表单设计实体缓存',
          confirm: true,
          title: '即将刷新全部工作流表单设计实体缓存，确定执行吗?',
          disabled: this.checkInProgress(),
          hidden: !checkHasAuthority(
            accessWayCollection.workflowFormDesign.refreshAllEntityCache
              .permission,
          ),
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'refreshAllWorkflowCaseEntityCache',
          icon: iconBuilder.reload(),
          size: 'small',
          text: '刷新全部工作流实例实体缓存',
          confirm: true,
          title: '即将刷新全部工作流实例实体缓存，确定执行吗?',
          disabled: this.checkInProgress(),
          hidden: !checkHasAuthority(
            accessWayCollection.workflowCase.refreshAllEntityCache.permission,
          ),
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'refreshAllWorkflowFormDesignEntityCache',
          icon: iconBuilder.reload(),
          size: 'small',
          text: '刷新全部工作流测试实例实体缓存',
          confirm: true,
          title: '即将刷新全部工作流测试实例实体缓存，确定执行吗?',
          disabled: this.checkInProgress(),
          hidden: !checkHasAuthority(
            accessWayCollection.workflowDebugCase.refreshAllEntityCache
              .permission,
          ),
        },
      ],
    };
  };

  fillSearchCardInitialValues = () => {
    const values = {};

    values[fieldData.scope.name] = unlimitedWithStringFlag.flag;
    values[fieldData.businessMode.name] = unlimitedWithStringFlag.flag;
    values[fieldData.availableOnMobileSwitch.name] =
      unlimitedWithStringFlag.flag;
    values[fieldData.effectiveRange.name] = unlimitedWithStringFlag.flag;
    values[fieldData.status.name] = unlimitedWithStringFlag.flag;

    return values;
  };

  establishSearchCardConfig = () => {
    const {
      tagTreeData,
      tagIdCollection,
      workflowCategoryTreeData,
      workflowCategoryId,
      subsidiaryShortName,
    } = this.state;

    return {
      list: [
        {
          lg: 10,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.name,
        },
        {
          lg: 8,
          type: searchCardConfig.contentItemType.treeSelect,
          fieldData: fieldData.workflowCategoryId,
          value: workflowCategoryId,
          require: false,
          listData: workflowCategoryTreeData,
          addonAfter: buildButton({
            text: '',
            icon: iconBuilder.reload(),
            handleClick: () => {
              this.reloadWorkflowCategoryTreeList();
            },
          }),
          dataConvert: (o) => {
            const { name: title, code: value } = o;

            return {
              title,
              value,
            };
          },
          onChange: ({ value }) => {
            this.setState({
              workflowCategoryId: value,
            });
          },
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.treeSelect,
          fieldData: fieldData.tagIdCollection,
          value: tagIdCollection,
          require: true,
          innerProps: {
            treeCheckable: true,
          },
          listData: tagTreeData,
          addonAfter: buildButton({
            title: '点击刷新标签列表',
            text: '',
            icon: iconBuilder.reload(),
            handleClick: () => {
              this.reloadTagTreeList();
            },
          }),
          dataConvert: (o) => {
            const { name: title, code: value } = o;

            return {
              title,
              value,
            };
          },
          onChange: ({ value }) => {
            this.setState({
              tagIdCollection: value,
            });
          },
        },
        {
          lg: 10,
          type: searchCardConfig.contentItemType.component,
          component: (
            <SubsidiarySelectDrawerField
              label={fieldData.subsidiaryId.label}
              helper={fieldData.subsidiaryId.helper}
              defaultValue={subsidiaryShortName || null}
              afterSelectSuccess={(d) => {
                this.afterSubsidiarySelect(d);
              }}
              afterClearSelect={() => {
                this.afterSubsidiaryClearSelect();
              }}
            />
          ),
        },
        {
          lg: 4,
          type: searchCardConfig.contentItemType.customSelect,
          component: renderSearchBusinessModeSelect({}),
        },
        {
          lg: 4,
          type: searchCardConfig.contentItemType.whetherSelect,
          fieldData: fieldData.availableOnMobileSwitch,
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.customSelect,
          component: renderSearchFlowStatusSelect({}),
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.customSelect,
          component: renderSearchFlowEffectiveRangeSelect({}),
        },
        {
          lg: 5,
          type: searchCardConfig.contentItemType.customSelect,
          component: renderSearchFlowScopeSelect({}),
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
        text: '增加审批流程',
        handleClick: this.showAddOfficeAutomationProcessApprovalDrawer,
      },
      {
        buildType:
          listViewConfig.dataContainerExtraActionBuildType.generalButton,
        type: 'primary',
        icon: iconBuilder.plus(),
        text: '增加文章审核流程',
        handleClick: this.showAddOfficeAutomationArticleAuditDrawer,
      },
    ];
  };

  establishListItemDropdownConfig = (record) => {
    const status = getValueByKey({
      data: record,
      key: fieldData.status.name,
      convert: convertCollection.number,
    });

    const availableOnMobileSwitch = getValueByKey({
      data: record,
      key: fieldData.availableOnMobileSwitch.name,
      convert: convertCollection.number,
    });

    return {
      size: 'small',
      text: '编辑',
      icon: iconBuilder.edit(),
      disabled: !checkHasAuthority(accessWayCollection.workflow.get.permission),
      handleButtonClick: ({ handleData }) => {
        this.goToEdit(handleData);
      },
      handleData: record,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'updateSort',
          icon: iconBuilder.edit(),
          text: '设置排序值',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'setChannel',
          icon: iconBuilder.edit(),
          text: '设置数据通道',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'showCreateDuplicateModal',
          icon: iconBuilder.copy(),
          hidden: !checkHasAuthority(
            accessWayCollection.workflow.createDuplicate.permission,
          ),
          text: '复制流程',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'showFlowCaseFormExampleDocumentDisplayDrawer',
          icon: iconBuilder.printer(),
          hidden: !checkHasAuthority(
            accessWayCollection.workflow.get.permission,
          ),
          text: '查看打印样例',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'showFlowDisplayDrawer',
          icon: iconBuilder.apartment(),
          hidden: !checkHasAuthority(
            accessWayCollection.workflow.get.permission,
          ),
          text: '查看流程图',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'toggleAvailableOnMobileSwitch',
          icon:
            availableOnMobileSwitch === whetherNumber.yes
              ? iconBuilder.pauseCircle()
              : iconBuilder.enable(),

          hidden: !checkHasAuthority(
            accessWayCollection.workflow.toggleAvailableOnMobileSwitch
              .permission,
          ),
          text: `${availableOnMobileSwitch === whetherNumber.yes ? '关闭' : '开放'}移动端发起审批`,
          confirm: true,
          title: `即将${availableOnMobileSwitch === whetherNumber.yes ? '关闭' : '开放'}移动端发起审批，确定吗？`,
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'setEnable',
          icon: iconBuilder.playCircle(),
          text: '设为启用',
          disabled: status === flowStatusCollection.enable,
          confirm: true,
          title: '将要设为启用，确定吗？',
        },
        {
          key: 'setDisable',
          icon: iconBuilder.pauseCircle(),
          text: '设为禁用',
          disabled: status === flowStatusCollection.disable,
          confirm: true,
          title: '将要设为禁用，确定吗？',
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
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'remove',
          icon: iconBuilder.delete(),
          text: '移除流程',
          confirm: true,
          title: '将要移除流程，确定吗？',
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
      dataTarget: fieldData.businessMode,
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
        return getBusinessModeName({
          value: value,
        });
      },
    },
    // {
    //   dataTarget: fieldData.scope,
    //   width: 120,
    //   showRichFacade: true,
    //   emptyValue: '--',
    //   facadeConfigBuilder: (value) => {
    //     return {
    //       color: buildRandomHexColor({
    //         seed: toNumber(value) + 44,
    //       }),
    //     };
    //   },
    //   formatValue: (value) => {
    //     return getFlowScopeName({
    //       value: value,
    //     });
    //   },
    // },
    {
      dataTarget: fieldData.effectiveRangeDescription,
      width: 240,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.effectiveRange,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) + 12,
          }),
        };
      },
      formatValue: (value) => {
        return getFlowEffectiveRangeName({
          value: value,
        });
      },
    },
    {
      dataTarget: fieldData.availableOnMobileSwitch,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) + 38,
          }),
        };
      },
      formatValue: (value, record) => {
        return getValueByKey({
          data: record,
          key: fieldData.availableOnMobileSwitchNote.name,
        });
      },
    },
    {
      dataTarget: fieldData.channel,
      width: 120,
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
        return getChannelName({
          value: value,
        });
      },
    },
    // {
    //   dataTarget: fieldData.creatorUserRealName,
    //   width: 120,
    //   showRichFacade: true,
    //   emptyValue: '--',
    // },
    {
      dataTarget: fieldData.status,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (value) => {
        return {
          status: getStatusBadge(value),
          text: getFlowStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.sort,
      width: 80,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.workflowId,
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
    const {
      currentRecord,
      currentRecordShowApply,
      currentRecordListApply,
      currentRecordShowAttention,
      currentRecordListAttention,
    } = this.state;

    return (
      <>
        <AddOfficeAutomationArticleAuditDrawer
          afterOK={this.afterAddOfficeAutomationArticleAuditDrawerOk}
        />

        <AddOfficeAutomationProcessApprovalDrawer
          afterOK={this.afterAddOfficeAutomationProcessApprovalDrawerOk}
        />

        <UpdateChannelModal
          externalData={currentRecord}
          afterOK={() => {
            this.afterUpdateChannelModalOk();
          }}
        />

        <ChangeSortModal
          externalData={currentRecord}
          afterOK={this.afterChangeSortModalOk}
        />

        <CreateDuplicateModal
          externalData={currentRecord}
          afterOK={() => {
            this.afterCreateDuplicateModalOk();
          }}
        />

        <FlowDisplayDrawer maskClosable externalData={currentRecord} />

        <FlowCaseFormExampleDocumentDisplayDrawer
          maskClosable
          canDesign={false}
          values={[]}
          showApply={currentRecordShowApply}
          applyList={currentRecordListApply}
          showAttention={currentRecordShowAttention}
          attentionList={currentRecordListAttention}
          approveList={[]}
          qRCodeImage={simpleQRCode}
          serialNumberContent={'1836370789809655808'}
          externalData={currentRecord}
        />
      </>
    );
  };
}

export default PageList;
