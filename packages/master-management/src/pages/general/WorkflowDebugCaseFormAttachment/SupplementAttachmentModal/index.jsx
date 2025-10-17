import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { BaseSupplementAttachmentModal } from '../../../../pageBases';
import { fieldData as fieldDataWorkflowDebugCase } from '../../WorkflowDebugCase/Common/data';
import { supplementAction } from '../Assist/action';

const visibleFlag = '0d44d622b5d5470ea3233085ee40a8e1';

@connect(({ workflowDebugCaseFormAttachment, schedulingControl }) => ({
  workflowDebugCaseFormAttachment,
  schedulingControl,
}))
class SupplementAttachmentModal extends BaseSupplementAttachmentModal {
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
    };
  }

  getFlowCaseId = () => {
    const { externalData } = this.state;

    return getValueByKey({
      data: externalData,
      key: fieldDataWorkflowDebugCase.workflowDebugCaseId.name,
      defaultValue: '0',
    });
  };

  supplement = (data) => {
    supplementAction(data);
  };

  closeAttachmentModal = () => {
    SupplementAttachmentModal.close();
  };

  getUploadAction = () => `/workflowDebugCaseFormAttachment/uploadFile`;
}

export { SupplementAttachmentModal };
