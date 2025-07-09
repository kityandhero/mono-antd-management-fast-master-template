/* eslint-disable no-unused-vars */
import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  filter,
  getValueByKey,
  isArray,
  isEmptyArray,
  toString,
  zeroString,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { buildButton, iconBuilder } from 'antd-management-fast-component';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import {
  accessWayCollection,
  fieldDataFlowCase,
  fieldDataFlowCaseProcessHistory,
  flowBranchConditionItemTargetComparisonModelCollection,
  flowBranchConditionItemTargetTypeCollection,
  flowDebugApproverModeCollection,
} from '../../../customConfig';
import {
  renderFormFlowBranchConditionItemTargetComparisonModeSelect,
  renderFormFlowBranchConditionItemTargetTypeSelect,
} from '../../../customSpecialComponents';
import { singleListAction } from '../../../pages/GeneralDiscourse/Assist/action';
import { typeCollection } from '../../../pages/GeneralDiscourse/Common/data';
import { fieldData as fieldDataUser } from '../../../pages/User/Common/data';
import { singleListNextNodeApproverAction } from '../../../pages/WorkflowDebugCase/Assist/action';
import { singleListApproverUserWithNodeAndFlowCaseAction } from '../../../pages/WorkflowNodeApprover/Assist/action';

const { BaseUpdateModal } = DataModal;

// eslint-disable-next-line no-unused-vars
function dataFormFieldApproverConvert(o, index) {
  const { friendlyName, userId } = o;

  return {
    label: friendlyName,
    value: userId,
    disabled: false,
    ...o,
  };
}

// eslint-disable-next-line no-unused-vars
function dataFormFieldGeneralDiscourseConvert(o, index) {
  const { content, generalDiscourseId } = o;

  return {
    label: content,
    value: generalDiscourseId,
    disabled: false,
    ...o,
  };
}

const approveUserName = '2fcc037383244eeb81d6c71053a79601';

const nextNodeApproverUserName = '17158fea9dbc42d4abbe967cdc099ba1';

const generalDiscourseName = '991d90f0881b4e14909c7e8f270e593f';

class BaseFlowCaseProcessHistoryPassModal extends BaseUpdateModal {
  approveUserId = '';

  approveUserRealName = '';

  nextWorkflowNodeApproverUserId = '';

  nextWorkflowNodeApproverUserRealName = '';

  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '同意审批',
      loadApiPath: '',
      submitApiPath: '',
      generalDiscourseList: [],
      approverList: [],
      nextNodeApproverUserList: [],
    };
  }

  executeAfterDoOtherWhenChangeVisibleToShow = () => {
    this.loadGeneralDiscourseList();
    this.loadApproverUserWithNodeAndFlowCaseList();
    this.reloadNextNodeApproverList();
  };

  // eslint-disable-next-line no-unused-vars
  getFlowCaseId = (o) => {
    throw new Error('getFlowCaseId need overrode to implement');
  };

  getFlowCaseIdName = () => {
    throw new Error('getFlowCaseIdName need overrode to implement');
  };

  checkHasSingleListNextNodeApproverAuthority = () => {
    throw new Error(
      'checkHasSingleListNextNodeApproverAuthority need overrode to implement, need return boolean',
    );
  };

  supplementLoadRequestParams = (o) => {
    const d = { ...o };
    const { externalData } = this.props;

    d[this.getFlowCaseIdName()] = this.getFlowCaseId(externalData);

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = { ...o };
    const { externalData } = this.props;

    d[fieldDataFlowCaseProcessHistory.flowCaseId.name] =
      this.getFlowCaseId(externalData);

    d[fieldDataFlowCaseProcessHistory.approveUserId.name] =
      this.approveUserId ?? '';

    const nextWorkflowNodeApproverUserIdCollection =
      checkStringIsNullOrWhiteSpace(this.nextWorkflowNodeApproverUserId ?? '')
        ? []
        : [this.nextWorkflowNodeApproverUserId];

    d.nextWorkflowNodeApproverUserIdCollection =
      nextWorkflowNodeApproverUserIdCollection.join(',');

    delete d[approveUserName];
    delete d[nextNodeApproverUserName];
    delete d[generalDiscourseName];

    return d;
  };

  loadGeneralDiscourseList = () => {
    const { externalData } = this.props;

    singleListAction({
      target: this,
      handleData: {
        type: typeCollection.workflow,
      },
      successCallback: ({ target, remoteListData }) => {
        target.setState({
          generalDiscourseList: remoteListData,
        });
      },
    });
  };

  reloadGeneralDiscourseList = () => {
    this.loadGeneralDiscourseList();
  };

  loadApproverUserWithNodeAndFlowCaseList = () => {
    const { externalData } = this.props;

    const debugApproverMode = getValueByKey({
      data: externalData,
      key: fieldDataFlowCase.debugApproverMode.name,
      convert: convertCollection.number,
    });

    if (debugApproverMode === flowDebugApproverModeCollection.globalDebugUser) {
      this.approveUserId = getValueByKey({
        data: externalData,
        key: fieldDataFlowCase.flowDebugUserId.name,
        convert: convertCollection.string,
      });

      this.approveUserRealName = getValueByKey({
        data: externalData,
        key: fieldDataFlowCase.flowDebugUserRealName.name,
        convert: convertCollection.string,
      });
    }

    singleListApproverUserWithNodeAndFlowCaseAction({
      target: this,
      handleData: {
        workflowNodeId: getValueByKey({
          data: externalData,
          key: fieldDataFlowCase.nextApproveWorkflowNodeId.name,
          defaultValue: '',
        }),
        flowCaseUserId: getValueByKey({
          data: externalData,
          key: fieldDataFlowCase.userId.name,
          defaultValue: '',
        }),
      },
      successCallback: ({ target, remoteListData }) => {
        if (
          debugApproverMode ===
            flowDebugApproverModeCollection.flowConfiguration &&
          isArray(remoteListData) &&
          !isEmptyArray(remoteListData) &&
          remoteListData.length === 1
        ) {
          const firstData = remoteListData[0];

          const userId = getValueByKey({
            data: firstData,
            key: fieldDataUser.userId.name,
            convert: convertCollection.string,
          });

          const friendlyName = getValueByKey({
            data: firstData,
            key: fieldDataUser.friendlyName.name,
            convert: convertCollection.string,
          });

          target.approveUserId = userId;
          target.approveUserRealName = friendlyName;
        }

        target.setState({
          approverList: [...remoteListData],
        });
      },
    });
  };

  reloadApproverUserWithNodeAndFlowCaseList = () => {
    this.loadApproverUserWithNodeAndFlowCaseList();
  };

  loadNextNodeApproverList = () => {
    const { externalData } = this.props;

    const debugApproverMode = getValueByKey({
      data: externalData,
      key: fieldDataFlowCase.debugApproverMode.name,
      convert: convertCollection.number,
    });

    if (debugApproverMode === flowDebugApproverModeCollection.globalDebugUser) {
      this.nextWorkflowNodeApproverUserId = getValueByKey({
        data: externalData,
        key: fieldDataFlowCase.flowDebugUserId.name,
        convert: convertCollection.string,
      });

      this.nextWorkflowNodeApproverUserRealName = getValueByKey({
        data: externalData,
        key: fieldDataFlowCase.flowDebugUserRealName.name,
        convert: convertCollection.string,
      });
    }

    const d = {};

    d[this.getFlowCaseIdName()] = this.getFlowCaseId(externalData);

    singleListNextNodeApproverAction({
      target: this,
      handleData: {
        ...d,
      },
      successCallback: ({ target, remoteListData }) => {
        if (
          debugApproverMode ===
            flowDebugApproverModeCollection.flowConfiguration &&
          isArray(remoteListData) &&
          !isEmptyArray(remoteListData) &&
          remoteListData.length === 1
        ) {
          const firstData = remoteListData[0];

          const userId = getValueByKey({
            data: firstData,
            key: fieldDataUser.userId.name,
            convert: convertCollection.string,
          });

          const friendlyName = getValueByKey({
            data: firstData,
            key: fieldDataUser.friendlyName.name,
            convert: convertCollection.string,
          });

          target.nextWorkflowNodeApproverUserId = userId;
          target.nextWorkflowNodeApproverUserRealName = friendlyName;
        }

        target.setState({
          nextNodeApproverUserList: [...remoteListData],
        });
      },
    });
  };

  reloadNextNodeApproverList = () => {
    this.loadNextNodeApproverList();
  };

  onGeneralDiscourseChange = (v, option) => {
    const { content } = option;

    if (!checkStringIsNullOrWhiteSpace(content)) {
      const data = {};

      data[fieldDataFlowCaseProcessHistory.note.name] = content;
      data[generalDiscourseName] = null;

      this.setFormFieldsValue(data);
    }
  };

  onApproverChange = (v, option) => {
    this.approveUserId = v;
  };

  onNextNodeApproverChange = (v, option) => {
    this.nextWorkflowNodeApproverUserId = v;
  };

  buildTitleSubText = () => {
    const { metaData } = this.state;

    return getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.title.name,
    });
  };

  establishFormAdditionalConfig = () => {
    return {
      labelCol: {
        flex: '100px',
      },
      wrapperCol: {
        flex: 'auto',
      },
    };
  };

  fillInitialValuesAfterLoad = ({
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const values = {};

    return values;
  };

  establishCardCollectionConfig = () => {
    const {
      externalData,
      generalDiscourseList,
      approverList,
      nextNodeApproverUserList,
    } = this.state;

    const debugApproverMode = getValueByKey({
      data: externalData,
      key: fieldDataFlowCase.debugApproverMode.name,
      convert: convertCollection.number,
    });

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '基本信息',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: {
                label: '当前审批人',
                name: approveUserName,
                helper: '',
              },
              value: this.approveUserRealName,
              hidden:
                (debugApproverMode ===
                  flowDebugApproverModeCollection.flowConfiguration &&
                  approverList.length !== 1) ||
                !checkHasAuthority(
                  accessWayCollection.workflowNodeApprover.singleList
                    .permission,
                ),
              require: true,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.select,
              fieldData: {
                label: '当前审批人',
                name: approveUserName,
                helper: '',
              },
              listData: approverList,
              dataConvert: dataFormFieldApproverConvert,
              onChange: this.onApproverChange,
              addonAfter: buildButton({
                text: '',
                icon: iconBuilder.reload(),
                handleClick: () => {
                  this.reloadApproverUserWithNodeAndFlowCaseList();
                },
              }),
              hidden:
                debugApproverMode ===
                  flowDebugApproverModeCollection.globalDebugUser ||
                (debugApproverMode ===
                  flowDebugApproverModeCollection.flowConfiguration &&
                  approverList.length === 1) ||
                !checkHasAuthority(
                  accessWayCollection.workflowNodeApprover.singleList
                    .permission,
                ),
              require: true,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: {
                label: '下步审批人',
                name: nextNodeApproverUserName,
                helper: '',
              },
              value: this.nextWorkflowNodeApproverUserRealName,
              hidden:
                (debugApproverMode ===
                  flowDebugApproverModeCollection.flowConfiguration &&
                  nextNodeApproverUserList.length !== 1) ||
                !checkHasAuthority(
                  accessWayCollection.workflowNodeApprover.singleList
                    .permission,
                ),
              require: true,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.select,
              fieldData: {
                label: '下步审批人',
                name: nextNodeApproverUserName,
                helper: '',
              },
              listData: nextNodeApproverUserList,
              dataConvert: dataFormFieldApproverConvert,
              onChange: this.onNextNodeApproverChange,
              addonAfter: buildButton({
                text: '',
                icon: iconBuilder.reload(),
                handleClick: () => {
                  this.reloadNextNodeApproverList();
                },
              }),
              hidden:
                debugApproverMode ===
                  flowDebugApproverModeCollection.globalDebugUser ||
                (debugApproverMode ===
                  flowDebugApproverModeCollection.flowConfiguration &&
                  nextNodeApproverUserList.length <= 1) ||
                !this.checkHasSingleListNextNodeApproverAuthority(),
              require: true,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.select,
              fieldData: {
                label: '快捷常用语',
                name: generalDiscourseName,
                helper: '',
              },
              listData: generalDiscourseList,
              dataConvert: dataFormFieldGeneralDiscourseConvert,
              onChange: this.onGeneralDiscourseChange,
              addonAfter: buildButton({
                text: '',
                icon: iconBuilder.reload(),
                handleClick: () => {
                  this.reloadGeneralDiscourseList();
                },
              }),
              hidden: !checkHasAuthority(
                accessWayCollection.generalDiscourse.singleList.permission,
              ),
              require: false,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldDataFlowCaseProcessHistory.note,
              require: true,
            },
          ],
        },
      ],
    };
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '审批人为当前审批节点的操作人。',
        },
        {
          text: '下步审批人为指定的当前审批节点下一节点的审批人',
        },
        {
          text: '测试环境当前审批人选择列表将加载节点配置的全部审批人, 若选择了上一审批中未指定的审批人, 则审批会发生错误, 受限于交互，此情况为特意设置，目的是为了检测选择了不应选择的当前审批人的状况',
        },
        {
          text: '选择常用语可以快速填充审批意见。',
        },
      ],
    };
  };
}

export { BaseFlowCaseProcessHistoryPassModal };
