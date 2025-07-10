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
  flowBranchConditionItemTargetComparisonModelCollection,
  flowBranchConditionItemTargetTypeCollection,
  flowDebugApproverModeCollection,
} from '../../../customConfig';
import {
  renderFormFlowBranchConditionItemTargetComparisonModeSelect,
  renderFormFlowBranchConditionItemTargetTypeSelect,
} from '../../../customSpecialComponents';
import { modelTypeCollection } from '../../../modelBuilders';
import { BaseFlowCaseSubmitApprovalModal } from '../../../pageBases';
import { fieldData as fieldDataUser } from '../../User/Common/data';
import { singleListNextNodeApproverAction } from '../Assist/action';
import { fieldData as fieldDataWorkflowDebugCase } from '../Common/data';

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

const visibleFlag = '661bfdcd62084d10b754bf0c83cb639f';

@connect(({ workflowDebugCase, schedulingControl }) => ({
  workflowDebugCase,
  schedulingControl,
}))
class SubmitApprovalModal extends BaseFlowCaseSubmitApprovalModal {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      loadApiPath: modelTypeCollection.workflowDebugCaseTypeCollection.get,
      submitApiPath:
        modelTypeCollection.workflowDebugCaseTypeCollection.submitApproval,
    };
  }

  getFlowCaseId = (o) => {
    return getValueByKey({
      data: o,
      key: fieldDataWorkflowDebugCase.workflowDebugCaseId.name,
      defaultValue: '0',
    });
  };

  getFlowCaseIdName = () => {
    return fieldDataWorkflowDebugCase.workflowDebugCaseId.name;
  };

  checkHasSingleListNextNodeApproverAuthority = () => {
    return checkHasAuthority(
      accessWayCollection.workflowDebugCase.singleListNextNodeApprover
        .permission,
    );
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
                name: this.nextNodeApproverUserName,
                helper: '',
              },
              value: this.nextWorkflowNodeApproverUserRealName,
              hidden:
                (debugApproverMode ===
                  flowDebugApproverModeCollection.flowConfiguration &&
                  nextNodeApproverUserList.length !== 1) ||
                !this.checkHasSingleListNextNodeApproverAuthority(),
              require: true,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.select,
              fieldData: {
                label: '下步审批人',
                name: this.nextNodeApproverUserName,
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

export { SubmitApprovalModal };
