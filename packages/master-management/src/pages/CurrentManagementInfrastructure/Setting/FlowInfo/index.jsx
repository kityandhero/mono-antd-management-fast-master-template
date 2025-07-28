import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  getNow,
  getTimeStamp,
  getValueByKey,
  whetherNumber,
} from 'easy-soft-utility';

import { cardConfig, emptyImage } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import {
  accessWayCollection,
  keyValueEditModeCollection,
} from '../../../../customConfig';
import {
  getFlowCaseWatermarkModeName,
  getFlowFormDisplayModeName,
} from '../../../../customSpecialComponents';
import { modelTypeCollection } from '../../../../modelBuilders';
import { buildInputItem } from '../../../../utils';
import { fieldData as fieldDataSubsidiary } from '../../../Subsidiary/Common/data';
import { PageListSubsidiarySelectActionDrawer } from '../../../Subsidiary/PageListSelectActionDrawer';
import { fieldData as fieldDataUser } from '../../../User/Common/data';
import { PageListUserSelectActionDrawer } from '../../../User/PageListSelectActionDrawer';
import {
  updateFlowDebugSubsidiaryIdAction,
  updateFlowDebugUserIdAction,
} from '../../Assist/action';
import { fieldData } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';
import { UpdateFlowCaseWatermarkModeModal } from '../../UpdateFlowCaseWatermarkModeModal';
import { UpdateKeyValueInfoModal } from '../../UpdateKeyValueInfoModal';

@connect(({ currentManagementInfrastructure, schedulingControl }) => ({
  currentManagementInfrastructure,
  schedulingControl,
}))
class Index extends TabPageBase {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath:
        modelTypeCollection.currentManagementInfrastructureTypeCollection.get,
    };
  }

  doOtherAfterLoadSuccess = ({
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const flowDebugUserId = getValueByKey({
      data: metaData,
      key: fieldData.flowDebugUserId.name,
    });

    this.setState({ userId: flowDebugUserId });
  };

  updateFlowDebugUserId = (data) => {
    updateFlowDebugUserIdAction({
      target: this,
      handleData: {
        flowDebugUserId: getValueByKey({
          data: data,
          key: fieldDataUser.userId.name,
        }),
      },
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  updateFlowDebugSubsidiaryId = (data) => {
    updateFlowDebugSubsidiaryIdAction({
      target: this,
      handleData: {
        flowDebugSubsidiaryId: getValueByKey({
          data: data,
          key: fieldDataSubsidiary.subsidiaryId.name,
        }),
      },
      successCallback: ({ target }) => {
        target.reloadData({});
      },
    });
  };

  showPageListUserSelectActionDrawer = () => {
    PageListUserSelectActionDrawer.open();
  };

  showPageListSubsidiarySelectActionDrawer = () => {
    PageListSubsidiarySelectActionDrawer.open();
  };

  showUpdateKeyValueInfoModal = ({
    fieldData: targetFieldData,
    editMode = keyValueEditModeCollection.string,
  }) => {
    this.setState(
      {
        targetFieldData,
        keyValueEditMode: editMode,
      },
      () => {
        UpdateKeyValueInfoModal.open();
      },
    );
  };

  afterUpdateKeyValueInfoModalOk = () => {
    this.reloadData({});
  };

  showUpdateFlowCaseWatermarkModeModal = () => {
    UpdateFlowCaseWatermarkModeModal.open();
  };

  afterUUpdateFlowCaseWatermarkModeModalOk = () => {
    this.reloadData({});
  };

  fillInitialValuesAfterLoad = ({
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const values = {};

    if (metaData != null) {
      values[fieldData.flowDebugUserId.name] = getValueByKey({
        data: metaData,
        key: fieldData.flowDebugUserId.name,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { firstLoadSuccess, metaData } = this.state;

    const flowCaseSealRefuseImage = getValueByKey({
      data: metaData,
      key: fieldData.flowCaseSealRefuseImage.name,
      convert: convertCollection.string,
    });

    const flowCaseWatermarkTextImage = getValueByKey({
      data: metaData,
      key: fieldData.flowCaseWatermarkTextImage.name,
      convert: convertCollection.string,
    });

    const flowDebugUserId = getValueByKey({
      data: metaData,
      key: fieldData.flowDebugUserId.name,
      convert: convertCollection.string,
    });

    const flowDebugUserRealName = getValueByKey({
      data: metaData,
      key: fieldData.flowDebugUserRealName.name,
    });

    const flowDebugUser = `${flowDebugUserId} ${checkStringIsNullOrWhiteSpace(flowDebugUserRealName) ? '' : `【${flowDebugUserRealName}】`}`;

    const flowDebugSubsidiaryId = getValueByKey({
      data: metaData,
      key: fieldData.flowDebugSubsidiaryId.name,
      convert: convertCollection.string,
    });

    const flowDebugSubsidiaryShortName = getValueByKey({
      data: metaData,
      key: fieldData.flowDebugSubsidiaryShortName.name,
    });

    const flowDebugSubsidiary = `${flowDebugSubsidiaryId} ${checkStringIsNullOrWhiteSpace(flowDebugSubsidiaryShortName) ? '' : `【${flowDebugSubsidiaryShortName}】`}`;

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '流程申请陈述设置',
          },
          hasExtra: true,
          extra: {
            affix: true,
            list: [
              {
                buildType: cardConfig.extraBuildType.refresh,
              },
            ],
          },
          items: [
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.flowApplicantStatementTitleTemplate,
              editMode: keyValueEditModeCollection.string,
              hidden: !checkHasAuthority(
                accessWayCollection.currentManagementInfrastructure
                  .updateKeyValueInfo.permission,
              ),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.flowApplicantStatementContentTemplate,
              editMode: keyValueEditModeCollection.multiLineString,
              hidden: !checkHasAuthority(
                accessWayCollection.currentManagementInfrastructure
                  .updateKeyValueInfo.permission,
              ),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
          ],
          instruction: [
            {
              title: '设置说明',
              showDivider: false,
              showNumber: true,
              list: [
                {
                  text: '此处配置流程审批文档中的申请人栏相关内容模板.',
                },
              ],
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '流程经办陈述设置',
          },
          items: [
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.flowAttentionStatementTitleTemplate,
              editMode: keyValueEditModeCollection.string,
              hidden: !checkHasAuthority(
                accessWayCollection.currentManagementInfrastructure
                  .updateKeyValueInfo.permission,
              ),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.flowAttentionStatementContentTemplate,
              editMode: keyValueEditModeCollection.multiLineString,
              hidden: !checkHasAuthority(
                accessWayCollection.currentManagementInfrastructure
                  .updateKeyValueInfo.permission,
              ),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
          ],
          instruction: [
            {
              title: '设置说明',
              showDivider: false,
              showNumber: true,
              list: [
                {
                  text: '此处配置流程审批文档中的经办人栏相关内容模板.',
                },
              ],
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '流程审批时间显示',
          },
          items: [
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.flowApproveTimeWhetherDisplayTime,
              editMode: keyValueEditModeCollection.whether,
              hidden: !checkHasAuthority(
                accessWayCollection.currentManagementInfrastructure
                  .updateKeyValueInfo.permission,
              ),
              value: getValueByKey({
                data: metaData,
                key: fieldData.flowApproveTimeWhetherDisplayTime.name,
                convert: convertCollection.number,
                formatBuilder: (v) => {
                  return v === whetherNumber.yes ? '显示' : '不显示';
                },
              }),
              inputIcon: iconBuilder.swap(),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '流程隐藏配置',
          },
          items: [
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.flowCaseCanHideWhenRejected,
              editMode: keyValueEditModeCollection.whether,
              hidden: !checkHasAuthority(
                accessWayCollection.currentManagementInfrastructure
                  .updateKeyValueInfo.permission,
              ),
              value: getValueByKey({
                data: metaData,
                key: fieldData.flowCaseCanHideWhenRejected.name,
                convert: convertCollection.number,
                formatBuilder: (v) => {
                  return v === whetherNumber.yes ? '允许' : '禁止';
                },
              }),
              inputIcon: iconBuilder.swap(),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '流程抄送配置',
          },
          items: [
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData:
                fieldData.flowCaseCarbonCopyWhetherOnlyVisibleOnApprovalSuccess,
              editMode: keyValueEditModeCollection.whether,
              hidden: !checkHasAuthority(
                accessWayCollection.currentManagementInfrastructure
                  .updateKeyValueInfo.permission,
              ),
              value: getValueByKey({
                data: metaData,
                key: fieldData
                  .flowCaseCarbonCopyWhetherOnlyVisibleOnApprovalSuccess.name,
                convert: convertCollection.number,
                formatBuilder: (v) => {
                  return v === whetherNumber.yes
                    ? '仅限审批成功后可见'
                    : '审批时或审批成功后可见';
                },
              }),
              inputIcon: iconBuilder.swap(),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '流程调试设置',
          },
          items: [
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.flowDebugUserId,
              editMode: keyValueEditModeCollection.string,
              hidden: !checkHasAuthority(
                accessWayCollection.currentManagementInfrastructure
                  .updateKeyValueInfo.permission,
              ),
              value: flowDebugUser,
              handleClick: this.showPageListUserSelectActionDrawer,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.flowDebugSubsidiaryId,
              editMode: keyValueEditModeCollection.string,
              hidden: !checkHasAuthority(
                accessWayCollection.currentManagementInfrastructure
                  .updateKeyValueInfo.permission,
              ),
              value: flowDebugSubsidiary,
              handleClick: this.showPageListSubsidiarySelectActionDrawer,
            }),
          ],
          instruction: [
            {
              title: '设置说明',
              showDivider: false,
              showNumber: true,
              list: [
                {
                  text: '测试环境为隔离环境, 仅用于流程调试中的测试页面, 对正式审批无影响.',
                },
              ],
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '流程表单显示模式',
          },
          items: [
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.flowFormDisplayModeWhenApproval,
              editMode:
                keyValueEditModeCollection.flowFormDisplayModeWhenApproval,
              hidden: !checkHasAuthority(
                accessWayCollection.currentManagementInfrastructure
                  .updateKeyValueInfo.permission,
              ),
              value: getValueByKey({
                data: metaData,
                key: fieldData.flowFormDisplayModeWhenApproval.name,
                convert: convertCollection.number,
                formatBuilder: (v) => {
                  return getFlowFormDisplayModeName({ value: v });
                },
              }),
              inputIcon: iconBuilder.read(),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
          ],
          instruction: [
            {
              title: '设置说明',
              showDivider: false,
              showNumber: true,
              list: [
                {
                  text: '表单模式为只读表单.',
                },
                {
                  text: '文档模式为模拟现实中的审批表格, 审批人批阅时较为直观.',
                },
              ],
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '流程表单驳回签章配置',
          },
          fullLine: false,
          width: 'auto',
          items: [
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.flowCaseSealRefuseVisibility,
              editMode: keyValueEditModeCollection.whether,
              hidden: !checkHasAuthority(
                accessWayCollection.currentManagementInfrastructure
                  .updateKeyValueInfo.permission,
              ),
              value: getValueByKey({
                data: metaData,
                key: fieldData.flowCaseSealRefuseVisibility.name,
                convert: convertCollection.number,
                formatBuilder: (v) => {
                  return v === whetherNumber.yes ? '显示' : '不显示';
                },
              }),
              inputIcon: iconBuilder.swap(),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
          ],
          instruction: [
            {
              title: '设置说明',
              showDivider: false,
              showNumber: true,
              list: [
                {
                  text: '印章图片请在默认图中配置.',
                },
              ],
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.picture(),
            text: '驳回签章预览',
          },
          fullLine: false,
          width: '226px',
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.imageShow,
              fieldData: fieldData.flowCaseSealRefuseImage,
              image: checkStringIsNullOrWhiteSpace(flowCaseSealRefuseImage)
                ? emptyImage
                : `${flowCaseSealRefuseImage}?time=${getTimeStamp(getNow())}`,
              imageBoxProps: {
                imageBoxStyle: {
                  boxShadow: '0 1px 4px #ccc, 0 0 40px #ccc inset',
                  padding: '4px',
                },
                fillHeight: false,
              },
              imageBoxContainorStyle: {
                width: '160px',
              },
            },
          ],
        },
        {
          // {}可以打断行布局, 起到换行效果
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '流程表单水印配置',
          },
          fullLine: false,
          width: 'auto',
          items: [
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.flowCaseWatermarkVisibility,
              editMode: keyValueEditModeCollection.whether,
              hidden: !checkHasAuthority(
                accessWayCollection.currentManagementInfrastructure
                  .updateKeyValueInfo.permission,
              ),
              value: getValueByKey({
                data: metaData,
                key: fieldData.flowCaseWatermarkVisibility.name,
                convert: convertCollection.number,
                formatBuilder: (v) => {
                  return v === whetherNumber.yes ? '显示' : '不显示';
                },
              }),
              inputIcon: iconBuilder.swap(),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.flowCaseEffectiveWatermarkMode,
              editMode: keyValueEditModeCollection.string,
              value: getFlowCaseWatermarkModeName({
                value: getValueByKey({
                  data: metaData,
                  key: fieldData.flowCaseEffectiveWatermarkMode.name,
                  convert: convertCollection.string,
                }),
              }),
              handleClick: this.showUpdateFlowCaseWatermarkModeModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.flowCaseWatermarkText,
              editMode: keyValueEditModeCollection.string,
              hidden: !checkHasAuthority(
                accessWayCollection.currentManagementInfrastructure
                  .updateKeyValueInfo.permission,
              ),
              value: getValueByKey({
                data: metaData,
                key: fieldData.flowCaseWatermarkText.name,
                convert: convertCollection.string,
                defaultValue: '',
              }),
              inputIcon: iconBuilder.read(),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
          ],
        },
        {
          title: {
            icon: iconBuilder.picture(),
            text: '通用文字水印预览',
          },
          fullLine: false,
          width: '356px',
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.imageShow,
              fieldData: fieldData.wechatMicroApplicationQrCode,
              image: checkStringIsNullOrWhiteSpace(flowCaseWatermarkTextImage)
                ? emptyImage
                : `${flowCaseWatermarkTextImage}?time=${getTimeStamp(getNow())}`,
              imageBoxProps: {
                imageBoxStyle: {
                  boxShadow: '0 1px 4px #ccc, 0 0 40px #ccc inset',
                  padding: '4px',
                },
                fillHeight: false,
              },
              imageBoxContainorStyle: {
                width: '290px',
              },
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '流程短信通知检索设置',
          },
          items: [
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.flowApproveNotificationSmsSearchStartTime,
              editMode: keyValueEditModeCollection.datetime,
              hidden: !checkHasAuthority(
                accessWayCollection.currentManagementInfrastructure
                  .updateKeyValueInfo.permission,
              ),
              inputIcon: iconBuilder.clock(),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
          ],
          instruction: [
            {
              title: '设置说明',
              showDivider: false,
              showNumber: true,
              list: [
                {
                  text: '依据此处配置的时间检索即将发送的审批短信通知.',
                },
              ],
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '流程通用审批消息模板',
          },
          items: [
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.flowApproveNotificationTemplate,
              editMode: keyValueEditModeCollection.multiLineString,
              hidden: !checkHasAuthority(
                accessWayCollection.currentManagementInfrastructure
                  .updateKeyValueInfo.permission,
              ),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.flowApproveNotificationClientTemplate,
              editMode: keyValueEditModeCollection.multiLineString,
              hidden: !checkHasAuthority(
                accessWayCollection.currentManagementInfrastructure
                  .updateKeyValueInfo.permission,
              ),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.flowApproveNotificationSmsTemplate,
              editMode: keyValueEditModeCollection.multiLineString,
              hidden: !checkHasAuthority(
                accessWayCollection.currentManagementInfrastructure
                  .updateKeyValueInfo.permission,
              ),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
          ],
          instruction: [
            {
              title: '设置说明',
              showDivider: false,
              showNumber: true,
              list: [
                {
                  text: '通知模板必须为如下形式："有新的审批需要处理：{0}".',
                },
                {
                  text: '形如{0}的位置为将要替换的内容.',
                },
                {
                  text: '位置 {0} 为审批标题, 位置 {1} 为批号.',
                },
              ],
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '流程通用抄送消息模板',
          },
          items: [
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.flowCarbonCopyNotificationTemplate,
              editMode: keyValueEditModeCollection.string,
              hidden: !checkHasAuthority(
                accessWayCollection.currentManagementInfrastructure
                  .updateKeyValueInfo.permission,
              ),
              handleClick: this.showUpdateKeyValueInfoModal,
            }),
          ],
          instruction: [
            {
              title: '设置说明',
              showDivider: false,
              showNumber: true,
              list: [
                {
                  text: '通知模板必须为如下形式："已审批的步骤为{0}, 抄送人{1}".',
                },
                {
                  text: '形如{0}的位置为将要替换的内容.',
                },
                {
                  text: '位置 {0} 为流程实例标题.',
                },
                {
                  text: '位置 {1} 为节点名称.',
                },
                {
                  text: '位置 {2} 为审批人名称.',
                },
              ],
            },
          ],
        },
      ],
    };
  };

  renderPresetOther = () => {
    const { keyValueEditMode, metaData, targetFieldData } = this.state;

    return (
      <>
        <PageListUserSelectActionDrawer
          afterSelect={(selectData) => {
            this.updateFlowDebugUserId(selectData);
          }}
        />

        <PageListSubsidiarySelectActionDrawer
          afterSelect={(selectData) => {
            this.updateFlowDebugSubsidiaryId(selectData);
          }}
        />

        <UpdateKeyValueInfoModal
          externalData={{
            currentData: metaData,
            fieldData: targetFieldData,
          }}
          editMode={keyValueEditMode || keyValueEditModeCollection.string}
          afterOK={() => {
            this.afterUpdateKeyValueInfoModalOk();
          }}
        />

        <UpdateFlowCaseWatermarkModeModal
          externalData={{
            currentData: metaData,
            fieldData: targetFieldData,
          }}
          editMode={keyValueEditMode || keyValueEditModeCollection.string}
          afterClose={() => {
            this.afterUUpdateFlowCaseWatermarkModeModalOk();
          }}
        />
      </>
    );
  };
}

export default Index;
