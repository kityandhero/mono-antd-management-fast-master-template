import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../modelBuilders';
import { BaseFlowCaseNextProcessProgressDrawer } from '../../../pageBases';
import { fieldData } from '../Common/data';

const visibleFlag = '047df2db06fd49ccaad430656c03139a';

@connect(({ workflowDebugCaseNextProcessProgress, schedulingControl }) => ({
  workflowDebugCaseNextProcessProgress,
  schedulingControl,
}))
class WorkflowDebugCaseNextProcessProgressDrawer extends BaseFlowCaseNextProcessProgressDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      loadApiPath:
        modelTypeCollection.workflowDebugCaseNextProcessProgressTypeCollection
          .getByFlowCaseId,
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d[fieldData.workflowDebugCaseId.name] = getValueByKey({
      data: externalData,
      key: fieldData.workflowDebugCaseId.name,
      defaultValue: '',
    });

    return d;
  };
}

export { WorkflowDebugCaseNextProcessProgressDrawer };
