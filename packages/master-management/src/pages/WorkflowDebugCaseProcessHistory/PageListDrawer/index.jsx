import { connect } from 'easy-soft-dva';
import { checkHasAuthority, getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { BaseFlowCaseProcessHistoryPageListDrawer } from '../../../pageBases';
import { fieldData as fieldDataWorkflowDebugCase } from '../../WorkflowDebugCase/Common/data';
import { refreshCacheAction } from '../Assist/action';
import { fieldData } from '../Common/data';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = 'b931db31bb2840178b73401d4d32d5a1';

@connect(({ workflowDebugCaseProcessHistory, schedulingControl }) => ({
  workflowDebugCaseProcessHistory,
  schedulingControl,
}))
class WorkflowDebugCaseProcessHistoryPageListDrawer extends BaseFlowCaseProcessHistoryPageListDrawer {
  reloadWhenShow = true;

  componentAuthority =
    accessWayCollection.workflowDebugCaseProcessHistory.pageList.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '测试流程审批记录列表',
      loadApiPath: 'workflowDebugCaseProcessHistory/pageList',
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

  getFlowCaseId = (o) => {
    return getValueByKey({
      data: o,
      key: fieldDataWorkflowDebugCase.workflowDebugCaseId.name,
      defaultValue: '0',
    });
  };

  getFlowCaseIdDataTarget = () => {
    return fieldData.workflowDebugCaseProcessHistoryId;
  };

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
    });
  };

  checkHasRefreshCacheAuthority = () => {
    return checkHasAuthority(
      accessWayCollection.workflowDebugCaseProcessHistory.refreshCache
        .permission,
    );
  };
}

export { WorkflowDebugCaseProcessHistoryPageListDrawer };
