import { connect } from 'easy-soft-dva';
import { checkInCollection, filter, toString } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { switchControlAssist } from 'antd-management-fast-framework';

import {
  flowNodeApproveModeCollection,
  flowNodeApproverModeCollection,
} from '../../../customConfig';
import {
  getFlowNodeApproveModeName,
  renderFormFlowNodeApproveModeSelect,
  renderFormFlowNodeApproverModeSelect,
} from '../../../customSpecialComponents';
import { modelTypeCollection } from '../../../modelBuilders';
import { BaseAddPointDrawer } from '../BaseAddPointDrawer';
import { fieldData } from '../Common/data';

const visibleFlag = '709b7d9a521c45abbec25f6c6568a9a2';

@connect(({ workflowNode, schedulingControl }) => ({
  workflowNode,
  schedulingControl,
}))
class AddIntermediatePointDrawer extends BaseAddPointDrawer {
  // 在控制台显示组建内调用序列, 仅为进行开发辅助
  // showCallProcess = true;

  currentApproveMode = toString(
    flowNodeApproverModeCollection.directlyAffiliatedDepartment,
  );

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '新增过程点',
      submitApiPath:
        modelTypeCollection.workflowNodeTypeCollection.addIntermediatePoint,
      approveModeSelectable: true,
    };
  }

  adjustApproverModeListData = (list) => {
    const listAdjust = filter(list, (one) => {
      const { flag } = one;

      return checkInCollection(
        [
          toString(flowNodeApproverModeCollection.designated),
          toString(flowNodeApproverModeCollection.directlyAffiliatedDepartment),
        ],
        toString(flag),
      );
    });

    return listAdjust;
  };

  // eslint-disable-next-line no-unused-vars
  onApproverModeChange = (v, option) => {
    const data = {};

    if (toString(v) !== toString(flowNodeApproverModeCollection.designated)) {
      data[fieldData.approveMode.name] = toString(
        flowNodeApproveModeCollection.oneOfApproval,
      );
    }

    this.setFormFieldsValue(data);

    this.setState({
      approveModeSelectable:
        toString(v) === toString(flowNodeApproverModeCollection.designated),
    });
  };

  fillDefaultInitialValues = () => {
    const initialValues = {};

    initialValues[fieldData.approverMode.name] = toString(
      flowNodeApproverModeCollection.designated,
    );

    initialValues[fieldData.approveMode.name] = toString(
      flowNodeApproveModeCollection.oneOfApproval,
    );

    return initialValues;
  };

  establishCustomExtraViewConfig = () => {
    const { approveModeSelectable } = this.state;

    const that = this;

    return [
      {
        lg: 12,
        type: cardConfig.contentItemType.component,
        component: renderFormFlowNodeApproverModeSelect({
          adjustListData: that.adjustApproverModeListData,
          onChange: this.onApproverModeChange,
        }),
        require: true,
      },
      {
        lg: 12,
        type: cardConfig.contentItemType.component,
        component: renderFormFlowNodeApproveModeSelect({}),
        require: true,
        hidden: !approveModeSelectable,
      },
      {
        lg: 12,
        type: cardConfig.contentItemType.onlyShowInput,
        fieldData: fieldData.approveMode,
        value: getFlowNodeApproveModeName({
          value: toString(flowNodeApproveModeCollection.oneOfApproval),
        }),
        require: true,
        hidden: approveModeSelectable,
      },
    ];
  };

  renderPresetTitle = () => {
    return '新增流程点';
  };
}

export { AddIntermediatePointDrawer };
