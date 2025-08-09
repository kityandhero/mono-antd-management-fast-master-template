import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../modelBuilders';
import { BaseFlowCaseFormDocumentPreviewDrawer } from '../../../pageBases';
import { fieldData as fieldDataWorkflowCase } from '../Common/data';

const visibleFlag = '967cc7646df84949b87d51e73782c515';

@connect(
  ({
    workflowFormDesign,
    workflowCase,
    workflowCaseFormStorage,
    schedulingControl,
  }) => ({
    workflowFormDesign,
    workflowCase,
    workflowCaseFormStorage,
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
      loadApiPath: modelTypeCollection.workflowCaseTypeCollection.get,
    };
  }

  getFlowCaseId = (o) => {
    return getValueByKey({
      data: o,
      key: fieldDataWorkflowCase.workflowCaseId.name,
      defaultValue: '0',
    });
  };

  getFlowCaseIdName = () => {
    return fieldDataWorkflowCase.workflowCaseId.name;
  };
}

export { FormDocumentPreviewDrawer };
