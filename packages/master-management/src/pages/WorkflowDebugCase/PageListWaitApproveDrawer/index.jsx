import { connect } from 'easy-soft-dva';
import { checkHasAuthority, getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { BaseFlowCasePageListWaitApproveDrawer } from '../../../pageBases';
import { refreshCacheAction } from '../Assist/action';
import { fieldData } from '../Common/data';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = 'b341ea3ea37a45fc9b427f8010d36452';

@connect(({ workflowDebugCase, schedulingControl }) => ({
  workflowDebugCase,
  schedulingControl,
}))
class WorkflowDebugCasePageListWaitApproveDrawer extends BaseFlowCasePageListWaitApproveDrawer {
  componentAuthority =
    accessWayCollection.workflowDebugCase.pageListWaitApprove.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '待审批列表【仅与当前测试相关】',
      loadApiPath: 'workflowDebugCase/pageListWaitApprove',
    };
  }

  // eslint-disable-next-line no-unused-vars
  getFlowCaseId = (o) => {
    return getValueByKey({
      data: o,
      key: fieldData.workflowDebugCaseId.name,
    });
  };

  getFlowCaseIdName = () => {
    return fieldData.workflowDebugCaseId.name;
  };

  getFlowCaseIdDataTarget = () => {
    return fieldData.workflowDebugCaseId;
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

export { WorkflowDebugCasePageListWaitApproveDrawer };