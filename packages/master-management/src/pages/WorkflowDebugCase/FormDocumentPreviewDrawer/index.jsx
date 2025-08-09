import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../modelBuilders';
import { BaseFlowCaseFormDocumentPreviewDrawer } from '../../../pageBases';
import { fieldData as fieldDataWorkflowDebugCase } from '../Common/data';

const visibleFlag = '3ca020a324fa439e8de82626b5bd31a5';

@connect(
  ({
    workflowFormDesign,
    workflowDebugCase,
    workflowDebugCaseFormStorage,
    schedulingControl,
  }) => ({
    workflowFormDesign,
    workflowDebugCase,
    workflowDebugCaseFormStorage,
    schedulingControl,
  }),
)
class FormDocumentPreviewDrawer extends BaseFlowCaseFormDocumentPreviewDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      loadApiPath: modelTypeCollection.workflowDebugCaseTypeCollection.get,
    };
  }

  getFlowCaseId = (o) => {
    return getValueByKey({
      data: o,
      key: fieldDataWorkflowDebugCase.workflowDebugCaseId.name,
      defaultValue: '0',
    });
  };

  getFlowCaseIdName = () => {
    return fieldDataWorkflowDebugCase.workflowDebugCaseId.name;
  };
}

export { FormDocumentPreviewDrawer };
