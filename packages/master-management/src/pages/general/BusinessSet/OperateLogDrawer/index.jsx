import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';
import { BasePageListDrawer } from '../../OperationLog/BasePageListDrawer';
import { fieldData } from '../Common/data';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '0534ab942af44c4a992cd105e2962b49';

@connect(({ businessSet, schedulingControl }) => ({
  businessSet,
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
        modelTypeCollection.businessSetTypeCollection.pageListOperateLog,
      businessSetId: null,
    };
  }

  supplementLoadRequestParams = (o) => {
    const { externalData } = this.props;

    const d = o;

    d[fieldData.businessSetId.name] = getValueByKey({
      data: externalData,
      key: fieldData.businessSetId.name,
      defaultValue: '',
    });

    return d;
  };
}

export { OperateLogDrawer };
