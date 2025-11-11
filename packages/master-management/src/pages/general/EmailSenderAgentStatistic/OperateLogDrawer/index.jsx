import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';
import { BasePageListDrawer } from '../../OperationLog/BasePageListDrawer';
import { fieldData } from '../Common/data';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '0a08d3647a7b49caa41b8069f385d00d';

@connect(({ emailSenderAgentStatistic, schedulingControl }) => ({
  emailSenderAgentStatistic,
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
        modelTypeCollection.emailSenderAgentStatisticTypeCollection
          .pageListOperateLog,
      emailSenderAgentStatisticId: null,
    };
  }

  supplementLoadRequestParams = (o) => {
    const { externalData } = this.props;

    const d = o;

    d[fieldData.emailSenderAgentStatisticId.name] = getValueByKey({
      data: externalData,
      key: fieldData.emailSenderAgentStatisticId.name,
      defaultValue: '',
    });

    return d;
  };
}

export { OperateLogDrawer };
