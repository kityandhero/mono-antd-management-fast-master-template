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

const nextNodeApproverUserName = '34a4fdf96438429dbb84f0af08e65bc6';

class BaseFlowCaseSubmitApprovalModal extends BaseUpdateModal {
  nextWorkflowNodeApproverUserId = '';

  nextWorkflowNodeApproverUserRealName = '';

  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '提交审批',
      loadApiPath: '',
      submitApiPath: '',
      nextNodeApproverUserList: [],
    };
  }

  executeAfterDoOtherWhenChangeVisibleToShow = () => {
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

    d[this.getFlowCaseIdName()] = this.getFlowCaseId(externalData);

    const nextWorkflowNodeApproverUserIdCollection =
      checkStringIsNullOrWhiteSpace(this.nextWorkflowNodeApproverUserId ?? '')
        ? []
        : [this.nextWorkflowNodeApproverUserId];

    d.nextWorkflowNodeApproverUserIdCollection =
      nextWorkflowNodeApproverUserIdCollection.join(',');

    delete d[nextNodeApproverUserName];

    return d;
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

      this.setFormFieldsValue(data);
    }
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
    const { externalData, nextNodeApproverUserList } = this.state;

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
                  nextNodeApproverUserList.length === 1) ||
                !this.checkHasSingleListNextNodeApproverAuthority(),
              require: true,
            },
          ],
        },
      ],
    };
  };
}

export { BaseFlowCaseSubmitApprovalModal };
