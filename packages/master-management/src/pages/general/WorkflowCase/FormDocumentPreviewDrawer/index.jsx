import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';
import { BaseFlowCaseFormDocumentPreviewDrawer } from '../../../../pageBases';
import { getChainAction } from '../Assist/action';
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

  getFlowCaseId = () => {
    const { externalData } = this.state;

    return getValueByKey({
      data: externalData,
      key: fieldDataWorkflowCase.workflowCaseId.name,
    });
  };

  supplementLoadRequestParams = (o) => {
    const d = { ...o };
    const { externalData } = this.props;

    d[fieldDataWorkflowCase.workflowCaseId.name] =
      this.getFlowCaseId(externalData);

    return d;
  };

  loadChainApprove = () => {
    const { externalData } = this.props;

    getChainAction({
      target: this,
      handleData: {
        workflowCaseId: getValueByKey({
          data: externalData,
          key: fieldDataWorkflowCase.workflowCaseId.name,
        }),
      },
      successCallback: ({ target, remoteData }) => {
        const listChainApprove = getValueByKey({
          data: remoteData,
          key: fieldDataWorkflowCase.listChainApprove.name,
          convert: convertCollection.array,
        });

        target.setState({
          listChainApprove: listChainApprove,
        });
      },
    });
  };
}

export { FormDocumentPreviewDrawer };
