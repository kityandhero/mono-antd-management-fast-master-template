import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../modelBuilders';
import { BaseFlowCaseNextProcessProgressDrawer } from '../../../pageBases';
import { fieldData } from '../Common/data';

const visibleFlag = '55cb9f74d7444293a86858ba49131ef1';

@connect(({ workflowCaseNextProcessProgress, schedulingControl }) => ({
  workflowCaseNextProcessProgress,
  schedulingControl,
}))
class WorkflowCaseNextProcessProgressDrawer extends BaseFlowCaseNextProcessProgressDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      loadApiPath:
        modelTypeCollection.workflowCaseNextProcessProgressTypeCollection
          .getByFlowCaseId,
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d[fieldData.workflowCaseId.name] = getValueByKey({
      data: externalData,
      key: fieldData.workflowCaseId.name,
      defaultValue: '',
    });

    return d;
  };
}

export { WorkflowCaseNextProcessProgressDrawer };
