import { Watermark } from 'antd';

import {
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  getValueByKey,
  isArray,
  isEmptyArray,
  logException,
  whetherNumber,
} from 'easy-soft-utility';

import { emptyImage } from 'antd-management-fast-common';
import {
  DocumentPrintDesigner,
  nodeApply,
  nodeAttention,
} from 'antd-management-fast-design-playground';
import { DataDrawer } from 'antd-management-fast-framework';

import {
  emptySignet,
  fieldDataFlowCase,
  fieldDataFlowFormDesign,
  flowCaseStatusCollection,
  signetStyle,
} from '../../../customConfig';
import { getChainByWorkflowAction } from '../../../pages/WorkflowDebugCase/Assist/action';
import { fieldData as fieldDataWorkflowDebugCase } from '../../../pages/WorkflowDebugCase/Common/data';
import { adjustFlowCaseDataToState, SealRefuse } from '../../FlowCase';
import { updateDocumentSchemaAction } from '../Assist/action';

const { BaseVerticalFlexDrawer } = DataDrawer;

const defaultProperties = {};

class BaseFlowCaseFormDocumentPreviewDrawer extends BaseVerticalFlexDrawer {
  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '流程表单文档预览',
      loadApiPath: '',
      width: 1024,
      workflow: null,
      workflowFormDesign: null,
      listChainApprove: [],
      listFormStorage: [],
      listProcessHistory: [],
      listApprove: [],
    };
  }

  getFlowCaseId = () => {
    throw new Error('getFlowCaseId need overrode to implement');
  };

  getFlowCaseIdName = () => {
    throw new Error('getFlowCaseIdName need overrode to implement');
  };

  getProperties = () => {
    return {
      ...defaultProperties,
      ...this.props,
    };
  };

  supplementLoadRequestParams = (o) => {
    const d = { ...o };
    const { externalData } = this.props;

    d[this.getFlowCaseIdName()] = this.getFlowCaseId(externalData);

    return d;
  };

  doOtherAfterLoadSuccess = ({
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const approveBatchNumber = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowDebugCase.approveBatchNumber.name,
      defaultValue: 0,
      convert: convertCollection.number,
    });

    const listFormStorage = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowDebugCase.listFormStorage.name,
      convert: convertCollection.array,
      defaultValue: [],
    });

    const workflow = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowDebugCase.workflow.name,
      defaultValue: null,
    });

    const workflowFormDesign = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowDebugCase.workflowFormDesign.name,
      defaultValue: null,
    });

    const { listApprove, listProcessHistory } = adjustFlowCaseDataToState(
      metaData,
      {
        approveBatchNumber,
        whetherFilterBatchNumber: true,
      },
    );

    this.setState({
      workflow,
      workflowFormDesign,
      listFormStorage: [...listFormStorage],
      listProcessHistory: [...listProcessHistory],
      listApprove: [...listApprove],
    });
  };

  loadChainApprove = () => {
    const { externalData } = this.props;

    getChainByWorkflowAction({
      target: this,
      handleData: {
        workflowId: getValueByKey({
          data: externalData,
          key: fieldDataWorkflowDebugCase.workflowId.name,
        }),
      },
      successCallback: ({ target, remoteData }) => {
        const listChainApprove = getValueByKey({
          data: remoteData,
          key: fieldDataWorkflowDebugCase.listChainApprove.name,
          convert: convertCollection.array,
        });

        target.setState({
          listChainApprove: listChainApprove,
        });
      },
    });
  };

  reloadChainApprove = () => {
    this.loadChainApprove();
  };

  executeAfterDoOtherWhenChangeVisibleToShow = () => {
    this.loadChainApprove();
  };

  executeAfterDoOtherWhenChangeVisibleToHide = () => {
    this.setState({
      workflow: null,
      workflowFormDesign: null,
      listChainApprove: [],
      listFormStorage: [],
      listProcessHistory: [],
      listApprove: [],
    });
  };

  getGeneralConfig = () => {
    const { metaData, workflowFormDesign, listChainApprove } = this.state;

    const watermarkVisibility = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.watermarkVisibility.name,
      convert: convertCollection.number,
      defaultValue: whetherNumber.no,
    });

    const watermarkText =
      watermarkVisibility === whetherNumber.yes
        ? getValueByKey({
            data: metaData,
            key: fieldDataFlowCase.watermarkText.name,
            convert: convertCollection.string,
            defaultValue: '',
          })
        : '';

    const sealRefuseVisibility = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.sealRefuseVisibility.name,
      convert: convertCollection.number,
      defaultValue: whetherNumber.no,
    });

    const sealRefuseImage =
      sealRefuseVisibility === whetherNumber.yes
        ? getValueByKey({
            data: metaData,
            key: fieldDataFlowCase.sealRefuseImage.name,
            convert: convertCollection.string,
            defaultValue: '',
          })
        : '';

    const documentSchema = getValueByKey({
      data: workflowFormDesign,
      key: fieldDataFlowFormDesign.documentSchema.name,
      defaultValue: {},
    });

    const remarkSchemaList = getValueByKey({
      data: workflowFormDesign,
      key: fieldDataFlowFormDesign.remarkSchemaList.name,
      convert: convertCollection.array,
    });

    const workflowTitle = getValueByKey({
      data: workflowFormDesign,
      key: fieldDataFlowFormDesign.workflowTitle.name,
      defaultValue: '',
    });

    const {
      general,
      title,
      items: itemsSource,
    } = {
      general: {},
      title: {},
      items: [],
      ...documentSchema,
    };

    const dataSchema = getValueByKey({
      data: workflowFormDesign,
      key: fieldDataFlowFormDesign.dataSchema.name,
      defaultValue: '[]',
    });

    let listDataSchema = [];

    try {
      listDataSchema = JSON.parse(dataSchema);
    } catch (error) {
      logException(error);
    }

    const listChainApproveAdjust = isArray(listChainApprove)
      ? listChainApprove.map((o) => {
          const { name } = { name: '', ...o };

          return {
            title: name,
            ...o,
          };
        })
      : [];

    return {
      watermarkText,
      sealRefuseVisibility,
      sealRefuseImage,
      workflowTitle,
      general,
      title,
      items: itemsSource,
      formItems: listDataSchema,
      allApproveProcessList: listChainApproveAdjust,
      remarkSchemaList,
      showRemark: !(
        !isArray(remarkSchemaList) || isEmptyArray(remarkSchemaList)
      ),
    };
  };

  getValueConfig = () => {
    const { listFormStorage } = this.state;

    return {
      values: listFormStorage,
    };
  };

  getApproveConfig = () => {
    const { listApprove } = this.state;

    return {
      approveList: listApprove,
    };
  };

  getApplicantConfig = () => {
    const { metaData } = this.state;

    const applicantSignSwitch = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowDebugCase.applicantSignSwitch.name,
      convert: convertCollection.number,
    });

    const applicantStatementTitle = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowDebugCase.applicantStatementTitle.name,
      convert: convertCollection.string,
    });

    const applicantStatementContent = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowDebugCase.applicantStatementContent.name,
      convert: convertCollection.string,
    });

    const applicantUserSignet = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowDebugCase.applicantUserSignet.name,
      convert: convertCollection.string,
    });

    const listApply = [
      {
        ...nodeApply,
        title: applicantStatementTitle,
        note: applicantStatementContent,
        ...(checkStringIsNullOrWhiteSpace(applicantUserSignet)
          ? {
              signet: emptySignet,
            }
          : {
              signet: applicantUserSignet,
            }),
        time: getValueByKey({
          data: metaData,
          key: fieldDataWorkflowDebugCase.applicantTime.name,
          convert: convertCollection.string,
        }),
      },
    ];

    return {
      showApply: applicantSignSwitch === whetherNumber.yes,
      listApply,
    };
  };

  getAttentionConfig = () => {
    const { metaData } = this.state;

    const attentionSignSwitch = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowDebugCase.attentionSignSwitch.name,
      convert: convertCollection.number,
    });

    const attentionStatementTitle = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowDebugCase.attentionStatementTitle.name,
      convert: convertCollection.string,
    });

    const attentionStatementContent = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowDebugCase.attentionStatementContent.name,
      convert: convertCollection.string,
    });

    const attentionUserSignet = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowDebugCase.attentionUserSignet.name,
      convert: convertCollection.string,
    });

    const listAttention = [
      {
        ...nodeAttention,
        title: attentionStatementTitle,
        note: attentionStatementContent,
        ...(checkStringIsNullOrWhiteSpace(attentionUserSignet)
          ? {
              signet: emptySignet,
            }
          : {
              signet: attentionUserSignet,
            }),
        time: getValueByKey({
          data: metaData,
          key: fieldDataWorkflowDebugCase.attentionTime.name,
          convert: convertCollection.string,
        }),
      },
    ];

    return {
      showAttention: attentionSignSwitch === whetherNumber.yes,
      listAttention,
    };
  };

  getApproveList = () => {
    throw new Error('getApproveList need overrode to implement');
  };

  getSerialNumberConfig = () => {
    const { externalData } = this.props;

    return {
      serialNumberTitle: '审批流水号: ',
      serialNumberContent: this.getFlowCaseId(externalData),
    };
  };

  getQRCodeConfig = () => {
    const { metaData } = this.state;

    const qRCodeImage = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowDebugCase.qRCodeImage.name,
      convert: convertCollection.string,
    });

    return {
      qRCodeImage,
    };
  };

  saveDataSchema = (data) => {
    const { workflowFormDesign } = this.state;

    const workflowFormDesignId = getValueByKey({
      data: workflowFormDesign,
      key: fieldDataFlowFormDesign.workflowFormDesignId.name,
    });

    const { general, title, items } = {
      general: {},
      title: {},
      items: [],
      ...data,
    };

    delete general['general'];
    delete general['title'];
    delete general['items'];

    const o = {};

    o[fieldDataFlowFormDesign.workflowFormDesignId.name] =
      workflowFormDesignId || '';

    o[fieldDataFlowFormDesign.documentGeneralSchema.name] =
      JSON.stringify(general);

    o[fieldDataFlowFormDesign.documentTitleSchema.name] = JSON.stringify(title);

    o[fieldDataFlowFormDesign.documentItemSchema.name] = JSON.stringify(items);

    updateDocumentSchemaAction({
      target: this,
      handleData: o,
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  establishHelpConfig = () => {
    const list = [
      {
        text: '此图例显示的流程表单打印概览, 仅可查看。',
      },
    ];

    return {
      title: '操作提示',
      list: [...list],
    };
  };

  establishPresetContentContainorInnerTopStyle = () => {
    return {
      backgroundColor: '#ccc',
    };
  };

  renderPresetContentContainorInnerTop = () => {
    const {
      metaData,
      workflowTitle,
      watermarkText,
      sealRefuseVisibility,
      sealRefuseImage,
      general,
      title,
      items,
      formItems,
      allApproveProcessList,
      showRemark,
      remarkSchemaList,
    } = this.getGeneralConfig();

    const status = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowDebugCase.status.name,
      convert: convertCollection.number,
    });

    const { values } = this.getValueConfig();

    const { approveList } = this.getApproveConfig();

    const { showApply, listApply } = this.getApplicantConfig();

    const { showAttention, listAttention } = this.getAttentionConfig();

    const { serialNumberTitle, serialNumberContent } =
      this.getSerialNumberConfig();

    const { qRCodeImage } = this.getQRCodeConfig();

    return (
      <Watermark content={watermarkText} inherit={false}>
        {status === flowCaseStatusCollection.refuse ? (
          <SealRefuse
            hidden={sealRefuseVisibility !== whetherNumber.yes}
            image={sealRefuseImage ?? emptyImage}
          />
        ) : null}

        <DocumentPrintDesigner
          canDesign={false}
          showToolbar={false}
          showIndependentPrint
          title={workflowTitle}
          values={isArray(values) ? values : []}
          schema={{
            general: general || {},
            title: title || {},
            items,
          }}
          formItems={formItems}
          approveList={approveList}
          allApproveProcessList={allApproveProcessList}
          signetStyle={signetStyle}
          showApply={showApply || false}
          applyList={listApply}
          showAttention={showAttention || false}
          attentionList={listAttention}
          showRemark={showRemark}
          remarkList={remarkSchemaList}
          serialNumberTitle={serialNumberTitle}
          serialNumberContent={serialNumberContent}
          qRCodeImage={qRCodeImage}
        />
      </Watermark>
    );
  };
}

export { BaseFlowCaseFormDocumentPreviewDrawer };
