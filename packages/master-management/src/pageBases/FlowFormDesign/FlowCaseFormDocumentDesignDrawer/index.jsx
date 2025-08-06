import { connect } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  getValueByKey,
  isArray,
  isEmptyArray,
  logConsole,
  logException,
  whetherNumber,
} from 'easy-soft-utility';

import { extraBuildType } from 'antd-management-fast-common';
import { iconBuilder, SyntaxHighlighter } from 'antd-management-fast-component';
import {
  DocumentPrintDesigner,
  filterDocumentPrintDesignerItemConfig,
  nodeApply,
  nodeAttention,
} from 'antd-management-fast-design-playground';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import {
  emptySignet,
  fieldDataFlowFormDesign,
  signetStyle,
  simpleQRCode,
} from '../../../customConfig';
import { modelTypeCollection } from '../../../modelBuilders';
import {
  getSimpleApplicantConfig,
  getSimpleAttentionConfig,
} from '../../../pages/Workflow/Assist/tools';
import { getChainByWorkflowAction } from '../../../pages/WorkflowDebugCase/Assist/action';
import { fieldData as fieldDataWorkflowDebugCase } from '../../../pages/WorkflowDebugCase/Common/data';
import { adjustFlowCaseDataToState } from '../../FlowCase';
import { updateDocumentSchemaAction } from '../Assist/action';

const { BaseVerticalFlexDrawer } = DataDrawer;

const dataModeCollection = {
  staticSampleData: 'staticSampleData',
  dynamicData: 'dynamicData',
};

const visibleFlag = 'fb97326493c249eebea99f19b937c05f';

const defaultProperties = {
  canDesign: false,
  showToolbar: true,
  showIndependentPrint: false,
  showApply: false,
  serialNumber: '',
  qRCodeImage: '',
  applyList: [],
  showAttention: false,
  attentionList: [],
  approveList: [],
  values: [],
  watermarkVisibility: false,
  watermarkText: '',
};

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
class FlowCaseFormDocumentDesignDrawer extends BaseVerticalFlexDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '流程表单',
      loadApiPath:
        modelTypeCollection.workflowDebugCaseTypeCollection.getByWorkflow,
      width: 1024,
      overlayButtonOpenText: '查看数据',
      overlayButtonCloseText: '关闭数据',
      dataMode: dataModeCollection.staticSampleData,
      workflow: null,
      workflowFormDesign: null,
      listChainApprove: [],
      listFormStorage: [],
      listProcessHistory: [],
      listApprove: [],
    };
  }

  getProperties = () => {
    return {
      ...defaultProperties,
      ...this.props,
    };
  };

  supplementLoadRequestParams = (o) => {
    return {
      ...this.supplementRequestParams(o),
    };
  };

  supplementRequestParams = (o) => {
    const d = { ...o };
    const { externalData } = this.state;

    d[fieldDataFlowFormDesign.workflowId.name] = getValueByKey({
      data: externalData,
      key: fieldDataFlowFormDesign.workflowId.name,
    });

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

  setStaticSampleData = () => {
    this.setState({
      dataMode: dataModeCollection.staticSampleData,
    });
  };

  setDynamicData = () => {
    this.setState({
      dataMode: dataModeCollection.dynamicData,
    });
  };

  getGeneralConfig = () => {
    const { workflowFormDesign, listChainApprove } = this.state;

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
    const { dataMode, listFormStorage } = this.state;

    if (dataMode === dataModeCollection.staticSampleData) {
      return {
        values: [],
      };
    }

    return {
      values: listFormStorage,
    };
  };

  getApproveConfig = () => {
    const { dataMode, listApprove } = this.state;

    if (dataMode === dataModeCollection.staticSampleData) {
      return {
        approveList: [],
      };
    }

    return {
      approveList: listApprove,
    };
  };

  getApplicantConfig = () => {
    const { metaData, dataMode, workflow } = this.state;

    if (dataMode === dataModeCollection.staticSampleData) {
      return getSimpleApplicantConfig(workflow);
    }

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
    const { metaData, dataMode, workflow } = this.state;

    if (dataMode === dataModeCollection.staticSampleData) {
      return getSimpleAttentionConfig(workflow);
    }

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
    const { metaData, dataMode } = this.state;

    if (dataMode === dataModeCollection.staticSampleData) {
      return {
        serialNumberTitle: '审批流水号: ',
        serialNumberContent: '1836370789809655808',
      };
    }

    const workflowDebugCaseId = getValueByKey({
      data: metaData,
      key: fieldDataWorkflowDebugCase.workflowDebugCaseId.name,
      convert: convertCollection.string,
    });

    return {
      serialNumberTitle: '审批流水号: ',
      serialNumberContent: workflowDebugCaseId,
    };
  };

  getQRCodeConfig = () => {
    const { metaData, dataMode } = this.state;

    if (dataMode === dataModeCollection.staticSampleData) {
      return {
        qRCodeImage: simpleQRCode,
      };
    }

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

  establishExtraActionConfig = () => {
    const { dataMode } = this.state;

    return {
      list: [
        {
          buildType: extraBuildType.generalExtraButton,
          icon: iconBuilder.eye(),
          text: '静态示例数据',
          disabled:
            this.checkInProgress() ||
            dataMode === dataModeCollection.staticSampleData,
          handleClick: this.setStaticSampleData,
        },
        {
          buildType: extraBuildType.generalExtraButton,
          icon: iconBuilder.eye(),
          text: '动态测试数据',
          disabled:
            this.checkInProgress() ||
            dataMode === dataModeCollection.dynamicData,
          handleClick: this.setDynamicData,
        },
      ],
    };
  };

  establishHelpConfig = () => {
    const { canDesign } = this.getProperties();

    const list = [];

    if (canDesign) {
      list.push({
        text: '申请人、经办人以及审批节点样例仅在设计时用于占位进行效果展示, 实际表单将呈现真实审批节点。',
      });
    }

    return {
      title: '操作提示',
      list: [
        {
          text: '设置为非独占行的单元, 若前一个单元为独占, 则此单元也将转换为行布局, 宽度设置将无效; 设置为金额显示模式的格子，仅在可以转换的情况下才能用金额显示。',
        },
        {
          text: '打印预览需要关闭设计模式。',
        },
        ...list,
      ],
    };
  };

  establishPresetContentContainorInnerTopStyle = () => {
    return {
      backgroundColor: '#ccc',
    };
  };

  renderPresetContentContainorInnerTop = () => {
    const {
      workflowTitle,
      general,
      title,
      items,
      formItems,
      allApproveProcessList,
      showRemark,
      remarkSchemaList,
    } = this.getGeneralConfig();

    const { values } = this.getValueConfig();

    const { approveList } = this.getApproveConfig();

    const { showApply, listApply } = this.getApplicantConfig();

    const { showAttention, listAttention } = this.getAttentionConfig();

    const { serialNumberTitle, serialNumberContent } =
      this.getSerialNumberConfig();

    const { qRCodeImage } = this.getQRCodeConfig();

    logConsole({ showRemark, remarkSchemaList });

    return (
      <DocumentPrintDesigner
        canDesign
        showToolbar
        showIndependentPrint={false}
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
        onSave={(data) => {
          this.saveDataSchema(data);
        }}
      />
    );
  };

  renderOverlayContent = () => {
    const { values } = this.getProperties();
    const { metaData } = this.state;

    const documentSchema = getValueByKey({
      data: metaData,
      key: fieldDataFlowFormDesign.documentSchema.name,
      defaultValue: {},
    });

    const { general, title } = {
      general: {},
      title: {},
      ...documentSchema,
    };

    const { items, formItems } = this.getGeneralConfig();

    const remarkSchemaList = getValueByKey({
      data: metaData,
      key: fieldDataFlowFormDesign.remarkSchemaList.name,
      convert: convertCollection.array,
    });

    const data = {
      documentSchema: {
        general,
        title,
        items: isArray(items)
          ? items.map((o) => filterDocumentPrintDesignerItemConfig(o))
          : [],
      },
      formItems,
      values: isArray(values) ? values : [],
      remarkSchemaList,
    };

    return (
      <div
        style={{
          width: '90%',
          height: '90%',
          background: '#fff',
          padding: '16px 16px 26px 16px',
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      >
        <SyntaxHighlighter
          language="js"
          value={JSON.stringify(data, null, 2)}
          other={{ showLineNumbers: true, wrapLines: true }}
          style={{
            height: '100%',
            marginLeft: '0px',
            marginRight: '0px',
          }}
        />
      </div>
    );
  };
}

export { FlowCaseFormDocumentDesignDrawer };
