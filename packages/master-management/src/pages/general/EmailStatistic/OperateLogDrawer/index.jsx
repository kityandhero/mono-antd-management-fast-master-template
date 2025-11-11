import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';
import { BasePageListDrawer } from '../../OperationLog/BasePageListDrawer';
import { fieldData } from '../Common/data';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = 'db63b81b4bad4ad394d9d5bb7bedbb90';

@connect(({ emailStatistic, schedulingControl }) => ({
  emailStatistic,
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
        modelTypeCollection.emailStatisticTypeCollection.pageListOperateLog,
      emailStatisticId: null,
    };
  }

  supplementLoadRequestParams = (o) => {
    const { externalData } = this.props;

    const d = o;

    d[fieldData.emailStatisticId.name] = getValueByKey({
      data: externalData,
      key: fieldData.emailStatisticId.name,
      defaultValue: '',
    });

    return d;
  };
}

export { OperateLogDrawer };
