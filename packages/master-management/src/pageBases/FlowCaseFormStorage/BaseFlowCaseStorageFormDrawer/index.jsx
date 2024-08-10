import { Empty } from 'antd';

import {
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  filter,
  getValueByKey,
  isArray,
  isEmptyArray,
  logException,
  showSimpleInfoMessage,
  whetherNumber,
} from 'easy-soft-utility';

import { extraBuildType } from 'antd-management-fast-common';
import { CenterBox, iconBuilder } from 'antd-management-fast-component';
import {
  DocumentPrintDesigner,
  FileViewer,
  SchemaDisplayer,
} from 'antd-management-fast-design-playground';
import { DataDrawer } from 'antd-management-fast-framework';

import {
  accessWayCollection,
  emptySignet,
  fieldDataFlowCase,
  fieldDataFlowCaseFormAttachment,
  fieldDataFlowFormDesign,
  flowApproveActionModeCollection,
  flowCaseStatusCollection,
} from '../../../customConfig';

const { BaseVerticalFlexDrawer } = DataDrawer;

function buildFormInitialValues(listFormStorage) {
  const data = {};

  if (isArray(listFormStorage) && !isEmptyArray(listFormStorage)) {
    for (const o of listFormStorage) {
      try {
        data[o.name] = JSON.parse(o.value);
      } catch {
        data[o.name] = o.value;
      }
    }
  }

  return data;
}

class BaseFlowCaseStorageFormDrawer extends BaseVerticalFlexDrawer {
  useFormWrapper = false;

  componentAuthority =
    accessWayCollection.workflowCaseFormStorage.get.permission;

  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '工作流测试实例表单',
      loadApiPath: 'workflowDebugCase/get',
      submitApiPath: 'workflowDebugCase/submitForm',
      width: 1024,
      workflowId: null,
      listChainApprove: [],
      listApprove: [],
      listProcessHistory: [],
      useDocumentDisplay: true,
    };
  }

  loadChainApprove = () => {};

  executeAfterDoOtherWhenChangeVisibleToShow = () => {
    this.loadChainApprove();
  };

  executeAfterDoOtherWhenChangeVisibleToHide = () => {
    this.setState({
      listChainApprove: [],
      listApprove: [],
      listProcessHistory: [],
      useDocumentDisplay: true,
    });
  };

  supplementLoadRequestParams = (o) => {
    return {
      ...this.supplementRequestParams(o),
    };
  };

  supplementRequestParams = (o) => o;

  supplementSubmitRequestParams = (o) => {
    return {
      ...o,
      ...this.supplementRequestParams(o),
    };
  };

  doOtherAfterLoadSuccess = ({ metaData }) => {
    const { listProcessHistory: listProcessHistorySource } = {
      listProcessHistory: [],
      ...metaData,
    };

    const flowCaseStatus = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.status.name,
      defaultValue: {},
    });

    const listApprove = filter(listProcessHistorySource, (one) => {
      const { approveActionMode } = {
        approveActionMode: 0,
        ...one,
      };

      return (
        approveActionMode === flowApproveActionModeCollection.manualControl
      );
    }).map((o) => {
      const {
        note,
        approveWorkflowNodeName,
        approveUserName,
        approveUserSignet,
        createTime,
      } = {
        approveWorkflowNodeName: '',
        note: '',
        approveUserName: '张三',
        approveUserSignet: '',
        createTime: '',
        ...o,
      };

      return {
        ...o,
        title: approveWorkflowNodeName,
        note: note || '未填写',
        name: approveUserName,
        signet: approveUserSignet || emptySignet,
        time: createTime,
      };
    });

    this.setState({
      useDocumentDisplay: checkInCollection(
        [
          flowCaseStatusCollection.submitApproval,
          flowCaseStatusCollection.inApprovalProcess,
          flowCaseStatusCollection.success,
          flowCaseStatusCollection.refuse,
        ],
        flowCaseStatus,
      ),
      listProcessHistory: listProcessHistorySource,
      listApprove: [...listApprove],
    });
  };

  // eslint-disable-next-line no-unused-vars
  removeAttachment = (o) => {
    throw new Error('removeAttachment need overrode to implement');
  };

  saveForm = (o) => {
    const that = this;

    that.execSubmitApi({
      values: o,
      successCallback: () => {
        that.doOtherAfterSaveForm();
      },
    });
  };

  doOtherAfterSaveForm = () => {};

  showAddAttachmentModal = () => {
    throw new Error('showAddAttachmentModal need overrode to implement');
  };

  afterAddAttachmentModalClose = () => {
    this.reloadData({});
  };

  establishExtraActionConfig = () => {
    const { useDocumentDisplay } = this.state;

    const that = this;

    return {
      list: [
        {
          buildType: extraBuildType.generalExtraButton,
          icon: iconBuilder.read(),
          text: '文档模式',
          disabled: useDocumentDisplay,
          handleClick: () => {
            that.setState({
              useDocumentDisplay: true,
            });
          },
        },
        {
          buildType: extraBuildType.generalExtraButton,
          icon: iconBuilder.form(),
          text: '表单模式',
          disabled: !useDocumentDisplay,
          handleClick: () => {
            that.setState({
              useDocumentDisplay: false,
            });
          },
        },
      ],
    };
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '提交表单仅保存填充的信息。',
        },
        {
          text: '附件上传或删除后立即生效, 无需通过提交表单进行保存。',
        },
        {
          text: '处于审批中或审批已完成的流程实例表单不可编辑。',
        },
      ],
    };
  };

  renderFlowCaseFormDocumentDisplay = () => {
    const { metaData, listApprove, listChainApprove } = this.state;

    const { workflowFormDesign, listFormStorage, listAttachment } = {
      workflowFormDesign: {},
      listFormStorage: [],
      listAttachment: [],
      ...metaData,
    };

    const remarkSchemaList = getValueByKey({
      data: workflowFormDesign,
      key: fieldDataFlowFormDesign.remarkSchemaList.name,
      convert: convertCollection.array,
    });

    const documentSchema = getValueByKey({
      data: workflowFormDesign,
      key: fieldDataFlowFormDesign.documentSchema.name,
      defaultValue: {},
    });

    const { general, items: itemsSource } = {
      general: {},
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

    const listChainApproveAdjust = isArray(listChainApprove)
      ? listChainApprove.map((o) => {
          const { name } = { name: '', ...o };

          return {
            title: name,
            ...o,
          };
        })
      : [];

    return (
      <>
        <DocumentPrintDesigner
          canDesign={false}
          showToolbar={false}
          title={getValueByKey({
            data: metaData,
            key: fieldDataFlowCase.workflowName.name,
          })}
          values={isArray(listFormStorage) ? listFormStorage : []}
          schema={{
            general: general || {},
            items,
          }}
          approveList={isArray(listApprove) ? listApprove : []}
          allApproveProcessList={listChainApproveAdjust}
          remarkTitle="备注"
          remarkName="remark"
          remarkList={remarkSchemaList}
        />

        <CenterBox>
          <div
            style={{
              paddingTop: '10px',
              paddingLeft: '60px',
              paddingRight: '60px',
              width: '920px',
            }}
          >
            <FileViewer
              canUpload
              canRemove
              list={listAttachment}
              dataTransfer={(o) => {
                return {
                  ...o,
                  name: getValueByKey({
                    data: o,
                    key: fieldDataFlowCaseFormAttachment.alias.name,
                  }),
                  url: getValueByKey({
                    data: o,
                    key: fieldDataFlowCaseFormAttachment.url.name,
                  }),
                };
              }}
              onUploadButtonClick={() => {
                this.showAddAttachmentModal();
              }}
              onItemClick={() => {
                showSimpleInfoMessage('示例: 点击预览按钮');
              }}
              onRemove={(o) => {
                this.removeAttachment(o);
              }}
            />
          </div>
        </CenterBox>
      </>
    );
  };

  renderFlowCaseFormFieldDisplay = () => {
    const { metaData } = this.state;

    const { workflowFormDesign, listFormStorage, listAttachment } = {
      workflowFormDesign: {},
      listFormStorage: [],
      listAttachment: [],
      ...metaData,
    };

    const canEdit = getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.canEdit.name,
      convert: convertCollection.number,
    });

    const designJson = getValueByKey({
      data: workflowFormDesign,
      key: fieldDataFlowFormDesign.designSchema.name,
    });

    const designData = {
      form: {},
      schema: {},
      ...(checkStringIsNullOrWhiteSpace(designJson)
        ? {}
        : JSON.parse(designJson)),
    };

    const dataSchemaList = getValueByKey({
      data: workflowFormDesign,
      key: fieldDataFlowFormDesign.dataSchemaList.name,
      convert: convertCollection.array,
    });

    const hasDataSchema = dataSchemaList.length > 0;

    const initialValues = buildFormInitialValues(listFormStorage);

    const remarkSchemaList = getValueByKey({
      data: workflowFormDesign,
      key: fieldDataFlowFormDesign.remarkSchemaList.name,
      convert: convertCollection.array,
    });

    const remarkColor = getValueByKey({
      data: workflowFormDesign,
      key: fieldDataFlowFormDesign.remarkColor.name,
      defaultValue: '',
    });

    return (
      <SchemaDisplayer
        {...designData}
        initialValues={initialValues}
        showSubmit={canEdit === whetherNumber.yes}
        showSubmitDivider={canEdit === whetherNumber.yes}
        submitButtonText="提交表单"
        descriptionTitleColor={remarkColor}
        descriptionLabelColor={remarkColor}
        descriptionTextColor={remarkColor}
        descriptions={remarkSchemaList}
        descriptionUpperLabel="附件列表"
        descriptionUpperComponent={
          <FileViewer
            canUpload
            canRemove
            list={listAttachment}
            dataTransfer={(o) => {
              return {
                ...o,
                name: getValueByKey({
                  data: o,
                  key: fieldDataFlowCaseFormAttachment.alias.name,
                }),
                url: getValueByKey({
                  data: o,
                  key: fieldDataFlowCaseFormAttachment.url.name,
                }),
              };
            }}
            onUploadButtonClick={() => {
              this.showAddAttachmentModal();
            }}
            onItemClick={() => {
              showSimpleInfoMessage('示例: 点击预览按钮');
            }}
            onRemove={(o) => {
              this.removeAttachment(o);
            }}
          />
        }
        onSubmit={(o) => {
          this.saveForm(o);
        }}
      >
        {hasDataSchema ? null : (
          <Empty description="暂无表单设计，请首先进行设计" />
        )}
      </SchemaDisplayer>
    );
  };

  renderPresetContentContainorInnerTop = () => {
    const { useDocumentDisplay } = this.state;

    return (
      <div
        style={{
          paddingTop: '20px',
        }}
      >
        {useDocumentDisplay
          ? this.renderFlowCaseFormDocumentDisplay()
          : this.renderFlowCaseFormFieldDisplay()}
      </div>
    );
  };
}

export { BaseFlowCaseStorageFormDrawer };
