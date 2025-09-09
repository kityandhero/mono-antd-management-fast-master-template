import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../modelBuilders';
import { BasePageListDrawer } from '../../OperationLog/BasePageListDrawer';
import { fieldData } from '../Common/data';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = 'e0cd4ba14cbf432a94f692d33881b9f8';

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
