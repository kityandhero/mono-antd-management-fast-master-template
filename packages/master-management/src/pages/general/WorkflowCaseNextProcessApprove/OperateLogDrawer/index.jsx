import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';
import { BasePageListDrawer } from '../../OperationLog/BasePageListDrawer';
import { fieldData } from '../Common/data';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '23031c9c74a94210b004f78ebedc9e04';

@connect(({ workflowNodeApprover, schedulingControl }) => ({
  workflowNodeApprover,
  schedulingControl,
}))
class OperateLogDrawer extends BasePageListDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      loadApiPath:
        modelTypeCollection.workflowNodeApproverTypeCollection
          .pageListOperateLog,
      workflowNodeApproverId: null,
    };
  }

  supplementLoadRequestParams = (o) => {
    const { externalData } = this.props;

    const d = o;

    d[fieldData.workflowNodeApproverId.name] = getValueByKey({
      data: externalData,
      key: fieldData.workflowNodeApproverId.name,
      defaultValue: '',
    });

    return d;
  };
}

export { OperateLogDrawer };
