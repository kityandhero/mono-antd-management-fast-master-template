import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  convertCollection,
  getValueByKey,
  logConsole,
  showSimpleErrorMessage,
} from 'easy-soft-utility';

import { dropdownExpandItemType } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { switchControlAssist } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../../customConfig';
import { modelTypeCollection } from '../../../../modelBuilders';
import { BaseFlowCaseNextProcessApprovePageListDrawer } from '../../../../pageBases';
import { fieldData as fieldDataWorkflowNodeApprover } from '../../WorkflowNodeApprover/Common/data';
import { PageListWorkflowNodeApproverSelectActionDrawer } from '../../WorkflowNodeApprover/PageListSelectActionDrawer';
import { reassignAction, refreshCacheAction } from '../Assist/action';
import { fieldData } from '../Common/data';
import { OperateLogDrawer } from '../OperateLogDrawer';

const visibleFlag = '4443400d5c0141028d99bd5545fb73a6';

@connect(({ workflowCaseNextProcessApprove, schedulingControl }) => ({
  workflowCaseNextProcessApprove,
  schedulingControl,
}))
class WorkflowCaseNextProcessApprovePageListDrawer extends BaseFlowCaseNextProcessApprovePageListDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  static close() {
    switchControlAssist.close(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      loadApiPath:
        modelTypeCollection.workflowCaseNextProcessApproveTypeCollection
          .pageList,
    };
  }

  getFlowCaseNextProcessApproveIdDataTarget = () => {
    return fieldData.workflowCaseNextProcessApproveId;
  };

  refreshCache = (item) => {
    refreshCacheAction({
      target: this,
      handleData: item,
    });
  };

  checkHasRefreshCacheAuthority = () => {
    return checkHasAuthority(
      accessWayCollection.workflowCaseNextProcessApprove.refreshCache
        .permission,
    );
  };

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'showPageListWorkflowNodeApproverSelectActionDrawer': {
        this.showPageListWorkflowNodeApproverSelectActionDrawer(handleData);
        break;
      }

      case 'showOperateLog': {
        this.showOperateLogDrawer(handleData);
        break;
      }

      default: {
        showSimpleErrorMessage(`can not find matched key "${key}"`);
        break;
      }
    }
  };

  reassign = (o) => {
    const { currentRecord } = this.state;

    logConsole({ currentRecord });

    reassignAction({
      target: this,
      handleData: {
        workflowCaseNextProcessApproveId: getValueByKey({
          data: currentRecord,
          key: fieldData.workflowCaseNextProcessApproveId.name,
          convert: convertCollection.string,
        }),
        nextApproveUserId: getValueByKey({
          data: o,
          key: fieldDataWorkflowNodeApprover.userId.name,
          convert: convertCollection.string,
        }),
      },
      successCallback: ({ target }) => {
        target.refreshDataWithReloadAnimalPrompt({});
      },
    });
  };

  showPageListWorkflowNodeApproverSelectActionDrawer = (r) => {
    this.setState(
      {
        currentRecord: r,
      },
      () => {
        PageListWorkflowNodeApproverSelectActionDrawer.open();
      },
    );
  };

  establishListItemDropdownConfig = (record) => {
    return {
      size: 'small',
      text: '刷新缓存',
      icon: iconBuilder.reload(),
      disabled: !checkHasAuthority(
        accessWayCollection.workflowCaseNextProcessApprove.refreshCache
          .permission,
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
          key: 'showPageListWorkflowNodeApproverSelectActionDrawer',
          icon: iconBuilder.edit(),
          text: '重新指定审批人',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'showOperateLog',
          icon: iconBuilder.read(),
          text: '操作日志',
        },
      ],
    };
  };

  renderPresetOther = () => {
    const { currentRecord } = this.state;

    return (
      <>
        <PageListWorkflowNodeApproverSelectActionDrawer
          externalData={{
            workflowNodeId: getValueByKey({
              data: currentRecord,
              key: fieldData.nextWorkflowNodeId.name,
              defaultValue: '',
            }),
          }}
          afterSelect={(selectData) => {
            this.reassign(selectData);
          }}
        />

        <OperateLogDrawer externalData={currentRecord} />
      </>
    );
  };
}

export { WorkflowCaseNextProcessApprovePageListDrawer };
