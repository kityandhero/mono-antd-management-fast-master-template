import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  getValueByKey,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import {
  accessWayCollection,
  keyValueEditModeCollection,
} from '../../../../customConfig';
import { getFlowFormDisplayModeName } from '../../../../customSpecialComponents';
import { buildInputItem } from '../../../../utils';
import { fieldData as fieldDataUser } from '../../../User/Common/data';
import { PageListSelectActionDrawer } from '../../../User/PageListSelectActionDrawer';
import { updateFlowDebugUserIdAction } from '../../Assist/action';
import { fieldData } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';
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
      loadApiPath: 'currentManagementInfrastructure/get',
      submitApiPath: 'currentManagementInfrastructure/updateDebugUserId',
      userId: '',
    };
  }

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { userId } = this.state;

    d[fieldData.flowDebugUserId.name] = userId;

    return d;
  };

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

  afterUserSelect = (d) => {
    const userId = getValueByKey({
      data: d,
      key: fieldDataUser.userId.name,
      defaultValue: '0',
    });

    this.setState({
      userId: userId,
    });
  };

  afterUserClearSelect = () => {
    this.setState({
      userId: '',
    });
  };

  showPageListSelectActionDrawer = () => {
    PageListSelectActionDrawer.open();
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

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '流程调试用户设置',
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
              fieldData: fieldData.flowDebugUserId,
              editMode: keyValueEditModeCollection.string,
              hidden: !checkHasAuthority(
                accessWayCollection.currentManagementInfrastructure
                  .updateKeyValueInfo.permission,
              ),
              value: flowDebugUser,
              handleClick: this.showPageListSelectActionDrawer,
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
            text: '流程通用审批消息模板',
          },
          items: [
            buildInputItem({
              firstLoadSuccess,
              handleData: metaData,
              fieldData: fieldData.flowApproveNotificationTemplate,
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
                  text: '通知模板必须为如下形式："即将审批的步骤为{0}, 审批人{1}".',
                },
                {
                  text: '形如{0}的位置为将要替换的内容.',
                },
                {
                  text: '位置 {0} 为节点名称.',
                },
                {
                  text: '位置 {1} 为审批人名称.',
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
                  text: '位置 {0} 为节点名称.',
                },
                {
                  text: '位置 {1} 为审批人名称.',
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
        <PageListSelectActionDrawer
          externalData={{
            currentData: metaData,
            fieldData: targetFieldData,
          }}
          editMode={keyValueEditMode || keyValueEditModeCollection.string}
          afterSelect={(selectData) => {
            this.updateFlowDebugUserId(selectData);
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
      </>
    );
  };
}

export default Index;
