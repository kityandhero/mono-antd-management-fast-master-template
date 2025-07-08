/* eslint-disable no-unused-vars */
import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  filter,
  getValueByKey,
  toString,
  zeroString,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { buildButton, iconBuilder } from 'antd-management-fast-component';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import {
  accessWayCollection,
  flowBranchConditionItemTargetComparisonModelCollection,
  flowBranchConditionItemTargetTypeCollection,
} from '../../../customConfig';
import {
  renderFormFlowBranchConditionItemTargetComparisonModeSelect,
  renderFormFlowBranchConditionItemTargetTypeSelect,
} from '../../../customSpecialComponents';
import { modelTypeCollection } from '../../../modelBuilders';
import { BaseFlowCaseSubmitApprovalModal } from '../../../pageBases';
import { fieldData as fieldDataWorkflowDebugCase } from '../Common/data';

const visibleFlag = '661bfdcd62084d10b754bf0c83cb639f';

@connect(({ workflowDebugCase, schedulingControl }) => ({
  workflowDebugCase,
  schedulingControl,
}))
class SubmitApprovalModal extends BaseFlowCaseSubmitApprovalModal {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      loadApiPath: modelTypeCollection.workflowDebugCaseTypeCollection.get,
      submitApiPath:
        modelTypeCollection.workflowDebugCaseTypeCollection.submitApproval,
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

  checkHasSingleListNextNodeApproverAuthority = () => {
    return checkHasAuthority(
      accessWayCollection.workflowDebugCase.singleListNextNodeApprover
        .permission,
    );
  };
}

export { SubmitApprovalModal };
