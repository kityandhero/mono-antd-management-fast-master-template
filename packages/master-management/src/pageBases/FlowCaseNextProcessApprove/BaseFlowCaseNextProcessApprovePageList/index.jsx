import {
  buildRandomHexColor,
  checkHasAuthority,
  showSimpleErrorMessage,
  toNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  searchCardConfig,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import {
  accessWayCollection,
  fieldDataFlowCaseNextProcessApprove,
} from '../../../customConfig';
import {
  getChannelName,
  getFlowCaseNextProcessApproveStatusName,
} from '../../../customSpecialComponents';
import { getFlowCaseNextProcessApproveStatusBadge } from '../Assist/tools';

const { MultiPage } = DataMultiPageView;

class BaseFlowCaseNextProcessApprovePageList extends MultiPage {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: '流程实例下一审批信息列表',
      paramsKey: accessWayCollection.workflowCase.pageList.paramsKey,
      loadApiPath: 'workflowCase/pageList',
      dateRangeFieldName: '创建时间',
      currentRecord: null,
    };
  }

  // eslint-disable-next-line no-unused-vars
  getFlowCaseId = (o) => {
    throw new Error('getFlowCaseId need overrode to implement');
  };

  // eslint-disable-next-line no-unused-vars
  getFlowCaseNextProcessApproveId = (o) => {
    throw new Error(
      'getFlowCaseNextProcessApproveId need overrode to implement',
    );
  };

  getFlowCaseNextProcessApproveIdDataTarget = () => {
    throw new Error(
      'getFlowCaseNextProcessApproveIdDataTarget need overrode to implement',
    );
  };

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
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

  // eslint-disable-next-line no-unused-vars
  refreshCache = (item) => {
    throw new Error('refreshCache need overrode to implement');
  };

  // eslint-disable-next-line no-unused-vars
  preview = (item) => {
    throw new Error('preview need overrode to implement');
  };

  fillSearchCardInitialValues = () => {
    const values = {};

    return values;
  };

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 8,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldDataFlowCaseNextProcessApprove.flowCaseTitle,
        },
        {
          lg: 8,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  establishListItemDropdownConfig = (record) => {
    return {
      size: 'small',
      text: '详情',
      icon: iconBuilder.read(),
      disabled: !checkHasAuthority(
        accessWayCollection.workflowCase.get.permission,
      ),
      handleButtonClick: ({ handleData }) => {
        this.preview(handleData);
      },
      handleData: record,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
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
      dataTarget: fieldDataFlowCaseNextProcessApprove.flowCaseTitle,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldDataFlowCaseNextProcessApprove.nextApproveUserRealName,
      width: 140,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldDataFlowCaseNextProcessApprove.nextWorkflowNodeName,
      width: 140,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldDataFlowCaseNextProcessApprove.workflowName,
      width: 220,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldDataFlowCaseNextProcessApprove.channel,
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
    {
      dataTarget: fieldDataFlowCaseNextProcessApprove.status,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (value) => {
        return {
          status: getFlowCaseNextProcessApproveStatusBadge(value),
          text: getFlowCaseNextProcessApproveStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldDataFlowCaseNextProcessApprove.flowCaseId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: this.getFlowCaseNextProcessApproveIdDataTarget(),
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldDataFlowCaseNextProcessApprove.createTime,
      width: 160,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
    },
  ];
}

export { BaseFlowCaseNextProcessApprovePageList };