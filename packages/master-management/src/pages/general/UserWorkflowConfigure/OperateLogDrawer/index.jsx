import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';
import { BasePageListDrawer } from '../../OperationLog/BasePageListDrawer';
import { fieldData } from '../Common/data';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = 'a1feae1a3970432e9630bf90fcab3fe8';

@connect(({ userWorkflowConfigure, schedulingControl }) => ({
  userWorkflowConfigure,
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
        modelTypeCollection.userWorkflowConfigureTypeCollection
          .pageListOperateLog,
      userWorkflowConfigureId: null,
    };
  }

  supplementLoadRequestParams = (o) => {
    const { externalData } = this.props;

    const d = o;

    d[fieldData.userWorkflowConfigureId.name] = getValueByKey({
      data: externalData,
      key: fieldData.userWorkflowConfigureId.name,
      defaultValue: '',
    });

    return d;
  };
}

export { OperateLogDrawer };
