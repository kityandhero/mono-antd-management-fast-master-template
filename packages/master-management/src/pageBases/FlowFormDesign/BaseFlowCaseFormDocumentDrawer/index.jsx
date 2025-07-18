import { Watermark } from 'antd';

import {
  convertCollection,
  getValueByKey,
  isArray,
  isEmptyArray,
  logException,
  whetherNumber,
} from 'easy-soft-utility';

import { SyntaxHighlighter } from 'antd-management-fast-component';
import {
  DocumentPrintDesigner,
  filterDocumentPrintDesignerItemConfig,
} from 'antd-management-fast-design-playground';
import { DataDrawer } from 'antd-management-fast-framework';

import { fieldDataFlowFormDesign, signetStyle } from '../../../customConfig';
import { updateDocumentSchemaAction } from '../Assist/action';

const { BaseVerticalFlexDrawer } = DataDrawer;

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

class BaseFlowCaseFormDocumentDrawer extends BaseVerticalFlexDrawer {
  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '流程表单',
      loadApiPath: 'workflowFormDesign/getByWorkflow',
      width: 1024,
      overlayButtonOpenText: '查看数据',
      overlayButtonCloseText: '关闭数据',
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

  getApproveList = () => {
    throw new Error('getApproveList need overrode to implement');
  };

  getAllApproveProcessList = () => {
    throw new Error('getAllApproveProcessList need overrode to implement');
  };

  getItems = () => {
    const { metaData } = this.state;

    const documentSchema = getValueByKey({
      data: metaData,
      key: fieldDataFlowFormDesign.documentSchema.name,
      defaultValue: {},
    });

    const { items: itemsSource } = {
      items: [],
      ...documentSchema,
    };

    const dataSchema = getValueByKey({
      data: metaData,
      key: fieldDataFlowFormDesign.dataSchema.name,
      defaultValue: '[]',
    });

    let listDataSchema = [];

    try {
      listDataSchema = JSON.parse(dataSchema);
    } catch (error) {
      logException(error);
    }

    return { items: itemsSource, formItems: listDataSchema };
  };

  saveDataSchema = (data) => {
    const { metaData } = this.state;

    const workflowFormDesignId = getValueByKey({
      data: metaData,
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
          text: '此图例显示的流程表单打印概览, 仅可查看。',
        },
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
      canDesign,
      showToolbar,
      showIndependentPrint,
      values,
      serialNumberContent,
      qRCodeImage,
      showApply,
      applyList,
      showAttention,
      attentionList,
      approveList,
      watermarkVisibility,
      watermarkText,
    } = this.getProperties();
    const { metaData } = this.state;

    const watermarkTextAdjust =
      watermarkVisibility === whetherNumber.yes ? watermarkText : '';

    const remarkSchemaList = getValueByKey({
      data: metaData,
      key: fieldDataFlowFormDesign.remarkSchemaList.name,
      convert: convertCollection.array,
    });

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

    const { items, formItems } = this.getItems();

    const allApproveProcessList = this.getAllApproveProcessList();

    return (
      <Watermark content={watermarkTextAdjust ?? ''} inherit={false}>
        <DocumentPrintDesigner
          canDesign={canDesign}
          showToolbar={showToolbar}
          showIndependentPrint={showIndependentPrint}
          title={getValueByKey({
            data: metaData,
            key: fieldDataFlowFormDesign.workflowTitle.name,
          })}
          values={isArray(values) ? values : []}
          schema={{
            general: general || {},
            title: title || {},
            items,
          }}
          formItems={formItems}
          approveList={isArray(approveList) ? approveList : []}
          allApproveProcessList={
            isArray(allApproveProcessList) ? allApproveProcessList : []
          }
          signetStyle={signetStyle}
          showApply={showApply || false}
          applyList={isArray(applyList) ? [...applyList] : []}
          showAttention={showAttention || false}
          attentionList={isArray(attentionList) ? [...attentionList] : []}
          showRemark={
            !(!isArray(remarkSchemaList) || isEmptyArray(remarkSchemaList))
          }
          remarkList={remarkSchemaList}
          serialNumberTitle="审批流水号: "
          serialNumberContent={serialNumberContent}
          qRCodeImage={qRCodeImage}
          onSave={(data) => {
            this.saveDataSchema(data);
          }}
        />
      </Watermark>
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

    const { items, formItems } = this.getItems();

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

export { BaseFlowCaseFormDocumentDrawer };
