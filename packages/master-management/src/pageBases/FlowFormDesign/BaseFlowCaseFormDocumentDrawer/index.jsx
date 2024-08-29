import {
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  getValueByKey,
  isArray,
  isEmptyArray,
  logException,
} from 'easy-soft-utility';

import { DocumentPrintDesigner } from 'antd-management-fast-design-playground';
import { DataDrawer } from 'antd-management-fast-framework';

import { fieldDataFlowFormDesign, signetStyle } from '../../../customConfig';
import { updateDocumentSchemaAction } from '../Assist/action';

const { BaseVerticalFlexDrawer } = DataDrawer;

const defaultProperties = {
  canDesign: false,
  approveList: [],
  values: [],
};

class BaseFlowCaseFormDocumentDrawer extends BaseVerticalFlexDrawer {
  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '流程表单',
      loadApiPath: 'workflowFormDesign/getByWorkflow',
      width: 1024,
    };
  }

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

  getAllApproveProcessList = () => {
    throw new Error('getAllApproveProcessList need overrode to implement');
  };

  saveDataSchema = (data) => {
    const { metaData } = this.state;

    const workflowFormDesignId = getValueByKey({
      data: metaData,
      key: fieldDataFlowFormDesign.workflowFormDesignId.name,
    });

    updateDocumentSchemaAction({
      target: this,
      handleData: {
        workflowFormDesignId: workflowFormDesignId || '',
        documentSchema: JSON.stringify(data),
      },
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  establishHelpConfig = () => {
    const { canDesign } = {
      ...defaultProperties,
      ...this.props,
    };

    return {
      title: '操作提示',
      list: [
        {
          text: '此图例显示的流程表单打印概览, 仅可查看。',
        },
        {
          text: '设置为非独占行的单元, 若前一个单元为独占, 则此单元也将转换为行布局, 宽度设置将无效。',
        },
        {
          text: '打印预览需要关闭设计模式。',
        },
        canDesign
          ? {
              text: '审批节点样例仅在设计时用于占位进行效果展示, 实际表单将呈现真实审批节点。',
            }
          : null,
      ],
    };
  };

  establishPresetContentContainorInnerTopStyle = () => {
    return {
      backgroundColor: '#ccc',
    };
  };

  renderPresetContentContainorInnerTop = () => {
    const { canDesign, values, approveList } = {
      ...defaultProperties,
      ...this.props,
    };
    const { metaData } = this.state;

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

    const { general, items: itemsSource } = {
      general: {},
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

    let items = [];

    if (
      isArray(itemsSource) &&
      !isEmptyArray(itemsSource) &&
      isArray(listDataSchema)
    ) {
      for (const o of listDataSchema) {
        const { name } = { name: '', ...o };

        if (checkStringIsNullOrWhiteSpace(name)) {
          continue;
        }

        let config = {};

        for (const one of itemsSource) {
          const { name: nameOne } = { name: '', ...one };

          if (nameOne === name) {
            config = one;

            break;
          }
        }

        items.push({ ...config, ...o });
      }
    } else {
      items = listDataSchema;
    }

    const allApproveProcessList = this.getAllApproveProcessList();

    return (
      <DocumentPrintDesigner
        canDesign={canDesign}
        title={getValueByKey({
          data: metaData,
          key: fieldDataFlowFormDesign.workflowName.name,
        })}
        values={isArray(values) ? values : []}
        schema={{
          general: general || {},
          items,
        }}
        approveList={isArray(approveList) ? approveList : []}
        allApproveProcessList={
          isArray(allApproveProcessList) ? allApproveProcessList : []
        }
        signetStyle={signetStyle}
        remarkTitle="备注"
        remarkName="remark"
        remarkList={remarkSchemaList}
        onSave={(data) => {
          this.saveDataSchema(data);
        }}
      />
    );
  };
}

export { BaseFlowCaseFormDocumentDrawer };