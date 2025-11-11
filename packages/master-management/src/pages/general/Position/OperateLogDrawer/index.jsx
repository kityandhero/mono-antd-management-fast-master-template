import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../../modelBuilders';
import { BasePageListDrawer } from '../../OperationLog/BasePageListDrawer';
import { fieldData } from '../Common/data';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '6ae034edb89e4e0cba4b6d4fbfa68d0d';

@connect(({ position, schedulingControl }) => ({
  position,
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
        modelTypeCollection.positionTypeCollection.pageListOperateLog,
      positionId: null,
    };
  }

  supplementLoadRequestParams = (o) => {
    const { externalData } = this.props;

    const d = o;

    d[fieldData.positionId.name] = getValueByKey({
      data: externalData,
      key: fieldData.positionId.name,
      defaultValue: '',
    });

    return d;
  };
}

export { OperateLogDrawer };
